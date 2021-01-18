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
       alert("ERRO NA DATA DE NASCIMENTO! - Funcionario com  " + idade + " ano(s), não pode ser cadastrado.");
       return false;
    }
 
    if(idade >= 18 && idade <= 60){
       return true;
    }

    return false;
 }




 function mascaraCPF(e){
    var charCode = e.charCode ? e.charCode : e.keyCode;
    var cpf = document.getElementById("inCPF")
    if (charCode != 8 && charCode != 9) {
        if (charCode < 48 || charCode > 57) {
            return false;
        }
    }

    if (cpf.length == 3 || cpf.length == 7) cpf.value += ".";
    if (cpf.length == 11) i.value += "-";
 }




 // mascara para RG
 function mascaraRG(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    var rg = document.getElementById("NumeroS")
    if (charCode != 8 && charCode != 9) {
        if (charCode < 48 || charCode > 57) {
            return false;
        }
    }

    if(rg.value.length == 2){
      rg.value += '.'
    }
}


// mascara para número do endereço
function mascaraNumero(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    if (charCode != 8 && charCode != 9) {
        if (charCode < 48 || charCode > 57) {
            return false;
        }
    }
}

// validando CEP preenchendo os campos 'Nome da Rua' , 'Bairro', 'Cidade' e 'Estado'
function pegandoDadosCEP (i) {
    let xhr = new XMLHttpRequest()
    let url = 'https://viacep.com.br/ws/' + i + '/json/unicode/'
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