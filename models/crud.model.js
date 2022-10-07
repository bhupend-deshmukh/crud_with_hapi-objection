const Joi = require('@hapi/joi')
const { Model } = require("objection")
const db = require("../config/db.connection")
Model.knex(db)

class Userdata extends Model {
    static get tableName() {
        return "userData"
    }

    static get JoiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            Name: Joi.string().min(1).max(50).required(),
            Surname: Joi.string().min(1).max(50).required(),
            email: Joi.max(50).required(),
            password: Joi.string().min(5).required(),
            city: Joi.string().required()
        })
    }
}

module.exports = Userdata;
