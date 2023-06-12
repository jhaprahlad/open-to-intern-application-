const mongoose= require('mongoose');
const validator = require('validator')
// const PhoneNumber  = require('libphonenumber-js');
const ObjectId = mongoose.Types.ObjectId;
const internSchema = new mongoose.Schema({
    name: {
        type : String,
        require : true
    }, 
    email : {
        type : String,
        require : true,
        unique : true,
        validate: [{ validator: validator.isEmail, message: 'Please enter email in correct format' }]
    },
    mobile : {
        type : String,
        reuqire : true,
        unique : true,
        minlength : 10,
        maxength : 10
    },
    collegeId: {
        type : ObjectId, 
        ref : 'College',
        require : true
    },
    isDeleted: {
        type : Boolean, 
        default: false
}},{timestamps:true
})

module.exports = mongoose.model('InternShip' , internSchema);
