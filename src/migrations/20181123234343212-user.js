exports.up = knex =>
  knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('firstName')
    table.string('lastName')
    table.string('email').unique()
    table.string('password')
    table.string('username').unique()
    table.timestamps(true, true)
  })

exports.down = knex => knex.schema.dropTable('users')