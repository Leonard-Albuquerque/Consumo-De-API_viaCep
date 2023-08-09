async function buscarEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";

    try{
            var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            var consultaCepCovertida = await consultaCep.json();
            if(consultaCepCovertida.erro) {
                    throw Error('Cep não existente!');
                }
            var cidade = document.getElementById('cidade');
            var logradouro = document.getElementById('endereco');
            var estado = document.getElementById('estado');

            cidade.value = consultaCepCovertida.localidade;
            logradouro.value = consultaCepCovertida.logradouro;
            estado.value = consultaCepCovertida.uf; 

            console.log(consultaCepCovertida);
            return consultaCepCovertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP invalido.Tente novamente!</p>`
    };


}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscarEndereco(cep.value));