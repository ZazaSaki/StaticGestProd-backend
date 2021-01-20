const User = require('../models/User');
const { index } = require('./UserController');

module.exports = {
    async searchByEmail(req,res){
        console.log(req.query);

        const {email} = req.query;

        console.log(email);

        const users = await User.find({email : email});


        return res.json(users);
    },

    async searchById(req,res){
        console.log(req.query);

        const {id} = req.query;

        console.log(id);

        const users = await User.find({name : id});


        return res.json(users);
    }

    
}