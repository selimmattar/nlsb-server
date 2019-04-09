const express = require('express');
const router = express.Router();
const GService = require('./grade.service');

// routes
router.post('/add', add);
router.get('/getById', getById);
router.get('/', getAll);
router.delete('/:id', _delete);
module.exports = router;

function add(req, res, next) {
    GService.add(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

function getById(req, res, next) {
    GService.getById(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

function getAll(req, res, next) {
    GService.getAll()
        .then(grades => res.json(grades))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

function _delete(req, res, next) {
    GService._delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
