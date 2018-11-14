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
//    tasks: {
//         type: [Task.schema]
//     },
    active: {
        type: Boolean
    }
});

UserSchema.methods.validPassword = function(password) {
    return this.password == password;
};



// generating a hash
// UserSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// UserSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };

const User = mongoose.model('User', UserSchema);

module.exports = User;