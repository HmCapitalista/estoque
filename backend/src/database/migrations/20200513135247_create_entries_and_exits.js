
exports.up = function(knex) {
    return knex.schema.createTable();

};

exports.down = function(knex) {
    return knex.schema.dropTable('');
};
