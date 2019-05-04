const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/users/',
            '/users/getByIds',
            '/users/updateLesson',
            '/levels/add',
            '/ExerciseF/add',
            '/ExerciseF/',
            '/ExerciseF/update',
            '/ExerciseF/getById',
            '/ExerciseQ/add',
            '/ExerciseQ/',
            '/ExerciseQ/getById',
            '/ExerciseQ/update',
            '/Grade/add',
            '/users/getByEmail',
            '/WebScrapper/generateSentence'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
}
