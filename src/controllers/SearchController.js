const User = require('../models/User');
const { index } = require('./UserController');

module.exports = {
    async index(req,res){
        console.log(req.query);

        const {email} = req.query;

        console.log(email);

        const users = await User.find({email : email});


        return res.json(users);
    }
}