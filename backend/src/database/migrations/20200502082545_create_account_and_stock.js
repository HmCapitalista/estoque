
exports.up = function(knex) {
    return knex.schema.createTable('accounts', table => {

        table.string('name').notNullable().primary();
        table.string('password').notNullable();
        table.string('type').notNullable();
        table.integer('id').notNullable();

    })
    .createTable('stock', table => {
        table.increments();

        table.string('itemName').notNullable();
        table.string('itemQuant').notNullable();
        table.integer('itemId').notNullable();

    })

};

exports.down = function(knex) {
    return knex.schema.dropTable('users').dropTable('stock');

};
