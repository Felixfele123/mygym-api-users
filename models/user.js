const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
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
        maxlength: 20
      }, 
    types: {
        type: [String],
        required: true,
    },
})
const User = mongoose.model('User', userSchema);


exports.User = User