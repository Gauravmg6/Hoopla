const { Schema } = require('mongoose');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = "mongodb+srv://GauravMG:pXV6QK4lCuqnpM88@hw5.eoz2llk.mongodb.net/?retryWrites=true&w=majority"

const usersSchema = Schema({
    userId : {type : String, required : [true, 'userId is required']},
    uCredentials : {
        uEmail : {type : String, required : [true, 'uMail is required']},
        uPass  : {type : String, required : [true, 'uPass is required']}
    },
    uProfile : {
        uName : {type : String, required : [true, 'uName is required']},
        uDOB : {type : Date, required : [true, 'uDOB is required']},
        uPhone : {type : Number, required : [true, 'uPhone is required']},
        uDateJoined : {type : Date, default : new Date().toISOString()},
        uLastLogin : {type : Date, default : new Date().toISOString()}
    }
}, {collection : "Users", timestamps: true });

const addData = Schema( {
    
    _id: { type: String},
    pName: {type: String},
    pDescription: {type: String},
    pRating: {type: Number},
    pCategory: {type: String},
    price: {type: Number},
    color: {type: String},
    image: {type: String},
    specification:String,
    dateFirstAvailable: {
        date: {type : Date, default : new Date().toISOString()}
      },
    dateLastAvailable: {
        date: {type : Date, default : new Date().toISOString()}
      },
    pSeller:{
        s_Id: {type: String},
        pDiscount: {type: Number, default: 0},
        pQuantity: {type: Number},
        pShippingCharges: {type: Number}
    },
}, {collection: "addData"} )
let connection = {}

//Returns model object of "Users" collection
connection.getCollection = () => {
    //establish connection and return model as promise
    return mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true}).then( database => {
        return database.model('Users', usersSchema)
    }).catch( error => {
        let err = new Error("Could not connect to the database");
        err.status = 500;
        throw err;
    });
}

connection.getProductCollection = () => {
    //establish connection and return model as promise
    return mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true}).then( database => {
        return database.model('addData',addData)
    }).catch( error => {
        let err = new Error("Could not connect to the database");
        err.status = 500;
        throw err;
    });
}

module.exports = connection;