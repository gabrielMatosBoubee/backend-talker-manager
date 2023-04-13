const { hasAutorization, authorizationValidate } = require('./auth/auth');
const { nameValidate, ageValidate,
    talkAndWatchedAtValidate, rateValidate } = require('./talkerValidation');
const { hasEmail, validateEmail, 
    hasPassword, validadePassword } = require('./loginValidation');

module.exports = { 
    hasAutorization,
    authorizationValidate,
    nameValidate,
    ageValidate,
    talkAndWatchedAtValidate,
    rateValidate,
    hasEmail,
    validateEmail,
    hasPassword,
    validadePassword, 
};