module.exports.index = function(application, req, res){
	res.render('index', {validacao: {}})
}

module.exports.autenticar = function(application, req, res){
	
	const dadosForm = req.body

	req.assert('usuario', 'Usuário nao pode ser vazio').notEmpty()
	req.assert('senha', 'Senha nao pode ser vazia').notEmpty()

	const erros = req.validationErrors()

	if(erros) {
		res.render('index', {validacao:erros})
		return
	}

	const connection =   application.config.dbConnection
	const UsuariosDAO = new application.app.models.UsuariosDAO(connection)

	UsuariosDAO.autenticar(dadosForm, req, res)
	
}