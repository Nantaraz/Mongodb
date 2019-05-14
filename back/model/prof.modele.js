var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ModelSchema = Schema({
    _id: Number,
    nom: String,
    prenom: String,
    matiere: {
        matiere1: String,
        matiere2: String,
        matiere3: String
    },
    classeOccupe: {
        classe1: Number,
        classe2: Number,
        classe3: Number
    }
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('prof', ModelSchema );