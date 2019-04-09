const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const ExerciseQ = db.ExerciseQ;

module.exports = {
    add,
    getAll,
    getById
};

async function add(EQ) {
    const exerciseQ = new ExerciseQ();
    exerciseQ.question = EQ.question;
    exerciseQ.firstSugg = EQ.firstSugg;
    exerciseQ.secondSugg = EQ.secondSugg;
    exerciseQ.thirdSugg = EQ.thirdSugg;
    exerciseQ.correctAns = EQ.correctAns;
    await exerciseQ.save();
}

async function getAll() {
    return await exerciseQ.find();
}

async function getById(id) {
    return await exerciseQ.findById(id.id);
}
