const express = require("express");
const User = require('../models/users.model')
const router  = express.Router();

router.get("/", async function(req, res){
    const userFound = await User.findById(req.user.id);

    if(!userFound) return res.status(400).json({ message: "🔎 User not found"})
    
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
});

module.exports = router;