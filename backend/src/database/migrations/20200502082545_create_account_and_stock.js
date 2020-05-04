
exports.up = function(knex) {
    return knex.schema.createTable('accounts', table => {

        table.integer('id').primary();
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.string('type').notNullable();

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
