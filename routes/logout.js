const express = require('express');
const router = express.Router();


router.get("/", (req,res) => {
    res.cookie("token",null);
    res.clearCookie('token');
    res.send({mes: "cookie cleared"});
})

module.exports = router; 
