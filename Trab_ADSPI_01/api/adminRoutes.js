// criação de produtos
servidor.post('/admin/produtos', (req, res, next) => {
    knex('produtos')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next);
});

// atualização de produtos
servidor.put('/admin/produtos/update/:id', (req, res, next) => {
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


// criação de pedidos
servidor.post('/admin/pedidos', (req, res, next) => {
    knex('pedidos')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next);
});

// atualização de pedidos
servidor.put('/admin/pedidos/update/:id', (req, res, next) => {
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
servidor.del('/admin/produtos/:id', (req, res, next) => {
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


// pesquisar todos clientes
servidor.get('/clientes', (req, res, next) => {
    knex('clientes').then((dados) => {
        res.send(dados);
    }, next);
});

// pesquisar um cliente
servidor.get('/clientes/:id', (req, res, next) => {
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