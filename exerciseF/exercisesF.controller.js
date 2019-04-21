const express = require('express');
const router = express.Router();
const EFService = require('./exerciseF.service');

// routes
router.post('/add', add);
router.get('/getById', getById);
router.get('/', getAll);
router.post('/update', updateAll);

module.exports = router;

function add(req, res, next) {
    EFService.add(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

function updateAll(req, res, next) {
    EFService.updateAll(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

function getById(req, res, next) {
    EFService.getById(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

function getAll(req, res, next) {
    EFService.getAll()
        .then(exercises => res.json(exercises))
        .catch(err => {
            console.log(err);
            next(err);
        });
}
