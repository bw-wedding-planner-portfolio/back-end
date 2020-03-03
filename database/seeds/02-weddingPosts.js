
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('weddingPost').del()
    .then(function () {
      // Inserts seed entries
      return knex('weddingPost').insert([
        {id: 1, theme: 'Classic', location: 'Baltimore, Maryland', description: 'Hassen and Alexis\'s Wedding', image: 'https://cdn0.weddingwire.com/real-weddings/photos/6/4/3/tpor_12716787.jpg', vendors:'Stephanie Axtell Photography & Videography', planner_id: 1}
        // {id: 2, theme: 'Romantic', location: 'Atlanta, Georgia', description: 'Alex and Jessica\'s Wedding', image: 'https://image.cnbcfm.com/api/v1/image/105562387-1546624827001preview1.png?v=1546624853&w=678&h=381', vendors:'David Wright Cakes & Catoring', planner_id: 2}

        // {id: 2, theme: '', location: '', description: '', image: '', vendors:'', planner_id: }
      ]);
    });
};