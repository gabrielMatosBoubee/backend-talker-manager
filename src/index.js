const express = require('express');
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