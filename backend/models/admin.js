const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({


     //* user stuff *//
     name: {
            type: String,
            required: true,
            minlength: [2, "Users name must be 2 or more characters!"]
     },

     email: {
      type: String,
      required: true,
      unique: true
     },

     address: {
      type: String,
      required: true
     },

     user_id: {
      type: String,
      required: true
     }

})

// Create model for todo
const Admin = mongoose.model('admin', AdminSchema);

module.exports = Admin;


