const hasAutorization = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
   return res.status(401).json({
      message: 'Token não encontrado',
    }); 
  }
  next();
  };
  
  const authorizationValidate = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization.length !== 16 || typeof authorization !== 'string') {
   return res.status(401).json({
      message: 'Token inválido',
    }); 
  }
  next();
  };

module.exports = { hasAutorization, authorizationValidate };