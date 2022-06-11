$(function () {

  $('form').on('submit', function (e) {
    e.preventDefault();

    $.ajax({
      type: 'post',
      url: 'https://feegcmfjie.execute-api.us-east-1.amazonaws.com/versao1',
      data: $('form').serialize(),
      success: function (response) {
        if(response.statusCode == "409"){
          alert("Email já cadastrado! Tente novamente")
        }
        if(response.statusCode == "200"){
          alert("Usuário cadastrado com sucesso!")
          window.location.reload()
        }
      }
    });

  });

});

//mask para campo nome somente letras com acentos
$('#nome').keyup(function () {
  this.value = this.value.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g, '');
});

//mask para campo sobrenome somente letras com acentos
$('#sobrenome').keyup(function () {
  this.value = this.value.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g, '');
});
//mask para campo sobrenome somente letras e numeros
$('#numero').keyup(function () {
  this.value = this.value.replace(/[^A-Z0-9]/gi, '');
});

//mask para o campo cep
$('#cep').on('input', function () {
  $('#cep').mask("00000-000");
});

$('#cep').blur(function () {
  // debugger
  let cep = $('#cep').val();
  cep = cep.replace('.', '').replace('-', '')
  $.ajax({
    url: 'https://viacep.com.br/ws/' + cep + '/json/',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      if (data.erro != 'true') {
        alert('CEP encontrado!')
        console.log(data)
        $('#cidade').val(data.localidade);
        $('#estado').val(data.uf);
        $('#endereco').val(data.logradouro);
        $('#endereco').attr('title', data.logradouro)
      } else {
        alert('Cep não encontrado! Digite um cep válido.');
        $('#cep').val('');
      }
    }
  })
});

//mask para email
$('#email').keyup(function () {
  // debugger
  $('#email').mask("A", {
    translation: {
      "A": { pattern: /[\w@\-.+]/, recursive: true }
    }
  });
});

$('#confimarSenha').blur(function () {
  if ($('#confimarSenha').val() != $('#senha').val()) {
    alert('As senha não coincidem.');
    $('#confimarSenha').val('');
    $('#senha').val('');
    $('#btnSubmit').attr('disabled', true);
  } else {
    $('#btnSubmit').attr('disabled', false);
  }

});
