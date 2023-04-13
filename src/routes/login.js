const { Router } = require('express');
const controller = require('../controller');
const middleware = require('../middleware');

const router = Router();

router.post('/', 
middleware.hasEmail, 
middleware.validateEmail, 
middleware.hasPassword, 
middleware.validadePassword, 
controller.login.login);

module.exports = router;    