function lerDados(){
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            pessoa = JSON.parse(this.responseText);
            text = "<b>Nome: </b>" + pessoa.nome + "<br>";
            text += "<b>Cônjuge: </b>" + pessoa.conjuge.nome + "<br>";
            text += "<b>Idade: </b>" + pessoa.idade + "<br>";
            text += "<b>Filhos: </b> <br>";
            pessoa.filhos.forEach(filho =>{
                text += filho.nome + " - idade: " + filho.idade + "<br>";
            });
            document.getElementById("dados").innerHTML = text;
        }
    };

    xhttp.open("GET", "meuJSON.json", true);
    xhttp.send();
}

function buscarProdutos(){
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            conteudo = "<table border='1'>";
            conteudo += "<tr>";
            conteudo += "       <th>Código</th>";
            conteudo += "       <th>Nome</th>";
            conteudo += "       <th>Preço</th>";
            conteudo += "       <th>Quantidade</th>";
            conteudo += "</tr>";

            objJason = JSON.parse(this.responseText);
            if(objJason.resposta){
                alert(objJason.resposta);
            }else{
                products = objJason.produtos;
                products.forEach(prod => {
                    conteudo += "<tr>";
                    conteudo +=     "<td>" + prod.id + "</td>";
                    conteudo +=     "<td>" + prod.nome + "</td>";
                    conteudo +=     "<td>" + prod.preco + "</td>";
                    conteudo +=     "<td>" + prod.quantidade + "</td>";
                    conteudo += "</tr>";
                });
                conteudo +="</table>"
                document.getElementById("divProdutos").innerHTML = conteudo
            }

        }
    };

    xhttp.open("GET", "servidor.php?buscar", true);
    xhttp.send();
}

function inserirProdutos(){
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            objJason = JSON.parse(this.responseText);
            if(objJason.id){
                alert("produto inserido: " + objJason.id);
            }else{
                alert(objJason.resposta);
            }
        }
    };
    xhttp.open("POST", "servidor.php?inserir", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    nome = document.getElementById("txtNome").value;
    preco = document.getElementById("txtPreco").value;
    xhttp.send("nome=" + nome + "&preco=" + preco);
}