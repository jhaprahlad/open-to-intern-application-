
function isValid (data) {
    if(typeof data !== "string" || data.trim().length == "") return false
    else return true
}

function validString(input){
    return (/^[a-zA-Z]+$/.test(input))
}

const validateEmail = (email) => {
    return email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
};

const isValidNumber = (mobile) => {
    const numberRegex = /^\d{10}$/;
    return numberRegex.test(mobile);
};


module.exports.isValid = isValid;
module.exports.validString = validString;
module.exports.validateEmail = validateEmail;
module.exports.isValidNumber = isValidNumber;
