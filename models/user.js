const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    firstname:{
        type: String,
        required: true
      
    },
    surname: {
        type: String
    
    },
    username: {
        type: String
    
    },
    email: {
        type: String
    
    },
    password: {
        type: String
        
    },
//    tasks: {
//         type: [Task.schema]
//     },
    active: {
        type: Boolean
    }
});

const User = mongoose.model('User', UserSchema);


// Create static method here called validPassword to validate the password, look at bcrypt for hashing the passwords

module.exports = User;