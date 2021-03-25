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
		//promedioNota($(this).attr('id'));
    }); 

	$("#grabar").click(function(){ GrabarNotas(); });	

	$("#agregarNota").click(function(){ AgregarNotas(); });

	$('#tabla1').on('change', 'input', function () {
		var nColumnas = $("#tabla1 tr:last td").length;
	    var row = $(this).closest('tr');
	    var subId = $(this).attr('id').substr(1,5);
	    var idProm ='X'+subId;	    
	    var notas = 0;
	    var con = 0;
	    $('input', row).each(function() {	        
	        if($(this).val() != "" && !isNaN($(this).val()) && con < (nColumnas-4)){
	        	notas += Number($(this).val());
	        	con++;
	        }
	    });
	    
	    row.find("#"+idProm).val(notas/con);	    
	});

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
	//else $('#'+id).val('-');
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

function AgregarNotas(){
	var nColumnas = $("#tabla1 tr:last td").length;

	var html='<table id="tabla1" border="1" align="center">';
	html+="<tr><th>CODIGO</th><th>ALUMNO</th>";

	for (var i = 0; i <= (nColumnas - 4); i++) {
		html+="<th>Nota " + (i+1) +"</th>";
	}

	html+="<th>Promedio</th><th>Desempeño</th></tr>";
	nColumnas++;
	const alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

	$.each( CodsAlum, function( idalu, codalu ) {
		
		var inputProm ='<input type="text" id="X'+codalu+'" size="3" class="salida" readonly>';
		
		html += '<tr><td align="center">'+codalu+'</td><td>'+Alumnos[codalu]+'</td>';
		for (i = 0; i < (nColumnas - 4); i++) {
			html += '<td><input type="text" id="' + alfabeto[i] + codalu + '" value="" size="3" class="entrada"></td>';
		}
		
		html += '<td align="center">'+inputProm+'</td>';
		html += '<td><div id="W'+codalu+'"></div></td></tr>';
	});
	html += '</table>';

	$("#contenedor").html(html);
}

/*function promedioNota(){

	var nColumnas = $("#tabla1 tr:last td").length;

	var table = document.getElementById("tabla1"); 

	for (var i = 1, row; row = table.rows[i]; i++) { 
		for (var j = 2, col; col = row.cells[j]; j++) {
			
			if(j <= (nColumnas-3)){
				//var = col.value;
				console.log(col.innerText)
				console.log(col)
			}
		} 
	}
	
}*/

/*$('#tabla1').on('change', 'input', function () {
    var row = $(this).closest('tr');
    var notas = 0;
    $('input', row).each(function() {
        notas += Number($(this).val());
    });
    //$('.total', row).text(total);
    console.log(notas);
});*/

/*function (){
	var nColumnas = $("#tabla1 tr:last td").length;
	console.log("inside change event");
	var table = document.getElementById("tabla1"); 

	for (var i = 1, row; row = table.rows[i]; i++) { 
		for (var j = 2, col; col = row.cells[j]; j++) {
			
			if(j <= (nColumnas-3)){
				//var = col.value;
				console.log(col.innerText)
				console.log(col)
			}
		} 
	}
};*/