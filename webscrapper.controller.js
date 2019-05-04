const express = require('express');
const router = express.Router();
const spawn = require('child_process').spawn;

router.post('/generateSentence', generateSentence);

module.exports = router;

function generateSentence(req, res, next) {
    const pythonProcess = spawn('python', [
        './webscrapper.py',
        req.body.contains
    ]);
    pythonProcess.stdout.on('data', data => {
        console.log(data);
        res.end(data);
    });
}
