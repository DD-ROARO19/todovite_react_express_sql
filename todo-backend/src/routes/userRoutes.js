const express = require('express');
const { registrarUser, getByEmail } = require('../controllers/userController')

const router = express.Router();

/* User by email */
router.post('/email', getByEmail );

/* Registrar Usuario */
router.post('/crear', registrarUser );

module.exports = router;