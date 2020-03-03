
exports.up = function(knex) {
  return knex.schema
  .createTable('planner', users => {
      users.increments();
      users.string('firstName', 255)
      .notNullable();
      users.string('lastName',255)
      .notNullable();
      users.string('username', 255)
      .notNullable()
      .unique();
      users.string('password', 255)
      .notNullable();
      users.string('city', 255)
      .notNullable();
      users.string('state', 255)
      .notNullable();
      users.string('phoneNumber', 126)
      users.string('email', 255)
      .notNullable()
      .unique();
      users.string('pricing', 255);
  })
  .createTable('weddingPost', posts => {
      posts.increments();
      posts.string('theme', 255)
      .notNullable();
      posts.string('location', 255)
      .notNullable();
      posts.string('description', 255)
      .notNullable();
      posts.string('image', 255)
      .notNullable();
      posts.string('vendors', 255)
      .notNullable();
      posts.integer('planner_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('planner')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('weddingPost')
    .dropTableIfExists('planner');
};
