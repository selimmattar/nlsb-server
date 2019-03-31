const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    question: { type: String, unique: true, required: true },
    content: { type: String, required: true },
    correctAns: { type: String, required: true },
    userAns: { type: String, required: false }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ExerciseF', schema);
