const mongose = require('mongoose');

const TodoSchema = new mongose.Schema({
    text: String,
    completed: Boolean,
});

module.exports = TodoItem = mongose.model("TodoItem", TodoSchema);