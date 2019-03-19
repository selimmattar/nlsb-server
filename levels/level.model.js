const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    levelName: { type: String, unique: true, required: true },
    score: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('myLevel', schema);
