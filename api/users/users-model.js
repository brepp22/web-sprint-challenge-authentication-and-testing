const db = require('../../data/dbConfig')

async function find() {
    return db('users')
}

function findBy(filter) {
    return db('users')
    .select('username')
    .where(filter)
}

function findById (id) {
    return db('users')
    .where('id' , id).first()
}

async function add({ username, password }) {
    let created_user_id;
    await db.transaction(async trx => {
      const [id] = await trx('users').insert({ username, password })
      created_user_id = id
    });
    return findById(created_user_id)
  }

module.exports = {
    find, 
    findBy,
    add,
    findById,
}