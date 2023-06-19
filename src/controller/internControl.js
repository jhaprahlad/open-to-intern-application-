const mongoose = require('mongoose');
const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
const validator = require("validator")
const createIntern = async function (req, res) {
    try {
        const { name, email, mobile, collegeName } = req.body;
        if (!name) res.status(400).json({ status: false, message: 'Name is required' });
        if (!email) res.status(400).json({ status: false, message: 'Email is required' });
        if (!mobile) res.status(400).json({ status: false, message: 'Mobile is required' });
        if (!collegeName) res.status(400).json({ status: false, message: 'College is required' });
        if (!validator.isEmail(email)) res.status(400).json({ status: false, message: 'Email is invalid' });
        if (!validator.isMobilePhone(mobile)) res.status(400).json({ status: false, message: 'Mobile is invalid' });
        else {
            const findCollege = await collegeModel.findOne({ name: collegeName });
            if (!findCollege) res.status(404).json({ status: false, message: 'College not found' });
            else {
                const findIntern = await internModel.findOne({ email: email });
                if (findIntern) {
                    return res.status(400).json({ status: false, message: 'Intern already exists' });
                }
                else {
                    const findInternMobile = await internModel.findOne({ mobile: mobile });
                    if (findInternMobile) return res.status(400).json({ status: false, message: 'Intern already exists' });
                    else {
                        const internData = {
                            name: name,
                            email: email,
                            mobile: mobile,
                            collegeId: findCollege._id
                        }
                        const intern = await internModel.create(internData)
                        const selectedData = { name: intern.name, email: intern.email, mobile: intern.mobile, collegeId: intern.collegeId, isDeleted: intern.isDeleted };
                        res.status(201).json({ status: true, data: selectedData });
                    }
                }
            }
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}




module.exports.createIntern = createIntern;






// const createInterns = async (req, res){
//     try {
//         let data = req.body
//         let { name, email, mobile, collegeId } = data
//         const collegeDetails = await collegeModel.findOne({ collegeId: collegeId })
//         if (collegeDetails) {
//             let intern = await internModel.create({
//                 name,
//                 email,
//                 mobile,
//                 collegeId
//             })

//             return res.status(400).send({ status: true, data: intern })
//         } }
// catch (error) {
//             return res.status(500).send({ status: false, message: error.message })

//         }
//     }

