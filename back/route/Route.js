var controller =require( '../controler/controler.js')


module.exports.route=function (app){

    app.route('/eleve')
        .post(controller.Postliste)
        .get(controller.GetListe)
        .put(controller.Putliste)
        .delete(controller.Deleteliste)

    app.route('/eleve/:_id')
        .get(controller.GetSelected)

    app.route('/prof')
        .post(controller.PostProf)
        .get(controller.GetProf)
}
