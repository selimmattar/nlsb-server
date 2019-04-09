const config = require('config.json');
const mongoose = require('mongoose');
// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URI || config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Level: require('../levels/level.model'),
    ExerciseF: require('../exerciseF/exerciseF.model'),
    ExerciseQ: require('../exerciseQ/exerciseQ.model'),
    Grade: require('../grades/grade.model')
};
