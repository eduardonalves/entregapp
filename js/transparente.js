$(document).ready(function(){

  $("#resultado").hide();

  //$('#showXml').modal('toggle')

  //$('#tabs a:first').tab('show');

  $("#sendToMoip").click(function(){
    applyToken();
    sendToCreditCard();
  });

  $("#sendToCofre").click(function(){
    applyToken();
    sendToCofre();
  });

  $("#boleto").click(function(){
    applyToken();
    sendToBoleto();
  });

  $("#debit").click(function() {
    applyToken();
    sendToDebit();
  });

  $("#calcular-btn").click(function(){
    applyToken();
    calcular();
  });

});

calcular = function() {
  var settings = {
    cofre: '',
    instituicao: $("#instituicao-calc-parcela").val(),
    callback: "retornoCalculoParcelamento"
  };

  MoipUtil.calcularParcela(settings);
};

retornoCalculoParcelamento = function(data) {
  alert(JSON.stringify(data));
};

sendToCreditCard = function() {
    var settings = {
        "Forma": "CartaoCredito",
        "Instituicao": $("#instituicao").val(),
        "Parcelas": $("input[name=Parcelas]").val(),
        "Recebimento": "AVista",
        "CartaoCredito": {
            "Numero": $("input[name=Numero]").val(),
            "Expiracao": $("input[name=Expiracao]").val(),
            "CodigoSeguranca": $("input[name=CodigoSeguranca]").val(),
            "Portador": {
                "Nome": $("input[name=Portador]").val(),
                "DataNascimento": $("input[name=DataNascimento]").val(),
                "Telefone": $("input[name=Telefone]").val(),
                "Identidade": $("input[name=CPF]").val()
            }
        }
    }

    $("#sendToMoip").attr("disabled", "disabled");
    MoipWidget(settings);
 };


sendToCofre = function() {
  var settings = {
      "Forma": "CartaoCredito",
      "Instituicao": "Visa",
      "Parcelas": $("input[name=Parcelas]").val(),
      "Recebimento": "AVista",
      "CartaoCredito": {
          "Cofre": $("input[name=Cofre]").val(),
          "CodigoSeguranca": $("input[name=CodigoSeguranca]").val()
      }
  }

    $("#sendToCofre").attr("disabled", "disabled");
    MoipWidget(settings);
 }


sendToDebit = function() {
  var settings = {
    "Forma": "DebitoBancario",
    "Instituicao": "BancoDoBrasil"
  };

  MoipWidget(settings);

  $("#link-debito").append("<a href='https://desenvolvedor.moip.com.br/Instrucao.do?token=" + $("#MoipWidget").attr("data-token") + "' target='_blank'>Abrir</a>");
}


sendToBoleto = function() {
  var settings = {
    "Forma": "BoletoBancario"
  };

  MoipWidget(settings);
};

var sucesso = function(data){
   /* alert(data.Mensagem +
        '\n\n Status: ' + data.Status +
        '\n ID Moip: ' + data.CodigoMoIP +
        '\n Valor Pago: ' + data.TotalPago +
        '\n Taxa Moip: ' + data.TaxaMoIP +
        '\n Cod. Operadora: ' + data.CodigoRetorno);*/
	
	$('#sendToMoip').hide();
    $("#sendToMoip").removeAttr("disabled");
    $("#sendToCofre").removeAttr("disabled");
	if( data.Status == 'EmAnalise'){
		
		$('#codigomoip').val(data.CodigoMoIP);
		$('#taxamoip').val(data.TaxaMoIP);
		$('#operadoramoip').val(data.CodigoRetorno);
		$('#statusmoip').val(data.Status);
		$('#pedir').trigger('click');
	}
	
};

var erroValidacao = function(data) {
   console.log(data);
   $.each(data, function(i, resultado){
   	$('#retCodMoip').html(resultado.Codigo);
	$('#retMsgMoip').html(resultado.Mensagem);
   });
   
  	$('#retCodMoip').html(data.Codigo);
	$('#retMsgMoip').html(data.Mensagem);
	
	$("#popupDialogCart").popup( "open" );
	$( "#sendToMoip" ).prop( "disabled", false );
   //$("#sendToMoip").removeAttr("disabled");
	//$("#sendToCofre").removeAttr("disabled");
   /* $.mobile.changePage("#page3");
	$('#retCodMoip').html(data.Codigo);
	$('#retMsgMoip').html(data.Mensagem);
	console.log(data);
	$("#popupDialogCart").popup( "open" );
    $("#sendToMoip").removeAttr("disabled");
    $("#sendToCofre").removeAttr("disabled");*/
	//alert("Erro !\n\n" + JSON.stringify(data));
	
};

var applyToken = function() {
  $("#MoipWidget").attr("data-token", $("#token").val());
};