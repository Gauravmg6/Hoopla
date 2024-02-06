const dbLayer = require('../model/user');
const validator = require("../utilities/validator");

user = {}

user.setupDB = () => {
   return dbLayer.setupDB().then( response => {  
    if(response){
        return response;
       }else{
           let err = new Error('Insertion Failed');
           err.status = 500;
          throw err;
       } 
   });
}
//Verfying the credentials of user
user.loginUser = (uEmail,pass) => {
    validator.validateEmail(uEmail)
    validator.validatePassword(pass)
    return dbLayer.userLogin(uEmail,pass).then( response => {
        return response
    })
}

user.RegisterUser = (registerData) => {
    // validator.validateEmail(registerData.uEmail)
    // validator.validatePassword(registeData.uPass)
    // validator.validateDOB(registerData.uDOB)
    // validator.validateName(registerData.uName)
    return dbLayer.userRegister(registerData).then( response => {
        return response
    })
}

user.getCategory = (category) => {
    return dbLayer.getCategory(category).then( response => {
        return response
    })
}
user.getSearch = (search) => {
    return dbLayer.getSearch(search).then( response => {
        return response
    })
}

module.exports = user