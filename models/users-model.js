const bcrypt = require('bcryptjs');
const db = require('../database/config');

async function add(user) {
    user.password = await bcrypt.hash(user.password, 16)
    const [id] = await db('users').insert(user);
    return findById(id);
};

function find() {
    return db('users').select('id', 'username');
};

function findBy(field, filter) {
    return db('users').where(field, filter).select('id', 'username', 'password');
};

function findById(id) {
    return db('users').where('id', id).select('id', 'username').first();
};

module.exports = {
    add,
    find,
    findBy,
    findById
};