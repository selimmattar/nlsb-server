﻿const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.post('/updateLesson', updateLesson);
router.post('/updateUser', updateUser);
router.delete('/:id', _delete);
router.post('/getByIds', getByIds);
router.post('/getByEmail', getByEmail);

module.exports = router;

function authenticate(req, res, next) {
    console.log('Authenticating...');
    userService
        .authenticate(req.body)
        .then(user => user
            ? res.json(user)
            : res
                .status(400)
                .json({ message: 'Username or password is incorrect' }),)
        .catch(err => {
            console.log(err);
            next(err);
        });
}

function getByIds(req, res, next) {
    userService
        .getByIds(req.body)
        .then(user => (user ? res.json(user) : res.sendStatus(404)))
        .catch(err => next(err));
}

function getByEmail(req, res, next) {
    userService
        .getByEmail(req.body)
        .then(user => (user ? res.json(user) : res.sendStatus(404)))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService
        .create(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

function getAll(req, res, next) {
    console.log('gathering data...');
    userService
        .getAll()
        .then(users => {
            console.log(users);
            res.json(users);
        })
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService
        .getById(req.user.sub)
        .then(user => (user ? res.json(user) : res.sendStatus(404)))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService
        .getById(req.params.id)
        .then(user => (user ? res.json(user) : res.sendStatus(404)))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService
        .update(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function updateLesson(req, res, next) {
    userService
        .updateLesson(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateUser(req, res, next) {
  userService
      .updateUser(req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
}

function _delete(req, res, next) {
    userService
        .delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
