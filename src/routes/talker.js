const { Router } = require('express');
const controller = require('../controller');
const middleware = require('../middleware');

const router = Router();

router.get('/search', 
middleware.hasAutorization, 
middleware.authorizationValidate,
controller.talker.getFiltred);

router.get('/', controller.talker.getAll);

router.get('/:id', controller.talker.getById);

router.post('/', 
middleware.hasAutorization,
middleware.authorizationValidate,
middleware.nameValidate, 
middleware.ageValidate, 
middleware.talkAndWatchedAtValidate,
middleware.rateValidate,
controller.talker.insertNewTalker);

router.put('/:id', 
middleware.hasAutorization,
middleware.authorizationValidate,
middleware.nameValidate, 
middleware.ageValidate, 
middleware.talkAndWatchedAtValidate,
middleware.rateValidate,
controller.talker.updateTalker);

router.delete('/:id', 
middleware.hasAutorization, 
middleware.authorizationValidate,
controller.talker.removeTalker);

module.exports = router;