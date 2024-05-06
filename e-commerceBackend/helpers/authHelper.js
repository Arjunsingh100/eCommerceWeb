const bcrypt = require('bcrypt');

module.exports.hashedPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPass = await bcrypt.hash(password, saltRounds);
        return hashedPass;
    }
    catch (error) {
        console.log(error)
    }
}

module.exports.comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}