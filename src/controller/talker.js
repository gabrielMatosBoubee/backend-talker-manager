const { readTalker, writeTalker, deleteTalker } = require('../readAndWriteFiles');

const getFiltred = async (req, res) => {
    const { q } = req.query;
    const talkers = await readTalker();
    const talkerFiltred = talkers.filter(({ name }) => name.includes(q));
    return res.status(200).json(talkerFiltred);
};

const getAll = async (req_, res) => {
    const talkers = await readTalker();
    return res.status(200).json(talkers);
};

const getById = async (req, res) => {
    const talkers = await readTalker();
    const { id } = req.params;
    const talker = await talkers.find((ele) => ele.id === Number(id));
    if (!talker) {
   return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    }); 
  }
    return res.status(200).json(talker);
};

const insertNewTalker = async (req, res) => {
    const { name, age, talk } = req.body;
    const file = await readTalker();
    const newTalker = { name, age, talk, id: (file.length + 1) };
    await writeTalker(newTalker);
    return res.status(201).json(newTalker); 
};

const updateTalker = async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const file = await readTalker();
    const talker = file.find((obj) => obj.id === Number(id));
    const newTalker = { ...talker, name, age, talk: { ...talk } };
    await writeTalker(newTalker);
    return res.status(200).json(newTalker);
};

const removeTalker = async (req, res) => {
    const { id } = req.params;
    const file = await readTalker();
    const talker = file.filter((obj) => obj.id !== Number(id));
    await deleteTalker(talker);
    return res.status(204).json();
};

module.exports = { getFiltred, getAll, getById, insertNewTalker, updateTalker, removeTalker };