const mongoose= require('mongoose');
const validator = require('validator')
// const PhoneNumber  = require('libphonenumber-js');
const ObjectId = mongoose.Types.ObjectId;
const internSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true

        
    }, 
    email : {
        type : String,
        required: true,
        unique : true,
        validate: [{ validator: validator.isEmail, message: 'Please enter email in correct format' }]
    },
    mobile : {
        type : String,
        required: true,
        unique : true,
        minlength : 10,
        maxength : 10
    },
    collegeId: {
        type : ObjectId, 
        ref : 'College',
        required: true
    },
    isDeleted: {
        type : Boolean, 
        default: false
}},{timestamps:true
})

module.exports = mongoose.model('InternShip' , internSchema);
