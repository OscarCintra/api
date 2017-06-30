var app = require('./config/config')();

var porta = process.env.PORT || 3000;
app.listen(porta);
console.log("server OK - " + porta);

app.get('/api', function(req,res){
    app.infra.connectionFactory(function(err, connection) {
        connection.query('select * from clientes', function(error, result) {
            connection.release();
            res.send(result);
        });
    });
});


app.get('/api/:id', function(req,res){
	app.infra.connectionFactory(function(err, connection) {
		connection.query('select * from Clientes where Id_Cliente = ?', req.params.id ,function(error,result) {
			connection.release();
			res.send(result);	
		});
	});
});

app.post('/api', function(req,res){
	var dados = req.body;	
	app.infra.connectionFactory(function(err, connection) {
		connection.query('insert into Clientes set ?',dados ,function(error,result) {
			connection.release();
			if (error){
				res.json(error);
			}
			else{
				res.json("Registro Inserido!");
			}
		});				
	});
});

app.delete('/api/:id', function(req,res){	
	app.infra.connectionFactory(function(err, connection) {
		connection.query('delete from Clientes where Id_Cliente = ?', req.params.id ,function(error,result) {
			connection.release();
			if (error){
				res.json(error);
			}
			else{
				res.json("Registro Excluído!");
			}
		});
	});	
});

app.put('/api/:id', function(req,res){
	app.infra.connectionFactory(function(err, connection) {
		connection.query('update Clientes set ? where Id_Cliente = ?', [req.body, req.params.id],function(error,result) {
			connection.release();
			if (error){
				res.send(error);
			}
			else{
				res.json("Registro Alterado!");
			}		
		});
	});
});

