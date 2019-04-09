const express = require('express');
const router = express.Router();
const EQService = require('./exerciseQ.service');

// routes
router.post('/add', add);
router.get('/getById', getById);
router.get('/', getAll);

module.exports = router;

function add(req, res, next) {
    EQService.add(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

function getById(req, res, next) {
    EQService.getById(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

function getAll(req, res, next) {
    EQService.getAll()
        .then(exercises => res.json(exercises))
        .catch(err => {
            console.log(err);
            next(err);
        });
}
