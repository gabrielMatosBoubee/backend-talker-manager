const express = require('express');
const crypto = require('crypto');
const talkerJson = require('./talker.json');
const { readTalker } = require('./readAndWriteFiles');

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

app.post('/login', hasEmail, validateEmail, hasPassword, validadePassword, (req, res) => {
const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token }); 
});