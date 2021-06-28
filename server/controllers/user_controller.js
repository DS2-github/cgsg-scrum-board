const userModel = require('../models/user_model');
const bcrypt = require('bcryptjs');

class userController {
    async sighUp(name, password) {

        bcrypt.hash(password, 0)
            .then(async (hash) => {
                const user = new userModel({ name: name, password: hash })

                await user.save();
                console.log(user);
            })
            .catch(err => {
                console.log(`Err hash ${name} password: ${err}`);
                //throw new Error(`Err hash ${name} password`);
            });
    }

}

module.exports = new userController();
