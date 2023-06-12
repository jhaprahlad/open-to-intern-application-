const mongoose = require('mongoose');
const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
const { validateEmail, isValidNumber, isValid } = require('../utils/util.js')

const createIntern = async function (req, res) {
    {
        try {
            let input = req.body;
            let { name, email, mobile, collegeId, isDeleted } = input;

            if (!name || !email || !mobile || !collegeId) {
                return res.status(400).send({ status: false, message: "Please provide manadatory details!" })
            }

            if (!isValid(email)) { return res.status(400).send({ status: false, message: " Invalid email" }) }

            if (!validateEmail(email)) { return res.status(400).send({ status: false, message: "Enter the valid email" }) }

            if (!isValidNumber) return res.status(400).send({ status: false, message: "Please provide correct Mobile number!" })

            const emailUsed = await internModel.findOne({ email: email });
            if (emailUsed) {
                return res.status(400).send({ status: false, message: "Email is already registered" });
            }

            const isMobile = await internModel.findOne({ mobile: mobile });
            if (isMobile) {
                return res.status(400).send({ status: false, message: "Mobile number already registered" });
            }
            collegeId = await collegeModel.findOne({ collegeId: collegeId });
            if (!collegeId) return res.status(400).send({ status: false, message: "Student is not registered!" })

            let createData = await internModel.create(input);
            return res.status(201).send({ status: true, data: createData });
        }
        catch (error) { return res.status(500).send({ status: false, message: error.message }) }

    }
}

module.exports.createIntern = createIntern;