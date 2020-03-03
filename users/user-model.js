const db = require('../database/dbConfig');

module.exports = {
  getPosts, 
  getById
}

function getPosts() {
    return db('weddingPost')
    .join('planner', 'planner.id', 'weddingPost.planner_id')
    .select('firstName', 'lastName', 'weddingPost.*')
}

function getById(id){
  return db('weddingPost')
  .join('planner', 'planner.id', 'weddingPost.planner_id')
  .select('firstName', 'lastName', 'weddingPost.*')
  .where('weddingPost.id', id)
}