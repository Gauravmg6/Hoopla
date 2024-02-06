let Validator = {}

Validator.validateEmail = (email) => {
    if (!email.match(/^[A-z][A-z0-9.]+@[a-z]+\.[a-z]{2,3}$/)) {
        let err = new Error("Email id format is wrong");
        err.status = 406
        throw err
    }
}

Validator.validatePassword = (password) => {
    if (!password.match(/^(?=.*[A-Z])(?=.*[!@#$&*%&])(?=.*[0-9])(?=.*[a-z]).{7,20}$/)) {
        let err = new Error("Invalid password");
        err.status = 406
        throw err
    }
}

Validator.validateName = (name) => {
    if (!name.match(/^[a-zA-z]+([\s][a-zA-Z]+)*$/)) {
        let err = new Error("Only alphabets. Should not start and end with space")
        err.status = 406
        throw err
    }
}

Validator.validateDOB = (dob) => {
    if(!(new Date(dob)<new Date())){
        let err = new Error("Invalid Distributor Name")
        err.status = 406
        throw err
    }
}

module.exports = Validator;