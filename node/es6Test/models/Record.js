let mongoose = require('mongoose');
let schema = mongoose.Schema({
   name: String,
   created_on: {
       type: Date,
       default: Date.now()
   }
});

module.exports = mongoose.model('Record', schema);