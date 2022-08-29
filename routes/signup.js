const {User} = require('../models/user'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.get("/", async (req,res) => {
    res.send("pres")
})

router.post("/", async (req,res) => {
    console.log("1")
    let user = await User.find( { username: req.body.username } )
    if(user.length !== 1)
    {
        console.log("2")
        try {
            bcrypt.hash(req.body.password,12,async(err,hash)=>{
                console.log(hash)
                const newuser = new User({
                    username: req.body.username,
                    password: hash,
                    schemaId: "123213"
                });
                const result = await newuser.save()
                console.log(result.password + "" + req.body.password)
                let user = await User.find( { username: result.username } )
                if(user.length === 1)
                {
                    console.log("4")
                    try {
                        const pwCheck = await bcrypt.compare(req.body.password,result.password);
                        console.log(result.password + " " + req.body.password)
                        if(pwCheck){
                            console.log("5")
                            let userObject = {
                                uid:user[0]._id,
                                admin:false,
                                username:user[0].username,
                                types: user[0].types,
                                schemId: user[0].shemaId
                            }
            
                            const token = jwt.sign(userObject, process.env.FIRSTSECRET, {expiresIn:120000});
                            console.log(token)
                            let result = res.cookie('token',token,{httpOnly:false,sameSite:'none', secure:true});
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
        } catch (error) {
            res.send(error.message);
        }
    }
    else{
        res.send("user not found")
    }
});



module.exports = router; 
