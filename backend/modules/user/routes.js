const router = require('express').Router();
const {validateUser , validateLogin , validateVerificationCode} = require('./validation');
const {User, create_user , check_user_email_password , user_verification_status} = require('./model')
const {createToken} = require('../../helper/jwt')


router.get('/', (req,res) =>{
    res.status(401).send({"success" : 0,"error" : "Unauthorized"}); 
})

router.post('/create', async(req,res) => {
    try{
        validationResult = validateUser(req.body)        
        if (validationResult.error ){
            res.status(400).send({"success" : 0,"error" : "validation error" ,"data" : req.body}); 
        }
        else{
            const newUserDetails = new User (validationResult.value);
            let result = await create_user(newUserDetails);
            result= JSON.parse(JSON.stringify(result));
            delete result.__v
            delete result.password
            delete result.verifyCode
            res.status(200).send({"success" : 1,"user" : result}); 
        }
    }
    catch(err){
        res.status(400).send({"success" : 0,"error" : err.message });  
    }   
    

});

router.post('/login', async(req,res) => {
    try{
        validationResult = validateLogin(req.body)        
        if (validationResult.error ){
            // console.log(validationResult.error)
            res.status(400).send({"success" : 0,"error" : "validation error" ,"data" : req.body }); 
        }
        else{
            let userData= await check_user_email_password(validationResult.value);
            if (userData) {  
                
                const user_sanitized_data = {
                    userId : userData._id ,
                    name: userData.name ,
                    email: userData.email ,
                    isVerified:userData.is_verified
                }              
                if (userData.is_verified){
                    const jwt_token = createToken(user_sanitized_data)
                    res.status(200).send({"success" : 1,"message" : 'login successful' , "user":user_sanitized_data,  "token" : jwt_token }); 
                }
                else{
                    res.status(200).send({"success" : 1,"message" : 'please verify account', "user":user_sanitized_data });
                }
            }
            else{
                res.status(401).send({"success" : 0 , "error" : 'email or password wrong'});  
            }             
        }
    }
    catch(err){
        res.status(400).send({"success" : 0,"error" : err.message });  
    }   
})

router.post('/verify-account', async(req,res) => {
    try{
        validationResult = validateVerificationCode(req.body)  
             
        if (validationResult.error ){
            res.status(400).send({"success" : 0,"error" : "validation error" ,"data" : req.body }); 
        }
        else{
            let result = await user_verification_status(validationResult.value);
            if (result){
                res.status(200).send({"success" : 1, "status" : 'verified' }); 
            }
            else{
                res.status(401).send({"success" : 0, "status" : 'not verified' });
            }
            
        }
    }
    catch(err){
        res.status(400).send({"success" : 0,"error" : err.message });  
    }   
    

});

module.exports = router;