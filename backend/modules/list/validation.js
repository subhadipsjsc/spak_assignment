const Joi = require('joi');

const listSchema = Joi.object({
    task: Joi.string().required(),
    position: Joi.number().min(0).max(5000).required(),
})
function validateList(data) {
    return listSchema.validate(data);
}

const listPositionSchema = Joi.object({
    taskId: Joi.string().required(),
    position: Joi.number().min(0).max(5000).required(),
})
const listPositionSchemas = Joi.array().items(listPositionSchema)
function validateListPosition(data) {
    return listPositionSchemas.validate(data);
}

module.exports={validateList , validateListPosition} 