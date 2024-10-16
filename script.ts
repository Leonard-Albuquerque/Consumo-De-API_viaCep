async function buscarEndereco(cep: string): Promise<void> {
    const mensagemErro = document.getElementById('erro') as HTMLElement;
    mensagemErro.innerHTML = "";

    try {
        const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaCepConvertida = await consultaCep.json();

        if (consultaCepConvertida.erro) {
            throw new Error('Cep não existente!');
        }

        const cidade = document.getElementById('cidade') as HTMLInputElement;
        const logradouro = document.getElementById('endereco') as HTMLInputElement;
        const estado = document.getElementById('estado') as HTMLInputElement;

        cidade.value = consultaCepConvertida.localidade;
        logradouro.value = consultaCepConvertida.logradouro;
        estado.value = consultaCepConvertida.uf;

        console.log(consultaCepConvertida);
        return consultaCepConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP invalido. Tente novamente!</p>`;
    }
}

const cep = document.getElementById('cep') as HTMLInputElement;
cep.addEventListener("focusout", () => buscarEndereco(cep.value));
