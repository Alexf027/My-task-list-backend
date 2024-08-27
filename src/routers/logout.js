const express = require('express');
const router = express.Router();

router.post("/", function(_req, res){
    res.cookie('token', "", { 
        expires: new Date(0),
    });
    return res.status(200).json({ message: "👋 See you later"});
});

module.exports = router;