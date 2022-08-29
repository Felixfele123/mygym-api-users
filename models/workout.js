const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: String,
    excirceses: Array
})
const Workout = mongoose.model('Workout', workoutSchema);


exports.Workout = Workout