<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Examen de Prueba</title>
<style type="text/css">
body{
	background:#CCC;
	width:1024px;
	display:block;
	margin:auto;
	font:Georgia, "Times New Roman", Times, serif;
}
#principal {
	background:#9FF;
	border-radius:10px 10px 10px 10px;
	-ms-border-radius:10px 10px 10px 10px;
	-webkit-border-radius:10px 10px 10px 10px;
	-moz-border-radius:10px 10px 10px 10px;
	-o-border-radius:10px 10px 10px 10px;
	-ms-box-shadow:0 0 1.3em black;
	-moz-box-shadow:0 0 1.3em black;
	-webkit-box-shadow:0 0 1.3em black;
	-o-box-shadow:0 0 1.3em black;
	box-shadow:0 0 1.3em black;
}
h1 {
	border:Outset 6px LightBlue;
	background-color:DarkSlateBlue;
	text-align:center;
	color:Khaki;
}
.entrada {
	background-color:LightGoldenrodYellow;
	font-family:"Bitstream Vera Serif";
	font-weight:bold;
	font-size:12pt;
	color:Crimson;
	text-align:center;
	width:40px;
}
.salida {
	text-align:center;
	width:40px;
}

input[type=text]{
	border-radius:7px;	
}
.fecha {
	background-color:LightGoldenrodYellow;
	font-family:"Bitstream Vera Serif";
	color:Crimson;
	font-weight:bold;
	font-size:12pt;
	text-align:center;
}
p {
	font-family:Cambria, "Hoefler Text", "Liberation Serif", Times, "Times New Roman", serif;
	font-style:italic;
	font-size:14pt;
	color:blue;
}
h2 {
	font-family:Cambria, "Hoefler Text", "Liberation Serif", Times, "Times New Roman", serif;
	color: red;
	font-size:24px;
}
</style>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script>
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
</script>
<?php
$Frases=array('Esperamos que pueda suceder cualquier cosa, y nunca estamos prevenidos para nada. Sophie Soynonov',
'El pasado es como una lámpara colocada a la entrada del porvenir. Félicité Robert de Lamennais',
'Valor es lo que se necesita para levantarse y hablar, pero también es lo que se requiere para sentarse y escuchar.',
'Si no sueltas el pasado, ¿con qué mano agarras el futuro?');
$curso="210A";
$codcol="00026011";
$alucur="alucura12";
//$link=mysql_connect("localhost","root","");
//mysql_select_db("Notas2000",$link);

$conexion=mysqli_connect('localhost','root','','notas2000');
mysqli_select_db($conexion,'notas2000') or die ("Ninguna DB seleccionada");

$consulta = "SELECT C.codigo,A.apellidos,A.nombres FROM $alucur C,alumnos A ";
$consulta.= " WHERE C.curso='$curso' AND C.codigo=A.codigo ORDER BY A.apellidos ASC ";
$result = mysqli_query($conexion, $consulta) or die ("* ERROR EN ALUMNOS *". mysqli_error($conexion));
$Alumnos=array();
while ($registro = mysqli_fetch_array($result)) {
	$codal=$registro['codigo'];
	$Alumnos[$codal]=utf8_encode($registro['apellidos'].' '.$registro['nombres']);
}
$n = rand(0,3);
$CodsAlum=array_keys($Alumnos); // Guardo el codigo del alumno para insertar las columnas
?>
<script>Alumnos=<?PHP echo json_encode($Alumnos);?></script>
<script>CodsAlum=<?PHP echo json_encode($CodsAlum);?></script>
</head>

<body>
<center>
<div id="principal">
<br />
<marquee>
<? echo $Frases[$n].date('Y-m-d'); ?>
</marquee>
<h1>COLEGIO DE PRUEBA SYSCOLEGIOS </h1>
<h2>PLANILLA DE INGRESO DE CALIFICACIONES</h2>
<p>Fecha de Ingreso: 
<input type="text" id="fecha" readonly="readonly" size="8" class="fecha" /></p>
<hr />
<div id="contenedor"></div>
<div id="mensaje" title="Mensaje syscolegios"></div>
<hr />
<input type="button" id="grabar" value="Grabar">
<input type="button" id="regresar" value="Regresar" onclick="window.history.go(-1);">
<hr />
</div>
</center>
</body>
</html>