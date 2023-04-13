const hasEmail = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
    return res.status(400).json({
    message: 'O campo "email" é obrigatório',
  }); 
  }
   next(); 
};
  
  const validateEmail = async (req, res, next) => {
    const { email } = req.body;
    if (!/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/i.test(email)) {
       return res.status(400).json({
       message: 'O "email" deve ter o formato "email@email.com"',
     });
     }
     next();
};
  
  const hasPassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({
       message: 'O campo "password" é obrigatório',
     }); 
     }
     next();
};
  
  const validadePassword = (req, res, next) => {
    const { password } = req.body;
    if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    }); 
  }
  next();
};

module.exports = { hasEmail, validateEmail, hasPassword, validadePassword };