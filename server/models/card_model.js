const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: String, unique: true, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
});

module.exports = mongoose.model('Card', userSchema);