const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const UserSchema = mongoose.Schema({
    firstname:{
        type: String

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

    active: {
        type: Boolean
    }
});

UserSchema.methods.validPassword = function(password) {
    return this.password == password;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;