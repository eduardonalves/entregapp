function limparPedido() {
        cont=0;
        itens=0;
        //codigo="";
        contador=0;
        pag='dh';
        tipoTroco='Sim';
        itens=0;
        $('.clone').remove();
        $('#totalPedido').html('');
        $('#respTroco').html('');
        $('#respTrocoAux').val('');
        $("#PedidoA").val('entrega');
        $("#pagamentoPedido").val('0');
        $("#trocoRespostaPedido").val('0');
        $(".erroqtde").hide();
        $('#divProdutos').show();
        $('#divPagamento').hide();
        $('#proximoPedido').show();
        $('.spananterior').hide();
        $('.spanComprar').hide();

        $('.spanproximo').show();
        $('#pedir').hide();
        $('#spanComprar').hide();
        $("#auxvalortroco").val('');
        $("#respTrocoAux").val('');
        $("#respTroco").html('0,00');
        $('#totalPedidoPag').html('0,00');
        $('#voltarPedido').hide();
         $('#entrega_valor').hide();
         $('#totalPedidoPag').html('');
        $('#totalEntrega').html('');
        $('#totalPedidoEntrega').html('');
        $('#entrega_valor').val('');


        $('#lradio-choice-t-6a').removeClass('ui-radio-on');

        $('#lradio-choice-t-6b').removeClass('ui-radio-on');
        $('#lradio-choice-t-6c').removeClass('ui-radio-on');
        $('#lradio-choice-t-6a').removeClass('ui-radio-off');
        $('#lradio-choice-t-6b').removeClass('ui-radio-off');
        $('#lradio-choice-t-6c').removeClass('ui-radio-off');

        $('#lradio-choice-t-6a').addClass('ui-radio-on');
        $('#lradio-choice-t-6b').addClass('ui-radio-off');
        $('#lradio-choice-t-6c').addClass('ui-radio-off');

        $('#radio-choice-t-6a').attr('data-cacheval', true);
        $('#radio-choice-t-6b').attr('data-cacheval', false);
        $('#radio-choice-t-6c').attr('data-cacheval', false);

        $('#lbchoicea').removeClass('ui-radio-on');
        $('#lbchoicea').removeClass('ui-radio-off');
        $('#lbchoiceb').removeClass('ui-radio-on');
        $('#lbchoiceb').addClass('ui-radio-off');


        $('#radio-choice-t-7a').attr('data-cacheval', true);
        $('#radio-choice-t-7b').attr('data-cacheval', false);

        $('#trocoRespostaPedido').val('Sim');
        $('#pagamentoPedido').val(1);

        $('#divAuxTroco').hide();
        $('#auxCartao').hide();
        $('#respTroco').html('R$ 0,00');

    }
    function atualizarCidadesIndex(){


         $.ajax({
                type: "GET",
                url: URLAPP+"RestPedidos/getLocalidadePedidos.json?fp="+filialPadrao+"&p=c",
                dataType: 'json',
                crossDomain: true,
                timeout:15000,



                success: function(data){


                    $('.cloneOptCitade').remove();


                    $.each(data, function(i, resultado){
                        $.each(resultado, function(j, cidades){

                        $('.cidade').append('<option class="cloneOptCitade" data-id="'+cidades.Cidad.id+'" value="'+cidades.Cidad.cidade+'">'+cidades.Cidad.cidade+'</option>');
                        $('#entregaOutroCidade').append('<option class="cloneOptCitade" data-id="'+cidades.Cidad.id+'" value="'+cidades.Cidad.cidade+'">'+cidades.Cidad.cidade+'</option>');

                        });

                    });

                     //$.mobile.loading( "hide" );

                },error: function(data){




                    $("#popupDialogLocalodade2").popup( "open" );

                     $.mobile.loading( "hide" );
                    //$('#cidadeEdit').val('').change();

                }

            });

    }

 function atualizarCidades(){
    $.mobile.loading( "show" );

         $.ajax({
                type: "GET",
                url: URLAPP+"RestPedidos/getLocalidadePedidos.json?fp="+filialPadrao+"&p=c",
                dataType: 'json',
                crossDomain: true,
                timeout:15000,



                success: function(data){


                    $('.cloneOptCitade').remove();


                    $.each(data, function(i, resultado){
                        $.each(resultado, function(j, cidades){

                        $('.cidade').append('<option class="cloneOptCitade" data-id="'+cidades.Cidad.id+'" value="'+cidades.Cidad.cidade+'">'+cidades.Cidad.cidade+'</option>');
                        $('#entregaOutroCidade').append('<option class="cloneOptCitade" data-id="'+cidades.Cidad.id+'" value="'+cidades.Cidad.cidade+'">'+cidades.Cidad.cidade+'</option>');

                        });

                    });

                     $.mobile.loading( "hide" );

                },error: function(data){



                    $("#popupDialogLocalodade").popup( "open" );
                     $.mobile.loading( "hide" );
                     $('#cidadeEdit').val('').change();
                     setTimeout(function(){
                        atualizarCidades();
                     },15000);

                }

            });


    }
    function atualizarBairros(cidade_id){
          $.mobile.loading( "show" );
         $.ajax({
                type: "GET",
                url: URLAPP+"RestPedidos/getLocalidadePedidos.json?fp="+filialPadrao+"&p=b&c="+cidade_id+"",
                dataType: 'json',
                crossDomain: true,
                timeout:15000,



                success: function(data){
                     $.mobile.loading( "show" );

                     $('.cloneOptBairro').remove();
                     selectBairroEdit = $('#bairroEdit');

                    $.each(data, function(i, resultado){
                        $.each(resultado, function(j, bairros){
                            $('#bairroEdit').append('<option class="cloneOptBairro" data-taxa="'+bairros.Bairro.valor+'" data-id="'+bairros.Bairro.id+'" value="'+bairros.Bairro.bairro+'">'+bairros.Bairro.bairro+'</option>');
                        });

                    });


                    if(typeof getBairroFromCep !=='undefined')
                    {
                        if(getBairroFromCep != null)
                        {
                            $('#bairroEdit').val(getBairroFromCep).change();
                            $('#bairroEdit option [value="'+getBairroFromCep+']"').attr('selected','selected');
                            getBairroFromCep=null;
                        }


                    }
                    setTimeout(function(){
                        $.mobile.loading( "hide" );
                    },5000);

                   // selectBairroEdit.selectmenu();
                    //selectBairroEdit.selectmenu('refresh', true);
                },error: function(data){

                    setTimeout(function(){
                        $('#popupDialogLocalodade').popup('open');
                         $.mobile.loading( "hide" );
                         $('#cidadeEdit').val('').change();
                    },5000);



                }

            });


    }
    function atualizarBairrosOutro(cidade_id){
         $.mobile.loading( "show" );
         $.ajax({
                type: "GET",
                url: URLAPP+"RestPedidos/getLocalidadePedidos.json?fp="+filialPadrao+"&p=b&c="+cidade_id+"",
                dataType: 'json',
                crossDomain: true,
                timeout:15000,



                success: function(data){
                     $.mobile.loading( "show" );

                     $('.cloneOptBairroOutro').remove();
                     seletcBairro = $('#entregaOutroBairro');
                    $.each(data, function(i, resultado){
                        $.each(resultado, function(j, bairros){
                            $('#entregaOutroBairro').append('<option class="cloneOptBairroOutro" data-taxa="'+bairros.Bairro.valor+'" data-id="'+bairros.Bairro.id+'" value="'+bairros.Bairro.bairro+'">'+bairros.Bairro.bairro+'</option>');
                        });

                    });
                    //seletcBairro.selectmenu();
                    //seletcBairro.selectmenu('refresh', true);
                    $.mobile.loading( "hide" );


                },error: function(data){
                    setTimeout(function(){
                        $("#popupDialogLogin4").popup( "open" );
                        $.mobile.loading( "hide" );
                    },1000);


                }

            });


    }
function removeDiacritics (str) {

  var defaultDiacriticsRemovalMap = [
    {'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
    {'base':'AA','letters':/[\uA732]/g},
    {'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
    {'base':'AO','letters':/[\uA734]/g},
    {'base':'AU','letters':/[\uA736]/g},
    {'base':'AV','letters':/[\uA738\uA73A]/g},
    {'base':'AY','letters':/[\uA73C]/g},
    {'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
    {'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
    {'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
    {'base':'DZ','letters':/[\u01F1\u01C4]/g},
    {'base':'Dz','letters':/[\u01F2\u01C5]/g},
    {'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
    {'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
    {'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
    {'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
    {'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
    {'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
    {'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
    {'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
    {'base':'LJ','letters':/[\u01C7]/g},
    {'base':'Lj','letters':/[\u01C8]/g},
    {'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
    {'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
    {'base':'NJ','letters':/[\u01CA]/g},
    {'base':'Nj','letters':/[\u01CB]/g},
    {'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
    {'base':'OI','letters':/[\u01A2]/g},
    {'base':'OO','letters':/[\uA74E]/g},
    {'base':'OU','letters':/[\u0222]/g},
    {'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
    {'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
    {'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
    {'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
    {'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
    {'base':'TZ','letters':/[\uA728]/g},
    {'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
    {'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
    {'base':'VY','letters':/[\uA760]/g},
    {'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
    {'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
    {'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
    {'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
    {'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
    {'base':'aa','letters':/[\uA733]/g},
    {'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
    {'base':'ao','letters':/[\uA735]/g},
    {'base':'au','letters':/[\uA737]/g},
    {'base':'av','letters':/[\uA739\uA73B]/g},
    {'base':'ay','letters':/[\uA73D]/g},
    {'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
    {'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
    {'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
    {'base':'dz','letters':/[\u01F3\u01C6]/g},
    {'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
    {'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
    {'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
    {'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
    {'base':'hv','letters':/[\u0195]/g},
    {'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
    {'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
    {'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
    {'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
    {'base':'lj','letters':/[\u01C9]/g},
    {'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
    {'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
    {'base':'nj','letters':/[\u01CC]/g},
    {'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
    {'base':'oi','letters':/[\u01A3]/g},
    {'base':'ou','letters':/[\u0223]/g},
    {'base':'oo','letters':/[\uA74F]/g},
    {'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
    {'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
    {'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
    {'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
    {'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
    {'base':'tz','letters':/[\uA729]/g},
    {'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
    {'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
    {'base':'vy','letters':/[\uA761]/g},
    {'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
    {'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
    {'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
    {'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
  ];

  for(var i=0; i<defaultDiacriticsRemovalMap.length; i++) {
    str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
  }

  return str;

}
var getSituacaoCampainha;
var sessionIdPag;
$(document).ready(function() {


    function pagSeguroGetSession(id) {

    //  var urlAction2 = URLAPP+"RestPedidos/getSessionPag.json?b="+cliente.Cliente.id+"&c="+cliente.Cliente.token+"&fp="+filialPadrao+"&lj="+empresa+"";
      var urlAction2 = URLAPP+"RestPedidos/getSessionPag.json?id="+id+"";

  //    var dadosForm2 = $("#PedidoAddForm").serializeArray();
      $.ajax({
          type: "GET",
          url: urlAction2,
          //data:  dadosForm2,
          dataType: 'json',
          crossDomain: true,
           timeout:15000,

          success: function(data){
              $.mobile.loading( "hide" );
                console.log(data);
              //sessionIdPag=data.resultados;
              PagSeguroLightbox(data.resultados);
          },error: function(data){
              $.mobile.loading( "hide" );
              resposta  = data.responseText;
              resposta= resposta.substring(37,47);
              if(resposta == 'senderName'){
                resposta = "O nome cadastrado deve ser composto por nome e sobrenome. Por favor atualize seu cadastro."
              }else{

                resposta=data.responseText;
              }

              $('#erroPagseguro').html(resposta);
              $("#popupErroPagSeguro").popup( "open" );


          //fazer a critica do erro
          }
      });
    }


    $('#btn-pagseguro').click(function () {
      pedidoId=$('#idPedidoAux').html();
      $.mobile.loading( "show" );
      pagSeguroGetSession(pedidoId);
      console.log(pedidoId);
    });
    //simPag();
    $('body').on('click','#bt-lgesqueci',function(){
        $("#popEsqueciSenha").popup( "open" );
    });
    $('body').on('focusout', '.password',function(){
        mypassword=$('#passwordEdit').val();
        checpassword = $('#passwordConfEdit').val();
        if(mypassword != '' && checpassword != ''){
            if(mypassword != checpassword)
            {
                $('.password').addClass('red-border');
                $('.difpass').fadeIn('slow');
            }else{
                 $('.password').removeClass('red-border');
                 $('.difpass').fadeOut('fast');

            }
            setTimeout(function(){
                $('.password').removeClass('red-border');
                 $('.difpass').fadeOut('slow');
                 },30000);
        }

    });
    $('#esqueciSenha').submit(function(event){
        event.preventDefault();

        usernameToRecover = $('#usernamerecorver').val();
        var urlAction = URLAPP+"RestClientes/recuperarsenha.json?clt="+usernameToRecover+"";

        $.mobile.loading( "show" ,{theme: 'b'});
        $.ajax({
            type: "GET",
            url: urlAction,
            dataType: 'json',
            crossDomain: true,
            timeout:15000,



            success: function(data){


                if(data.ultimocliente == 'ok'){
                   mengagemRecSenha = "Sucesso: Sua solicitação foi enviada para seu email de cadastro.";
                }else{
                     mengagemRecSenha = "Erro: Não foi possível enviar sua solicitação, este usuário não posssui email cadastrado.";

                }
                $('#html-popRecover').html(mengagemRecSenha);
                $.mobile.loading( "hide" );
                $("#popEsqueciSenha").popup( "close" );
                setTimeout(function(){
                     $("#popRecoverPassword").popup( "open" );
                },1000);


            },error: function(data){
               $('#html-popRecover').html('Erro: Não foi possível estabelecer uma conexão, verifique sua internet e tente novamente.');
                $.mobile.loading( "hide" );
                $("#popEsqueciSenha").popup( "close" );
               setTimeout(function(){
                     $("#popRecoverPassword").popup( "open" );
                },1000);


            }
        });

    });

    $('.endEntrega').focusout(function(){

        outroEndereco = $('#entregaRua').val()+' '+$('#entregaNumero').val() + ' | Bairro: '+$('#entregaOutroBairro').val()+' | Cidade: '+$('#entregaOutroCidade').val() +' | Telefone: '+$('#entregaTelefone').val()+' | Ponto de Refer&ecirc;ncia: '+$('#entregaReferencia').val() ;
        $('#endEntrega').val(outroEndereco);
    });
    $('#recalcularFrete').click(function(event){
        event.preventDefault();

           if($('#entregaRua').val() == '' || $('#entregaOutroBairro').val() ==''  || $('#entregaOutroCidade').val() =='' || $('#entregaTelefone').val() =='' || $('#entregaReferencia').val() =='')
           {
                $("#popupRecalculoEntrega").popup( "open" );
                return false;
           }

        $('.loginsalt').val(salt);
        var urlAction = URLAPP+"RestPedidos/calculafrete.json?fp="+filialPadrao+"";
        var dadosForm = $("#PedidoAddForm").serialize();
        cidadeCheck = $('#entregaOutroCidade').val();
        cidadeCheck =cidadeCheck.replace(/ /g,'');


        bairroCheck = $('#entregaOutroBairro').val();
        bairroCheck =bairroCheck.replace(/ /g,'');

        estadoCheck = $('#entregaOutroEstado').val();
        estadoCheck =estadoCheck.replace(/ /g,'');
        filialCheck =  $('#filialPedido').val();
        var dadosForm2={'Pedido':{'entrega_outro_cidade':cidadeCheck, 'entrega_outro_bairro':bairroCheck, 'entrega_outro_estado':estadoCheck,'filial_id':filialCheck}};
        console.log(dadosForm2);
        $.mobile.loading( "show" ,{theme: 'b'});
        $.ajax({
            type: "POST",
            url: urlAction,
            data:  dadosForm2,
            dataType: 'json',
            crossDomain: true,
            timeout:15000,



            success: function(data){

                $.mobile.loading( "hide" );
                if(data.resultados != false){
                    $('#totalEntrega').html('R$ '+ data.resultados);
                    $('#entrega_valor').val(data.resultados);
                    vlFrete=data.resultados;
                    vlFrete= vlFrete.toString();
                    totalProd =$('#totalPedidoPag').text();
                    totalProd=totalProd.substring(3);
                    totalProd = totalProd.replace('.','');
                    totalProd = totalProd.replace(',','.');
                    totalProd = parseFloat(totalProd);
                     $('#spanRecalcEntrega').html(vlFrete);
                    vlFrete= vlFrete.replace(',','.')
                    vlFrete=parseFloat(vlFrete);

                    vlTotalComFrete = totalProd + vlFrete;
                    vlTotalComFrete= vlTotalComFrete.toFixed(2);
                    vlTotalComFrete = vlTotalComFrete.toString();
                    vlTotalComFrete= vlTotalComFrete.replace('.',',');
                    $('#totalPedidoEntrega').html('R$ '+ vlTotalComFrete);
                     $("#popupSimEntrega").popup( "open" );

                   $('#pedir').show();
                   $('#spanComprar').show();
                }else{
                     $('#pedir').hide();
                     $('#spanComprar').hide();
                      $("#popupNaoEntrega").popup( "open" );

                }



            },error: function(data){

               $("#popupDialogLogin4").popup( "open" );
                $.mobile.loading( "hide" );

            }
        });
});
statusLoja();
setInterval(function(){
    statusLoja();
},120000);
function statusLoja(){


        minhaUrl=URLAPP+"RestPedidos/statusloja.json?fp="+filialPadrao+"";
         $.ajax({
                type: "GET",
                url: minhaUrl,
                dataType: 'json',
                crossDomain: true,



                success: function(data){



                    $.each(data, function(i, resultados){

                            if(resultados.Filial.status_abertura==true){
                                $('.textStatus').html('Loja Dispon&iacute;vel');
                                $('.divDisp').removeClass('none');
                                $('.divDisp').addClass('classGren');
                                 if(resultados.Filial.tempo_atendimento !='00:00:00'){
                                    $('.mediaAtendimento').html('Tempo de Aguardo: '+resultados.Filial.tempo_atendimento).addClass('mediaAtendimentoAtivo').removeClass('none');
                                }
                            }else{
                                 $('.textStatus').html('Loja Indispon&iacute;vel');
                                $('.divDisp').removeClass('classGren');
                                $('.divDisp').addClass('none');
                                $('.mediaAtendimento').html('Indispon&iacute;vel').addClass('none');
                            }


                    });

                },error: function(data){
                        $('.textStatus').html('Loja Indispon&iacute;vel');
                        $('.divDisp').removeClass('classGren');
                        $('.divDisp').addClass('none');
                       $('.mediaAtendimento').html('Indispon&iacute;vel').addClass('none');
                }

            });



};

$(document).on("pageshow","#index_old",function(){
    //cliente ="";
    $('.limpar').val('');
});



//$("html, body").niceScroll({cursorcolor:"#FF5C0A" });
        $(".MenuListaProdutos, #btnEntrega, #submitAtendimento").click(function(){

            //atualizarProduto();
            $.mobile.loading( "hide" );
        });
        $('.novopedido').click(function(){

            //atualizarProduto();

            $.mobile.loading( "hide" );
            $('#sendToMoip').hide();
        });
        $('#contentIndex').hide();
        $.mobile.loading( "show" );
        var verificaPedido='';
        $(".erroqtde").hide();
        //$('#divProdutos').show();
        //$('#divPagamento').hide();
        $('#proximoPedido').show();
        $('#pedir').hide();
        $('#spanComprar').hide();
        $('#voltarPedido').hide();
        $('.spananterior').hide();
         $('.spanComprar').hide();
        $('.spanproximo').show();


         setTimeout(function(){

            atualizarPromo();
            limparPedido();
            atualizarProduto();
         },2000);
    flagCadastro=false;

    $(document).on("pageshow","#index",function(){ // When entering pagetwo


        atualizarPromo();
        limparPedido();
        atualizarCidadesIndex();
        atualizarProduto();
        if(flagCadastro==true){
            $("#popupCaadastroSuccess").popup( "open" );
            flagCadastro=false;
        }
         $('#filialPedido').val(filialPadrao);
         $("#empresaPedido").val(empresa);
         $("#PedidoA").val(codigoAtend);
         codigo="entrega";
        $("#PedidoA").val(codigo);
        if(cliente != ''){
            $('#clientePedido').val(cliente.Cliente.id);
            if(verificaPedido != ''){
                clearInterval(verificaPedido);
            }


        }else{
            //$('.formaDEpagamento').append('<option class="cloneOptPgt" value="'+pagamento.id+'">'+pagamento.tipo+'</option>');
        }


    });

    $(document).on("change", ".compostoAdd", function(){

        prodId1='';
        prodId2='';
        prodTamanho="";
        itenObs="";
        comboId = $(this).attr('data-produto');

        tamanhoChange  = $("#compostoTamanho"+comboId).find('option:selected').attr('data-tamanho');
        tamanhoChange = removeDiacritics(tamanhoChange);
        tamanhoChange = tamanhoChange.replace(' ', '');
        vlUm  = $("#compostoAdd1"+comboId).find('option:selected').attr('data-'+tamanhoChange);
        vlDois  = $("#compostoAdd2"+comboId).find('option:selected').attr('data-'+tamanhoChange);



        if(typeof vlUm !== "undefined" &&  typeof vlDois !== "undefined")
        {

            prodOpt1  = $("#compostoAdd1"+comboId).find('option:selected').attr('id');
            nomeProd1  = $("#compostoAdd1"+comboId).find('option:selected').text();
            prodId1 =  prodOpt1.substring(12);

            prodOpt2  = $("#compostoAdd2"+comboId).find('option:selected').attr('id');
            prodId2 =  prodOpt2.substring(12);
            nomeProd2  = $("#compostoAdd2"+comboId).find('option:selected').text();
            prodTamanho=tamanhoChange;

            if(prodTamanho==''){
                prodTamanho="NT";
            }

            vt = vlUm;
            if(vlUm > vlDois){
                vt = vlUm;
            }else{
                vt = vlDois;
            }
            vt= parseFloat(vt);
            vt = vt.toFixed(2);
            vt = String(vt);
            vt = vt.replace('.',',');

            $('#btnAddProd'+comboId).attr('data-produtoid1',prodId1);
            $('#btnAddProd'+comboId).attr('data-produtoid2',prodId2);

            $('#btnAddProd'+comboId).attr('data-produtoNome1',nomeProd1);
            $('#btnAddProd'+comboId).attr('data-produtoNome2',nomeProd2);

            $('#btnAddProd'+comboId).attr('data-tamanho',prodTamanho);

            $('#btnAddProd'+comboId).attr('data-vlu',vt);

            $('#precoComposto'+comboId).html('R$ '+vt);
            $('#precoComposto'+comboId).css('display', 'block');



        }else{
            $('.precoComposto').css('display', 'none');

            $('#btnAddProd'+comboId).attr('data-produtoid1','');
            $('#btnAddProd'+comboId).attr('data-produtoid2','');
            $('#btnAddProd'+comboId).attr('data-tamanho','');
            $('#btnAddProd'+comboId).attr('data-produtoNome1','');
            $('#btnAddProd'+comboId).attr('data-produtoNome2','');

        }




     /* ;

      vlUm = $("#compostoAdd1"+minhaId).find('option:selected').val();

      vlDois = $("#compostoAdd2"+minhaId).find('option:selected').val();

     if(vlUm != 0 &&  vlDois !=0){


        prodOpt1  = $("#compostoAdd1"+minhaId).find('option:selected').attr('id');
        prodId1 =  prodOpt1.substring(12);

        prodOpt2  = $("#compostoAdd2"+minhaId).find('option:selected').attr('id');
        prodId2 =  prodOpt2.substring(12);


        vt = vlUm;
        if(vlUm > vlDois){
            vt = vlUm;
        }else{
            vt = vlDois;
        }
        vt= parseFloat(vt);
        vt = vt.toFixed(2);
        vt = String(vt);
        vt = vt.replace('.',',');
        $('#btnAddProd'+minhaId).attr('data -vlu',vt);

        $('#precoComposto'+minhaId).html('R$ '+vt);
        $('#precoComposto'+minhaId).css('display', 'block');
        $('#btnAddProd'+minhaId).css('display', 'inline-block');
     }else{
        $('.precoComposto').css('display', 'none');
        $('.addProdutoComposto').css('display', 'none');
     }
     */

    });

    $(document).on("change", ".bebidas", function(){

         selectBebidasId= $(this).attr('data-id');

        bebId  = $("#selectBebidas_"+selectBebidasId).find('option:selected').attr('data-id');
        bebNome  = $("#selectBebidas_"+selectBebidasId).find('option:selected').attr('data-nome');

        $('#btnAddProd'+selectBebidasId).attr('data-bebidaid',bebId);
        $('#btnAddProd'+selectBebidasId).attr('data-bebidanome',bebNome);
    });

    $(document).on("change", ".pagueGanhe", function(){

         selectPagueGanheId= $(this).attr('data-id');

        pagGanId  = $("#selectPagueGanhe_"+selectPagueGanheId).find('option:selected').attr('data-id');
        pagGanNome  = $("#selectPagueGanhe_"+selectPagueGanheId).find('option:selected').attr('data-nome');

        $('#btnAddProd'+selectPagueGanheId).attr('data-pagueganheid',pagGanId);
        $('#btnAddProd'+selectPagueGanheId).attr('data-pagueganhenome',pagGanNome);
    });

    $(document).on("change", ".comboTamanho", function(){



        produtoTamId = $(this).attr('data-produto');

        tamanho  = $("#comboTamanho"+produtoTamId).find('option:selected').attr('data-tamanho');
        if(typeof tamanho !== "undefined")
        {


            precoTamSimples  = $("#comboTamanho"+produtoTamId).find('option:selected').attr('data-preco');

            //Se nÃ£o tiver preÃ§o o produto Ã© composto
            if(precoTamSimples != 'NaN' && precoTamSimples  !='' ){


                vt = precoTamSimples;

                vt= parseFloat(vt);
                vt = vt.toFixed(2);
                vt = String(vt);
                vt = vt.replace('.',',');
                $('#btnAddProd'+produtoTamId).attr('data-vlu',vt);

                $('.precotam'+produtoTamId).html('R$ '+vt);
                $('.precotam'+produtoTamId).css('display', 'block');

                $('#btnAddProd'+produtoTamId).attr('data-tamanho',tamanho);

            }else{
                $('#compostoAdd1'+produtoTamId).css('display', 'block');
                $('#compostoAdd2'+produtoTamId).css('display', 'block');
                $('#compostoLabelAdd'+produtoTamId).css('display', 'block');
                $("#compostoAdd1"+produtoTamId).val(0);
                $("#compostoAdd2"+produtoTamId).val(0);
                $('.precoComposto').css('display', 'none');

                $('#btnAddProd'+produtoTamId).attr('data-tamanho','');
            }

            possuiBebida  = $("#comboTamanho"+produtoTamId).find('option:selected').attr('data-bolbebida');

            if(possuiBebida=='true'){
                $('.bebidas_'+produtoTamId).css('display','block');
            }else{
                $('.bebidas_'+produtoTamId).css('display','none');
                $('#btnAddProd'+produtoTamId).attr('data-bebidanome','');
                $('#btnAddProd'+produtoTamId).attr('data-bebidaid','');
            }
            possuiPagGanhe  = $("#comboTamanho"+produtoTamId).find('option:selected').attr('data-bolganhe');

            if(possuiPagGanhe=='true'){
                $('.pagueGanhe_'+produtoTamId).css('display','block');
            }else{
                $('.pagueGanhe_'+produtoTamId).css('display','none');
                $('#btnAddProd'+produtoTamId).attr('data-pagueganheid','');
                $('#btnAddProd'+produtoTamId).attr('data-pagueganhenome','');
            }

        }else{


            $('.precotam').css('display', 'none');
            $('.dispNoneTam').css('display', 'none');
            $('#compostoAdd1'+produtoTamId).css('display', 'none');
            $('#compostoAdd2'+produtoTamId).css('display', 'none');
            $('#compostoLabelAdd'+produtoTamId).css('display', 'none');
            $("#compostoAdd1"+produtoTamId).val(0);
            $("#compostoAdd2"+produtoTamId).val(0);

        }
        /*alert();
        tamPreco  = $("#selectTamanho"+produtoTamId).find('option:selected').attr('data-preco');
        tamTamanho = $("#selectTamanho"+produtoTamId).find('option:selected').attr('data-tamanho');
        if(tamPreco !='' && tamPreco!=null ){
            vt= parseFloat(tamPreco);
            vt = vt.toFixed(2);
            vt = String(vt);
            vt = vt.replace('.',',');
            if(isNaN(tamPreco))
            {
                $('#compostoAdd1'+produtoTamId).css('display', 'block');
                $('#compostoAdd2'+produtoTamId).css('display', 'block');
            }else
            {
                $('.precotam'+produtoTamId).html('R$ '+vt);
                $('.precotam'+produtoTamId).css('display', 'block');
                $('#btnAddProd'+produtoTamId).attr('data-vlu',vt);
                $('#btnAddProd'+produtoTamId).attr('data-tamanho',tamTamanho);
                $('#btnAddProd'+produtoTamId).css('display', 'inline-block');

            }

        }else{
            $('.precotam').css('display', 'none');
            $('.dispNoneTam').css('display', 'none');
            $('#compostoAdd1'+produtoTamId).css('display', 'none');
            $('#compostoAdd2'+produtoTamId).css('display', 'none');
        }*/


        //tamanhoId =  $("#selectTamanho"+minhaId).find('option:selected').attr('id');
    });
    $(document).on("change", ".compostoTamanho", function(){
        produtoTamId = $(this).attr('data-produto');
        valorSelect= $(this).val();
        if(valorSelect != 0){
          $('#compostoAdd1'+produtoTamId).css('display', 'block');
          $('#compostoAdd2'+produtoTamId).css('display', 'block');
          $('#compostoLabelAdd'+produtoTamId).css('display', 'block');
          $("#compostoAdd1"+produtoTamId).val(0);
          $("#compostoAdd2"+produtoTamId).val(0);
          $('.precoComposto').css('display', 'none');

          $('#btnAddProd'+produtoTamId).attr('data-tamanho','');
        }else{
          $('.precotam').css('display', 'none');
          $('.dispNoneTam').css('display', 'none');
          $('#compostoAdd1'+produtoTamId).css('display', 'none');
          $('#compostoAdd2'+produtoTamId).css('display', 'none');
          $('#compostoLabelAdd'+produtoTamId).css('display', 'none');
          $("#compostoAdd1"+produtoTamId).val(0);
          $("#compostoAdd2"+produtoTamId).val(0);

        }
        possuiBebida  = $("#compostoTamanho"+produtoTamId).find('option:selected').attr('data-bolbebida');

        if(possuiBebida=='true'){
            $('.bebidas_'+produtoTamId).css('display','block');
        }else{
            $('.bebidas_'+produtoTamId).css('display','none');
            $('#btnAddProd'+produtoTamId).attr('data-bebidanome','');
            $('#btnAddProd'+produtoTamId).attr('data-bebidaid','');
        }
        possuiPagGanhe  = $("#compostoTamanho"+produtoTamId).find('option:selected').attr('data-bolganhe');

        if(possuiPagGanhe=='true'){
            $('.pagueGanhe_'+produtoTamId).css('display','block');
        }else{
            $('.pagueGanhe_'+produtoTamId).css('display','none');
            $('#btnAddProd'+produtoTamId).attr('data-pagueganheid','');
            $('#btnAddProd'+produtoTamId).attr('data-pagueganhenome','');
        }
    });
    function gerarListaProdutos(ob, j){
        $.mobile.loading( "show");
        var selectTamanho="";
        var  dataTamanhos="";
        var  dataTamanhosPrecos="";
        selectBebidas="";
        selectpagueGanhe="";
        contTam=0;

        if(bebidas != null){


            bebidaNone='noneImportant';
            if(ob.acompanha_bebida ==true){
                bebidaNone='';

            }
            selectBebidas='<label class="labelBedidas '+bebidaNone+' bebidas bebidas_'+ob.id+'" >Bebida</label><select id="selectBebidas_'+ob.id+'" class="selectBeidas '+bebidaNone+' bebidas bebidas_'+ob.id+'"  data-id="'+ob.id+'">'+bebidas+'</select>';
        }

        if(pagueGanhe != null){


            pagueGanheNone='noneImportant';
            if(ob.promo_compre_ganhe ==true){
                pagueGanheNone='';

            }
            selectpagueGanhe='<label class="labelGanhe '+pagueGanheNone+' pagueGanhe pagueGanhe_'+ob.id+'">Ganhe</label><select  id="selectPagueGanhe_'+ob.id+'" data-id="'+ob.id+'" class="selectGanhe '+pagueGanheNone+' pagueGanhe pagueGanhe_'+ob.id+'">'+pagueGanhe+'</select>';
        }

        if(ob.ativo == 1){

            if(ob.disponivel == 1){
                vlunit= parseFloat(ob.preco_venda);
                vlunit = vlunit.toFixed(2);

                tamanhoAddValues = "<option value='0'>Selecione</option>";
                selectTamanho="";
                classNone="";

                if(ob.composto == 1){

                    compostoAddValues = "<option value='0'>Selecione</option>";


                      if(typeof ob.tamanhos != 'undefined')
                      {
                        $.each(ob.tamanhos, function(p, tamanhoscompostos){
                            $.each(ob.tamanhos, function(h, tam){

                                    $.each(tam, function(y, ta){
                                        if(contTam<=4){
                                               if(typeof  ta.Tamanho !== 'undefined'){
                                                    if(ta.Tamanho.ativo==1){
                                                        classNone="dispNoneTam";
                                                        myString= ta.Tamanho.nome;
                                                        if(typeof myString !== "undefined")
                                                        {
                                                            myString = removeDiacritics(myString);
                                                            myString = myString.replace(' ','');

                                                            myString= myString.toLowerCase();
                                                        }
                                                        vlunitTamSimples= parseFloat(ta.Tamanho.preco);
                                                        vlunitTamSimples = vlunitTamSimples.toFixed(2);
                                                        if(ta.Tamanho.nome != '' ){
                                                            tamanhoAddValues = tamanhoAddValues+ " <option id=produtoComb"+ta.Tamanho.id+" data-tamanho='"+myString+"' value='"+myString+"' data-id='"+ta.Tamanho.id+"'' data-preco='"+vlunitTamSimples+"'' data-bolbebida='"+ta.Tamanho.acompanha_bebida+"''  data-bolganhe='"+ta.Tamanho.promo_compre_ganhe+"''>"+ta.Tamanho.nome+"</option> ";
                                                        }

                                                    }
                                            }
                                            contTam++;
                                        }

                                    });


                            });

                        });
                        selectTamanho='<label class="labelTamanho">Tamanho</label><select class="compostoTamanho" id="compostoTamanho'+ob.id+'"  data-produto="'+ob.id+'" >'+tamanhoAddValues+'</select>';
                      }



                    var dataTam="";
                    if(typeof ob.produtoscomposicao !='undefined')
                    {
                      $.each(ob.produtoscomposicao, function(n, composicao){


                          $.each(composicao, function(m, composto){


                              $.each(composto, function(n, tamanho){

                                  if(typeof tamanho.tamanhos !== "undefined")
                                  {
                                      $.each(tamanho.tamanhos, function(k, tam){

                                          contTam=0;
                                          $.each(tam, function(h, ta){

                                              //if(contTam==0){


                                              if(typeof  ta.Tamanho !== 'undefined'){
                                                  if(ta.Tamanho.ativo==true){

                                                      if(typeof ta.Tamanho.nome !== 'undefined' && ta.Tamanho.nome !='' ){
                                                          vlunitTam= parseFloat(ta.Tamanho.preco);
                                                          vlunitTam = vlunitTam.toFixed(2);
                                                          tamNome = removeDiacritics(ta.Tamanho.nome);
                                                          tamNome = tamNome.replace(' ','');
                                                          tamNome= tamNome.toLowerCase();
                                                          dataTam = dataTam + " data-"+tamNome+"='"+vlunitTam+"'";
                                                      }



                                                  }
                                              }
                                                  contTam++;
                                              //}
                                          });

                                      });
                                  }

                              });

                              //vlunitComposto= parseFloat(composto.Produto.preco_venda);
                              //vlunitComposto = vlunitComposto.toFixed(2);

                              compostoAddValues = compostoAddValues+ " <option id=produtoComb"+n+composto.Produto.id+"  "+dataTam+">"+composto.Produto.nome+"</option> ";
                              dataTamanhos="";
                              dataTamanhosPrecos="";
                              dataTam="";
                          });

                      });
                    }

                    prvenda =parseFloat(ob.preco_venda);
                    prvenda =prvenda.toFixed(2);
                     prvenda = String(prvenda);
                    prvenda = prvenda.replace('.',',');
                    return '<div class= "slider">\
                    <div class="layerslide img-rounded"><div class="circulodivGrande"><img id="imgProd'+ob.id+'" src="'+ob.foto+'"  title="'+ob.nome+'" alt="'+ob.nome+'"   width="100px"  height="100px"/></div>\
                    <h4>'+ob.nome+'</h4><span class="preco precoComposto precotam '+classNone+' precotam'+ob.id+'" id="precoComposto'+ob.id+'">R$ '+prvenda+'</span><div data-role="popup" id="popupCloseRight'+ob.id+'" class="ui-content popDiv" style="max-width:280px" id="popDiv'+ob.id+'" >\
                    <p>'+ob.descricao+'</p>\
                    </div></div>\
                    '+selectTamanho+'\
                    <label id="compostoLabelAdd'+ob.id+'" class=" compostoLabelAdd  noneImportant">Sabores</label>\
                    <select type="text" class="compostoAdd '+classNone+'" id="compostoAdd1'+ob.id+'"  data-produto="'+ob.id+'" data-theme="b"  data-mini="true" >'+compostoAddValues+'</select>\
                    <select type="text" class="compostoAdd '+classNone+'" id="compostoAdd2'+ob.id+'" data-produto="'+ob.id+'"   data-theme="b"  data-mini="true">'+compostoAddValues+'</select>\
                    '+selectBebidas+'\
                    '+selectpagueGanhe+'\
                    <div class="divControles" data-role="controlgroup" data-mini="true">\
                    <select type="text" class="inputAdd" id="inputAdd'+ob.id+'"  data-theme="a" value="1"  data-mini="true">'+optionsValues+'</select>\
                    <input type="image" src="images/info.png" alt="info" class=" infoProduto infoProduto'+ob.id+'" id="infoProduto'+ob.id+'" >\
                    <input type="image" src="images/carrinho.png" class="addProduto addProdutoComposto" alt="adicionar" data-codigo="'+ob.id+'" data-produto="'+ob.nome+'" data-vlu="'+ob.preco_venda+'" data-produtoid1="" data-produtoid2="" data-tamanho="" id="btnAddProd'+ob.id+'" ></div></div>';
                    compostoAddValues="";
                    selectTamanho="";
                }else{


                    selectTamanho="";
                    flagTamanho=false;
                    tamanhoAddValues="<option value='0'>Selecione</option>";
                    contTam=0;
                    if(typeof ob.tamanhos != 'undefined')
                    {
                      $.each(ob.tamanhos, function(p, tamanhoscompostos){
                          $.each(ob.tamanhos, function(h, tam){
                              $.each(tam, function(y, ta){
                                  if(contTam<=4){
                                      if(ta.Tamanho.ativo==1){
                                          classNone="dispNoneTam";
                                          myString= ta.Tamanho.nome;
                                          if(typeof myString !== "undefined")
                                          {
                                              myString = removeDiacritics(myString);
                                              myString.split(' ').join('');

                                              myString= myString.toLowerCase();
                                          }
                                          vlunitTamSimples= parseFloat(ta.Tamanho.preco);
                                          vlunitTamSimples = vlunitTamSimples.toFixed(2);
                                          tamanhoAddValues = tamanhoAddValues+ " <option id=produtoComb"+ta.Tamanho.id+" data-tamanho='"+myString+"' value='"+myString+"' data-id='"+ta.Tamanho.id+"'' data-preco='"+vlunitTamSimples+"' data-bolbebida='"+ta.Tamanho.acompanha_bebida+"''  data-bolganhe='"+ta.Tamanho.promo_compre_ganhe+"''>"+ta.Tamanho.nome+"</option> ";
                                          flagTamanho=true;

                                      }
                                      contTam++;
                                  }
                              });
                          });
                      });
                      if(flagTamanho != false){
                          selectTamanho='<label class="labelTamanho">Tamanho</label><select class="selectTamanho comboTamanho" id="comboTamanho'+ob.id+'"  data-produto="'+ob.id+'" >'+tamanhoAddValues+'</select>';
                          flagTamanho=false;
                      }
                    }

                     prvenda =parseFloat(ob.preco_venda);
                    prvenda =prvenda.toFixed(2);
                    prvenda = String(prvenda);
                    prvenda = prvenda.replace('.',',');
                    return '<div class= "slider">\
                    <div class="layerslide img-rounded"><div class="circulodivGrande"><img id="imgProd'+ob.id+'" src="'+ob.foto+'"  title="'+ob.nome+'" alt="'+ob.nome+'"   width="100px"  height="100px"/></div>\
                    <h4>'+ob.nome+'</h4><span class="preco '+classNone+'  precotam precotam'+ob.id+'" >R$ '+prvenda+'</span><div data-role="popup" id="popupCloseRight'+ob.id+'" class="ui-content popDiv" style="max-width:280px" id="popDiv'+ob.id+'" >\
                    <p>'+ob.descricao+'</p>\
                    </div></div>'+selectTamanho+'\
                    '+selectBebidas+'\
                    '+selectpagueGanhe+'\
                    <div class="divControles" data-role="controlgroup" data-mini="true">\
                        <select type="text" class="inputAdd" id="inputAdd'+ob.id+'"  data-theme="a" value="1"  data-mini="true">'+optionsValues+'</select>\
                    <input type="image" src="images/info.png" alt="info" class=" infoProduto infoProduto'+ob.id+'" id="infoProduto'+ob.id+'" >\
                    <input type="image" src="images/carrinho.png" class="addProduto " alt="adicionar" data-codigo="'+ob.id+'" data-produto="'+ob.nome+'" data-vlu="'+ob.preco_venda+'" data-tamanho="" id="btnAddProd'+ob.id+'" ></div></div>';
                    selectTamanho="";
                }
            }else{

                vlunit= parseFloat(ob.preco_venda);
                vlunit = vlunit.toFixed(2);
                return '<div class= "slider">\
                <div class="layerslide img-rounded"><div class="circulodivGrande"><img id="imgProd'+ob.id+'" src="'+ob.foto+'"  title="'+ob.nome+'" alt="'+ob.nome+'"   width="100px"  height="100px"/></div>\
                <h4>'+ob.nome+'</h4><span class="preco">Indispon&iacute;vel</span><div data-role="popup" id="popupCloseRight'+ob.id+'" class="ui-content popDiv" style="max-width:280px" id="popDiv'+ob.id+'" >\
                <p>'+ob.descricao+'</p>\
                </div></div>\
                <div class="divControles" data-role="controlgroup" data-mini="true">\
                    <select type="text" class="inputAdd" id="inputAdd'+ob.id+'"  data-theme="a" value="1"  data-mini="true">'+optionsValues+'</select>\
                <input type="image" src="images/info.png" alt="info" class=" infoProduto infoProduto'+ob.id+'" id="infoProduto'+ob.id+'" >\
                <input type="image" src="images/carrinho.png" class="addProduto" DISABLED alt="adicionar" data-codigo="'+ob.id+'" data-produto="'+ob.nome+'" data-vlu="'+ob.preco_venda+'" id="btnAddProd'+ob.id+'" ></div></div>';
            }

        }else{
            nda="";
            return nda;
        }


     }

     var optionsValues='<option value="1" selected="selected">1</option>';
     function geraoption(){
        for(k=2; k<=50; k++){
            optionsValues= optionsValues + '<option value="'+k+'">'+k+'</option>';
        }
        return optionsValues;
     }

     geraoption();

     var colapsableTrue='';
     var contColapsable=0;
     function gerarListaCategoria(obj, z){
          $.mobile.loading( "show");
                    varprod="";
                    objProd =obj.Produto;
                    var ncat=0;
                    $.each(objProd, function(i, ob){
                        $.mobile.loading( "show");
                        varprod = varprod + gerarListaProdutos(ob, i);


                    });

        if(z == 0){
            colapsableTrue= 'data-collapsed="false"';
        }else{
            colapsableTrue="";
        }
         var content = '<div data-role="collapsible" id="set'+z+'" data-theme="b" data-content-theme="b" class ="abaconteudo" >\
         <h3>'+obj.Categoria.nome+'</h3><div id="owl-example'+z+'" data-role="listview" data-inset="true" class="listview" >'+varprod+'</div></div>';


            //$('.listview').owlCarousel({navigation : true,  navigationText : ["ant","prox"], pagination : false,});
            $.mobile.loading( "show");



        return content;

     }


function atualizarProduto(){

        $('#set').html('');
        $.mobile.loading( "show");
        $('#contentIndex').hide();
        minhaUrl=URLAPP+"RestProdutos/prodsmobile.json?se="+empresa+"&sf=&fp="+filialPadrao+"";
         $.ajax({
                type: "GET",
                url: minhaUrl,
                dataType: 'json',
                crossDomain: true,
                timeout:15000,



                success: function(data){
                    $('#set').html('');


                    $.each(data, function(i, resultados){
                        z=0;
                        $.each(resultados, function(z, resultado){
                           $.mobile.loading( "show");
                         //$("div").append(field + " ");

                                $( "#set" ).append( gerarListaCategoria(resultado,z) ).collapsibleset( "refresh" );



                            z=z+1;
                                //$("#owl-example"+z).owlCarousel({navigation : true,  navigationText : ["ant","prox"], pagination : false,});
                            });
                        d=0;
                        $(".listview").each( function() {
                           $.mobile.loading( "show");
                            $('#owl-example'+d).owlCarousel({navigation : true,  navigationText : ["<img src='images/setaesquerda.png' class='setaSlider' width='56px' />","<img src='images/setadireita.png' class='setaSlider' width='56px' />"], pagination : false,});

                            d=d+1;
                        });

                    });


                     $('#contentIndex').fadeIn('slow');
                    setTimeout(function(){

                       $.mobile.loading( "hide");
                    },2000);





                },error: function(data){


                    $.mobile.loading( "hide" );
                    $("#popupDialogLogin4").popup( "open" );

                }

            });


        }

    });

    function atualizarPromo(){


        minhaUrl=URLAPP+"RestClientes/getPromoDia.json?se="+empresa+"&sf=&fp="+filialPadrao+"";
         $.ajax({
                type: "GET",
                url: minhaUrl,
                dataType: 'json',
                crossDomain: true,
                 timeout:15000,



                success: function(data){


                    bebidas='<option value="">Selecione</option>';
                    if(typeof data.ultimopedido.Bebidas !==  'undefined'){
                        $.each(data.ultimopedido.Bebidas, function(i, beb){
                            bebidas += '<option id="optBebida'+beb.id+'" value="'+beb.id+'"  data-id="'+beb.id+'" data-nome="'+beb.nome+'" >'+beb.nome+'</option>';
                        });
                    }else{
                        bebidas=null;
                    }


                    pagueGanhe='<option value="">Selecione</option>';
                    if(typeof data.ultimopedido.PagueGanhe !==  'undefined'){
                        $.each(data.ultimopedido.PagueGanhe, function(i, pagueGan){
                            pagueGanhe += '<option  id="optPagueGanhe'+pagueGan.id+'" value="'+pagueGan.id+'" data-id="'+pagueGan.id+'" data-nome="'+pagueGan.nome+'">'+pagueGan.nome+'</option>';
                        });
                    }else{
                        pagueGanhe=null;
                    }

                },error: function(data){



                    $("#popupDialogLogin4").popup( "open" );

                }

            });


        }

 $( window ).load(function() {

    $('body').on('click', '.infoProduto', function () {

        var id=  $(this).attr('id');
        var expReg01 = /\D+/gi;
        numero= id.replace(expReg01,'');

        if ($('#popupCloseRight'+numero).is(":hidden")) {

            $('#popupCloseRight'+numero).slideDown();
            //$('#infoProduto'+numero).html('Menos');
        }else{
            $('#popupCloseRight'+numero).slideUp();
            //$('#infoProduto'+numero).html('Mais');
        }


    });

});

    $( document ).ready(function() {


    $('body').on('keyup', '.inputAdd', function () {

        var numero = $(this).attr('id');
        //numero = numero.substring(10);
        var dInput = this.value;

        $("#"+numero).val(dInput);


    });
    $('body').on('change', '.inputAdd', function () {
        var idAdd=  $(this).attr('id');

        inputAddValue = $(this).val();
        if(inputAddValue.length > 1){
            $('#'+idAdd).css('text-indent','9px');
        }else{
            $('#'+idAdd).css('text-indent','13px');

        }
    });
    var chekaProduto="falso";


     var cont=0;
     var itens=0;
    var codigo="";
    var contador=0;
    var vlUnitarioAut=0;
    var produto="";
    var qtde =0;
    var vlTotal=0;

    function adicionarLinhaPedido(codigo, produto, cont, vlUnitarioAut, qtde, vlTotal ){

        itens=itens+1;

        $("#pedido").append('<tr class="clone clone'+contador+'" id="linha'+contador+'"><td class="tbcodigo">'+codigo+'</td><td>'+produto+" "+ itenObs+ '</td><td  class="dinheiro" id="dinheiro'+cont+'" >'+vlUnitarioAut+'</td><td>'+qtde+'</td><td class="soma dinheiro" id="soma'+cont+'">'+vlTotal+'</td></tr>');


            $('.dinheiro').priceFormat({
                prefix: 'R$ ',
                centsSeparator: ',',
                thousandsSeparator: '.',
                centsLimit: 2,
            });
            var sum = 0;
            $('.soma').each(function() {
                var value = $(this).text();

                value = value.substring(3);
                value = value.replace(".","");
                value = value.replace(",",".");


                value = parseFloat(value);
                if(!isNaN(value) && value.length != 0) {

                    sum = sum + value;
                }
              $("#linhaTotal").remove();

            });
            frete=false;

            freteMaisProduto= 0;
            if(cliente.Cliente.frete_cadastro != false){
                    frete=cliente.Cliente.frete_cadastro;
                    $('#entrega_valor').val(frete);
                    frete = frete.replace(".","");
                    frete = frete.replace(",",".");
                    frete=parseFloat(frete);
                    freteMaisProduto = frete+sum;
            }
            $("#linhaTotal").remove();
            sum = sum.toFixed(2);
            sum = sum.toString();
            sum = sum.replace('.', ',');

            vlTotalSub=vlTotal.replace(",",".");


            if (frete != null && frete !=' ' ){
                    frete = frete.toFixed(2);
                    frete = frete.toString();
                    frete = frete.replace('.', ',');
                    freteMaisProduto=parseFloat(freteMaisProduto);
                    freteMaisProduto = freteMaisProduto.toFixed(2);
                    freteMaisProduto = freteMaisProduto.toString();
                    freteMaisProduto = freteMaisProduto.replace('.', ',');
                }else{
                    frete = null;
                    freteMaisProduto=0;
                }





            $("#pedido").append('<tr id="linhaTotal"><td colspan="4">Total</td><td id="totalPedido">'+sum+'</td></tr>');
            $("#PedidoAddForm").append('<input class="clone clone'+contador+'" type="hidden" name="data[Itensdepedido]['+contador+'][produto_id]" id="Itensdepedido'+contador+'ProdutoId" value="'+codigo+'">');
            $("#PedidoAddForm").append('<input class="clone clone'+contador+'" type="hidden" name="data[Itensdepedido]['+contador+'][qtde]" id="Itensdepedido'+contador+'Qtde" value="'+qtde+'">');
            $("#PedidoAddForm").append('<input class="clone clone'+contador+'" type="hidden" name="data[Itensdepedido]['+contador+'][valor_unit]" id="Itensdepedido'+contador+'valor_unit" value="'+vlUnitarioAut+'">');
            $("#PedidoAddForm").append('<input class="clone clone'+contador+'" type="hidden" name="data[Itensdepedido]['+contador+'][valor_total]" id="Itensdepedido'+contador+'valor_total" value="'+vlTotalSub+'">');
            if(typeof prodId1 !== 'undefined' && typeof prodId2 !== 'undefined'){

                $("#PedidoAddForm").append('<input class="clone clone'+contador+'" type="hidden" name="data[Itensdepedido]['+contador+'][compostoum_id]" id="Itensdepedido'+contador+'compostoum_id" value="'+prodId1+'">');
                prodId1='';

                $("#PedidoAddForm").append('<input class="clone clone'+contador+'" type="hidden" name="data[Itensdepedido]['+contador+'][compostodois_id]" id="Itensdepedido'+contador+'compostodois_id" value="'+prodId2+'">');
                prodId2='';

                /*$('.addProdutoComposto').css('display', 'none');
                $('.precoComposto').css('display', 'none');
                $('.compostoAdd').css('display', 'none');
                $('.compostoLabelAdd').css('display','none');
                $('.addProdutoComposto').css('display', 'none');*/
            }
            if(typeof itemBebidaId !== 'undefined' && itemBebidaId !== null && itemBebidaId !== 'null' && itemBebidaId !== ''  && itemBebidaId !== ' ' && typeof itemBebidaId !== undefined ){

                $("#PedidoAddForm").append('<input class="clone clone'+contador+'" type="hidden" name="data[Itensdepedido]['+contador+'][bebida_id]" id="Itensdepedido'+contador+'bebida_id" value="'+itemBebidaId+'">');
                itemBebidaId='';
                itemBebidaNome="";
            }
            if(typeof itemPagueGanheId !== 'undefined' && itemPagueGanheId !== null && itemPagueGanheId !== 'null' && itemBebidaId !== ''  && itemPagueGanheId !== ' ' && typeof itemPagueGanheId !== undefined ){
                $("#PedidoAddForm").append('<input class="clone clone'+contador+'" type="hidden" name="data[Itensdepedido]['+contador+'][ganhe_id]" id="Itensdepedido'+contador+'ganhe_id" value="'+itemPagueGanheId+'">');
                itemPagueGanheId='';
                itemPagueGanheNome='';
            }

            $("#PedidoAddForm").append('<input class="clone clone'+contador+'" type="hidden" name="data[Itensdepedido]['+contador+'][obs_sis]" id="Itensdepedido'+contador+'obs_sis" value="'+itenObs+'">');
            itenObs="";





            $('#totalPedido').priceFormat({
                prefix: 'R$ ',
                centsSeparator: ',',
                thousandsSeparator: '.'
            });
            cont= cont + 1;
            contador = contador + 1;

            valorTotalPag = $("#totalPedido").text();
            $('#totalPedidoPag').html(valorTotalPag);

              $('#totalPedidoEntrega').html('R$ '+freteMaisProduto);
              $('#totalEntrega').html('R$ '+frete);

              $('.h3entrega').show();


    }
    $('body').on('click', '#btn-confirmarProd', function () {
        adicionarLinhaPedido(codigo, produto, cont, vlUnitarioAut, qtde, vlTotal );
        vlUnitarioAut=0;
        produto="";
        qtde =0;
        vlTotal=0;
        $('#popProdItem').html(' ');
        $('#popQtdeItem').html(' ');
        $('#popVlUnitItem').html(' ');
        $('#popVlTotalItem').html(' ');
        $("#popupConfirmaProd").popup( "close" );
    });
    $(document).on("pagehide","#index",function(){
        itenObs="";
        prodId2="";
        prodId1="";
    });

    String.prototype.capitalize = function(){
            return this.toLowerCase().replace( /\b\w/g, function (m) {
                return m.toUpperCase();
            });
    };

    function validaAddBtn(idBtn){
        textoAvisoBtn=null;

         if($(".precotam"+idBtn).is(":hidden"))
        {
             textoAvisoBtn ="A Seleção selecionada não pode ser processada por favor selecione outras opções.";
        }
        if($("#comboTamanho"+idBtn).is(":visible"))
        {
            vlSelecionado = $("#comboTamanho"+idBtn).find('option:selected').val();

            if(vlSelecionado ==0 ){
                textoAvisoBtn ="Selecione uma opç&atilde;o da sess&atilde;o  tamanho.";
            }
        }
        if($("#compostoTamanho"+idBtn).is(":visible"))
        {
            vlSelecionado = $("#compostoTamanho"+idBtn).find('option:selected').val();

            if(vlSelecionado ==0 ){
                textoAvisoBtn ="Selecione uma opç&atilde;o da sess&atilde;o  tamanho.";
            }
        }
        if($("#compostoAdd1"+idBtn).is(":visible"))
        {
            vlSelecionado = $("#compostoAdd1"+idBtn).find('option:selected').val();

            if(vlSelecionado ==0 ){
                textoAvisoBtn ="Selecione  as duas  opç&otilde;es da sess&atilde;o  Sabores.";
            }
        }

        if($("#compostoAdd2"+idBtn).is(":visible"))
        {
            vlSelecionado = $("#compostoAdd2"+idBtn).find('option:selected').val();

            if(vlSelecionado ==0 ){
                textoAvisoBtn ="Selecione  as duas  opç&otilde;es da sess&atilde;o  Sabores.";
            }
        }

        if($("#selectBebidas_"+idnumero).is(":visible")){

            vlSelecionado = $("#selectBebidas_"+idBtn).find('option:selected').attr('data-id');
            if(typeof vlSelecionado ==='undefined' ){
                textoAvisoBtn ="Selecione um produto da sess&atilde;o  bebida.";
            }

        }

        if($("#selectPagueGanhe_"+idnumero).is(":visible")){

            vlSelecionado = $("#selectPagueGanhe_"+idBtn).find('option:selected').attr('data-id');
            if(typeof vlSelecionado ==='undefined' ){
                textoAvisoBtn ="Selecione um produto da sess&atilde;o ganhe.";
            }

        }
        if(textoAvisoBtn==null){
            return true;
        }else{
            $('#avisoValidaBtnTexto').html(textoAvisoBtn);
            $("#avisoValidaBtn").popup( "open" );
            return false;
        }

    }
    $('body').on('click', '.addProduto', function () {

                var idn=  $(this).attr('id');
                var expReg01 = /\D+/gi;
                idnumero= idn.replace(expReg01,'');




        if(cliente != ''){
                if(validaAddBtn(idnumero)){
                    $('.erroqtde').hide();
                    $('.erroqtde2').hide();
                    itenObs="";
                    prodId2="";
                    prodId1="";
                    numero = $(this).attr('id');
                    numero = numero.substring(10);
                    codigo = $(this).attr('data-codigo');
                    produto = $(this).attr('data-produto');
                    vlUnitarioAut = $(this).attr('data-vlu');
                    vlUnitarioAut = vlUnitarioAut.replace(",",".");
                    vlUnitario =  parseFloat(vlUnitarioAut);
                    vlUnitario = vlUnitario.toFixed(2);
                    valor = $('#pedido tr').length;
                    qtdeAux = $('#inputAdd'+numero).val();

                    var expReg02 = /\D+/gi;
                    qtdeAux = qtdeAux.replace(expReg02,'');

                    $('#inputAdd'+numero).val(1);
                    qtde = parseFloat(qtdeAux);

                    vlTotal=vlUnitario * qtde;

                    vlTotal = vlTotal.toFixed(2);

                    vlUnitarioAux= vlUnitario.toString();
                    vlUnitario = vlUnitarioAux.replace('.', ',');


                    vu = $(this).attr('data-vlu');


                    vlTotalAux = vlTotal.toString();
                    vlTotal =vlTotalAux.replace('.',',');
                    $('.popDiv').hide();
                    $('.ui-icon-minus').trigger('click');

                    nomeProd1=$(this).attr('data-produtonome1');
                    nomeProd2=$(this).attr('data-produtonome2');
                    prodTamanho=$(this).attr('data-tamanho');
                    nomeProduto = $(this).attr('data-tamanho');
                    prodId2=$(this).attr('data-produtoid2');
                    prodId1=$(this).attr('data-produtoid1');

                    itemPagueGanheNome = $(this).attr('data-pagueganhenome');
                    itemPagueGanheId = $(this).attr('data-pagueganheid');
                    obsTamanho="";

                    itemBebidaId = $(this).attr('data-bebidaid');
                    itemBebidaNome  = $(this).attr('data-bebidanome');

                    if(typeof nomeProd1 !== 'undefined' && typeof nomeProd2 !== 'undefined' ){

                        if(typeof prodTamanho !== 'undefined'){
                            if(prodTamanho !=''){
                                obsTamanho="<strong><i>Tamanho:</i></strong> "+prodTamanho.capitalize();
                            }

                        }else{
                            obsTamanho="";
                        }
                        if(nomeProd1 !='' && nomeProd2 !=''){
                            itenObs="<br /><strong><i>Sabores:</i> </strong>"+nomeProd1+" e " + nomeProd2+" <br />"+obsTamanho;
                        }else{
                            itenObs=obsTamanho;
                        }

                    }else{

                        if(typeof prodTamanho !== 'undefined'){
                            if(prodTamanho != ''){

                                obsTamanho=" <strong><i>Tamanho:</i> </strong>"+prodTamanho.capitalize();
                            }else{
                                obsTamanho="";
                            }

                        }else{
                            obsTamanho="";
                        }

                        itenObs=obsTamanho;
                    }

                    if(typeof itemBebidaId !== 'undefined' && itemBebidaId !== null && itemBebidaId !== 'null' && itemBebidaId !== ''  && itemBebidaId !== ' ' && typeof itemBebidaId !== undefined ){

                        itenObs+="<br/> <strong><i>Bebida:</i></strong>"+itemBebidaNome;
                    }
                    if(typeof itemPagueGanheId !== 'undefined' && itemPagueGanheId !== null && itemPagueGanheId !== 'null' && itemPagueGanheId !== ''  && itemPagueGanheId !== ' ' && typeof itemPagueGanheId !== undefined ){
                        itenObs+="<br/> <strong><i>Promo&ccedil;&atilde;o:</i></strong>"+itemPagueGanheNome;
                    }


                    setTimeout(function(){

                    if(qtdeAux ==""){
                        $('.erroqtde').show();
                    }else if(qtdeAux <=0){
                        $('.erroqtde').show();
                    }else{
                        $('#popProdItem').html(produto+' '+itenObs);
                        $('#popQtdeItem').html(qtde);
                        $('#popVlUnitItem').html(vlUnitario);
                        $('#popVlTotalItem').html(vlTotal);
                        $("#popupConfirmaProd").popup( "open" );

                    }


                    $('html, body').animate({
                     scrollTop: ($('#proximoPedido').first().offset().top)
                    },500);
                    /*$("#linhaTotal").css("background-color","yellow");*/
                    $("#linhaTotal").css("height","1em");
                    $('#linhaTotal').animate({height: '1em'}, 1000);
                    /*setTimeout(function(){
                    $("#linhaTotal").css("background-image"," url('../images/backgroun2.jpg')");
                    }, 1500);*/
                },500);
                }


        }else{
            fezPedidoSemLogar='sim';
            $.mobile.changePage("#Pagelogin",{ transition: "none",  });
             $('.pageContent').hide();
                $.mobile.loading( "show" );
                setTimeout(function(){
                    $.mobile.loading( "hide" );
                    $('.pageContent').fadeIn('slow');
                },2000);
        }

    });
   function getCoordenadas() {

        numero = removeDiacritics($('.numero').val());
        numero = numero.split(' ').join('+');
        logradouro = removeDiacritics($('.logradouro').val());
        logradouro = logradouro.split(' ').join('+');
        bairro = removeDiacritics($('.bairro').val());
        bairro = bairro.split(' ').join('+');
        complemento= removeDiacritics($('.complemento').val());
        complemento = complemento.split(' ').join('+');
        cidade = removeDiacritics($('.cidade').val());
        cidade = cidade.split(' ').join('+');
        uf = removeDiacritics($('.uf').val());
        uf = uf.split(' ').join('+');

        pesquisa=numero+','+logradouro+','+bairro+','+cidade+','+uf;


        var url="http://maps.googleapis.com/maps/api/geocode/json?address="+pesquisa+"&sensor=true";

         $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',

                success: function(data){


                i=0;
                var lat=0;
                var lng =0;
                $.each(data.results, function(i, resultados){

                    $('#lngEdit').val(resultados.geometry.location.lng);
                    lat =resultados.geometry.location.lat;
                    lng = resultados.geometry.location.lng
                    $('#lng').val(resultados.geometry.location.lng);
                    $('#latEdit').val(resultados.geometry.location.lat);
                    $('#lat').val(resultados.geometry.location.lat);
                });

                latorigin = $('#latEdit').val();
                lngorigin =$('#lngEditDest').val();
                latDest= $('#latEditDest').val();
                lngDest=$('#lngEditDest').val();
                CalculaDistancia(latorigin,lngorigin, latDest,lngDest);


                //$.mobile.loading( "hide" );

                return true;
                },error: function(data){
                    //$.mobile.loading( "hide" );
                    //$(".erroconexao").popup( "open" );
                    //tratar

                }

            });
    }



     function CalculaDistancia(lat,lng, latDest,lngDest) {





        var startOrigin= new google.maps.LatLng(lat,lng);
        var endDest =new google.maps.LatLng(latDest,lngDest);


        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [startOrigin],
            destinations: [endDest],
            travelMode: google.maps.TravelMode.DRIVING,
            avoidHighways: false,
            avoidTolls: false
          }, callback);





    }

    function callback(response, status) {
      if (status == google.maps.DistanceMatrixStatus.OK) {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;

        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            if(element.status !=  'ZERO_RESULTS'){
                var distance = element.distance.text;
                var duration = element.duration.text;
                var from = origins[i];
                var to = destinations[j];
        $('#distanciaCli').val(distance);
        $('#duracaoCli').val(duration);
            }


          }
        }
      }
    }
    function getCoordenadasLatLng(lat, lng) {

        var url="http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+','+lng+"&sensor=true";

        $.mobile.loading( "show" );

         $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',




                success: function(data){


                i=0;
                $.each(data.results, function(i, resultados){
                    if(i ==0){
                        var endereco = resultados.formatted_address;

                        var  res = endereco.split(",");
                        cep =res[1];
                        cep =  cep.split("-");
                        cepAux = cep[0] + cep[1];
                        $('#logradouroEdit').val(res[0]);
                        $('#cepEdit').val(cepAux);

                        return true;
                    }
                  //  $.mobile.loading( "hide" );

                });

                },error: function(data){
                  // $.mobile.loading( "hide" );
                    //$(".erroconexao").popup( "open" );

                }

            });
    }
    var respValida ='';
    var dbShell;

    function doLog(s){
        /*
        setTimeout(function(){
            console.log(s);
        }, 3000);
        */
    }

    function dbErrorHandler(err){
        alert("DB Error: "+err.message + "\nCode="+err.code);
    }

    function phoneReady(){
        doLog("phoneReady");
        //First, open our db

        dbShell = window.openDatabase("Entregapp", 2, "Entregapp", 1000000);
        doLog("db was opened");
        //run transaction to create initial tables
        dbShell.transaction(setupTable,dbErrorHandler,getEntries);
        doLog("ran setup");
    }

    //I just create our initial table - all one of em
    function setupTable(tx){
        doLog("before execute sql...");
        tx.executeSql("CREATE TABLE IF NOT EXISTS entregappusers(id INTEGER PRIMARY KEY,username,password,empresa_id,filial_id,user_id,ativo,updated)");
        doLog("after execute sql...");
    }
    //I handle getting entries from the db
    function getEntries() {
        dbShell.transaction(function(tx) {
        tx.executeSql("select * from entregappusers",[],renderEntries,dbErrorHandler);
        }, dbErrorHandler);
    }

    //I handle getting entries from the db
    function deleteEntries() {
       dbShell.transaction(function(tx) {
        tx.executeSql("delete from entregappusers",[],returnDelete,dbErrorHandler);
        }, dbErrorHandler);
    }
    function returnDelete(){
        return true;
    }
    var salt ="jmgl33mg1221kjgruyky232ho2l3437mhljio90hueemmgjktjmmmgko2tut35ymmmh221eenngl4y73kkkj";
    function renderEntries(tx,results){
         doLog("render entries");
          if (results.rows.length == 0) {
          //$("#Pagelogin").html("<p>You currently do not have any notes.</p>");
          } else {
              var s = "";
              for(var i=0; i<results.rows.length; i++) {
                $('#userdb').val(results.rows.item(i).username);
                $('#passdb').val(results.rows.item(i).password);
                $('#iddb').val(results.rows.item(i).id);
                $('#ativodb').val(results.rows.item(i).ativo);
                $('.usuarioLogado').html(results.rows.item(i).username);
              }
              loginInit();

          }
    }

    function saveNote(entregappusers, cb) {
        //Sometimes you may want to jot down something quickly....
        if(entregappusers.username == "") entregappusers.username = "[No Title]";
        dbShell.transaction(function(tx) {
        if(entregappusers.id == "") tx.executeSql("insert into entregappusers(username,password,empresa_id,filial_id,user_id,ativo,updated) values(?,?,?,?,?,?,?)",[entregappusers.username,entregappusers.password,entregappusers.empresa_id,entregappusers.filial_id, entregappusers.user_id,entregappusers.ativo,new Date()]);
        else tx.executeSql("update entregappusers set username=?, password=?,empresa_id=?, filial_id=?, user_id=?,ativo=?,updated=? where id=?",[entregappusers.username,entregappusers.password,entregappusers.empresa_id,entregappusers.filial_id, entregappusers.user_id,entregappusers.ativo,new Date(), entregappusers.id]);
        }, dbErrorHandler,cb);
    }
    function init(){

       document.addEventListener("deviceready", phoneReady, false);

        $('#meucadastroEdit').submit(function(event){

            event.preventDefault();
            $.mobile.loading( "show" );
            validaFormCad();
            $("#submitFormCliente").hide();
            if(respValida == 'ok'){
                $( ".ui-icon-minus" ).trigger('click');
                getCoordenadas();
                latDest= $('latEditDest').val();
                lngDest= $('lngEditDest').val();
                lat = $('latEdit').val();
                lng = $('lngEdit').val();

                setSubmit();
            }else{
                $.mobile.loading( "hide" );
                $("#submitFormCliente").show();
                $('.subbtnGroup').show();
            }
           //$.mobile.loading( "hide" );
           // $("#submitFormCliente").show();
        });

        //will run after initial show - handles regetting the list
        $(document).on("pageshow","#index",function(){ // When entering pagetwo



          //  getEntries();


        });

    }
    $(document).ready(function(){
        init();

    });
    var pagamento;
    var tipoPagSeguro=null;
    function loginInit(){

        dataTosend ={
            username:$('#userdb').val(),
            password:$('#passdb').val(),
            empresa:empresa,
            filial:filialPadrao,
            salt:salt
        };
        var urlAction = URLAPP+"RestClientes/loginmobile.json";
        $.ajax({
            type: "POST",
            url: urlAction,
            data:  dataTosend,
            dataType: 'json',
            crossDomain: true,
            timeout:15000,

            success: function(data){
                var res = data.ultimopedido;
                cliente_id = data.ultimopedido.Cliente.id;
                cliente = data.ultimopedido;
                bebidas='<option value="">Selecione</option>';
                if(typeof cliente.Bebidas !==  'undefined'){
                    $.each(cliente.Bebidas, function(i, beb){
                        bebidas += '<option id="optBebida'+beb.id+'" value="'+beb.id+'"  data-id="'+beb.id+'" data-nome="'+beb.nome+'" >'+beb.nome+'</option>';
                    });
                }else{
                    bebidas=null;
                }
                pagueGanhe='<option value="">Selecione</option>';
                if(typeof cliente.PagueGanhe !==  'undefined'){
                    $.each(cliente.PagueGanhe, function(i, pagueGan){
                        pagueGanhe += '<option  id="optPagueGanhe'+pagueGan.id+'" value="'+pagueGan.id+'" data-id="'+pagueGan.id+'" data-nome="'+pagueGan.nome+'">'+pagueGan.nome+'</option>';
                    });
                }else{
                    pagueGanhe=null;
                }

                if(fezPedidoSemLogar=='sim'){
                        fezPedidoSemLogar="nao";
                        $('.showLogado').removeClass('logadoNone');
                        $('.fazerlogin').addClass('logadoNone');
                }else{
                    fezPedidoSemLogar="nao";
                    $('.showLogado').removeClass('logadoNone');
                    $('.fazerlogin').addClass('logadoNone');
                }
                getSituacaoCampainha= setInterval(function(){
                    /*getSituacaoCampainha()*/;
                },20000);

                selectPagamento(cliente);

            },error: function(data){
                setTimeout(function(){
                    loginInit();
                },5000);


            }
        });
    }
    function selectPagamento(cliente)
    {

        $('.cloneOptPgt').remove();
        selectPagamento =  $('#formaDEpagamento');
        $('#formaDEpagamento').append('<option value="" class="cloneOptPgt">Selecione</option>');
        $.each(cliente.Pagamento, function(i, pagamento){
            $('#formaDEpagamento').append('<option class="cloneOptPgt" value="'+pagamento.id+'">'+pagamento.tipo+'</option>');
            var pagTipo  = pagamento.tipo;
            pagTipo = pagTipo.replace('-', '');
            pagTipo = pagTipo.replace(' ', '');
            pagTipo = pagTipo.replace('/', '');
            pagTipo = pagTipo.toLowerCase();
            if(pagTipo=='pagseguro')
            {
              tipoPagSeguro=pagamento.id;
            }
        });
       // selectPagamento.selectmenu();
       // selectPagamento.selectmenu('refresh', true);

    }
    var flagCadastro=false;
    function loginCad(data){
        $.mobile.loading( "show" );
        dataToSave = {
            id:'',
            username:data.username,
            password:data.password,
            filial_id:data.filial,
            empresa_id:data.empresa,
            ativo:'1',
            cliente_id:data.cliente.id
        };
        var urlAction = URLAPP+"RestClientes/loginmobile.json";
        $.ajax({
            type: "POST",
            url: urlAction,
            data:  data,
            dataType: 'json',
            crossDomain: true,
             timeout:15000,

            success: function(data){
                var res = data.ultimopedido;

                cliente_id = data.ultimopedido.Cliente.id;
                cliente = data.ultimopedido;
                bebidas='<option value="">Selecione</option>';
                if(typeof cliente.Bebidas !==  'undefined'){
                    $.each(cliente.Bebidas, function(i, beb){
                        bebidas += '<option id="optBebida'+beb.id+'" value="'+beb.id+'"  data-id="'+beb.id+'" data-nome="'+beb.nome+'" >'+beb.nome+'</option>';
                    });
                }else{
                    bebidas=null;
                }
                pagueGanhe='<option value="">Selecione</option>';
                if(typeof cliente.PagueGanhe !==  'undefined'){
                    $.each(cliente.PagueGanhe, function(i, pagueGan){
                        pagueGanhe += '<option  id="optPagueGanhe'+pagueGan.id+'" value="'+pagueGan.id+'" data-id="'+pagueGan.id+'" data-nome="'+pagueGan.nome+'">'+pagueGan.nome+'</option>';
                    });
                }else{
                    pagueGanhe=null;
                }

                if(fezPedidoSemLogar=='sim'){
                        fezPedidoSemLogar="nao";
                        $('.showLogado').removeClass('logadoNone');
                        $('.fazerlogin').addClass('logadoNone');
                }else{
                    fezPedidoSemLogar="nao";
                    $('.showLogado').removeClass('logadoNone');
                    $('.fazerlogin').addClass('logadoNone');
                }
                selectPagamento(cliente);
              getSituacaoCampainha = setInterval(function(){
                    /*getSituacaoCampainha()*/;
                },20000);
                deleteEntries();
                saveNote(dataToSave,function() {
                    var flagCadastro=true;
                    $.mobile.changePage("#index",{reverse:true});
                });


            },error: function(data){
                //criar tratatmento de erros
                $.mobile.loading( "hide" );
                $("#popupDialogLogin").popup( "open" );
                $('#loginSalt').val('')
            }
        });
    }

    $('body').on('click', '.esquecer', function(event){
        $(".popEsquecer").popup( "open" );
    });
    $('body').on('click', '.popEsquecerBtn', function(event){
        clearInterval(getSituacaoCampainha);

        deleteEntries();
        cliente ='';
        $('.showLogado').addClass('logadoNone');
        $('.fazerlogin').show();
        fezPedidoSemLogar="";
        $.mobile.changePage("#Pagelogin",{reverse:true});
       // $( ".popEsquecer" ).popup( "close" );
    });
    var conectado= false;
    $('body').on('submit', '#login', function(event){

        event.preventDefault();

        if ($('#checkconectado').is(':checked'))
        {
            conectado=true;
        }

        $.mobile.loading( "show" );
        $('.loginsalt').val(salt);
        var urlAction = URLAPP+"RestClientes/loginmobile.json";
        var username = $('#username').val();
        var password =$('#password').val();
        var dadosForm = $("#login").serialize();



        $.ajax({
            type: "POST",
            url: urlAction,
            data:  dadosForm,
            dataType: 'json',
            crossDomain: true,
             timeout:15000,



            success: function(data){

                var res = data.ultimopedido;



                if(res == 'ErroLogin'){


                    $("#popupDialog").popup( "open" );

                }else{

                    cliente_id = data.ultimopedido.Cliente.id;
                    cliente = data.ultimopedido;


                    bebidas='<option value="">Selecione</option>';
                    if(typeof cliente.Bebidas !==  'undefined'){
                        $.each(cliente.Bebidas, function(i, beb){
                            bebidas += '<option id="optBebida'+beb.id+'" value="'+beb.id+'"  data-id="'+beb.id+'" data-nome="'+beb.nome+'" >'+beb.nome+'</option>';
                        });
                    }else{
                        bebidas=null;
                    }


                    pagueGanhe='<option value="">Selecione</option>';
                    if(typeof cliente.PagueGanhe !==  'undefined'){
                        $.each(cliente.PagueGanhe, function(i, pagueGan){
                            pagueGanhe += '<option  id="optPagueGanhe'+pagueGan.id+'" value="'+pagueGan.id+'" data-id="'+pagueGan.id+'" data-nome="'+pagueGan.nome+'">'+pagueGan.nome+'</option>';
                        });
                    }else{
                        pagueGanhe=null;
                    }
                    if (conectado==true) {

                        deleteEntries();
                        dataToSave = {
                            id:'',
                            username:username,
                            password:password,
                            filial_id:filialPadrao,
                            empresa_id:empresa,
                            ativo:'1',
                            cliente_id:cliente.Cliente.id
                        };

                        saveNote(dataToSave,function() {
                            $.mobile.changePage("#index",{reverse:true});
                        });
                    }
                    selectPagamento(cliente);
                    $('.usuarioLogado').html(cliente.Cliente.username);
                    if(fezPedidoSemLogar=='sim'){
                        fezPedidoSemLogar="nao";
                        $('.showLogado').removeClass('logadoNone');
                        $('.fazerlogin').addClass('logadoNone');
                       // filialPadrao=data.ultimopedido.Cliente.filial_id;
                        $.mobile.changePage("#index",{ transition: "none",  });
                         $('.pageContent').hide();
                            $.mobile.loading( "show" );
                            setTimeout(function(){
                                $.mobile.loading( "hide" );
                                $('.pageContent').fadeIn('slow');
                            },2000);

                    }else{
                        fezPedidoSemLogar="nao";
                        $('.showLogado').removeClass('logadoNone');
                        $('.fazerlogin').addClass('logadoNone');
                        $.mobile.changePage("#index",{ transition: "none",  });

                         $('.pageContent').hide();
                            $.mobile.loading( "show" );
                            setTimeout(function(){
                                $.mobile.loading( "hide" );
                                $('.pageContent').fadeIn('slow');
                            },2000);

                    }


                }

                $('#loginSalt').val('');
                getSituacaoCampainha= setInterval(function(){
                    /*getSituacaoCampainha()*/;
                },20000);
            },error: function(data){
                //criar tratatmento de erros
                $.mobile.loading( "hide" );

                $("#popupDialogLogin").popup( "open" );
                $('#loginSalt').val('')
            }

            });
            $.mobile.loading( "hide" );
        });
var pedido_id ="";
function atendimentoView(atendimentos){
    //$.each(atendimentos, function(i, atendiment){
        $("#atendimentostab").html('');

        difHora=atendimentos.Atendimento.difhora;
        if(atendimentos.Pedido.status =='Em Aberto' || atendimentos.Pedido.status =='Cancelado' || atendimentos.Pedido.status =='Entregue' )
        {
            difHora='00:00:00';


        }
        $("#codigoAtend").html(atendimentos.Atendimento.codigo+'&nbsp;');

        $("#dataAtend").html(atendimentos.Pedido.data+' '+atendimentos.Pedido.hora+'&nbsp;');

        //$("#clienteAtend").html(atendimentos.Cliente.nome+'&nbsp;');
        $("#AtendAtend").html(atendimentos.Pedido.user_id+'&nbsp;');
        $("#pagamentoAtend").html(atendimentos.Pedido.status_pagamento+'&nbsp;');
        if(Pedido.status_pagamento != 'Pendente')
        {
          $('.pagSeguro').hide();
        }
         $("#entregaPedido").html(atendimentos.Pedido.entrega_valor+'&nbsp;');

        $("#situacaoAtend").html(atendimentos.Pedido.status+'&nbsp;');
        $("#posFilaAtend").html(atendimentos.Pedido.status+'&nbsp;');
        $("#idPedidoAux").html(atendimentos.Pedido.id);

        $("#previsaoAtend").html(difHora+'&nbsp;');
         $("#counter").html('');
         $('#counter').countdown({
              image: 'images/digits2.png',
              startTime: difHora,
              digitWidth: 34,
                digitHeight: 45,
                format: 'hh:mm:ss',
         });

    //});
}
var validarPd="";
var pag ="dh";
var tipoTroco ="Sim";
var salt ="jmgl33mg1221kjgruyky232ho2l3437mhljio90hueemmgjktjmmmgko2tut35ymmmh221eenngl4y73kkkj";
function getTokenMoip(){


    var valorPedido =$('#totalPedidoPag').text();
        valorPedido = valorPedido.substring(3);
        valorPedido = valorPedido.replace(".","");
        valorPedido = valorPedido.replace(",",".");

        valorPedido = parseFloat(valorPedido);

        var urlAction = URLAPP+"RestPedidos/pgtomoip.json";
        var dadosForm = {'id':'7', 'cliente_id':cliente.Cliente.id, 'nome':cliente.Cliente.nome, 'token':cliente.Cliente.token, 'salt':salt,'email': cliente.Cliente.email, 'logradouro':cliente.Cliente.logradouro,'numero':cliente.Cliente.numero,'complemento':cliente.Cliente.complemento, 'cidade':cliente.Cliente.cidade, 'uf':cliente.Cliente.uf, 'cep':cliente.Cliente.cep,'telefone':cliente.Cliente.telefone,'celular':cliente.Cliente.celular,'valor':valorPedido};


        $.mobile.loading( "show" ,{theme: 'b'});
        $.ajax({
            type: "POST",
            url: urlAction,
            data:  dadosForm,
            dataType: 'json',
            crossDomain: true,
             timeout:15000,



            success: function(data){

                var res = data.resultados;
                $('#token').val(data.resultados.token);
                $('#MoipWidget').attr('data-token',data.resultados.token);
                $('#pgmoip_id').val(data.resultados.pgmoip_id);

                $.mobile.loading( "hide" );


            },error: function(data){
                //criar tratatmento de erros
                $.mobile.loading( "hide" );
                $("#popupDialogLogin4").popup( "open" );

            }
            });
}

function enviaDadosCartao(){


    var numeroCart =$('.ncartao').val();
    var expiracao =$('#Expiracao').val();
    var codigoSeguranca =$('#CodigoSeguranca').val();
    var instituicao = $('#instituicao').val();
    var portador = $('#Portador').val();
    var CPF = $('#CPF').val();
    var dataNascimento = $('#DataNascimento').val();

    dia = dataNascimento.substring(0, 2);
    mes = dataNascimento.substring(3, 5);
    ano = dataNascimento.substring(6, 10);
    dataNascimento = ano + "-" + mes + "-" + dia;
    var telefone = $('#Telefone').val();


    var urlAction = URLAPP+"RestClientes/addmobile.json";
    var dadosForm = {'id':cliente.Cliente.id, 'numerocart':numeroCart,'salt':salt,'codigoseguranca': codigoSeguranca, 'portador':portador,'cpf':CPF,'nasc':dataNascimento, 'telefone':telefone, 'expiracao':expiracao, 'instituicao':instituicao};


        $.mobile.loading( "show" ,{theme: 'b'});
        $.ajax({
            type: "POST",
            url: urlAction,
            data:  dadosForm,
            dataType: 'json',
            crossDomain: true,
             timeout:15000,



            success: function(data){

                //var res = data.resultados;
               $.mobile.loading( "hide" );


            },error: function(data){
                //criar tratatmento de erros
                $("#popupDialogLogin4").popup( "open" );

            }
        });
}
$("#sendToMoip").click(function(){

    if($("#cksimCart").hasClass("ui-checkbox-on")){
        enviaDadosCartao();
    }
});
$('.ncartao').mask('9999999999999999');
$('#Expiracao').mask('99/99');
$.mask.definitions['~'] = '([0-9] )?';
$("#Telefone").mask("(99)9999-9999~");
$("#CPF").mask("999.999.999-99");
$("#DataNascimento").mask("99/99/9999");
function verificaCartao(nome){
    if(nome == 'Visa'){
        idcartao = 5;
    }else if(nome == 'Mastercard'){
        idcartao = 3;
    }else if(nome == 'AmericanExpress'){
        idcartao = 7;
    }else{
        idcartao = "Escolha";
    }

    if(idcartao  != 'Escolha'){
        $('#pagamentoPedido').val(idcartao);
    }
}






$('#instituicao').change(function(){
    var selecionadoCart2 = $(this).val();
    verificaCartao(selecionadoCart2);

});



function validarPedido(){


    if(pag == 'dh' ){

        if(tipoTroco=='Sim'){
            texto = $('#respTroco').html();

            if(texto=='InvÃ¡lido'){
                validarPd = 'falso'
                return validarPd;
            }else if(texto=='R$ 0,00'){
                validarPd = 'falso'
                return validarPd;
            }else{
                validarPd = 'verdadeiro'
                return validarPd;
            }

        }else{

            validarPd = 'verdadeiro'
            return validarPd;
        }
    }else{
        validarPd = 'verdadeiro'
        return validarPd;
    }
}
$("#pedir").click(function(event){

    validarPedido();
    if(cliente.Cliente.frete_cadastro==false){
        $("#popupNaoEntrega").popup( "open" );
        return false;
    }
    formPagamento = $('formaDEpagamento').val();
    if(formPagamento==''){
        validarPd="falso";
        $("#avisoTroco2").popup( "open" );
    }


    $('#empresaPedido').val(empresa);
    $('#filialPedido').val(filialPadrao);

    if(validarPd== 'verdadeiro'){
        nAtendimento= $('#PedidoA').val();


        $.mobile.loading( "show" ,{theme: 'b'});
        event.preventDefault();
        var sum = 0;
        var atendimento="";
        $('.soma').each(function() {
            var value = $(this).text();
            value = value.substring(3);

            value = value.replace(".","");
            value = value.replace(",",".");
            value = parseFloat(value);
            if(!isNaN(value) && value.length != 0) {

                sum = sum + value;
            }


        });


        if(sum !=0){


            var urlAction2 = URLAPP+"RestPedidos/addmobile.json";


            //$(".loaderAjax").show();
            $("#pedir").hide();
            $("#spanComprar").hide();
            $('#pedidoSalt').val(salt);
            $('#pedidoToken').val(cliente.Cliente.token);
            $("#clientePedido").val(cliente.Cliente.id);
            $('#PedidoA').val('entrega');

            var dadosForm2 = $("#PedidoAddForm").serializeArray();

            $.ajax({
                type: "POST",
                url: urlAction2,
                data:  dadosForm2,
                dataType: 'json',
                crossDomain: true,
                 timeout:15000,

                success: function(data){

                    $("#pedir").show();

                     $("#spanComprar").show();
                    $.mobile.loading( "hide" );


                    atendimento=data.resultados;



                    if(atendimento.Pedido.id){

                        $('.clone').remove();
                        $("#totalPedido").html('00,00');
                        cont=0;
                        limparPedido();
                        $.mobile.changePage("#page2",{ transition: "pop",  });
                         $('.pageContent').hide();
                            $.mobile.loading( "show" );

                        getAtendimento(atendimento.Pedido.atendimento_id);
                        getItens(atendimento.Pedido.atendimento_id);
                        valorTotal= $('#valorTotalPedido').html();
                        $.mobile.loading( "hide" );
                        if(valorTotal  != '00,00'){

                            $('.pageContent').fadeIn('slow');

                        }
                        $("#popupSucEnvPedido2").popup( "open" );
                        $("#idAtend").html(atendimento.Pedido.atendimento_id);

                    }else{

                    }
                    //$('#pedidoToken').val('');
                },error: function(data){

                    $.mobile.loading( "hide" );
                    $("#pedir").show();
                     $("#spanComprar").show();
                    $("#popupDialogLogin4").popup( "open" );

                }
            });


        }else{
            $('.erroqtde').show();
        }
    }else{
        //alert(validarPd);
        $("#avisoTroco").popup( "open" );


    }


 });
    $("#popupSucEnvPedido").click(function(){

    });

    $("#bt-vermaisPedidos").click(function(){

        limitPedido= limitPedido +4;
        $("#atendimentostab").html('');
        if(cliente != ""){
            atualizarAtendimentos(cliente.Cliente.id);
        }






    });

    var limitPedido=4;
    function atualizarAtendimentos(clienteid){


        $.mobile.loading( "show" ,{theme: 'b'});
         $.ajax({


                type: "GET",
                url: URLAPP+"RestAtendimentos/indexmobile.json?lj="+empresa+"&clt="+clienteid+"&limit="+limitPedido+"&token="+cliente.Cliente.token+"&fp="+filialPadrao+"",
                dataType: 'json',
                crossDomain: true,
                 timeout:15000,



                success: function(data){


                    $("#atendimentos").html('');
                    $.mobile.loading( "hide" );

                    $.each(data.resultados, function(i, atendimento){

                        $.each(atendimento.Pedido, function(i, pedidoAtend){

                            //2014-09-15
                            pedidoData=pedidoAtend.data;
                            var anoDt = pedidoData.substring(0, 4);
                            var mesDt = pedidoData.substring(5, 7);
                            var diaDt = pedidoData.substring(8, 10);
                            pedidoData = diaDt+"/"+mesDt+"/"+anoDt;
                            pedidoStatus=pedidoAtend.status;



                        });
                        $("#atendimentostab").append('<tr><td class="paddTopTab">'+atendimento.Atendimento.codigo+'</td>\
                        <td class="paddTopTab">'+pedidoData+'</td><td class="paddTopTab">'+pedidoStatus+'</td>\
                        <td><a href="#" class="ui-btn ui-shadow ui-corner-all ui-icon-eye ui-btn-icon-notext ui-btn-b ui-btn-inline acaoAtend" id="acaoAtend'+i+'"data-atendimento="'+atendimento.Atendimento.id+'">Visualisar</a></td></tr>');

                        if(limitPedido > 4){

                            //$("html, body").animate({ scrollTop: $(document).height() }, "slow");
                        }

                    });

                },error: function(data){

                    $.mobile.loading( "hide" );
                    $("#popupDialogLogin13").popup( "open" );
                    //tratar o erro

                }

            });


        }




    $('body').on('change','#cidadeEdit', function(){

        idCidade = $(this).find(":selected").attr('data-id');
        altura = $(this).height();
        bairroEdit = $('#bairroEdit').find(":selected").val();

            if(idCidade != 'undefined' && idCidade != 0){
                atualizarBairros(idCidade);
                $('#bairroEdit').css('height',altura);
            }else{
                 $.mobile.loading( "hide" );
            }



    });



    $('body').on('change','#bairroEdit', function(){

        meuBairro = $('#bairroEdit').find('option:selected').val();
        if(meuBairro =='')
        {
            $.mobile.loading( "show" );
            idCidade = $('#cidadeEdit').find(":selected").attr('data-id');
            if(idCidade != 'undefined' && idCidade != ''){
                altura = $('#cidadeEdit').height();
                atualizarBairros(idCidade);
                $('#bairroEdit').css('height',altura);
            }

        }

    });



    $('body').on('change','#entregaOutroCidade', function(){
        $.mobile.loading( "show" );
        idCidadeEntr = $(this).find(":selected").attr('data-id');
        alturaEntrega = $(this).height();

        atualizarBairrosOutro(idCidadeEntr);
        $('#entregaOutroBairro').css('height',alturaEntrega);
    });
    //atualizarAtendimentos();


    $(document).on( "pagecreate",'#page1', function(){
        $("#atendimentostab").html('');
        //atualizarAtendimentos(cliente_id);

    });
    $(document).on("pageshow","#page1",function(){ // When entering pagetwo
        $("#atendimentostab").html('');
        limitPedido = 4;
        if(cliente !=""){
            atualizarAtendimentos(cliente.Cliente.id);
        }

    });
    $("#MenuListaPedido").click(function(){
        //$("#atendimentostab").html('');
        //atualizarAtendimentos(cliente_id);

    });
    $(".listarpedido").click(function(){
        $.mobile.changePage("#page1",{ transition: "none",  });
         $('.pageContent').hide();
        $.mobile.loading( "show" );
        setTimeout(function(){
            $.mobile.loading( "hide" );
            $('.pageContent').fadeIn('slow');
        },2000);

    });


    $(".localizarpedido").click(function(){
        $.mobile.changePage("#page7",{ transition: "none",  });
         $('.pageContent').hide();
        $.mobile.loading( "show" );
        setTimeout(function(){
            $.mobile.loading( "hide" );
            $('.pageContent').fadeIn('slow');
        },2000);
    });

    $(".meucadastro").click(function(){

        $.mobile.changePage("#page5",{ transition: "none",  });
         $('.pageContent').hide();
        $.mobile.loading( "show" );
        setTimeout(function(){

            $('.pageContent').fadeIn('slow');
        },2000);


    });

    $('.fazerlogin').click(function(){

        $.mobile.changePage("#Pagelogin",{ transition: "none",  });

        $('.pageContent').hide();
        $.mobile.loading( "show" );
        setTimeout(function(){
            $.mobile.loading( "hide" );
            $('.pageContent').fadeIn('slow');
        },2000);


    });

    $(".Menusair").click(function(){

        $.mobile.changePage("#page11", { transition: "none",  });
         $('.pageContent').hide();
        $.mobile.loading( "show" );
        setTimeout(function(){
            $.mobile.loading( "hide" );
            $('.pageContent').fadeIn('slow');
        },2000);


    });
    $("#cancel-button").click(function(){
        $.mobile.changePage("#page0", { transition: "none",  });
         $('.pageContent').hide();
        $.mobile.loading( "show" );
        setTimeout(function(){
            $.mobile.loading( "hide" );
            $('.pageContent').fadeIn('slow');
        },2000);


    });

    $(".linkTelefone").click(function(){
        window.open(telefonePadrao, '_system');
         $('.pageContent').hide();
        $.mobile.loading( "show" );
        setTimeout(function(){
            $.mobile.loading( "hide" );
            $('.pageContent').fadeIn('slow');
        },2000);


    });
    $("#mensagemChat").click(function(){
        $.mobile.changePage("##page10", { transition: "none",  });
         $('.pageContent').hide();
        $.mobile.loading( "show" );
        setTimeout(function(){
            $.mobile.loading( "hide" );
            $('.pageContent').fadeIn('slow');
        },2000);
        setTimeout(function() {
            $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        }, 4000);
    });

    $("#exit-button").click(function(){


        navigator.app.exitApp();
    });
    $('#compartilhar').click(function(){
        $.mobile.loading( "show" );
        setTimeout(function(){
            $.mobile.loading( "hide" );
        },4000);
    });



    var atendimentos="";
    var atendimento="";
    var ventrega=0;
    function getAtendimento(atendimentoid){


        $.mobile.loading( "show" ,{theme: 'b'});
        var url=URLAPP+"RestAtendimentos/viewmobile.json?a="+atendimentoid+"&b="+cliente.Cliente.id+"&c="+cliente.Cliente.token+"&fp="+filialPadrao+"&lj="+empresa+"";
         $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                crossDomain: true,
                 timeout:15000,



                success: function(data){


                $.mobile.loading( "hide" );

                    $.mobile.loading( "hide" );
                    var atendimento = data.resultados;
                    difHora=atendimento.Atendimento.difhora;

                    $("#codigoAtend").html(atendimento.Atendimento.codigo+'&nbsp;');
                    $('#clienteAtend').html(atendimento.Cliente.nome);
                    $('#obsPedidoEntrega').html('');
                    $.each(atendimento.Pedido, function(i, pedido){
                            if(pedido.status =='Em Aberto' || pedido.status =='Cancelado' || pedido.status =='Entregue' )
                            {
                                difHora='00:00:00';
                            }
                            var dataPedido = pedido.data
                            var pedAnoDt = dataPedido.substring(0, 4);
                            var pedMesDt = dataPedido.substring(5, 7);
                            var pedDiaDt = dataPedido.substring(8, 10);
                            dataPedido = pedDiaDt+"/"+pedMesDt+"/"+pedAnoDt;
                        var entregaLocal= 'No endere&ccedil;o de cadastro';
                        if(pedido.entrega_outro_local ==1){
                            entregaLocal=pedido.outro_endereco_entrega;
                        }
                        $("#dataAtend").html(dataPedido+' &agraves '+pedido.hora_atendimento+'&nbsp;');

                        if(pedido.user_id == undefined){
                            pedido.user_id ="Atendimento Virtual";
                        }
                        $('#obsPedidoEntrega').html(entregaLocal);
                        $("#AtendAtend").html(pedido.user_id+'&nbsp;');

                        console.log(tipoPagSeguro);
                        if((pedido.pagamento_id == tipoPagSeguro) && (pedido.pagamento_id  != null )  && (pedido.status_pagamento  == 'Pendente' ))
                        {
                          $('.pagSeguro').show();
                        }else{
                          $('.pagSeguro').hide();
                        }
                        $("#pagamentoAtend").html(pedido.status_pagamento+'&nbsp;');
                        ventrega =pedido.entrega_valor;
                        ventrega =parseFloat(ventrega) ;
                        ventrega = ventrega.toFixed(2);
                        ventrega = ventrega.toString();
                        ventrega = ventrega.replace(".",",");
                        $("#entregaPedido").html('R$ '+ventrega+'&nbsp;');
                        $("#situacaoAtend").html(pedido.status+'&nbsp;');
                        $("#posFilaAtend").html(pedido.posicao_fila+'&nbsp;');
                        $("#previsaoAtend").html(pedido.tempo_estimado+'&nbsp;');
                        $("#obsPedido").html(pedido.obs+'&nbsp;');
                        $("#idPedidoAux").html(pedido.id);
                        $('#avaliacaoPedido').raty({ half: false,score    : pedido.avaliacao });
                        $('#avaliacaoPedido').raty({
                            half     : false,
                            score    : pedido.avaliacao,
                            click: function(score, evt) {
                                //alert('ID: ' + this.id + "\nscore: " + score + "\nevent: " + evt);
                                pedido_id = $('#idPedidoAux').html();

                                $.mobile.loading( "show" ,{theme: 'b'});
                             $.ajax({


                                    type: "GET",
                                    url: URLAPP+"RestPedidos/avalpedidomobile.json?id="+pedido_id+"&nota="+score+"&b="+cliente.Cliente.id+"&c="+cliente.Cliente.token+"",
                                    dataType: 'json',
                                    crossDomain: true,
                                    timeout:15000,



                                    success: function(data){
                                        //alert(pedido_id);

                                        $.mobile.loading( "hide" );
                                    },error: function(data){

                                        $.mobile.loading( "hide" );
                                        $("#popupDialogLogin16").popup( "open" );
                                        //tratar o erro

                                    }

                                });
                            }
                        });
                    });


                     $("#counter").html('');
                     $('#counter').countdown({
                          image: 'images/digits2.png',
                          startTime: difHora,
                          digitWidth: 34,
                            digitHeight: 45,
                            format: 'hh:mm:ss',
                        });




                },error: function(data){
                    $.mobile.loading( "hide" );
                    $(".erroconexao").popup( "open" );
                    //tratar essa rotina


                }

            });


}




    var itens="";
    function getItens(atendimentoid){

        var url= URLAPP+"RestAtendimentos/itensmobile.json?a="+atendimentoid+"&b="+cliente.Cliente.id+"&c="+cliente.Cliente.token+"&fp="+filialPadrao+"";

         $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                crossDomain: true,
                timeout:15000,



                success: function(data){





                    $('.clonePedido').remove();
                    $('#obsPedidoTotal').html('');
                    //atendimentos = JSON.parse(atend);
                    $.each(data.resultados, function(i, iten){
                        vlunit =parseFloat(iten.Itensdepedido.valor_unit) ;
                        vlunit = vlunit.toFixed(2);
                        vtot=parseFloat(iten.Itensdepedido.valor_total);
                        vtot = vtot.toFixed(2);
                        obsItem = iten.Itensdepedido.obs_sis;
                        if(typeof obsItem === 'undefined')
                        {
                            obsItem='';
                        }
                        $('#itensdoPedido').append('<tr class="clonePedido"><td>'+iten.Itensdepedido.produto_id+'</td><td>'+iten.Produto.nome+' '+obsItem+'</td><td class="dinheiro">'+vlunit+'</td><td>'+iten.Itensdepedido.qtde+'</td><td class="dinheiro somaIten">'+vtot+'</td></tr>');
                    });
                    $('#linhaTotalPedido').remove();

                    $('.dinheiro').priceFormat({
                        prefix: 'R$ ',
                        centsSeparator: ',',
                        thousandsSeparator: '.'
                    });


                    var sum = 0;
                    $('.somaIten').each(function() {
                        var value = $(this).text();
                        value = value.substring(3);
                        value = value.replace(",",".");
                        value = parseFloat(value);
                        if(!isNaN(value) && value.length != 0) {

                            sum = sum + value;
                        }


                    });
                    ventrega = ventrega.toString();
                    ventrega = ventrega.replace(',','.');
                    ventrega = parseFloat(ventrega);
                    somaEntregaPedido = sum + ventrega;
                    sum = sum.toFixed(2);
                    somaEntregaPedido = somaEntregaPedido.toFixed(2);
                    somaEntregaPedido = somaEntregaPedido.toString();
                    somaEntregaPedido = somaEntregaPedido.replace('.',',');
                    $('#itensdoPedido').append('<tr id="linhaTotalPedido" class="clonePedido"><td colspan="4">Total dos Itens</td><td id="valorTotalPedido" class="dinheiro">'+sum+'</td></tr>');

                    $('#obsPedidoTotal').html('R$ '+somaEntregaPedido+'');

                    $('#valorTotalPedido').priceFormat({
                        prefix: 'R$ ',
                        centsSeparator: ',',
                        thousandsSeparator: '.'
                    });
                    $.mobile.loading( "hide" );
                    $('#contentPage2').show();
                },error: function(data){


                    $.mobile.loading( "hide" );
                    $("popupDialogLogin16").popup( "open" );
                    //tratar esta rotina




                }

            });


}

var atendimentoid="";
$('#popupCancelaitem').click(function(){
        contador=contador-1;
        $('#linhaTotal').remove();
         $('#pedido tr:last').remove();
        $('#linha'+contador+'').remove();
        $("#Itensdepedido"+contador+"ProdutoId").remove();
        $('#Itensdepedido'+contador+'Qtde').remove();

        var sum = 0;
        $('.soma').each(function() {
            //sum = sum.toFixed(2);
            var value = $(this).text();
            value = value.substring(3);
            value = value.replace(".","");
            value = value.replace(",",".");

            value = parseFloat(value);

            if(!isNaN(value) && value.length != 0) {

                sum = sum + value;
            }



        });

        $('#pedido').append('<tr id="linhaTotal"><td colspan="4">Total</td><td id="totalPedido"></td></tr>');
        sum = sum.toFixed(2);
        $("#totalPedido").html(sum);

        $('#totalPedido').priceFormat({
                        prefix: 'R$ ',
                        centsSeparator: ',',
                        thousandsSeparator: '.'
                    });

        totalPedidoPag= $("#totalPedido").text();
        $('#totalPedidoPag').html(totalPedidoPag);



});

$('#removerItem').click(function(){

    if(itens == 0){
        $('.erroqtde2').show();
    }else{
        $("#popupCancelaitempop").popup( "open" );
    }
});
$('#popupCancelaitemFechar').click(function(){
    $("#popupCancelaitempop").popup( "close" );
});
$('body').on('click', '.acaoAtend', function () {
    difHora="";
    atendimentoid=$(this).attr('data-atendimento');

    $('.clonePedido').remove();
    $('#valorTotalPedido').html('R$ 00,00');
    $.mobile.changePage("#page2", { transition: "none",  });
     $('#contentPage2').hide();
    $.mobile.loading( "show" );

    getAtendimento(atendimentoid);

    getItens(atendimentoid);

    $("#idAtend").html(atendimentoid);



});

    var codigoAtend="";
    $(document).on( "pagecreate",'#page0', function(){

        var codigoAtend="";


    });


function checaAtendimento(atendimentocod){

        var url=URLAPP+"RestAtendimentos/checaatendimento.json?a="+atendimentocod+"&b="+cliente.Cliente.id+"&c="+cliente.Cliente.token+"&fp="+filialPadrao+"";

         $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                crossDomain: true,



                success: function(data){


                    $.mobile.loading( "hide" );


                    if(data.resultados.resposta=='Existe'){
                        $( "#popupDialogAtendimento2" ).popup( "open" );
                        $.mobile.changePage("#index", { transition: "none",  });
                         $('.pageContent').hide();
                            $.mobile.loading( "show" );
                            setTimeout(function(){
                                $.mobile.loading( "hide" );
                                $('.pageContent').fadeIn('slow');
                            },2000);
                        $("#PedidoA").val(data.resultados.resposta);
                        codigoAtend=data.resultados.resposta;
                    }else{
                        $( "#popupDialogAtendimento1" ).popup( "open" );
                    }



                },error: function(data){
                    $.mobile.loading( "hide" );
                    $("#popupDialogLogin16").popup( "open" );
                    //tratar

                }

            });


}
    $('body').on('click', '#btnEntrega', function () {
        codigo="entrega";
        $.mobile.changePage("#index", { transition: "none",  });
         $('.pageContent').hide();
        $.mobile.loading( "show" );
        setTimeout(function(){
            $.mobile.loading( "hide" );
            $('.pageContent').fadeIn('slow');
        },2000);
        $("#PedidoA").val(codigo);
    });

    $('body').on('click', '.novopedido', function () {
        codigo="entrega";
        $.mobile.changePage("#page13", { transition: "none",  });
        $.mobile.changePage("#index", { transition: "none",  });
         $('.pageContent').hide();
        $.mobile.loading( "show" );
        setTimeout(function(){
            $.mobile.loading( "hide" );
            $('.pageContent').fadeIn('slow');
        },2000);
        limparPedido();
        $("#PedidoA").val(codigo);
    });

    $('body').on('click', '#submitAtendimento', function (event) {

        event.preventDefault();
        atendimento=$('#nAtendimento').val();
        checaAtendimento(atendimento);
    });


    function getMoney( str ){
            return parseInt( str.replace(/[\D]+/g,'') );
    }

    function formatReal(mixed) {
        var inteiro = parseInt(mixed.toFixed(2).toString().replace(/[^\d]+/g, ''));
        var tmp = inteiro + '';
        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
        if (tmp.length > 6)
        tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

        return tmp;
    }

    var fezPedidoSemLogar ="";
    $("#proximoPedido").click(function(){
        if(cliente ==''){
            $.mobile.changePage("#Pagelogin", { transition: "none",  });
             $('.pageContent').hide();
                $.mobile.loading( "show" );
                setTimeout(function(){
                    $.mobile.loading( "hide" );
                    $('.pageContent').fadeIn('slow');
                },2000);
            fezPedidoSemLogar='sim';

        }else{
            if(contador==0){
                $(".erroqtde").show();
            }else{
                $(".erroqtde").hide();
                $('#divProdutos').hide();
                $('#divPagamento').show();
                $('#proximoPedido').hide();
                $('#pedir').show();
                $('#spanComprar').show();
                $('#voltarPedido').show();
                $('.spananterior').show();
                 $('.spanComprar').show();
                $('.spanproximo').hide();

            }

        }

    });



    $("#voltarPedido").click(function(){

            $(".erroqtde").hide();
            $('#divProdutos').show();
            $('#divPagamento').hide();
            $('#proximoPedido').show();
            $('#pedir').hide();
            $('#spanComprar').hide();
            $("#auxvalortroco").val('');
            $("#respTrocoAux").val('');
            $("#respTroco").html('R$ 0,00');
            $('#voltarPedido').hide();
            $('.spananterior').hide();
             $('.spanComprar').hide();
            $('.spanproximo').show();


    });



    $("#auxvalortroco").keyup(function() {
        var valor = $("#auxvalortroco").val().replace(/[^0,1,2,3,4,5,6,7,8,9]+/g,'');
        $("#auxvalortroco").val(valor);
    });



    /*$('#auxvalortroco').priceFormat({
                        prefix: '',
                        centsSeparator: ',',
                        thousandsSeparator: '.'
                    });*/



    var erroVAlidacaoPedido =0;
    $('#auxvalortroco').focusout(function(){
        valorTroco=0;
        valorCompra= $('#totalPedidoPag').text();
        valorCompra = valorCompra.substring(3);
        valorCompra = valorCompra.replace(".","");
        valorCompra = valorCompra.replace(",",".");


        valorNotaPg = $('#auxvalortroco').val();

        //valorNotaPg= valorNotaPg.substring(3);

        valorNotaPg= valorNotaPg.replace(".","");
        valorNotaPg= valorNotaPg.replace(",",".");



        valorCompra=  parseFloat(valorCompra);
        valorNotaPg = parseFloat(valorNotaPg);

        valorTroco = valorNotaPg - valorCompra;

        if(valorTroco < 0){
            $('#respTroco').html('InvÃ¡lido');
            $('#respTrocoAux').val(' ');
            erroVAlidacaoPedido =1;
        }else{
            valorTroco = valorTroco.toFixed(2);
            $('#respTrocoAux').val(valorTroco);
            $('#respTrocoAux').priceFormat({
                        prefix: 'R$ ',
                        centsSeparator: ',',
                        thousandsSeparator: '.'
                    });
            $('#respTroco').html($('#respTrocoAux').val());

            $('#trocoValorPedido').val(valorNotaPg);
            $('#trocoRespostaPedido').val('Sim');
            erroVAlidacaoPedido = 0;

        }


    });








    var tpPgto;
    $("input[type='radio']").bind( "change", function(event, ui) {
     var checkBoxId =$(this).attr('id');


     if(checkBoxId == 'radio-choice-t-6a'){
        tpPgto ="DH";
        pag='dh';
        $("#radio-choice-t-6a").checkboxradio("refresh");



        $('#pagamentoPedido').val(1);
        $('#pgmoip_id').val('');

        $('#divAuxTroco').show();
        $('#pedir').show();
        $('#spanComprar').show();
        $('#auxCartao').hide();
        $('#sendToMoip').hide();


        //$('#trocoValorPedido').val('');
        //$('#trocoRespostaPedido').val('Sim');
        //$('#pagamentoPedido').val(1);
        //$('.radio-choice-t-7b input').prop('checked', false);
        //$('.radio-choice-t-7a input').prop('checked', true);


        //$('#lbchoiceb').removeClass('ui-btn-active');
        //$('#lbchoicea').addClass('ui-btn-active');
     }

     if(checkBoxId == 'radio-choice-t-6b'){
            tpPgto="CT";
            pag='cartao';

            $('#pedir').hide();
            $('#spanComprar').hide();
            $("radio-choice-t-6b").checkboxradio("refresh");


            var selecionadoCart = $('#instituicao').find(":selected").text();
            $('#sendToMoip').show();

            verificaCartao(selecionadoCart);
            getTokenMoip();
            nCart = cliente.Cliente.numerocart;
            dtExpiracao = cliente.Cliente.expiracao;
            cdSeg = cliente.Cliente.codigoseguranca;
            portad= cliente.Cliente.portador;
            cpf = cliente.Cliente.cpf;
            nasc =  cliente.Cliente.nasc;
            ano = nasc.substring(0, 4);
            mes = nasc.substring(5, 7);
            dia = nasc.substring(8, 10);
            nasc = dia + "/" + mes + "/" + ano;
            tel = cliente.Cliente.telefone;
            instituicao= cliente.Cliente.instituicao;



            if(nCart !=""){
                $('.ncartao').val(nCart);

                $('#cksimCart').removeClass('ui-checkbox-off');
                $('#cksimCart').addClass('ui-checkbox-on');
            }
            if(instituicao !=""){


                var myselect = $("#instituicao");
                //myselect[0].selectedIndex = 3;


                $('#instituicao option[value='+instituicao+']').prop('selected', true);
               // myselect.selectmenu("refresh");
                //$('#instituicao').val(instituicao);
                //$('#mymenu option[value="5"]').prop('selected', true)
            }

            if(dtExpiracao !=""){
                $('#Expiracao').val(dtExpiracao);
            }

            if(cdSeg !=""){
                $('#CodigoSeguranca').val(cdSeg);
            }
            if(portad !=""){
                $('#Portador').val(portad);
            }
            if(cpf !=""){
                $('#CPF').val(cpf);
            }
            if(nasc !=""){
                $('#DataNascimento').val(nasc);
            }
            if(tel !=""){
                $('#Telefone').val(tel);
            }

            $('#divAuxTroco').hide();
            $('#auxCartao').show();
            $('#trocoValorPedido').val('');
            $('#trocoRespostaPedido').val('NÃ£o');
     }

     if(checkBoxId == 'radio-choice-t-7a'){
        tipoTroco='Sim';
        $('#auxvalortroco').val('');
        $('#respTroco').html('');
        $('#divAuxTroco').show();
        $('#trocoRespostaPedido').val('Sim');
        $('#holdValorTroco').show();
        $('#txtValorTroco').show();

        $('#trocoresposta').val('Sim');


     }

     if(checkBoxId == 'radio-choice-t-7b'){
        tipoTroco='Nao';
        $('#auxvalortroco').val('');
        //$('#divAuxTroco').hide();
        $('#trocoValorPedido').val('');
        $('#respTroco').html('');
        $('#holdValorTroco').hide();
        $('#txtValorTroco').hide();
        $('#trocoRespostaPedido').val('NÃ£o');
        $('#trocoresposta').val('NÃ£o');

     }
      if(checkBoxId == 'radio-choice-t-9a'){
        $('#totalEntrega').html('R$ '+ cliente.Cliente.frete_cadastro);
        $('#entrega_valor').val(cliente.Cliente.frete_cadastro);
        vlFrete=cliente.Cliente.frete_cadastro;
        vlFrete= vlFrete.toString();
        totalProd =$('#totalPedidoPag').text();
        totalProd=totalProd.substring(3);
        totalProd = totalProd.replace('.','');
        totalProd = totalProd.replace(',','.');
        totalProd = parseFloat(totalProd);
        vlFrete= vlFrete.replace(',','.')
        vlFrete=parseFloat(vlFrete);

        vlTotalComFrete = totalProd + vlFrete;
        vlTotalComFrete= vlTotalComFrete.toFixed(2);
        vlTotalComFrete = vlTotalComFrete.toString();
        vlTotalComFrete= vlTotalComFrete.replace('.',',');
        $('#totalPedidoEntrega').html('R$ '+ vlTotalComFrete);
       $('#pedir').show();
       $('#spanComprar').show();
        $('#entregaOutroLocal').val(0);
        $('#holdValorEntrega').hide();

     }
      if(checkBoxId == 'radio-choice-t-9b'){
        $('#entregaOutroLocal').val(1);
        $('#holdValorEntrega').show();
        $('#pedir').hide();
        $('#spanComprar').hide();
     }
    });



    function validaFormCad(){
       $.mobile.loading( "show" );
        nome = $('#nomeEdit').val();
        username = $('#usernameEdit').val();
        password = $('#passwordEdit').val();
        checkPassword=$('#passwordConfEdit').val();

        //cep = $('.cep').val();
        logradouro = $('#logradouroEdit').val();
        numero = $('#numeroEdit').val();

        bairro = $('#bairroEdit').find('option:selected').val();

        cidade = $('#cidadeEdit').find('option:selected').val();
        uf =  $('#ufEdit').find('option:selected').val();
        telefone = $('#telefoneEdit').val();
        celular = $('#celularEdit').val();
        minhaFilial=$('#filial_id').find('option:selected').val();


        if(cliente ==''){
            if(nome ==''){
                $('#msgErroValidacao').html('nome');
                $("#erroValidaPop").popup( "open" );

            }else if(username ==''){
                $('#msgErroValidacao').html('usu&aacute;rio');
                $("#erroValidaPop").popup( "open" );
            }else if(password ==''){
                $('#msgErroValidacao').html('senha');
                $("#erroValidaPop").popup( "open" );
            }else if(logradouro ==''){
                $('#msgErroValidacao').html('logradouro');
                $("#erroValidaPop").popup( "open" );
            }else if(numero ==''){
                $('#msgErroValidacao').html('numero');
                $("#erroValidaPop").popup( "open" );
            }else if(bairro ==''){
                $('#msgErroValidacao').html('bairro');
                $("#erroValidaPop").popup( "open" );
            }else if(cidade ==''){
                $('#msgErroValidacao').html('cidade');
                $("#erroValidaPop").popup( "open" );
            }else if(uf ==''){
                $('#msgErroValidacao').html('uf');
                $("#erroValidaPop").popup( "open" );
            }else if((telefone == '') && (celular == '')){
                $('#msgErroValidacao').html('telefone ou celular');
                $("#erroValidaPop").popup( "open" );
            }else if(minhaFilial ==''){

                $('#msgErroValidacao').html('loja');
                $("#erroValidaPop").popup( "open" );
            }else if(password != checkPassword){


                $("#erroValidaSenhaPop").popup( "open" );
            }else{
                respValida = "ok";
                return respValida;
            }

        }else{
            if(nome ==''){
                $('#msgErroValidacao').html('nome');
                $("#erroValidaPop").popup( "open" );

            }else if(username ==''){
                $('#msgErroValidacao').html('usu&aacute;rio');
                $("#erroValidaPop").popup( "open" );
            }else if(logradouro ==''){
                $('#msgErroValidacao').html('logradouro');
                $("#erroValidaPop").popup( "open" );
            }else if(numero ==''){
                $('#msgErroValidacao').html('numero');
                $("#erroValidaPop").popup( "open" );
            }else if(bairro ==''){
                $('#msgErroValidacao').html('bairro');
                $("#erroValidaPop").popup( "open" );
            }else if(cidade ==''){
                $('#msgErroValidacao').html('cidade');
                $("#erroValidaPop").popup( "open" );
            }else if(uf ==''){
                $('#msgErroValidacao').html('uf');
                $("#erroValidaPop").popup( "open" );
            }else if((telefone == '') && (celular == '')){
                $('#msgErroValidacao').html('telefone ou celular');
                $("#erroValidaPop").popup( "open" );
            }else if(password != checkPassword){


                $("#erroValidaSenhaPop").popup( "open" );
            }else if(minhaFilial ==''){

                $('#msgErroValidacao').html('loja');
                $("#erroValidaPop").popup( "open" );
            }else{
                respValida = "ok";
                return respValida;
            }

        }
    }

    var salt ="jmgl33mg1221kjgruyky232ho2l3437mhljio90hueemmgjktjmmmgko2tut35ymmmh221eenngl4y73kkkj";
    function setSubmit(){
        $.mobile.loading( "show" );
        var dataNascimento = $('.nasc').val();
        var dataNascimentoAux = $('.nasc').val();
        dia = dataNascimento.substring(0, 2);
        mes = dataNascimento.substring(3, 5);
        ano = dataNascimento.substring(6, 10);
        dataNascimento = ano + "-" + mes + "-" + dia;
        senhaRegis= $('#passwordEdit').val();
        loginRegis=$('#usernameEdit').val();
        filialRegis=$('#filial_id').val();
        $('#empresaEdit').val(empresa);
        $('.nasc').val(dataNascimento);
        $("#saltEdit").val(salt);
        $(".subbtnGroup").hide();
        var urlAction = URLAPP+"RestClientes/addmobile.json";
        var dadosForm = $("#meucadastroEdit").serialize();
            $.mobile.loading( "show" ,{theme: 'b'});
                $.ajax({
                    type: "POST",
                    url: urlAction,
                    data:  dadosForm,
                    dataType: 'json',
                    crossDomain: true,



                    success: function(data){


                        var res = data.ultimocliente;
                        //cliente =  data.ultimocliente;

                        $("#saltEdit").val('');

                        if(res == 'Erro'){

                            $("#ErroCadastro").popup( "open" );
                            //$( "#popupDialog" ).popup( "open" );
                        }else{
                            if(res=='ErroUsuarioDuplo'){
                                $("#popupUsuarioDuplo").popup( "open" );
                            }else{

                                dataToLog = {
                                    username:loginRegis,
                                    password:senhaRegis,
                                    salt:salt,
                                    empresa:empresa,
                                    filial:filialRegis,
                                    cliente:res.Cliente.id
                                };

                                setTimeout(function(){
                                    $.mobile.loading( "show" );
                                    loginCad(dataToLog);
                                    $.mobile.changePage("#index",{reverse:true});
                                    setTimeout(function(){
                                        $("#popuCadastropSalvo").popup( "open" );
                                    },1000);
                                },2000);


                            }
                        }

                        $("#submitFormCliente").show();
                        $(".subbtnGroup").show();
                    },error: function(data){

                        setTimeout(function(){
                            $("#submitFormCliente").prop("disabled",false);
                            $("#popupDialogLogin6").popup( "open" );
                            $("#saltEdit").val('');
                            $("#submitFormCliente").show();
                            $.mobile.loading( "hide" );
                            $(".subbtnGroup").show();
                        },2000);

                    }
            });
        $('.nasc').val(dataNascimentoAux);
    }

    function getEndereco(cep) {
        $.mobile.loading( "show" );
        if($.trim(cep) != ""){
            $(".loadingCep").html('Pesquisando...');
            $.getScript("http://cep.republicavirtual.com.br/web_cep.php?formato=javascript&cep="+cep, function(){
                if (resultadoCEP["resultado"] != 0) {
                    $(".logradouro").val(unescape(resultadoCEP["tipo_logradouro"]) + " " + unescape(resultadoCEP["logradouro"]));
                    $("#cidadeEdit").val(unescape(resultadoCEP["cidade"])).change();
                    $("#bairroEdit").val(unescape(resultadoCEP["bairro"]));

                    getBairroFromCep = unescape(resultadoCEP["bairro"]);
                    //console.log(getBairroFromCep);
                    $(".uf").val(unescape(resultadoCEP["uf"]));
                    $(".complemento").focus();
                }else{
                    //$("#loadingCep").html(unescape(resultadoCEP["resultado_txt"]));


                }
            });

        }
        else{
            $(".loadingCep").html('Informe o CEP');
        }
        $.mobile.loading( "hide" );
    }
    $('.cep').focusout(function(){
        getEndereco($('.cep').val());
        setTimeout(function(){
            lograd= $('.logradouro').val();
            if(lograd != ''){
                getCoordenadas();
            }
        }, 3000);


    });

    $('.numero').focusout(function(){
        lograd= $('.logradouro').val();
        if(lograd != ''){
            getCoordenadas();
        }


    });

    $('.logradouro').focusout(function(){
        lograd= $('.logradouro').val();
        if(lograd != ''){
            getCoordenadas();
        }


    });
    $('.uf').focusout(function(){
        lograd= $('.logradouro').val();
        if(lograd != ''){
            getCoordenadas();
        }


    });
    $('#bairroEdit').focusout(function(){
        lograd= $('.logradouro').val();
        if(lograd != ''){
            getCoordenadas();
        }


    });
    $('.bairro').focusout(function(){
        lograd= $('.logradouro').val();
        if(lograd != ''){
            getCoordenadas();
        }


    });

    $('.cep').mask('99999999');
    $('.telefone').mask('(99) 9999-9999');
    $.mask.definitions['~'] = '([0-9] )?';
    $(".celular").mask("(99) 9999-9999~");
    $(".uf").mask("aa");
    $(".nasc").mask("99/99/9999");




    //google maps
     // your google map container





    var localizacaoEntrega="";
    function getAtendimentoPosition(atendimentoid){


        //$.mobile.loading( "show" ,{theme: 'b'});
        var url=URLAPP+"RestAtendimentos/viewmobile.json?a="+atendimentoid+"&b="+cliente.Cliente.id+"&c="+cliente.Cliente.token+"&fp="+filialPadrao+"";
         $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                crossDomain: true,



                success: function(data){


                //$.mobile.loading( "hide" );

                    //$.mobile.loading( "hide" );
                    localizacaoEntrega="";


                        if(localizacaoEntrega != ""){
                            var start= localizacaoEntrega.Atendimento.lat +','+localizacaoEntrega.Atendimento.lng;
                            var end = localizacaoEntrega.Cliente.lat +','+localizacaoEntrega.Cliente.lng;


                            var request = {
                            origin:start,
                            destination:end,
                            travelMode: google.maps.TravelMode.DRIVING
                          };
                          directionsService.route(request, function(result, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                              directionsDisplay.setDirections(result);
                            }
                          });
                        }



                    return localizacaoEntrega;

                },error: function(data){
                    //$.mobile.loading( "hide" );
                    //$("#popupDialogLogin8").popup( "open" );


                }

            });


    }

    function getAtendimentoPositionAlterado(atendimentoid){


        //$.mobile.loading( "show" ,{theme: 'b'});
        var url=URLAPP+"RestAtendimentos/viewmobile.json?a="+atendimentoid+"&b="+cliente.Cliente.id+"&c="+cliente.Cliente.token+"&fp="+filialPadrao+"";
         $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                crossDomain: true,



                success: function(data){








                            var start= data.resultados.Atendimento.lat +','+data.resultados.Atendimento.lng;
                            var end = data.resultados.Cliente.lat +','+data.resultados.Cliente.lng;


                        var request = {
                            origin:start,
                            destination:end,
                            travelMode: google.maps.TravelMode.DRIVING
                          };
                          directionsService.route(request, function(result, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                              directionsDisplay.setDirections(result);
                            }
                          });




                    //return localizacaoEntrega;

                },error: function(data){
                    //$.mobile.loading( "hide" );
                    //$("#popupDialogLogin8").popup( "open" );


                }

            });


    }

    $(".minhalocalizacao").click(function(){
        $.mobile.changePage("#page6", { transition: "none",  });
         $('.pageContent').hide();
        $.mobile.loading( "show" );
        setTimeout(function(){
            $.mobile.loading( "hide" );
            $('.pageContent').fadeIn('slow');
        },2000);
    });

    $( document ).on( "pageinit", "#page6", function() {

        setTimeout(function() {
            function initialize() {
                $("#gmapLEntrega").html('');
                var latlng = new google.maps.LatLng(cliente.Cliente.lat, cliente.Cliente.lng);

                var options = {
                    zoom: 16,
                    center: latlng,
                    scrollwheel:false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                map = new google.maps.Map(document.getElementById("gmapLEntrega"), options);
            }
            initialize();
            var newLatLng = new google.maps.LatLng(cliente.Cliente.lat, cliente.Cliente.lng);


            marker = new google.maps.Marker({
                position: newLatLng,
                map: map,
                 icon:'images/usuario2.png',
            });
        }, 1000);
    });
    var longetudeMeLoc ="";
    var latitudeMeLoc="";
    function geoSuccess( pos ) {

        // armazena as coordenadas de latitude e longitude
            lat = pos.coords.latitude,
            lng = pos.coords.longitude;
            $('.lat').val(lat);
            $('.lng').val(lng);
            //getCoordenadasLatLng(lat, lng);
            position = new google.maps.LatLng(lat,lng);
             marker = new google.maps.Marker({
                    position: position,
                     map: map,
                      icon:'images/usuario2.png',
               // draggable: true
            });

            marker.setPosition(position);
        //atualiza o ponteiro
        map.panTo( new google.maps.LatLng( lat,lng ) );
       // $.mobile.loading( "hide" );

        // crie qualquer coisa legal usando as coordenadas
    };

    function geoError( err ) {
        switch( err.code ) {
            case 1:
                // permissao negada pelo usuario
                alert('permissao negada pelo usuario');
              //  $.mobile.loading( "hide" );
                break;

            case 2:
                alert('nao foi possivel alcancar os satelites GPS');
                //$.mobile.loading( "hide" );
                // nao foi possivel alcancar os satelites GPS
                break;

            case 3:
                alert('a requisicao demorou demais para retornar');
              //  $.mobile.loading( "hide" );
                // a requisicao demorou demais para retornar
                break;

            case 0:
                alert('ocorreu um erro desconhecido...');
                //$.mobile.loading( "hide" );
                // ocorreu um erro desconhecido...
                break;
        }
    };

    var geoOptions = {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 3000
    };


    $('body').on('click', '.meLocalize', function (event) {
        $.mobile.loading( "show" );

        navigator.geolocation.getCurrentPosition( geoSuccess, geoError, geoOptions );



    });
    function meLocalize() {

    }

    $(".localizarpedido").click(function(){
        $.mobile.changePage("#map-page", { transition: "none",  });
         $('.pageContent').hide();
        $.mobile.loading( "show" );
        setTimeout(function(){
            $.mobile.loading( "hide" );
            $('.pageContent').fadeIn('slow');
        },2000);


    });

    var initialize2="";
    var initialize22="";
    var loopMap=0;



    function cancelinitialize22() {
        if (initialize22) {
            clearTimeout(initialize22);
            initialize22 = 0;
        }
    }

    var map;

    var markers=[];
    var marker ;

    var map;
    var directionsDisplay; // Instanciaremos ele mais tarde, que serÃ¡ o nosso google.maps.DirectionsRenderer
    var directionsService = new google.maps.DirectionsService();

    function initializeDistancia() {
       directionsDisplay = new google.maps.DirectionsRenderer(); // Instanciando...
       var latlng = new google.maps.LatLng(-22.775728, -43.4320752);

       var options = {
          zoom: 16,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
       };

       map = new google.maps.Map(document.getElementById("map-canvas"), options);
       directionsDisplay.setMap(map); // Relacionamos o directionsDisplay com o mapa desejado
    }

    var checaPosition="";

    $(document).on("pagebeforehide","#map-page",function(){ // When leaving #map-page
          clearTimeout(checaPosition);
    });
    $(".btn-locPedido").click(function(){
        var atendimentoId2 = $("#idAtend").text();

        $.mobile.changePage("#map-page", { transition: "none",  });
         $('.pageContent').hide();
        $.mobile.loading( "show" );
        setTimeout(function(){
            $.mobile.loading( "hide" );
            $('.pageContent').fadeIn('slow');
        },2000);
        var map="";




        setTimeout(function() {
            initializeDistancia();
            getAtendimentoPositionAlterado(atendimentoId2);

         }, 3000);

        checaPosition = setInterval(function(){
            getAtendimentoPositionAlterado(atendimentoId2);
        },30000);

        /*setTimeout(function() {
            function initialize() {
                $("#map-canvas").html('');
                if(localizacaoEntrega !=''){
                    var latlng = new google.maps.LatLng(localizacaoEntrega.lat, localizacaoEntrega.lng);

                    var options = {
                        zoom: 16,
                        center: latlng,
                        scrollwheel: false,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    map = new google.maps.Map(document.getElementById("map-canvas"), options);

                }

            }
            initialize();
            if(localizacaoEntrega !=''){
                var newLatLng = new google.maps.LatLng(localizacaoEntrega.lat, localizacaoEntrega.lng);
            }

            marker = new google.maps.Marker({
                position: newLatLng,
                map: map,
               // draggable: true
            });
        }, 3000);

        loopMap=0;
        var initialize22 = setInterval(function(){

            if(loopMap==0){
                getAtendimentoPosition(atendimentoId2);
                //$("#map-canvas").html('');



               position = new google.maps.LatLng(localizacaoEntrega.lat, localizacaoEntrega.lng);
                marker.setPosition(position);
                //atualiza o ponteiro
                map.panTo( new google.maps.LatLng( localizacaoEntrega.lat, localizacaoEntrega.lng ) );

            }else{
                clearTimeout(initialize22);
                initialize22 = 0;
            }


        },40000);*/

    });


    $('body').on('click', '.ui-toolbar-back-btn', function (event) {

        loopMap=1;
        $('#sendToMoip').hide();

    });
    $('body').on('click','#unlockDatabtn', function(){
        senhaCorreta = $('#passdb').val();
        SenhaDigitada = $('#senhalock').val();
        if(senhaCorreta == SenhaDigitada)
        {
            $(".meucadastroForm").show();
            $('.showDataUser').hide();
        }else
        {
            $(".meucadastroForm").hide();
            $('.showDataUser').show();
            $( "#popupSenhaUnlock" ).popup( "open" );
        }
    });
       function atualizarLojas(){
         $.mobile.loading( "show" );
         $.ajax({
                type: "GET",
                url: URLAPP+"RestFilials/indexmobile?e="+empresa,
                dataType: 'json',
                crossDomain: true,



                success: function(data){

                    $('#cadastroContent').css('display','block');
                    i=0;
                     $('.cloneOptLoja').remove();
                     selectFilialEdit= $('#filial_id');
                    $.each(data, function(i, resultado){
                        $('.filialSelect').append('<option class="cloneOptLoja" value="'+resultado.Filial.id+'">'+resultado.Filial.nome+'</option>');
                    });
                   // selectFilialEdit.selectmenu();
                    //selectFilialEdit.selectmenu('refresh', true);



                    if(cliente != ''){
                        $('filialSelect').val(cliente.Cliente.filial_id).change();
                        $('.showDataUser').show();
                        $('#cadastroContent').css('display','block');

                    }else{
                        $('#meucadastroEdit').show();
                        $('#cadastroContent').css('display','block');
                    }

                    $.mobile.loading( "hide" );


                },error: function(data){



                 $('#cadastroContent').css('display','none');
                 $('#meucadastroEdit').css('display','none');
                 $('#showDataUser').css('display','none');
                 setTimeout(function(){
                    $.mobile.loading( "hide" );
                    $("#popupDialogLogin6").popup( "open" );
                 },1000);



                }

            });


        }
var getBairroFromCep=null;
    salt ="jmgl33mg1221kjgruyky232ho2l3437mhljio90hueemmgjktjmmmgko2tut35ymmmh221eenngl4y73kkkj";
    $(document).on( "pageshow",'#page5', function() {


        $("#cadastroContent").hide();
         atualizarCidades();
        atualizarLojas();

        $('.empresaEdit').val(empresa);
        $("#saltEdit").val(salt);
        if(cliente ==""){
            $('.showDataUser').hide();
            setTimeout(function(){
                 $(".meucadastroForm").show();

                 $("#submitFormCliente").html('Cadastrar');
            },2000);

        }else{
            $(".meucadastroForm").hide();
            setTimeout(function(){
                $('.showDataUser').show();
            },2000);

            var dataNascimento = cliente.Cliente.nasc;
            var dataNascimentoAux = $('.nasc').val();
            ano = dataNascimento.substring(0, 4);
            mes = dataNascimento.substring(5, 7);
            dia = dataNascimento.substring(8, 10);
            dataNascimento = dia + "/" + mes + "/" + ano;



            $('#nomeEdit').val(cliente.Cliente.nome);
            $('#usernameEdit').val(cliente.Cliente.username);
            $('#passwordEdit').val('');
            $('#nascEdit').val(dataNascimento);
            $('#cepEdit').val(cliente.Cliente.cep);
            $('#logradouroEdit').val(cliente.Cliente.logradouro);
            $('#complementoEdit').val(cliente.Cliente.complemento);
            $('#numeroEdit').val(cliente.Cliente.numero);
            $('#bairroEdit').val(cliente.Cliente.bairro);
            $('#pReferenciaEdit').val(cliente.Cliente.p_referencia);
             if(typeof getBairroFromCep !=='undefined')
            {
               if(getBairroFromCep != null)
                {
                    getBairroFromCep=cliente.Cliente.bairro;
                    getBairroFromCep=null;
                }
            }
            setTimeout(function(){
                $('.cidade').val(cliente.Cliente.cidade).change();

            },2000);


            $('#ufEdit').val(cliente.Cliente.uf);
            $('#emailEdit').val(cliente.Cliente.email);
            $('#telefoneEdit').val(cliente.Cliente.telefone);
            setTimeout(function(){
                $('.filialEdit').val(filialPadrao).change();

            },2000);

            $('#empresaEdit').val(cliente.Cliente.empresa_id);

            $('#celularEdit').val(cliente.Cliente.celular);
            $('#idEdit').val(cliente.Cliente.id);
            $("#lngEdit").val(cliente.Cliente.lng);
            $('#latEdit').val(cliente.Cliente.lat);
            $('#latEditDest').val(cliente.Cliente.latdest);
            $('#lngEditDest').val(cliente.Cliente.lngdest);
        }


        if(cliente ==""){



        }else{


        }
        setTimeout(function(){
            $.mobile.loading( "hide" );
            $('#cadastroContent').show();
        },1000);

    });



    $('#btn-comentar').click(function(){
        $( "#popupComentarPedido" ).popup( "open" );
    });
    //$('#avaliacaoPedido').raty({half     : true,});
    //$('#avaliarPedido').raty();

    //funÃ§Ãµes para o chat
    var numeroPedido;
    $('#btn-chat').click(function(){
        numeroPedido= $("#idPedidoAux").text();
        $('#chatZone').html();
        idempresa= empresa;
        idfilial = filialPadrao;
    });

    $('#formChat').submit(function(event){
        event.preventDefault();

        name = cliente.Cliente.username;
        $('#idclientemsg').val(cliente.Cliente.id);
        $('#idsenderemsg').val(cliente.Cliente.id);

        $('#idpedidoemsg').val(numeroPedido);

        $('#idempresa').val(idempresa);
        $('#idfilial').val(idfilial);

        msg = $("#msg").val();
        if(msg !=''){
            $.mobile.loading( "show" );
            enviaMensagem();

            $("#msg").val('');

        }

    });

    var myVar;
    $(document).on("pagebeforehide","#page10",function(){ // When leaving pagetwo

         clearInterval(myVar);
    });
    $( document ).on( "pageinit", "#page10", function() {
        $('#idclientemsg').val(cliente.Cliente.id);
        $('#chatZone').html();
      //  recebeMensagemInicio();
      verificaMensagem();
        setTimeout(function(){
            $("html, body").animate({ scrollTop: $(document).height() }, "slow");
            }, 4000);
        /*$('#chatZone').animate(
                {
                    scrollTop: $('#chatZone').prop("scrollHeight"),

                }, 500);*/
        //$("#chatZone").getNiceScroll().resize();

        //$("html, body").animate({ scrollTop: $(document).height() }, "slow");
        //myVar = setInterval(function(){verificaMensagem();}, 3000);

    });

    $(document).on("pageshow","#Pagelogin",function(){ // When entering pagetwo
        $('#empresa_input').val(empresa);
        $('#filial_input').val(filialPadrao);
       // getEntries();
    });
    $(document).on("pageshow","#page10",function(){ // When entering pagetwo
        $('#idpedidoempresa').val(empresa);
        $('#idpedidofilial').val(filialPadrao);
        $('#chatZone').html('');
        setTimeout(function(){
          verificaMensagem();
        },1000);

        myVar = setInterval(function(){
            verificaMensagem();
        }, 10000);

    });
    var verificaPedido='';
    $(document).on("pageshow","#page2",function(){ // When entering pagetwo
        clearInterval(myVar);
        if(verificaPedido != ''){
            clearInterval(verificaPedido);
        }
        verificaPedido = setInterval(function(){getSituacaoPedido();}, 30000);

    });

    $(document).on("pageshow","#page1",function(){
       if(verificaPedido != ''){
            clearInterval(verificaPedido);
        }
    });

    //$("html").niceScroll({cursorcolor:"#FF5C0A" });

    var ultimaMsg="";
    function enviaMensagem(){


        var urlAction = URLAPP+"RestMensagens/addmobile.json?b="+cliente.Cliente.id+"&c="+cliente.Cliente.token+"";
        var dadosForm = $("#formChat").serialize();



        $.ajax({
            type: "POST",
            url: urlAction,
            data:  dadosForm,
            dataType: 'json',
            crossDomain: true,



            success: function(data){

                //verificaMensagem();
                //ultimaMsg =data.ultimomensagen.Mensagen.id;
                 /*$('#chatZone').append('<div class="chatmsg" data-msgid="'+data.ultimomensagen.Mensagen.id+'"><b>'+data.ultimomensagen.Cliente.username+'</b>: '+data.ultimomensagen.Mensagen.msg+'<br/></div>');




                //$("#chatZone").scrollTop($("#chatZone").prop("scrollHeight"));

                $('#chatZone').animate(
                {
                    scrollTop: $('#chatZone').prop("scrollHeight"),

                }, 500);

                $("#chatZone").getNiceScroll().resize();
                $("#chatZone").niceScroll({cursorcolor:"#CCC" }); */
                $.mobile.loading( "show" );
            },error: function(data){
                //criar tratatmento de erros
                $("#popupDialogLogin11").popup( "open" );
                $.mobile.loading( "hide" );
            }
            });




    }

    function recebeMensagemInicio(){

        var url=URLAPP+"RestMensagens/indexmobile.json?d="+numeroPedido+"&clid="+cliente.Cliente.id+"&b="+cliente.Cliente.id+"&c="+cliente.Cliente.token+"";
         $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                crossDomain: true,



            success: function(data){

                console.log(url);
                $.each(data, function(i, resultados){

                    $.each(resultados, function(z, resultado){

                        senderuser = resultado.User.id;
                        sendercliente = cliente.Cliente.id;
                        sender = resultado.Mensagen.sender;
                        nomeMsg ="";
                        classemsg="";
                        if(sender == 0){
                            nomeMsg = resultado.User.username;
                            classemsg ="spanAtendente";
                            classetriangulo = "triangle-isoscelesalt top";

                        }else{
                            nomeMsg = cliente.Cliente.username;
                            classemsg ="spanUsuario";
                            classetriangulo = "triangle-isosceles";
                        }
                        $('#chatZone').append('<p class="'+classetriangulo +'" data-msgid="'+resultado.Mensagen.id+'"><span class="'+classemsg+'">'+nomeMsg+' disse: </span>'+resultado.Mensagen.msg+'</p>');

                        //$("#chatZone").scrollTop($("#chatZone").prop("scrollHeight"));


                        setTimeout(function(){
                            $(".modal-body").animate({ scrollTop: $(document).height() }, "slow");
                        }, 1000);


                        //$("#chatZone").getNiceScroll().resize();
                        //$("html, body").niceScroll({cursorcolor:"#FF5C0A" });
                        ultimaMsg =resultado.Mensagen.id;

                    });
                });


            },error: function(data){
                //criar tratatmento de erros
                $("#popupDialogLogin11").popup( "open" );

            }
            });
    }
    function verificaMensagem(){


        var url=URLAPP+"RestMensagens/viewmobile.json?d="+numeroPedido+"&clid="+cliente.Cliente.id+"&ult="+ultimaMsg+"&b="+cliente.Cliente.id+"&c="+cliente.Cliente.token+"";

         $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                crossDomain: true,



            success: function(data){

                console.log(data);
                contadorScroll=0;
                acumuladorTexto="";
                $.each(data, function(i, resultados){

                    $.each(resultados, function(z, resultado){

                        senderuser = resultado.User.id;
                        sendercliente = cliente.Cliente.id;
                        sender = resultado.Mensagen.sender;
                        nomeMsg ="";
                        classemsg="";
                        if(sender == 0){
                            nomeMsg = resultado.User.username;
                            classemsg ="spanAtendente";
                            classetriangulo = "triangle-isoscelesalt top";

                        }else{
                            nomeMsg = cliente.Cliente.username;
                            classemsg ="spanUsuario";
                            classetriangulo = "triangle-isosceles";
                        }

                        acumuladorTexto= acumuladorTexto+'<p class="'+classetriangulo +'" data-msgid="'+resultado.Mensagen.id+'"><span class="'+classemsg+'">'+nomeMsg+' disse : </span>'+resultado.Mensagen.msg+'</p>';


                        //$("#chatZone").scrollTop($("#chatZone").prop("scrollHeight"));

                        //$("html, body").animate({ scrollTop: $(document).height() }, "slow");
                        //$("html, body").animate({ scrollTop: $(document).height() }, "slow");
                        //$("#chatZone").getNiceScroll().resize();
                        //$("#chatZone").niceScroll({cursorcolor:"#FF5C0A" });
                        ultimaMsg = resultado.Mensagen.id;

                    });
                });
                if(acumuladorTexto !=''){
                    $('#chatZone').append(acumuladorTexto);
                    setTimeout(function(){
                    //$("#chatZone").getNiceScroll().resize();
                    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
                    }, 300);

                }

                $.mobile.loading( "hide" );

            },error: function(data){
                //criar tratatmento de erros
                //$(".erroconexao").popup( "open" );
                 $.mobile.loading( "hide" );
            }
            });
    }
    var campainha=0;
     var atendimentoid="";
    function getSituacaoPedido(){

        atendimentoid = $('#idAtend').text();
        //$.mobile.loading( "show" ,{theme: 'b'});
        var url=URLAPP+"RestAtendimentos/viewmobile.json?a="+atendimentoid+"&b="+cliente.Cliente.id+"&c="+cliente.Cliente.token+"&fp="+filialPadrao+"";
         $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                crossDomain: true,



                success: function(data){


                //$.mobile.loading( "hide" );

                    //$.mobile.loading( "hide" );
                    $.each(data, function(i, atendimento){


                        $.each(atendimento.Pedido, function(i, pedido){

                            statusSit = $("#situacaoAtend").text();
                            subsSit = statusSit.substring(0, 5);
                            subsSitPedido= pedido.status.substring(0, 5);
                             if(pedido.status != 'Em Aberto' && pedido.status != 'Entregue' && pedido.status != 'Cancelado')
                            {
                                    difHora=atendimento.Atendimento.difhora;
                                     $("#counter").html('');
                                     $('#counter').countdown({
                                          image: 'images/digits2.png',
                                          startTime: difHora,
                                          digitWidth: 34,
                                            digitHeight: 45,
                                            format: 'hh:mm:ss',
                                        });
                            }
                            if(subsSit != subsSitPedido){
                                $('#situacaoAtend').html(pedido.status);
                                $(".situacaoAtend").addClass("verde-background");
                                $(".situacaoAtend").animate({"margin-left": "+=25px"},"fast");
                                $(".situacaoAtend").animate({"margin-left": "-=50px"},"fast");
                                $(".situacaoAtend").animate({"margin-left": "+=50px"},"fast");
                                $(".situacaoAtend").animate({"margin-left": "-=50px"},"fast");
                                $(".situacaoAtend").animate({"margin-left": "+=50px"},"fast");
                                $(".situacaoAtend").animate({"margin-left": "-=25px"},"fast");
                                $('.audioPlayer').trigger('play');
                            }

                             posFila = $('#posFilaAtend').text();
                             posFila = parseInt(posFila);
                             posFilaAtual = pedido.posicao_fila;
                             posFilaAtual =  parseInt(posFilaAtual);
                            if(posFila != posFilaAtual){

                                $('#posFilaAtend').html(pedido.posicao_fila);
                                $(".animaPos").addClass("verde-background");
                                $(".animaPos").animate({"margin-left": "+=25px"},"fast");
                                $(".animaPos").animate({"margin-left": "-=50px"},"fast");
                                $(".animaPos").animate({"margin-left": "+=50px"},"fast");
                                $(".animaPos").animate({"margin-left": "-=50px"},"fast");
                                $(".animaPos").animate({"margin-left": "+=50px"},"fast");
                                $(".animaPos").animate({"margin-left": "-=25px"},"fast");
                                $('.audioPlayer').trigger('play');
                            }
                            sitAtendimento = $('#pagamentoAtend').text();
                            if(sitAtendimento != 'Pendente')
                            {
                              $('.pagSeguro').hide();
                            }

                             if(sitAtendimento != pedido.status_pagamento){
                                $('#pagamentoAtend').html(pedido.status_pagamento);
                                $(".animaSitPag").addClass("verde-background");
                                $(".animaSitPag").animate({"margin-left": "+=25px"},"fast");
                                $(".animaSitPag").animate({"margin-left": "-=50px"},"fast");
                                $(".animaSitPag").animate({"margin-left": "+=50px"},"fast");
                                $(".animaSitPag").animate({"margin-left": "-=50px"},"fast");
                                $(".animaSitPag").animate({"margin-left": "+=50px"},"fast");
                                $(".animaSitPag").animate({"margin-left": "-=25px"},"fast");
                                $('.audioPlayer').trigger('play');
                             }
                             /*sitcampainha = atendimento.Atendimento.campainha;
                             atendimentoid= atendimento.Atendimento.id;
                             if(sitcampainha == null){

                             }else{

                                if(sitcampainha >= 1){

                                    if(sitcampainha==10){

                                    }else{
                                        if(sitcampainha==11){

                                        }else{
                                            if(campainha==0){
                                                $('.audioPlayer').trigger('play');
                                                 $("#popupAvisoCampainha").popup( "open" );
                                            }
                                        }
                                    }



                                  }

                             }*/


                        });

                    });


                },error: function(data){
                    //$.mobile.loading( "hide" );
                    //tratar essa rotina


                }

            });



    }
    $('#page2').click(function(){

        $(".verde-background").removeClass("verde-background");

    });

    $('body').on('click', '.fecharcampainha', function(){

        campainha=0;

        atendeCampainha(atendimentoid);
    });

    function atendeCampainha(atendimentoid){


        $.mobile.loading( "show" ,{theme: 'b'});
        var url=URLAPP+"RestAtendimentos/campainhamobile.json?entr=2&a="+atendimentoid+"&b="+cliente.Cliente.id+"&c="+cliente.Cliente.token+"&fp="+filialPadrao+"";
            $.ajax({
                type: "GET",
                url: url,
                dataType: 'json',
                crossDomain: true,



                success: function(data){


                    $.mobile.loading( "hide" );


                },error: function(data){

                    $.mobile.loading( "hide" );

                    //tratar essa rotina


                }

            });


    }
    function getSituacaoCampainha(){
        if(cliente !='')
        {
            //$.mobile.loading( "show" ,{theme: 'b'});
            var url=URLAPP+"RestAtendimentos/getsituacaocampainha.json?entr=2&b="+cliente.Cliente.id+"&c="+cliente.Cliente.token+"&fp="+filialPadrao+"";
             $.ajax({
                    type: "GET",
                    url: url,
                    dataType: 'json',
                    crossDomain: true,



                    success: function(data){

                        if(data.resultados=='vazio'){

                        }else{

                            if(typeof data.resultados.Atendimento.id !=="undefined"){
                                atendimento_id= data.resultados.Atendimento.id;
                                $('.audioPlayer').trigger('play');
                                 $(".popupAvisoCampainha").popup( "open" );
                            }


                        }



                    },error: function(data){



                    }

                });
        }





    }


    $('.formaDEpagamento').change(function(){
        valorFormaPg = $(".formaDEpagamento option:selected").text();

        if(valorFormaPg=='Dinheiro'){


            $('.auxDinheiro').show();
            tpPgto ="DH";
            pag='dh';

        }else{

            $('.auxDinheiro').hide();
            tpPgto="CT";
            pag='cartao';

        }

    });
    /*$('.applogo').click(function(){
        $("#popupDialogFormFoto1").popup( "open" );
    });*/


    $(document).on("pageshow","#page0",function(){
        /*if(cliente.Cliente.foto != null){
            $('.fotoHeader').attr('src',cliente.Cliente.foto);
            if(cliente.Cliente.fotoexif==1){
                $('.fotoHeader').addClass('fotoRotate');
            }
        }*/


    });



    var salt ="jmgl33mg1221kjgruyky232ho2l3437mhljio90hueemmgjktjmmmgko2tut35ymmmh221eenngl4y73kkkj";
    $('.clienteSalt').val(salt);
    $('.enviaFoto').submit(function(event){
        event.preventDefault();
        $.mobile.loading( "show" );
        $('.clienteIdFoto').val(cliente.Cliente.id);
        fotoInput = $ ('.fotoInput').val();
        if(fotoInput != ''){
            var urlAction = URLAPP+"RestClientes/addFotosmobile.json";
            var formData = new FormData(this);
            $.ajax({
                type:'POST',
                url: urlAction,
                data:formData,
                cache:false,
                contentType: false,
                processData: false,
                success:function(data){

                    $('.fotoHeader').attr('src',data.ultimocliente.Cliente.foto);
                    arrayNome = data.ultimocliente.Cliente.foto;
                    arrayNome2 = arrayNome.split('fotoscli');
                  splitFoto = arrayNome2

                    $("#popupDialogFormFoto1").popup( "close" );
                    $.mobile.loading( "hide" );
                },
                error: function(data){
                    alert('Erro ao enviar a foto');
                    $.mobile.loading( "hide" );

                }
            });
        }else{

        }

    });

$(".ui-icon-share").click(function(){
    setTimeout(function(){
        $('.ui-icon-share').prop('disabled', true);
    },500);
    setTimeout(function(){
        $('.ui-icon-share').prop('disabled', false);
    },4000);
});

});
