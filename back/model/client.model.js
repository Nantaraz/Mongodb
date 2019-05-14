var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ModelSchema = Schema({
  _id: Number,
  nom: String,
  prenom: String,
  age: Number,
  classe: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('eleve', ModelSchema );