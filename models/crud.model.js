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
            name: Joi.string().min(1).required(),
            email: Joi.string().email().max(100).required(),
            password: Joi.string().min(8).required()
        })
    }
}

module.exports = Userdata;