
exports.up = function(knex) {
    return knex.schema.createTable("userData", function (table) {
        table.increments("id");
        table.string("Name").notNullable();
        table.string("Surname").notNullable();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.string("city").notNullable();
    })
};


exports.down = function(knex) {
  return knex.schema.dropTable("userData")
};