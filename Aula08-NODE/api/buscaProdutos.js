const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const mysql = require("mysql");
var conn = mysql.createConnection({
    host : "localhost" , 
    user : "root" ,
    password : "" ,
    database : "loja_2023_2" 
});



const server = http.createServer((req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    
    conn.connect(function(erro){
        if (!erro){
            sql = "SELECT * FROM produtos ORDER BY nome";
            conn.query(sql, function(error, result, fields){
                if(!error){
                    res.end(JSON.stringify(result));
                }else{
                    res.end(error.toString);
                }
            });
        }else{
            res.end(erro.toString);
        }
    });
});

server.listen(port, hostname, () => {
    console.log('Servidor rodando em http://: ' + hostname + ':' + port)
});