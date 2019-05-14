var SomeModel = require('../model/client.model')
var Prof = require('../model/prof.modele')

//Insertion enregistrement ELEVE (POST)
module.exports.Postliste = function (request, res) {

    var nom = request.body.nom;
    var prenom = request.body.prenom;
    var classe = request.body.classe;
    var age = request.body.age;

    SomeModel.find()
        .then(notes => {
            if (notes.length == 0) { //Verifie si le tableau est vide
                id = 0;
                console.log("tafiditra then", id);

            } else { //Verifie si le tableau n'est pas vide
                id = parseInt(notes[notes.length - 1].id) + 1;
            }


            const insertion = new SomeModel({ _id: id, nom: nom, prenom: prenom, age: age, classe: classe });
            (!nom || !prenom || !age || !classe) ? console.log('données insuffisantes') : insertion.save()
                .then(() => {
                    SomeModel.find()
                        .then(notes => {
                            res.send(notes);
                        })
                })
                .catch(e => {
                    res.status(500).send({ mes: e.mes || "Il y a d'erreur d'insertion" })
                })
        })
}


//Affichage enregistrement ELEVE SELECTIONNE (GET)
exports.GetSelected = (req, res) => {
    SomeModel.find({_id: req.params._id})
    .then(eleve => {
        Prof.find()
            .then(prof => {
                for( let i=0; i<prof.length; i++){
                    if(prof[i].classeOccupe.classe1==eleve[0].classe || prof[i].classeOccupe.classe2==eleve[0].classe || prof[i].classeOccupe.classe3==eleve[0].classe){
                        eleve.push(prof[i])
                    }
                }
                res.send(eleve)
            })
    })
}

//Insertion enregistrement PROF (POST)
module.exports.PostProf = function (request, res) {

    var nom = request.body.nom;
    var prenom = request.body.prenom;
    var classe1 = request.body.classe1;
    var classe2 = request.body.classe2;
    var classe3 = request.body.classe3;
    var matiere1 = request.body.matiere1;
    var matiere2 = request.body.matiere2;
    var matiere3 = request.body.matiere3;

    Prof.find()
        .then(notes => {
            if (notes.length == 0) { //Verifie si le tableau est vide
                id = 0;
                console.log("tafiditra then", id);

            } else { //Verifie si le tableau n'est pas vide
                id = parseInt(notes[notes.length - 1].id) + 1;
            }

            //Verifie si Classe3 et Classe2 sont vides
                if(!classe3){
                    if(!classe2){
                        var insertion = new Prof({ _id: id, nom: nom, prenom: prenom, classeOccupe: {classe1 : classe1}, matiere: {matiere1: matiere1, matiere2: matiere2, matiere3: matiere3} });              
                    } else {
                        insertion = new Prof({ _id: id, nom: nom, prenom: prenom, classeOccupe: {classe1 : classe1, classe2 : classe2}, matiere: {matiere1: matiere1, matiere2: matiere2, matiere3: matiere3} });
                    }
                } else {
                    insertion = new Prof({ _id: id, nom: nom, prenom: prenom, classeOccupe: {classe1 : classe1, classe2 : classe2, classe3 : classe3}, matiere: {matiere1: matiere1, matiere2: matiere2, matiere3: matiere3} });
                }

                (!nom || !prenom || !classe1 || !matiere1)? console.log('données insuffisantes') : insertion.save()
                .then(() => {
                    Prof.find()
                        .then(notes => {
                            res.send(notes);
                        })
                })
                .catch(e => {
                    res.status(500).send({ mes: e.mes || "Il y a d'erreur d'insertion" })
                })
        })
}

//Affichage enregistrements PROF (GET)
exports.GetProf = (req, res) => {
    Prof.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "GET impossible!!!"
            });
        });
};


//Affichage enregistrements ELEVES (GET)
exports.GetListe = (req, res) => {
    
      SomeModel.find()
      .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "GET impossible!!!"
        });
    });
    }

//Modification enregistrement (PUT)
exports.Putliste = (req, res) => {
    if (!req.body.id) { //Verifie si le ID est VIDE
        return res.status(400).send({
            message: "id introuvable"
        });
    }

    if(!req.body.nom || !req.body.prenom){ //Verifie si les champs sont vides
        console.log("champs vides");
    } else {
    SomeModel.findByIdAndUpdate(req.body.id, {
        nom: req.body.nom,
        prenom: req.body.prenom,
        classe: req.body.classe
    }, { new: true })
        .then(note => {
            if (!note) { //Verifie si le ID existe
                return res.status(404).send({
                    message: "id " + req.body.id + "introuvable"
                });
            }
            SomeModel.find()
                .then(notes => {
                    res.send(notes);
                })
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message:  "id " + req.body.id + "introuvable"
                });
            }
            return res.status(500).send({
                message:  " impossible de modifier le id " + req.body.id
            });
        });
    }
};


//Suppression enregistrement (DELETE)
exports.Deleteliste = (req, res) => {
    SomeModel.findByIdAndRemove(req.body.id)
        .then(note => {
            console.log("NOTE", note);

            if (!note) {
                return res.status(404).send({
                    message:  "id " + req.body.id + "introuvable"
                });
            }
            SomeModel.find()
                .then(notes => {
                    res.send(notes);
                })
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message:  "id " + req.body.id + "introuvable"
                });
            }
            return res.status(500).send({
                message: " impossible de supprimer le id " + req.body.id
            });
        });
};
