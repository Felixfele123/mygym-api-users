const {User} = require('../models/user'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", async (req,res) => {
    res.send("pres")
})

router.post("/", async (req,res) => {
    console.log(req.body)
    let user = await User.find( { username: req.body.username } )
    if(user.length === 1)
    {
        try {
            const pwCheck = await bcrypt.compare(req.body.password,user[0].password);
            console.log(pwCheck)
            if(pwCheck){
                let userObject = {
                    uid:user[0]._id,
                    admin:false,
                    username:user[0].username,
                    types: user[0].types,
                    schemId: user[0].shemaId
                }

                const token = jwt.sign(userObject, process.env.FIRSTSECRET, {expiresIn:120000});
                console.log(token)
                let result = res.cookie('token',token,{httpOnly:true,sameSite:'none'});
                res.send(token);
            }
            else{
                res.redirect("/login?mes=loginError");
            }
        } catch (error) {
            res.send(error.message);
        }
    }
    else{
        res.send("user not found")
    }
});



module.exports = router; 
