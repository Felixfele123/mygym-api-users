const {Menu} = require('../models/menu'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");


router.get('/', async (req, res) => {
    const token = req.cookies.token;
    // om det finns en cookie med namnet token
    if(token)
    {
        try {
            const verified = jwt.verify(token,process.env.FIRSTSECRET);
            req.token = verified;
            const menu = await Menu.find({ userID: verified.uid });
            res.send(menu);
        } catch (error) {
            console.log(error)
            res.send({message:"authentication required"});
        }
    }
    else{
        res.send("/login?mes=No_Token_Provided");
    }
});

/*router.post('/', async (req, res) => {
    const token = req.cookies.token;
    if(token){
        const verified = jwt.verify(token,process.env.FIRSTSECRET);
        req.token = verified;

        try {
            const course = new Menu({
                name: req.body.name,
                ingredients: req.body.ingredients, 
                type: req.body.type,
                price: req.body.price,
                description: req.body.description,
                userID: verified.uid
            });
            const result = await course.save()
            res.send(result)
            console.log(result)
        } catch (error) {
            return res.status(400).send({
                message: error.message
            });
        }
    }else{
        res.send("/login?mes=No_Token_Provided");
    }
});*/

router.post('/', async (req, res) => {
    const token = req.cookies.token;
    if(token){
        const verified = jwt.verify(token,process.env.FIRSTSECRET);
        req.token = verified;
        try {
            const course = new Menu({
                name: req.body.name,
                ingredients: req.body.ingredients, 
                type: req.body.type,
                price: req.body.price,
                description: req.body.description,
                userID: verified.uid
            });
            const result = await course.save()
            res.send(result)
            console.log(result)
        } catch (error) {
            return res.status(400).send({
                message: error.message
            });
        }
    }else{
        res.send("/login?mes=No_Token_Provided");
    }
});

router.delete('/:id', async (req, res) => {
    const dish = await Menu.findByIdAndDelete(req.params.id);

    if (!dish) return res.status(404).send('The dish with the given ID was not found.');
    res.send(dish);
});

router.put('/:id', async (req, res) => {
    const menu = await Menu.findByIdAndUpdate(req.params.id,
        { 
          name: req.body.name,
          ingredients: req.body.ingredients, 
          type: req.body.type,
          price: req.body.price,
          userID: req.body.userID,
          lastUpdated: Date.now()
        }, { new: true });
    
      if (!menu) return res.status(404).send('The customer with the given ID was not found.');
      
      res.send(menu);
});

module.exports = router; 