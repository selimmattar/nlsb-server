const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: { type: String, unique: true, required: true },
    questionId: { type: String, required: true },
    grade: { type: Number, required: true },
    lesson: { type: Number, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('grade', schema);
