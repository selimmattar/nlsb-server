﻿const config = require('config.json');
const db = require('_helpers/db');
const ExerciseQ = db.ExerciseQ;

module.exports = {
    add,
    getAll,
    getById,
    updateAll
};

async function add(EQ) {
    const exerciseQ = new ExerciseQ();
    exerciseQ.question = EQ.question;
    exerciseQ.firstSugg = EQ.firstSugg;
    exerciseQ.secondSugg = EQ.secondSugg;
    exerciseQ.thirdSugg = EQ.thirdSugg;
    exerciseQ.correctAns = EQ.correctAns;
    exerciseQ.lesson = EQ.lesson;
    await exerciseQ.save();
}
async function updateAll() {
    const allEF = await ExerciseQ.find();

    allEF.forEach(async element => {
        element.correctAns = 'A';
        await element.save();
    });
}
async function getAll() {
    return await ExerciseQ.find();
}

async function getById(id) {
    return await ExerciseQ.findById(id.id);
}
