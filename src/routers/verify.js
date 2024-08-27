const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const router = express.Router();
require('dotenv').config();

router.get("/verify", async function(req, res){
    const {token} = req.cookies

    if(!token) return res.status(401).json({ message: 'Unauthorized'});

    jwt.verify(token, process.env.SECRET_KEY, async(err, user) => {
            if(err) return res.status(401).json({ message: 'Unauthorized'});
           
    const userFound = await User.findById(user.id) 
        if(!userFound) return res.status(401).json({ message: 'Unauthorized'})

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
        
});

module.exports = router;