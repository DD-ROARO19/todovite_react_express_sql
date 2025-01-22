const pool = require('../config/db')

//Crear User
async function createUser(user){
    const {username, email, password} = user;
    const [result] = await pool.query(
        'INSERT INTO users (username, email, password) VALUES (?,?,?)',
        [username, email, password]
    )

    return {id: result.insertId, username, email}
};

//Obtener User por Email
async function getUserByEmail(email) {
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    )
    return rows[0];
}

module.exports = {createUser, getUserByEmail};