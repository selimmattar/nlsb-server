const express = require('express');
const router = express.Router();
const levelService = require('./level.service');

// routes
router.post('/add', add);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.get('/:levelName', getByName);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function add(req, res, next) {
    levelService
        .create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    console.log('gathering data...');
    levelService
        .getAll()
        .then(levels => res.json(levels))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    levelService
        .getById(req.level.sub)
        .then(level => (level ? res.json(level) : res.sendStatus(404)))
        .catch(err => next(err));
}

function getById(req, res, next) {
    levelService
        .getById(req.params.id)
        .then(level => (level ? res.json(level) : res.sendStatus(404)))
        .catch(err => next(err));
}

function getByName(req, res, next) {
    levelService
        .getByName(req.params.levelName)
        .then(level => (level ? res.json(level) : res.sendStatus(404)))
        .catch(err => next(err));
}

function update(req, res, next) {
    levelService
        .update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    levelService
        .delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
