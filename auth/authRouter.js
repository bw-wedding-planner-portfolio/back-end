const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../planners/planners-model')
const secrets = require('../config/secrets');
const router = require('express').Router();

function getToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    };
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: '1d'
    };
    return jwt.sign(payload, secret, options);
};

//POST /auth/register
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    db.add(user)
    .then(added => {
        res.status(201).json({created_user: added});
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

//POST /auth/login
router.post('/login', (req, res) => {
    let {username, password} = req.body;
    db.findBy({username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = getToken(user)
            res.status(200).json({token: token})
        } else {
            res.status(401).json({message: 'Unauthorized'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router;