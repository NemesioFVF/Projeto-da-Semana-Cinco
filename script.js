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


// mascara para CPF
function mCPF(i){
   
    var cpf = i.value;
    
     // apenas número 
    if(isNaN(cpf[cpf.length-1])){
       i.value = cpf.substring(0, cpf.length-1);
       return;
    }
    
    i.setAttribute("maxlength", "14");
    if (cpf.length == 3 || cpf.length == 7) i.value += ".";
    if (cpf.length == 11) i.value += "-";
 
 }