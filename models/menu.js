const mongoose = require('mongoose');




const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },
    ingredients: {
        type: [String],
        required: true,
      }, 
    type: {
        type: String,
        required: true,
      }, 
    price: {
        type: String,
        required: true,
      },
    description: {
        type: String,
        maxlength: 100
    },
    status:{
        type: String,
        required: true,
        default: 'updated'
    },
    lastUpdated: { 
        type: Number, default: Date.now
    },
    userID: {
        type: String,
        required: true,
    }
})
const Menu = mongoose.model('Menu', menuSchema);


exports.Menu = Menu