const crypto = require('crypto');

const login = async (req_, res) => {
    const token = await crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token }); 
};

module.exports = { login };