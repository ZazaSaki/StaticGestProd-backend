const mongoose = require('mongoose');

const DaySchema = mongoose.Schema({
    day : [Number],
    production : [Number],
    id : Number 
});

module.exports = DaySchema;