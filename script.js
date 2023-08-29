function buscarInfos(){
    divInfos = document.getElementById("divInfos");
    xhttp = new XMLHttpRequest();

   // $("#divInfos").html = "Carregando...";
    document.getElementById("divInfos").innerHTML = "Carregando...";
    console.log("Carregando...");
    
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            resposta = this.responseText;
            //$("#divInfos").html = resposta;
            divInfos.innerHTML = resposta;
            console.log(resposta);
        }

        if(this.readyState == 4 && this.status == 404){
            alert("Página não encontrada");
        }

    };

    xhttp.open("GET", "info.txt", true);
    xhttp.send()

}


function gerarNumeros(){
    divNumeros = document.getElementById("divNumeros");
    xhttp = new XMLHttpRequest();
    
    divNumeros.innerHTML = "Carregando..."

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            divNumeros.innerHTML = this.responseText;
        }

        if(this.readyState == 4 && this.status == 404){
            alert("Página não encontrada");
        }

    };

    valor = document.getElementById("txtNumero").value;

    xhttp.open("GET", "servidor.php?numero="+valor, true);
    // para passar parametros pelo url se usa o ?parametro= 
    // para passar um segundo parametro &parametro=valor
    xhttp.send();

}