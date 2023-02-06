const fs = require('fs/promises');

const readTalker = async () => {
   try {
       const array = await fs.readFile('src/talker.json', 'utf-8');
       const arrayJson = JSON.parse(array);
       return arrayJson;
    } catch (error) { return null; }
};

const writeTalker = async (file) => {
    const array = await readTalker();
    array.push(file);
    await fs.writeFile('src/talker.json', JSON.stringify(array));
};

module.exports = { readTalker, writeTalker };