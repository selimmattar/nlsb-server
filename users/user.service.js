const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    updateLesson,
    delete: _delete,
    getByIds,
    getByEmail,
    updateUser,
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
    // eslint-disable-next-line no-unused-vars
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getByIds(id) {
    return await User.findById(id).select('-hash');
}

async function getByEmail(userParam) {
    return await User.findOne({ username: userParam.username });
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (
        user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
    ) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function updateLesson(reqBody) {
    const user = await User.findById(reqBody.id);
    // validate
    if (!user) throw 'User not found';
    user.lesson = reqBody.lesson;

    await user.save();
}

async function updateUser(reqBody) {
  const user = await User.findById(reqBody.id);

    // validate
    if (!user) throw 'User not found';
    if (
        user.username !== reqBody.username &&
    (await User.findOne({ username: reqBody.username }))
    ) {
        throw 'Username "' + reqBody.username + '" is already taken';
    }

    // hash password if it was entered
    if (reqBody.password) {
      reqBody.hash = bcrypt.hashSync(reqBody.password, 10);
    }
console.log('reqbody' , reqBody);
console.log('user' , user);

    // copy userParam properties to user
    Object.assign(user, reqBody);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
