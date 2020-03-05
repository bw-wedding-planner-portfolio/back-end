const db = require('../database/dbConfig');



function add(user) {
    return db('planner')
    .insert(user)
}

function find() {
    return db('planner')
}

function findBy(filter) {
    return db('planner')
    .where(filter)
}

function findById(id){
    return db('planner')
    .where({id})
    .first();
}
function findUserId(id){
    return db('wedding')
}

function update(id, changes) {
    return db('planner')
    .where({id})
    .update(changes);
}

function getPost(id) {
    return db('weddingPost as w')
    .join('planner as p','p.id', 'w.planner_id')
    .select('w.*', 'p.firstName', 'p.lastName')
    .where({'p.id': id})
    // .select('weddingPost.*','planner.firstName', 'planner.lastName')
    // .from('weddingPost')
    // .join('planner', 'weddingPost.planner_id', '=','planner.id' )
    
    // .where('weddingPost.planner_id','=', id);
}
function getEvent(id){
    return db('weddingPost')
    .where({id})
}

function addPost(post){
  return db('weddingPost')
  .insert(post, "id")
  .then(([id]) => {
      return getPost(id)
    })
}

function updatePost(post, id){
    return db('weddingPost')
    .update(post, "id")
    .where({id})
    // .then(([id]) => {
    //     return getPost(id)
    // })
  
}

function removePost(id) {
    return db('weddingPost')
    .where({id})
    .del();
}


module.exports = {
    add,
    find,
    findBy,
    update,
    findById,
    getPost,
    getEvent,
    addPost,
    updatePost,
    removePost
}