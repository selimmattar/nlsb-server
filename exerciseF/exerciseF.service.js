const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const ExerciseF = db.ExerciseF;

module.exports = {
    add,
    getAll,
    getById,
    updateAll
};

async function add(EF) {
    const exerciseF = new ExerciseF();
    exerciseF.question = EF.question;
    exerciseF.content = EF.content;
    exerciseF.correctAns = EF.correctAns;
    exerciseF.lesson = EF.lesson;
    await exerciseF.save();
}

async function updateAll(E) {
    const ex = await ExerciseF.findById(E.id);
    // ex.content = E.content;
    ex.correctAns = E.correctAns;
    // ex.question = E.question;
    await ex.save();

    /*
     *  allEF.forEach(async element => {
     * element.content =
     * 'I (go) & to dahdah yesterday and I (eat) & icecream then I (see) & a scary clown';
     * await element.save();
     * });
     */
}

async function getAll() {
    return await ExerciseF.find();
}

async function getById(id) {
    return await ExerciseF.findById(id.id);
}
