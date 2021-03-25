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