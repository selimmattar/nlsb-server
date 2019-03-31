const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const ExerciseF = db.ExerciseF;
const User = db.User;
module.exports = {
    add,
    getAll,
    getById
};

async function add(EF) {
    const exerciseF = new ExerciseF();
    exerciseF.question = EF.question;
    exerciseF.content = EF.content;
    exerciseF.correctAns = EF.correctAns;
    await exerciseF.save();
}

async function getAll() {
    return await ExerciseF.find();
}

async function getById(id) {
    return await ExerciseF.findById(id.id);
}
