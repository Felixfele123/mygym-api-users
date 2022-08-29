const mongoose = require('mongoose');

const schemaSchema = new mongoose.Schema({
    workouts: {
        _id: Number,
        name: String,
        newWeek: Boolean,
        expanded: Boolean,
        inProgress: Boolean,
        excirceses: [
            {
                excirceseID: Number,
                name: String,
                type: String,
                sets:[
                    {
                        setID: Number,
                        reps: Number,
                        weight: Number    
                    }
                ]
            }
        ]
    }
})
const Schema = mongoose.model('Schema', schemaSchema);


exports.Schema = Schema