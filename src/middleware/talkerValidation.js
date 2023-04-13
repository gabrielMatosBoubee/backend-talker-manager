const nameValidate = async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
   return res.status(400).json({ message: 'O campo "name" é obrigatório' }); 
  } if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } 
  next();
  };
  
  const ageValidate = async (req, res, next) => {
    const { age } = req.body;
    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    if (typeof age !== 'number') { 
      return res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' }); 
  }
    if (!Number.isInteger(age)) {
   return res.status(400).json({
      message: 'O campo "age" deve ser um "number" do tipo inteiro',
    });
  }
  if (Number(age) < 18) {
  return res.status(400).json({
    message: 'A pessoa palestrante deve ser maior de idade',
  }); 
  }
  next();
  };
  
  const talkAndWatchedAtValidate = async (req, res, next) => {
    const { talk } = req.body;
    if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    if (!talk.watchedAt) {
   return res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(talk.watchedAt)) {
   return res.status(400).json({
    message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  }); 
  }
  next();
  };
  
  const rateValidate = async (req, res, next) => {
    const { rate } = req.body.talk;
    if (!Reflect.has(req.body.talk, 'rate')) {
      return res.status(400).json({
        message: 'O campo "rate" é obrigatório',
      });
    }
    if (!/^[1-5]$/gm.test(rate)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    }); 
    }
    next();
};

module.exports = { 
    nameValidate,
    ageValidate, 
    talkAndWatchedAtValidate,
    rateValidate,
};