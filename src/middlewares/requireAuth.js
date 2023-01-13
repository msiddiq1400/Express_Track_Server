const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization) {
        res.status(401).send({error: 'User not logged in'})
    }
    const token = authorization.replace('Bearer ','');
    jwt.verify(token, 'JWT_SECRET', async (error, payload) => {
        if(error) {
            return res.status(401).send({error: 'User not logged in'});
        }
        const {userId} = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    })
}