const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = mongoose.model('User');

router.post('/signup', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = new User({email, password});
        await user.save();
        const token = jwt.sign({userId: user._id}, 'JWT_SECRET')
        res.send({token, user});
    } catch(err) {
        return res.status(422).send(err.message)
    }
})

module.exports = router;