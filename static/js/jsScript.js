var rango=new Array(0,2.9,3.9,4.5,5.0); // Las notas validas estan entre 1.0 y 5.0

var escala=new Array('','Bajo','Basico','Alto','Superior');

var formData = new FormData();

$( function() {
	$("#fecha").datepicker();
	$('input[type=button]').button();
	$("#mensaje").dialog({autoOpen: false,buttons: {
        Ok: function(){ $( this ).dialog( "close" ); }}});
	var html='<table id="tabla1" border="1" align="center">';
	html+="<tr><th>CODIGO</th><th>ALUMNO</th><th>Nota 1</th>";
	html+="<th>Nota 2</th>";
	html+="<th>Promedio</th><th>Desempeño</th></tr>";
	$.each( CodsAlum, function( idalu, codalu ) {
		var input1='<input type="text" id="A'+codalu+'" value="" size="3" class="entrada">';
		var input2='<input type="text" id="B'+codalu+'" value="" size="3" class="entrada">';
		var input5='<input type="text" id="X'+codalu+'" size="3" class="salida" readonly>';
		
		html+='<tr><td align="center">'+codalu+'</td><td>'+Alumnos[codalu]+'</td>';
		html+='<td>'+input1+'</td>';
		html+='<td>'+input2+'</td>';
		html+='<td align="center">'+input5+'</td>';
		html+='<td><div id="W'+codalu+'"></div></td></tr>';
	});
	html+='</table>';
	$("#contenedor").html(html);
	$(document).on('change', '.entrada', function () {
		CambiarColor($(this).attr('id'),$(this).val());
    }); 
	$("#grabar").click(function(){ GrabarNotas(); });	

});

function CambiarColor(id,nota){
	var CDesemp='W'+id.substr(1,5);
	if (nota<=rango[4]) {
		formData.append(id, nota);
		$("#"+CDesemp).html(Desempeno(nota));
	}
	if (nota<=rango[1]) $('#'+id).css("color", "red");
	else if (nota<=rango[2]) $('#'+id).css("color", "orange");
	else if (nota<=rango[3]) $('#'+id).css("color", "green");
	else if (nota<=rango[4]) $('#'+id).css("color", "blue");
	else $('#'+id).val('');
}

function Desempeno(nota){
	if (nota<=rango[1]) return 'Bajo';
	if (nota<=rango[2]) return 'Basico';
	if (nota<=rango[3]) return 'Alto';
	if (nota<=rango[4]) return 'Superior';
}

function GrabarNotas(){
	alert('Debe Implementarse obligatoriamente....');
}
