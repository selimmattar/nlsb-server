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
    console.log(G);
    let grade = new Grade();
    if (
        await Grade.findOne({
            userId: G.userId,
            questionId: G.questionId
        })
    ) grade = await Grade.findOne({
        userId: G.userId,
        questionId: G.questionId
    });

    Object.assign(grade, G);
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
