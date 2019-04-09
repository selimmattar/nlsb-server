const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Grade = db.Grade;

module.exports = {
    add,
    getAll,
    getById,
    _delete
};

async function add(G) {
    const grade = new Grade();
    grade.userId = G.userId;
    grade.questionId = G.questionId;
    grade.grade = G.grade;
    grade.lesson = G.lesson;
    await grade.save();
}

async function getAll() {
    return await Grade.find();
}

async function getById(id) {
    return await Grade.findById(id.id);
}

async function _delete(id) {
    await Grade.findByIdAndRemove(id);
}
