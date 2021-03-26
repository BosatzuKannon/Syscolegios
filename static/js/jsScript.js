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
	html+="<th>Promedio</th><th>Equivalente</th><th>Desempeño</th></tr>";
	$.each( CodsAlum, function( idalu, codalu ) {
		var input1='<input type="text" id="A'+codalu+'" value="" size="3" class="entrada">';
		var input2='<input type="text" id="B'+codalu+'" value="" size="3" class="entrada">';
		var input5='<input type="text" id="X'+codalu+'" size="3" class="salida" readonly>';
		
		html+='<tr><td align="center">'+codalu+'</td><td>'+Alumnos[codalu]+'</td>';
		html+='<td>'+input1+'</td>';
		html+='<td>'+input2+'</td>';
		html+='<td align="center">'+input5+'</td>';
		html+='<td align="center"><div id="Y'+codalu+'"></div></td><td><div id="W'+codalu+'"></div></td></tr>';
	});
	html+='</table>';

	$("#contenedor").html(html);

	$(document).on('change', '.entrada', function () {
		var val = validarNota($(this).attr('id'));

		if($(this).val() != ""){
			if(val != "ok"){
				alert("Error : "+val);
				$(this).val('');
				//$(this).trigger('change');
			}
			else{
				CambiarColor($(this).attr('id'),$(this).val());
			}
		}
    });

    $(document).on('keyup', '.entrada', function (event) {
		console.log(event.keyCode);
		var fil_act = $(this).closest("tr").index();
		console.log("fila : "+$(this).closest("tr").index());
		var col_act = $(this).closest("td").index();
		console.log("Columna : "+$(this).closest("td").index());
		console.log("Columnas total : " + $("#tabla1 tr:last td").length);
		console.log("Filas Total : " + $("#tabla1 tr").length);
		//console.log($(this).attr('id'));
		//console.log($(this));

		//document.getElementById("IDdeTabla").rows[i].cells[j].innerText  

		if(event.keyCode == 40 || event.keyCode == 13){			
			if(fil_act < ($("#tabla1 tr").length)-1){				
				var celda = (document.getElementById("tabla1").rows[(fil_act + 1)].cells[col_act]).closest('td');
				var id_cel_nex = $(celda).find('input[type="text"]').attr('id');
				document.getElementById(id_cel_nex).focus();				
			}
		}
		else if(event.keyCode == 38){
			if(fil_act > 1){				
				var celda = (document.getElementById("tabla1").rows[(fil_act - 1)].cells[col_act]).closest('td');
				var id_cel_nex = $(celda).find('input[type="text"]').attr('id');
				document.getElementById(id_cel_nex).focus();				
			}
		}
		else if(event.keyCode == 37){
			if(col_act > 2){				
				var celda = (document.getElementById("tabla1").rows[fil_act].cells[(col_act -1)]).closest('td');
				var id_cel_nex = $(celda).find('input[type="text"]').attr('id');
				document.getElementById(id_cel_nex).focus();				
			}
		}
		else if(event.keyCode == 39){
			if(col_act < ($("#tabla1 tr:last td").length) - 4){				
				var celda = (document.getElementById("tabla1").rows[fil_act].cells[(col_act +1)]).closest('td');
				var id_cel_nex = $(celda).find('input[type="text"]').attr('id');
				document.getElementById(id_cel_nex).focus();				
			}
		}
    });

    /*document.querySelector("#tabla1", '.entrada').onkeyup = function(event){
		alert(event.keyCode);
		console.log($(this).attr('id'));
	}*/

	$("#grabar").click(function(){ GrabarNotas(); });



	$("#agregarNota").click(function(){ AgregarNotas(); });
	//_____________________________________________________________________________
	/*$("#tabla1").focusout(function(){
	  $(this).css("background-color", "#FFFFFF");
	});*/

	
	$('#tabla1').on('change', 'input', function () {
		
		var nColumnas = $("#tabla1 tr:last td").length;
	    var row = $(this).closest('tr');
	    var subId = $(this).attr('id').substr(1,5);
	    var idProm ='X'+subId;
	    var eqProm = 'Y'+subId;
	    var notas = 0;
	    var con = 0;
	    $('input', row).each(function() {
	        if($(this).val() != "" && !isNaN($(this).val()) && con < (nColumnas-5)){
	        	notas += Number($(this).val());
	        	con++;
	        }
	    });

	    var prom = parseFloat(notas/con).toFixed(2)
	    
	    $("#"+idProm).val(prom);
	    
	    if (prom <= rango[1]){
	    	$("#"+eqProm).html('Bajo');
	    	$("#"+eqProm).css("color", "red");
	    }
		else if (prom <= rango[2]){
			$("#"+eqProm).html('Basico');
	    	$("#"+eqProm).css("color", "orange");
		}
		else if (prom <= rango[3]){
			$("#"+eqProm).html('Alto');
	    	$("#"+eqProm).css("color", "green");
		}
		else{
			$("#"+eqProm).html('Superior');
	    	$("#"+eqProm).css("color", "green");
		}
	});

	cargarNotas();

});

function validarNota(nota){
	
	var n = $('#'+nota).val();
	var mensaje = 'ok';
	var expreg = /^(\d{1})(\.\d{1,2})?$/;
	
	if(!expreg.test(n)){
		mensaje = "Por favor solo ingrese números";
	}

	if(parseFloat(n) <= 0 || parseFloat(n) >= 5){
		mensaje = "La nota " + n +" debe estar entre 0 y 5.";	
	}

	return mensaje;
}

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

function AgregarNotas(){
	
	var tble = document.getElementById("tabla1");

	var nColumnas = $("#tabla1 tr:last td").length;
	var newIndex = (nColumnas - 5) + 2;
	
	var row = tble.rows;

	const alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var rowactual;
	var x;
	var subId;
	var idProm;

	for(var i = 0; i < row.length; i++) {

		rowactual = row[i];
		x = rowactual.insertCell(newIndex);

		if (i == 0) {
			x.innerHTML = "<th>Nota " + (newIndex - 1) + "</th>"
		}
		else{
	    	idProm = alfabeto[newIndex - 2] + rowactual.getElementsByTagName("td")[0].innerHTML;
			x.innerHTML = '<input type="text" id="'+idProm+'"  value="" size="3" class="entrada">';
		}
	}

	/*var td = document.createElement('td');
	var input = document.createElement('INPUT');
	input.type = 'text';
	td.appendChild(input);
	tr[newIndex].appendChild(td);*/

	
	/*var nColumnas = $("#tabla1 tr:last td").length;

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

	$("#contenedor").html(html);*/

	
}

function cargarNotas(){

	var data = {"obj" : 1};
    
	$.ajax({
            type: "POST",
            url: 'http://localhost/examenPrueba/static/php/dbnotas.php',
            dataType: "json",
            data: data,
            success: function(response)
            {
                var notas = response.notas;
 				for (var i = 0;i < notas.length ; i++) {
 					$("#"+notas[i].codNota).val(notas[i].nota);
 					$("#"+notas[i].codNota).trigger('change');
 				}
           }
       });
}

function GrabarNotas(){

	var data = {"obj" : 2, "notas": getNotas()};
    
	$.ajax({
            type: "POST",
            url: 'http://localhost/examenPrueba/static/php/dbnotas.php',
            dataType: "json",
            data: data,
            success: function(response)
            {
                alert(response.success);
           }
       });
}

function getNotas(){

	var obj = {};

	var tble = document.getElementById("tabla1");

	var nColumnas = $("#tabla1 tr:last td").length;
	var nNotas = (nColumnas - 5);
	
	var row = tble.rows;

	const alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var rowactual;
	var x;

	for(var i = 0; i < row.length; i++) {

		rowactual = row[i];

		if (i != 0) {
			for (var y = 2 ; y <= nNotas+1; y++) {
				key = alfabeto[y - 2] + rowactual.getElementsByTagName("td")[0].innerHTML;				
				x = $("#"+key).val();
				if (x != "") {
					obj[key] = x;
				}		
			}
		}
	}
	
	return obj;
}