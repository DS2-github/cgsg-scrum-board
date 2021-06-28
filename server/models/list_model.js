const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    id: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    taskIds: { type: [String], required: true }, //cards id
    status: { type: String, default: '' },
});

module.exports = mongoose.model('List', listSchema);