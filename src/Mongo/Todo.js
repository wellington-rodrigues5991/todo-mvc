const mongose = require('mongoose');

const TodoSchema = new mongose.Schema({
    text: String,
    completed: Boolean,
});

module.exports = mongose.model("TodoItem", TodoSchema);