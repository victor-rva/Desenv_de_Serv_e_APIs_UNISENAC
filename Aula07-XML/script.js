function buscarDados(){
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            texto = this.responseText + "<hr>";
            dadosXML = this.responseXML;
            var pessoa = dadosXML.getElementsByTagName("pessoa");

            var nome = pessoa[0].getElementsByTagName("nome");
            var nomePessoa = nome[0].childNodes[0].nodeValue;

            var idade = pessoa[0].getElementsByTagName("idade");
            var idadePessoa = idade[0].childNodes[0].nodeValue;
            
            texto += "Nome: " + nomePessoa + "<br>";
            texto += "Idade: " + idadePessoa + "<br>";
            document.getElementById("divDados").innerHTML = texto;
        }
    };
    xhttp.open("GET", "dados.xml", true);
    xhttp.send();
}


function buscarProdutos(){
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            texto = this.responseText + "<hr>";
            dadosXML = this.responseXML;
            // if(erro = dadosXML.getElementsByTagName("erro")){
            //     alert(erro);
            // }else{
                var produtos = dadosXML.getElementsByTagName("produto");
                for(i = 0; i < produtos.length; i++){
                    id = produtos[i].getElementsByTagName("id").childNodes[0].nodeValue[0]                    
                    nome = produtos[i].getElementsByTagName("nome").childNodes[0].nodeValue[0]                    
                    preco = produtos[i].getElementsByTagName("preco").childNodes[0].nodeValue[0]
                    texto += "<br>Nome: " + id + ":" + nome + " - R$ " + preco;                    
                };
            // }

            document.getElementById("divProdutos").innerHTML = texto;
        }
    };
    xhttp.open("GET", "servidor.php", true);
    xhttp.send();
}
