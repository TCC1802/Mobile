$(document).on("click","#listar",function(){
  $(location).attr("href","listar.html");
   });

$(document).on("click","#salvar",function(){
 var parametros = {
   "nome":$("#nome").val(),
   "senha":$("#senha").val(),
   "email":$("#email").val()
 }
 $.ajax({
   type:"post",
   url:"http://wordpress-online-2.000webhostapp.com/webservice/cadastra.php",
   data:parametros,
   
   success: function (data){
     navigator.notification.alert(data);
   
    
    $("#nome").val(""),
    $("#senha").val(""),
    $("#email").val("")
 
   },
   error : function(data){
      navigator.notification.alert("Erro no cadastro");
   }
 });

});
function listar(){
  $.ajax({
    type: "post",
    url:"http://wordpress-online-2.000webhostapp.com/webservice/listar.php",
     dataType:"json",
     success: function(data){
       var itemlista = "";
       $.each(data.pessoas, function (i,dados){
         itemlista += "<option value="+dados.codigo+">"+dados.nome+" </option>";
       });
       $("#listaPessoas").html(itemlista);
      },
       error: function(data){
      navigator.notification.alert("Erro ao buscar registro");
   }
     
  });
}
$(document).on("change","#listarPessoas", function(){

  var parametros = { 
     "codigo": $("option:selected",("#listarPessoas")).val()
}
 $.ajax({
    type: "post",
    url:"http://wordpress-online-2.000webhostapp.com/webservice/listar-um-registro.php",
    data: parametro,
     dataType:"json",
     success: function(data){
        $("#codigo").val(data.pessoa.codigo);
       $("#nome").val(data.pessoa.nome);
        $("#email").val(data.pessoa.email);
         $("#senha").val(data.pessoa.senha);
      },
       error: function(data){
      navigator.notification.alert("Erro ao buscar registro");
   }
     
  });
   });
   

function habilitarCampos(){
  $("#nome").prop("readonly",true);
    $("#senha").prop("readonly",false);
    $("#email").prop("readonly",false);
 

}
function desabilitarCampos(){
  $("#nome").prop("readonly",true);
    $("#email").prop("readonly",true);
    $("#senha").prop("readonly",true);
 

}
$(document).on("click","#editar",function(){
  habilitarCampos();
});
 
$(document).on("click","#salvarEdit",function(){
  var parametros = {
    "codigo":$("#codigo").val(),
    "nome":$("#nome").val(),
    "email":$("#email").val(),
    "senha":$("#senha").val()

  }
  $.ajax({
    type: "post",
    url:"http://wordpress-online-2.000webhostapp.com/webservice/atualiza.php",
    data: parametros,
    
     success: function(data){
       navigator.notification.alert(data)
     location.reload();
     desabilitarCampos();
      },
       error: function(data){
      navigator.notification.alert("Erro ao buscar registro");
   }
     
  });
   });

$(document).on("click","#excluir",function(){
 var parametros = {
   "codigo":$("#codigo").val(),
  
 }
 $.ajax({
   type:"post",
   url:"http://wordpress-online-2.000webhostapp.com/webservice/delete.php",
   data:parametros,
   success: function(data){
    navigator.notification.alert(data);
     location.reload();
     desabilitarCampos();
 
   },
   error : function(data){
      navigator.notification.alert("Erro ao deletar");
   }
 });
});
