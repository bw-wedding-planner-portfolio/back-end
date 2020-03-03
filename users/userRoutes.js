const router = require('express').Router();
const db = require('./user-model');

//GET /weddingposts
router.get('/weddingposts', (req,res) => {
    db.getPosts()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

//GET /weddingposts/:id get post by id
router.get('/weddingposts/:id', (req, res) => {
    const {id} = req.params;
    db.getById(id)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})
module.exports = router;