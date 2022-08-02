const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {UserSchema} = require("./user")

const TodoSchema = new Schema({
    action: {
        type: String,
        required: [true, "The todo text field is required"]
    },
    User: UserSchema
})

// Create model for todo
const Todo = mongoose.model('todo', TodoSchema);
module.exports = Todo;


