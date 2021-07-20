const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/*==================================================== 
               User Scheme               
=====================================================*/
const UserSchema = new mongoose.Schema({    
    name : { type: String  } ,
    email : { type: String , unique : true },
    password: {type: String},
    verifyCode: {type: String, default:'ABCD1234' },
    is_verified: {type: Boolean , default : false } ,
    date : { type : Date , default : Date.now},
});
const User = mongoose.model('Users',UserSchema);

/* =================================================== 
         Save User in database         
=================================================== */

function create_user(newUser){
    const salt = bcrypt.genSaltSync(saltRounds);
    newUser.password = bcrypt.hashSync(newUser.password, salt);
    // console.log(newUser)
    return newUser.save()    
}



/* ===================================================================================== 
         Get User from database by email and match password        
====================================================================================== */
async function check_user_email_password(user){
    const userData = await  User.findOne({email : user.email},'-__v',).exec()
    const status = bcrypt.compareSync(user.password, userData.password)    
    if(status) return userData
    return false
}

/* ===================================================================================== 
        update verification status        
====================================================================================== */
async function user_verification_status(user){
    const userData = await  User.findById(user.id).exec();  
    if (userData.is_verified)  {
        return true
    }  
    const matched = userData.verifyCode ==  user.code  ? true : false
    if(matched) {
        const res = await User.updateOne({ _id: user.id }, { is_verified: true });
        if (res.nModified) return true        
    }
    return false
}

module.exports={User, create_user , check_user_email_password , user_verification_status}