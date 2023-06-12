const collegeModel = require ('../models/collegeModel');
const internModel = require('../models/internModel')

const axios = require('axios');

const createCollege = async function(req,res){
    try{
    let input  = req.body;
    const {name , fullName, logoLink} = input;
    if(!name || !fullName || !logoLink){
        return res.status(400).send({status : false, message:"Please provide manadatory details!!"})
    }
    try{
    const response = await axios.get(logoLink);
    if (response.status < 200 && response.status > 299 ) {
        return res.status(400).send({ status: false, message: "LogoLink is not active" });
    }   
    } catch(err) { return res.status(500).send({status : false, message : err.message}) }

    const isName = await collegeModel.findOne({ name: name });
    if (isName) {
      return res.status(400).send({ status: false, message: "College already registered" });
    }

    let collegeCreated = await collegeModel.create(input)
    return res.status(201).send({ status: true, data: collegeCreated })
    }
    catch(err){ return res.status(500).send({status : false, message : err.message});}
}
//=========================== GET API ============================================
const collegeDetails = async function (req, res) {
    try {
        const collegeName = req.query.collegeName
        const college = await collegeModel.findOne({ name: collegeName }).select({ _id: 0, name: 1, fullName: 1, logoLink: 1 })
        const collegeId = await collegeModel.findOne({ name: collegeName }).select({_id:1})

        if(!collegeId) return res.status(404).send({status : true, message : "College not found"})

        const intern= await internModel.find({collegeId:collegeId}).select({_id:1,name:1,email:1,mobile:1})
        const collegeObject = college.toObject();
        if(intern.length==0){
            // console.log(typeof college)
            collegeObject.interns= "interns are not available"
        }else{
            // console.log(typeof college)
        collegeObject.interns= intern
        }
        if(!college){
            res.status(404).send({status:false, message: "College not available!"})
        }
        res.status(200).send({ status: true, data:collegeObject })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.createCollege=createCollege;
module.exports.collegeDetails=collegeDetails;