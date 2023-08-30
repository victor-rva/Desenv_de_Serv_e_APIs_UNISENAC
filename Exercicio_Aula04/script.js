function verContato(){
    divVerC = document.getElementById("divVerC");
    xhttp = new XMLHttpRequest();

    divVerC.innerHTML = "Carregando..."

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            divVerC.innerHTML = this.responseText;
        }

        if(this.readyState == 4 && this.status == 404){
            alert("Página não encontrada");
        }
    };

    nome = document.getElementById("nome").value;
    email = document.getElementById("email").value;

    xhttp.open("GET", "servidor.php?nome=" + nome + "&email=" + email, true);
    xhttp.send();

}