
exports.up = function(knex) {
    return knex.schema.createTable('entries_and_exits', table => {
        table.increments();
        
        table.string('date').notNullable();
        table.string('time').notNullable();
        table.string('type').notNullable();
        table.string('changes').notNullable();
        table.string('itemThatChange').notNullable();
        table.string('alterator').notNullable();
        table.string('state').notNullable();


    })

};

exports.down = function(knex) {
    return knex.schema.dropTable('entries_and_exits');
};
