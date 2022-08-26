const bcrypt = require("bcryptjs");

bcrypt.hash("lösenord",12,(err,hash)=>{

    console.log(hash);

});