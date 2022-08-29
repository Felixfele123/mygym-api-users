const {Schema} = require('../models/schema'); 
//const {Workout} = require('../models/workout'); 
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get('/', async (req, res) => {
    console.log("body1: " + req.body)
    try {
        const schema = await Schema.find();
        //const workout = await Workout.find({ schemaID: ObjectId(schema._id)});
        res.send(schema);
    } catch (error) {
        console.log(error)
        res.send(error);
    }
});
router.put('/:id', async (req, res) => {
    const schema = await Schema.findByIdAndUpdate(req.params.id,
        {   
          workouts: req.body.workouts,
        }, { new: true, useFindAndModify: false });
    
      if (!schema) return res.status(404).send('The customer with the given ID was not found.');
      console.log("schema: " + schema)
      res.send(schema);
});


router.post('/', async (req, res) => {
    console.log("mounte")
    try {
        const schema = new Schema(   {
            workouts:[
                {
                    _id: 1,
                    name: "Upper body",
                    newWeek: true,
                    expanded: false,
                    inProgress: false,
                    excirceses: [
                    { 
                        excerciseID: 1,
                        name: "Rodd",
                        type: "Stamina",
                        sets: [
                        {setID: 10, duration: "20 Minutes", resistence: "6 Växel", status:"open"}
                        ],
                        resistence: "",
                        time: null
                    },
                    {
                        excerciseID: 2,
                        name: "Benchpress",
                        type: "Srenght",
                        sets: [
                        {setID: 1, duration: "12 Repetitioner", resistence: "80 kg", status:"open"},
                        {setID: 2, duration: "12 Repetitioner", resistence: "80 kg", status:"open"},
                        {setID: 3, duration: "12 Repetitioner", resistence: "80 kg", status:"open"},
                        {setID: 4, duration: "12 Repetitioner", resistence: "80 kg", status:"open"},
                        {setID: 5, duration: "12 Repetitioner", resistence: "80 kg", status:"open"},
                        {setID: 6, duration: "12 Repetitioner", resistence: "80 kg", status:"open"}
                        ],
                        resistence: "75kg",
                        time: null
                    }
                    ]
                },
                {
                    _id: 2,
                    name: "Upper body",
                    newWeek: false,
                    expanded: false,
                    inProgress: false,
                    excirceses: [
                    { 
                        excerciseID: 1,
                        name: "Rodd",
                        type: "Stamina",
                        sets: [
                        {setID: 10, duration: "20 Minutes", resistence:"6 Växel", status:"open"}
                        ],
                        resistence: "",
                        time: null
                    },
                    {
                        excerciseID: 2,
                        name: "Benchpress",
                        type: "Srenght",
                        sets: [
                        {setID: 1, duration: "12 Repetitioner", resistence: "80 kg", status:"open"},
                        {setID: 2, duration: "12 Repetitioner", resistence: "80 kg", status:"open"},
                        {setID: 3, duration: "12 Repetitioner", resistence: "80 kg", status:"open"},
                        {setID: 4, duration: "12 Repetitioner", resistence: "80 kg", status:"open"},
                        {setID: 5, duration: "12 Repetitioner", resistence: "80 kg", status:"open"},
                        {setID: 6, duration: "12 Repetitioner", resistence: "80 kg", status:"open"}
                        ],
                        resistence: "75kg",
                        time: null
                    }
                    ]
                }
            ]
        });
        const result = await schema.save()
        res.send(result)
    } catch (error) {
        return res.status(400).send({
            message: error.message
        });
    }
});


module.exports = router; 