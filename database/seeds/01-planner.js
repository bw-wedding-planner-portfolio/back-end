
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('planner').del()
    .then(function () {
      // Inserts seed entries
      return knex('planner').insert([
        {id: 1, firstName: 'Sarah', lastName: 'Morgan', username: 'SarahMorgan', password: 'password', city: 'Atlanta', state: 'Georgia', email: 'sarahmorgan@gmail.com', phoneNumber: '561-294-9556', pricing: '$$ - Affordable'}
      ]);
    });
};
