const pool = require('../config/db')

//Crear User
async function createUser(user) {
    try {
        const { username, email, password } = user;
        const [result] = await pool.query(
            "INSERT INTO users (name, email, password) VALUES (?,?,?)",
            [username, email, password]
        )

        return { id: result.insertId, username, email }
    } catch (error) {
        console.error("Error al crear usuario:", error);
        throw error;
    }

};

//Obtener User por Email
async function getUserByEmail(email) {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        )
        return rows[0];
    } catch (error) {
        console.error("Error al obtener usuario por email:", error);
        throw error;
    }
}

module.exports = { createUser, getUserByEmail };