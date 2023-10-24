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
    const idProduto = req.params.id;
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
    const idPedido = req.params.id;
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
