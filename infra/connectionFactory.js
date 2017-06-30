var mysql = require('mysql');
var pool = null;

function _criaPool() {
    if (process.env.NODE_ENV == 'production') {
        // Heroku
        var urlDeConexao = process.env.CLEARDB_DATABASE_URL;
        var grupos = urlDeConexao.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?reconnect=true/);
        pool =  mysql.createPool({
        connectionLimit: 10, // ClearDB
        host: grupos[3],
        user: grupos[1],
        password: grupos[2],
        database: grupos[4]
        });
    }

     else{
        pool =  mysql.createPool({
        connectionLimit: 100,        
        host : 'localhost',
        user : 'root',  
        password : '123456',
        database : 'bdteste'
        });
 }

    pool.on('enqueue', function () {
        //console.error('Waiting for available connection slot');
    });
}

_criaPool();

var connectMySQL = function(callback) {

    return pool.getConnection(function (err, connection) {
        if(err) {
            console.log('Error getting mysql_pool connection: ' + err);
            pool.end(function onEnd(error) {
                if(error) {
                    console.log('Erro ao terminar o pool: ' + error);
                }
                // All connections are now closed once they have been returned with connection.release()
                // i.e. this waits for all consumers to finish their use of the connections and ends them.
                // Recria o pool
                _criaPool();
            });
            return;
        }
        return callback(null, connection);
    });
};

//wrapper
module.exports = function() {
    return connectMySQL;
};
