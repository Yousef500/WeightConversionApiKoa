const mongoose = require('mongoose');
const bcrypt  = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    email: String,
    googleId: String
});

UserSchema.pre("save", (next) => {
    const user = this;

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, (saltError, salt) => {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, (hashError, hash) => {
                    if (hashError) {
                        return next(hashError)
                    }

                    user.password = hash;
                    next();
                })
            }
        })
    } else {
        return next();
    }
});

module.exports = mongoose.model("User", UserSchema);