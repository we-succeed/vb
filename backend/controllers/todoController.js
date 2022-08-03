const Todo = require('../models/todo');

//Define business logic for routes
const findAll = (req, res, next) => {
    Todo.find({}, 'action')
    .then((data) => res.json(data))
    .catch((err) => console.log(err));  
}
const create = (req, res, next) => {
    Todo.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
}
const deleteById = (req, res, next) => {
    Todo.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
}

module.exports = {
    findAll,
    create,
    deleteById
}