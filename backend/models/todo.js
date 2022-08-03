const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {AccountSchema} = require('./account');


const TodoSchema = new Schema({
    action: {
        type: String,
        required: [true, "The todo text field is required"]
    },
    accounts: {
        type: [AccountSchema],
        default: []
    }
})
// Create model for todo
const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;


