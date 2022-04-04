const bcrypt = require('bcrypt');

const generateHash = async (password) => {

    await bcrypt.genSalt(10, (saltError, salt) => {
        if (saltError) {
            return saltError
        } else {
            bcrypt.hash(password, salt, (hashError, hash) => {
                if (hashError) {
                    return hashError
                }
                return hash;
            })
        }
    })

}

module.exports = {
    generateHash: (password) => generateHash(password)
}
