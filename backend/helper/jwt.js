const jwt = require('jsonwebtoken');
const CONFIG  = require('../config')

function createToken (data){
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + CONFIG.JWT.exp_time,
        data: data
    }, CONFIG.JWT.secret);
}

function verifyToken(req,res,next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const JWT_token = bearer[1];
            
        jwt.verify(JWT_token, CONFIG.JWT.secret, function(err, decoded) {
            if (err){
                // console.log(err)
                res.status(403).send({"success" : 0,"error" : "Unauthorized"}); 
            }
            else{
                res.locals.user =decoded.data
                next()
            }
        });
    }
    else{
        res.status(403).send({"success" : 0,"error" : "Unauthorized : token missing"}); 
    }
    
}

module.exports ={
    createToken,
    verifyToken
}