const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userModel = require('../models/userModel');

async function login (req, res) {
    const { email, password } = req.body;

    try {
        //Buscar usuario
    let user = await userModel.getUserByEmail(email)

    if(!user){
        return res.getUserByEmail(400).json({msg: 'Credenciales incorrectas'})
    }

    //Verificar contra
    let isPassword = await bcrypt.compare(password, user.password)
    
    if (!isPassword) {
        return res.status(400).json({msg: 'Credenciales incorrectas'})
    }

    //Generar token
    let token = jwt.sign({id: user.id, email: user.email}, process.env.SECRET, {expiresIn: '1h'});
    res.json({token});

    } catch (error) {
        console.log('Error en el login: ', error);
        res.status(500).json({msg: 'Error en el servidor'})
    }
    
}

module.exports = {login}