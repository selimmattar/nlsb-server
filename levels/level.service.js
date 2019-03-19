const db = require('_helpers/db');
const Level = db.Level;

module.exports = {
    getAll,
    getLevelById,
    getByName,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Level.find().select('-hash');
}

async function getByName(levelName) {
    return await Level.findOne({ levelName });
}

async function getLevelById(id) {
    return await Level.findById(id);
}

async function create(LevelParam) {
    // validate
    if (await Level.findOne({ levelName: LevelParam.levelName })) {
        throw 'Levelname "' + LevelParam.levelName + '" already exists';
    }

    const level = new Level(LevelParam);

    // save Level
    await level.save();
}

async function update(id, LevelParam) {
    const Level = await Level.findById(id);

    // validate
    if (!Level) throw 'Level not found';
    if (
        Level.Levelname !== LevelParam.Levelname &&
    (await Level.findOne({ Levelname: LevelParam.Levelname }))
    ) {
        throw 'Levelname "' + LevelParam.Levelname + '" already exists';
    }

    // copy LevelParam properties to Level
    Object.assign(Level, LevelParam);

    await Level.save();
}

async function _delete(id) {
    await Level.findByIdAndRemove(id);
}
