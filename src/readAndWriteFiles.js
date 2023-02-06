const fs = require('fs/promises');

const readTalker = async () => {
   try {
       const array = await fs.readFile('src/talker.json', 'utf-8');
       const arrayJson = JSON.parse(array);
       return arrayJson;
    } catch (error) { return null; }
};

module.exports = { readTalker };