const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 20
      },
    schemaId: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 40  
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1000
      }, 
    types: {
        type: [String],
        required: true,
    },
})
const User = mongoose.model('User', userSchema);


exports.User = User