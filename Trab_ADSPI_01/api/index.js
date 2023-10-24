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


// --------------------- Cliente --------------------------- //

// Rota para criar um cadastro
servidor.post('/clientes', (req, res, next) => {
    knex('clientes')
    .insert(req.body)
    .then((dados) => {
        res.send(dados);
    }, next);
});


// Rota para consultar todos produtos
servidor.get('/produtos', (req, res, next) => {
    knex('produtos')
    .then((dados) => {
        res.send(dados);
    }, next);
});

// Rota para consultar um produto
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

// Rota para criar um pedido
servidor.post('/pedidos', (req, res, next) => {
    knex('pedidos')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next);
});

// atualização de pedidos
servidor.put('/pedidos/:id', (req, res, next) => {
    const idPedido = req.params.id;
    knex('pedidos')
        .where('id', idPedido)
        .update(req.body)
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Pedido não encontrado!'));
            }
            res.send("Pedido Atualizado!");
        }, next);
});

// exclusão de pedidos
servidor.del('/pedidos/:id', (req, res, next) => {
    const idPedido = req.params.id;
    knex('pedidos')
        .where('id', idPedido)
        .delete()
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Pedido não encontrado!'));
            }
            res.send("Pedido Deletado");
        }, next);
});

// --------------------- ADMIN --------------------------- //

// criação de produtos
servidor.post('/admin/produtos', (req, res, next) => {
    knex('produtos')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next);
});

// atualização de produtos
servidor.put('/admin/produtos/:id', (req, res, next) => {
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

// exclusão de produtos
servidor.del('/admin/produtos/:id', (req, res, next) => {
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

// pesquisar todos clientes
servidor.get('/admin/clientes', (req, res, next) => {
    knex('clientes').then((dados) => {
        res.send(dados);
    }, next);
});

// pesquisar um cliente
servidor.get('/admin/clientes/:id', (req, res, next) => {
    const idCliente = req.params.idProd;
    knex('clientes')
        .where('id', idCliente) //id busca o id do banco
        .first()
        .then((dados) => {
            if (!dados || dados =="") {
                return res.send(new errors.BadRequestError('Este cliente não foi encontrado'));
            }else{
                res.send(dados);
            }
        }, next);
});

// atualização cliente
servidor.put('/admin/clientes/:id', (req, res, next) => {
    const idCliente = req.params.id;
    knex('clientes')
        .where('id', idCliente)
        .update()
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Cliente não encontrado!'));
            }
            res.send("Cliente Deletado");
        }, next);
});

// excluir cliente
servidor.del('/admin/clientes/:id', (req, res, next) => {
    const idCliente = req.params.id;
    knex('clientes')
        .where('id', idCliente)
        .delete()
        .then((dados) => {
            if (!dados) {
                return res.send(new errors.BadRequestError('Cliente não encontrado!'));
            }
            res.send("Cliente Deletado");
        }, next);
});

// criação do post categorias
servidor.post('/admin/categorias', (req, res, next) => {
    knex('categorias')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next);
});

// criação de cidades
servidor.post('/admin/cidades', (req, res, next) => {
    knex('cidades')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next);
});