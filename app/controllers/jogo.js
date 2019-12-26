module.exports.jogo = function(application, req, res){
	
	if(req.session.autorizado !== true) {
		res.send('Usuario Precisa fazer login')
		return
	}

	let comando_invalido = 'N'

	if(req.query.comando_invalido == 'S') {
		comando_invalido = 'S'
	}

	console.log(comando_invalido)

	const usuario = req.session.usuario
	const casa = req.session.casa

	const connection = application.config.dbConnection
	const JogoDAO = new application.app.models.JogoDAO(connection)


	JogoDAO.iniciarJogo(res, usuario, casa, comando_invalido)
}

module.exports.sair = function(application, req, res){
	
	req.session.destroy((err) => {
		res.redirect('/')
	})
}

module.exports.suditos = function(application, req, res){
	if(req.session.autorizado !== true) {
		res.send('Usuario Precisa fazer login')
		return
	}
	
	res.render('aldeoes')
}

module.exports.pergaminhos = function(application, req, res){
	if(req.session.autorizado !== true) {
		res.send('Usuario Precisa fazer login')
		return
	}
	
	res.render('pergaminhos')
}

module.exports.ordenar_acao_sudito = function(application, req, res){
	if(req.session.autorizado !== true) {
		res.send('Usuario Precisa fazer login')
		return
	}
	
	const dadosForm = req.body

	req.assert('acao', 'Ação deve ser informada').notEmpty()
	req.assert('quantidade', 'Quantidade deve ser informada').notEmpty()

	const erros = req.validationErrors()

	if(erros){
		res.redirect('jogo?comando_invalido=S')
		return
	}

	console.log(dadosForm)
	res.send('tudo ok !')
}
