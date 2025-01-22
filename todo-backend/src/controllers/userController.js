const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

//Crear User
const registrarUser = async (req, res) => {
    const {username, email, password} = req.body;

    //validar
    if (!username || !email || !password) {
        return res.status(400).send("¡Favor de llenar todos los campos!")
    }
    try {
        //Encryptar password
        const heshedPassword = await bcrypt.hash(password, 10);

        //Crear User
        const newUser = await userModel.createUser({
            username, 
            email, 
            password: heshedPassword
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        if (error.code == 'ER_DUP_ENTRY') {
            return res.status(400).json({msg: 'Email o nombre de usuario ya en uso.'})
        }else{
            return res.status(500).json({msg: 'Error en el servidor'})
        }
    }
}

//Buscar Usuario por Email
async function getByEmail(req, res) {
    const email = req.body.email;

    //validar
    if(!email){
        return res.status(204).send('Falta incluir email')
    }

    try {
        const emailUser = await userModel.getUserByEmail(email)

        res.status(200).json({msg:'¡Usuario exitosamente encontrado!', user: emailUser})
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = { registrarUser, getByEmail }