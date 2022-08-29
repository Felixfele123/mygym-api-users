const {Workout} = require('../models/workout'); 
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const schema = await Workout.find();
        res.send(schema);
    } catch (error) {

        res.send(error);
    }
});
router.put('/:id', async (req, res) => {
    const schema = await Workout.findByIdAndUpdate(req.params.id,   
        req.body.workout,
        { new: true, useFindAndModify: false });
    
      if (!schema) return res.status(404).send('The customer with the given ID was not found.');
      console.log(req.body.workout)
      res.send(schema);
});
router.post('/', async (req, res) => {
    try {
        const schema = new Schema({});
        const result = await schema.save()
        res.send(result)
    } catch (error) {
        return res.status(400).send({
            message: error.message
        });
    }
});


module.exports = router; 