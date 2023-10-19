const restify = require('restify');
const errors = require('restify-errors');

const servidor = restify.createServer({
    name: 'loja',
    version: '1.0.0'
});

servidor.use(restify.plugins.acceptParser(servidor.acceptable));
servidor.use(restify.plugins.queryParser());
servidor.use(restify.plugins.bodyParser());


servidor.listen(8001, function() {
    console.log("%s executando em %s", servidor.name, servidor.url)
});

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'loja_online'
    }
});

servidor.get('/', (req, res, next) => {
    res.send('Bem-vindo(a) a API Loja!')
});

servidor.get('/produtos', (req, res, next) => {
    knex('produtos').then((dados) => {
        res.send(dados);
    }, next);
});

servidor.get('/produtos/:id', (req, res, next) => {
    const idProduto = req.params.idProd;
    knex('produtos')
        .where('id', idProduto) //id busca o id do banco
        .first()
        .then((dados) => {
            if (!dados || dados =="") {
                return res.send(new errors.BadRequestError('Este produto não foi encontrado'));
            }else{
                res.send(dados);
            }
        }, next);
});

// Rota para consultar um pedido
servidor.get('/pedidos/:id', (req, res, next) => {
    const idPedido = req.params.idPed;
    knex('pedidos')
        .where('id', idPedido) //id busca o id do banco
        .first()
        .then((dados) => {
            if (!dados || dados =="") {
                return res.send(new errors.BadRequestError('Pedido não encontrado!'));
            }else{
                res.send(dados);
            }
        }, next);
});

servidor.post('/produtos', (req, res, next) => {
    knex('produtos')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next);
});


servidor.put('/produtos/update/:id', (req, res, next) => {
    const idProduto = req.params.id;
    knex('produtos')
        .where('id', idProduto)
        .update(req.body)
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Este produto não foi encontrado'));
            }
            res.send("Produto Atualizado");
        }, next);
});

servidor.del('/produtos/:id', (req, res, next) => {
    const idProduto = req.params.id;
    knex('produtos')
        .where('id', idProduto)
        .delete()
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Este produto não foi encontrado'));
            }
            res.send("Produto Deletado");
        }, next);
});