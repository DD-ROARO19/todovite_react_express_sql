var express = require('express');
var router = express.Router();

const { registrarUser, getByEmail } = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express - Users' });
});

/* User by email */
router.post('/email', getByEmail );

/* Registrar Usuario */
router.post('/crear', registrarUser );

module.exports = router;