const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().alphanum().min(5).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(5).max(12).required(),
})
function validateUser(user) {
    return userSchema.validate(user);
}



const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(5).max(12).required(),
})
function validateLogin(data) {
    return loginSchema.validate(data);
}



const verificationCodeSchema = Joi.object({
    id : Joi.string().alphanum().length(24).required(),
    code: Joi.string().alphanum().length(8).required()
})

function validateVerificationCode(data) {
    return verificationCodeSchema.validate(data);
}

module.exports={validateUser , validateLogin , validateVerificationCode} 