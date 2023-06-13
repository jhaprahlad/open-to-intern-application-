const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel')

const axios = require('axios');

const createCollege = async function (req, res) {
    try {
        let input = req.body;
        const { name, fullName, logoLink } = input;
        if (!name || !fullName || !logoLink) {
            return res.status(400).send({ status: false, message: "Please provide manadatory details!!" })
        }

        await axios.get(logoLink)
            .then(async () => {
                const isName = await collegeModel.findOne({ name: name });
                if (isName) {
                    return res.status(400).send({ status: false, message: "College already registered" });
                }

                let collegeCreated = await collegeModel.create(input)
                let collegeCreateDetails = {
                    "name": collegeCreated.name,
                    "fullName": collegeCreated.fullName,
                    "logoLink": collegeCreated.logoLink,
                    "isDeleted": collegeCreated.isDeleted
                }
                return res.status(201).send({ status: true, data: collegeCreateDetails})
            })
            .catch(err => res.status(400).send({ status: false, message: "please enter valid logoLink" }))
    }
    catch (err) { return res.status(500).send({ status: false, message: err.message }); }
}
//=========================== GET API ============================================
const collegeDetails = async function (req, res) {
    try {
        const collegeName = req.query.collegeName
        if(! collegeName || collegeName.trim() == '') return res.status(404).json({ status: false, message: 'College Name is required' });
        else{
            const college = await collegeModel.findOne({ name: collegeName });
            if(!college) return res.status(404).json({ status: false, message: 'College not found' });
            else{
                const intern = await internModel.find({ collegeId: college._id }).select({ name: 1, email: 1, mobile: 1 });
                const details = {
                    name : college.name,
                    fullName : college.fullName,
                    logoLink : college.logoLink,
                    interns : intern
                }
                res.status(200).json({ status: true, data: details });
            }
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
   
}

module.exports.createCollege = createCollege;
module.exports.collegeDetails = collegeDetails;