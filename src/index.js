const express = require('express');
const crypto = require('crypto');
const talkerJson = require('./talker.json');
const { readTalker, writeTalker } = require('./readAndWriteFiles');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req_, res) => {
  const talkers = await readTalker();
  if (talkers.length === 0) return res.status(200).json([]);
  const result = await res.status(200).json(talkerJson);
  return result;
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await readTalker();
  const { id } = req.params;
  const talker = await talkers.find((ele) => ele.id === Number(id));
  if (!talker) {
 return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  }); 
}
  res.status(200).json(talker);
});

const hasEmail = async (req, res, next) => {
  const { body } = req;
  if (!body.email) {
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
 res.status(400).json({
    message: 'O "password" deve ter pelo menos 6 caracteres',
  }); 
}
next();
};

app.post('/login', hasEmail, validateEmail, hasPassword, validadePassword, (req_, res) => {
const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token }); 
});

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

app.post('/talker', hasAutorization, authorizationValidate, nameValidate, ageValidate, 
talkAndWatchedAtValidate, rateValidate, async (req, res) => {
  const { name, age, talk } = req.body;
  const file = await readTalker();
  const newTalker = { name, age, talk, id: (file.length + 1) };
  await writeTalker(newTalker);
  res.status(201).json(newTalker); 
});