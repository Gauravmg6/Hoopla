const collection = require('../utilities/connection');
const userData = require('./User.json');
const productDatabase=require('./ProductsDatabase.json');
let user = {}

//Setup the database
user.generateId=()=>{
    return collection.getCollection().then(model=>{
        return model.distinct("userId").then(ids=>{
            let nId=Math.max(...ids);
            return nId+1;
        })
    })
}

user.setupDB = () => {
    return collection.getProductCollection().then( prodColl => {
        return prodColl.deleteMany().then( () => {
            return prodColl.insertMany( productDatabase).then( (data) => {
                return collection.getCollection().then( ( userColl )=>{
                    return userColl.deleteMany().then( ()=>{
                        return userColl.insertMany( userData ).then( ( result )=>{
                         if( result && result.length > 0 ) return data
                         else return null
                        } )
                    } )
                } )
            } );
        } );
    } );
 }
//Verify the user credentials and modify the last logout
user.userLogin = (uEmail,uPass) => {
    return collection.getCollection().then( userColl => {
        return userColl.findOne({"uCredentials.uEmail" : uEmail}).then( data => {
            if(data){
                if( uPass == data['uCredentials']['uPass']){
                    return userColl.updateOne({"uCredentials.uEmail":uEmail},{$set:{"uProfile.uLastLogin":new Date().toISOString()}}).then( res => {
                        if(res.nModified === 1){
                            return data
                        }
                    })
                }else{
                    throw new Error("The password entered is incorrect!!")
                }
            }else{
                throw new Error("You are not registered.Please register to login"); 
            }
        })
    }) 
}
user.userRegister=(registerData)=>{
    return collection.getCollection().then(model=>{
        return user.generateId().then(userId=>{
            let userObj = {
                "userId": userId,
                "uCredentials": { 
                    "uEmail": registerData.uEmail,
                    "uPass": registerData.uPass
                },
                "uProfile": {
                    "uName": registerData.uName,
                    "uDOB": registerData.uDOB,
                    "uPhone": registerData.uPhone,
                }
            }
            return model.findOne({"uCredentials.uEmail" : registerData.uEmail}).then( data => {
                if(!data){
                    return model.insertMany([userObj]).then(data=>{
                        if(data.length!=0){
                            return data
                        }
                        else{
                            throw new Error("Registration failed | Try again")
                        }
                    })
                }
                else throw new Error("You are already Registered Please login"); 
            })
        })
    })
}

user.getCategory=(category)=>{
    return collection.getProductCollection().then((model)=>{
        return model.find({"pCategory":category},{_id:0}).then((data)=>{
            if(data!=0){
                 return data
            }
            else {
                return null;
            }
        })
    })
}

user.getSearch=(search)=>{
    return collection.getProductCollection().then((model)=>{
        return model.find({},{_id:0}).then((data)=>{
            const list=[];
            data.map((obj)=>{
                var name=obj.pName.split(" ");
                name.push(obj.pCategory);
                for(let i of name){
                    if(i.toLowerCase()===search.toLowerCase()){
                        list.push(obj);
                        break;
                    }
                }
            })
            if(list!=0){
                 return list
            }
            else throw new Error("Data is not Available for your search")
        })
    })
}

module.exports = user