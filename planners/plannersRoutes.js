const router = require('express').Router();
const db = require('./planners-model');

//GET /auth/user
router.get('/', (req, res) => {
    db.find()
    .then(user => {
        res.status(200).json({user})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// GET /auth/user/:id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

//PUT /auth/user/:id

// GET users post /auth/user/:id/posts
router.get('/:id/posts', (req,res) => {
    const id = req.params.id;
    db.getPost(id)
    .then(posts => {
        res.status(200).json({posts})
    })
    .catch( err => {
        console.log(err)
        res.status(200).json(err)
    })
})

//POST /auth/user/:id/posts
router.post('/:id/posts', (req, res) => {
    const {id} = req.params;
    let post = req.body;
    planner_id = id;
    post.planner_id = planner_id;

        db.addPost(post)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    
})

//PUT /auth/user/:id/post/:pid
router.put('/:id/post/:pid', (req,res) => {
    const {id} = req.params;
    let post = req.body;
    planner_id = id;
    post.planner_id = planner_id;
    const {pid} = req.params;

    db.getEvent(pid)
    .then(posts => {
        if(posts) {
            db.updatePost(post, pid)
            .then(update => {
                res.status(200).json(update);
            });
        } else {
            res.status(400).json({error: "Could not find event with given id"})
        }
    })
    .catch(err => {
        res.status(500).json({message: "Failed to update event"})
    });
});

//DELETE /auth/user/:id/posts/:pid
router.delete('/:id/posts/:pid', (req, res) => {
    const {id} = req.params;
    const {pid} = req.params;

    let deleted = req.body;
    planner_id = id;
    deleted.planner_id = planner_id;

    db.removePost(pid)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({removed: deleted});
        } else {
            res.status(404).json({error: "Could not find post with that id."})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
module.exports = router;