const mongoose = require('mongoose');


const ArtSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: false},
  url: {type: String, required: true, unique: false},
  material: {type: String, required: true},
  size: {type: String, required: true}

});


module.exports = Art = mongoose.model('art', ArtSchema);