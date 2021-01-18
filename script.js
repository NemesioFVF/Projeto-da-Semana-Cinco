const divF = document.querySelector('.FotosFuncio');
const img = document.querySelector('#fotos');
const file = document.querySelector('#arquivo');
const addFoto = document.querySelector('#addFC');
var Funcionarios = JSON.parse(localStorage.getItem('Novos Funcionarios'));

if (Funcionarios == null) { 
    Funcionarios = []
}

function SalvarFuncionario (){
    Funcionarios.push({
      'Foto' : document.getElementById('arquivo').value,
      'Nome': document.getElementById('NomeC').value,
      'Sexo' : document.getElementById('SX').value,
      'Data de Nascimento' : document.getElementById('data').value,
      'RG' : document.getElementById('RGs').value,
      'CPF' : document.getElementById('inCPF').value,
      'Estado Cívil' : document.getElementById('EstadoCiV').value,
      'Carteira de Habilitação' : document.getElementById('seleCH').value,
      'Rua' : document.getElementById('nomeR').value,
      'Número' : document.getElementById('nuM').value,
      'CEP' : document.querySelector('.cep2').value,
      'Bairro' : document.getElementById('bairro').value,
      'Cidade' : document.getElementById('cidade').value,
      'Estado' : document.getElementById('estado').value,
      'Complemento' : document.getElementById('inCom').value,
      });
  const jsonFunc = JSON.stringify(Funcionarios);
  localStorage.setItem("Novos Funcionarios", jsonFunc);

//veridicando se os campos foram preenchidos
    if (document.getElementById('NomeC').value == "") {
        alert("Preencha o Nome do Funcionário.");
        NomeC.focus();
        localStorage.clear();
        return false;
    }

    if (document.getElementById('SX').value == "") {
        alert("Selecione o Sexo do Funcionário.");
        SX.focus();
        localStorage.clear();
        return false;
    }

    if (document.getElementById('data').value == "") {
        alert("Informe a Data de Nascimento do Funcionário.");
        data.focus();
        localStorage.clear();
        return false;
    }

    if (document.getElementById('RGs').value == "" || document.getElementById('RGs').value < 12) {
        alert("Informe o RG do Funcionário.");
        RGs.focus();
        localStorage.clear();
        return false;
    }

    if (document.getElementById('inCPF').value == "" || document.getElementById('inCPF').value < 14) {
        alert("Informe o CPF do Funcionário.");
        inCPF.focus();
        localStorage.clear();
        return false;
    }

    if (document.getElementById('EstadoCiV').value == "") {
        alert("Selecione o Estado Cívil do Funcionário.");
        EstadoCiV.focus();
        localStorage.clear();
        return false;
    }

    if (document.getElementById('seleCH').value == "") {
        alert("Selecione o Tipo de CNH do Funcionário.");
        seleCH.focus();
        localStorage.clear();
        return false;
    }

    if (document.getElementById('nuM').value == "") {
        alert("Informe o Número da rezidência do do Funcionário.");
        nuM.focus();
        localStorage.clear();
        return false;
    }

    if (document.querySelector('.cep2').value == "" || document.querySelector('.cep2').value < 9) {
        alert("Informe o CEP da rezidência do do Funcionário.");
        cep2.focus();
        localStorage.clear();
        return false;
    }
    else {

        location.href=location.href
        alert("Novo Funcionario Cadastrado com Sucesso.");
        return true;
    }

  }

// add imagem
  divF.addEventListener('mouseenter', function(){
    addFoto.style.display = "block";
});

divF.addEventListener('mouseleave', function(){
    addFoto.style.display = "none";
});

file.addEventListener('change', function(){
    const arquivoEscolhido = this.files[0];

    if (arquivoEscolhido) {
        const leitor = new FileReader(); 

//FileReader é uma função predefinida do JS https://developer.mozilla.org/pt-BR/docs/Web/API/FileReader

        leitor.addEventListener('load', function(){
            img.setAttribute('src', leitor.result);
        });
        leitor.readAsDataURL(arquivoEscolhido);
    }
});

// mascara para número do endereço
function mascaraNumero(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    if (charCode != 8 && charCode != 9) {
        if (charCode < 48 || charCode > 57) {
            return false;
        }
    }
}

// data de nascimento
function IdadeFunc (){
    var data = document.getElementById("data").value;
    data = data.replace(/\//g, "-");
    var data_array = data.split("-");

    if(data_array[0].length != 4){
       data = data_array[2]+"-"+data_array[1]+"-"+data_array[0];
    }

    var hoje = new Date();
    var nasc  = new Date(data);
    var idade = hoje.getFullYear() - nasc.getFullYear();
    var m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;

    if(idade < 14){
        document.getElementById("data").value = '';
       alert("ERRO NA DATA DE NASCIMENTO! - Funcionario com  " + idade + " ano(s), não pode ser cadastrado.");
       return false;
    }
    if(idade >= 14 && idade <= 60){
       return true;
    }
    return false;
 }

// mascaras para os campos
function fMascEx() {
    obj.value=masc(obj.value)
}

 function fMasc(objeto,mascara) {
    obj=objeto
    masc=mascara
    setTimeout("fMascEx()",1)
}

//mascara para CPF 000.000.000-00
function mCPF(cpf){
    cpf=cpf.replace(/\D/g,"")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    return cpf
}

//mascara para RG 00.000.000-0
function mRG(rg){
    rg=rg.replace(/\D/g,"")
    rg=rg.replace(/(\d{2})(\d)/,"$1.$2")
    rg=rg.replace(/(\d{3})(\d)/,"$1.$2")
    rg=rg.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    return rg
}

// mascara para CEP 00.000-000
function mCEP(ceps){
    ceps=ceps.replace(/\D/g,"")
    ceps=ceps.replace(/^(\d{5})(\d)/,"$1-$2")
    return ceps
}

// validando CEP preenchendo os campos 'Nome da Rua' , 'Bairro', 'Cidade' e 'Estado'
function pegandoDadosCEP (ceps) {
    let xhr = new XMLHttpRequest()
    let url = 'https://viacep.com.br/ws/' + ceps + '/json/unicode/'
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                let TxtJSON = xhr.responseText
                let ObjJSON = JSON.parse(TxtJSON)
                document.getElementById('nomeR').value = ObjJSON.logradouro
                document.getElementById('bairro').value = ObjJSON.bairro
                document.getElementById('cidade').value = ObjJSON.localidade
                document.getElementById('estado').value = ObjJSON.uf
            }
        }
    }
    xhr.send();
}