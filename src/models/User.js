const mongoose = require('mongoose');
const DaySchema = require('./utils/Day');


const UserSchema = new mongoose.Schema({
    name : String,
    id : String,
    pass : String,
    email : String,
    dayList : [JSON],
});

module.exports = mongoose.model('User', UserSchema);