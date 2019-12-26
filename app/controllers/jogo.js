module.exports.jogo = function(application, req, res){
	
	if(req.session.autorizado !== true) {
		res.send('Usuario Precisa fazer login')
		return
	}

	const usuario = req.session.usuario
	const casa = req.session.casa

	const connection = application.config.dbConnection
	const JogoDAO = new application.app.models.JogoDAO(connection)


	JogoDAO.iniciarJogo(res, usuario, casa)
}

module.exports.sair = function(application, req, res){
	
	req.session.destroy((err) => {
		res.redirect('/')
	})
}

module.exports.suditos = function(application, req, res){
	
	res.render('aldeoes')
}

module.exports.pergaminhos = function(application, req, res){
	
	res.render('pergaminhos')
}