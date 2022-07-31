const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({

     //* user stuff *//
     name: {
      type: String,
      required: true
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

    //*account stuff *//

     accounts: [
       {
          id: {
            type: Number,
            required: [false, "The todo text field is required"]
          },

          date: {
            type: Date,
            required: [false, "The todo text field is required"]
           },

           type: {
            type: String,
            required: [false, "The todo text field is required"]
           },
      
           status: {
            type: String,
            required: [false, "The todo text field is required"]
           }
       }
     ]

 
})

// Create model for todo
const Admin = mongoose.model('admin', AdminSchema);

module.exports = Admin;


