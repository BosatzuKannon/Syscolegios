<?php 


if(!isset($_POST['obj'])){
	echo json_encode(array('success' => 0));
	die();
}

$obj = $_POST['obj'];

if($obj == '1'){
	cargarNotas();
}
else if($obj == '2'){
	actualizarNotas($_POST['notas']);
}


function cargarNotas(){
	$conexion=mysqli_connect('localhost','root','','notas2000');
	mysqli_select_db($conexion,'notas2000') or die ("Ninguna DB seleccionada");

	$consulta = "SELECT codigoNota, nota FROM notas2021";
	$result = mysqli_query($conexion, $consulta);

	while ($reg = mysqli_fetch_array($result)) {
		$notas[] = array('codNota'=> $reg['codigoNota'], 'nota'=> $reg['nota']);
	}

	echo json_encode(array('success' => 1, 'notas' => $notas));
	die();
}
	
function actualizarNotas($notas){

	$mensaje = 'Error, por favor contacte al administrador.';

	$clean = limpiarNotas();

	if ($clean != "ok") {
		echo json_encode(array('success' => $clean));
		die();
	}

	$conexion=mysqli_connect('localhost','root','','notas2000');
	mysqli_select_db($conexion,'notas2000') or die ("Ninguna DB seleccionada");
	
	foreach($notas as $n => $v){
        $cod_alum =preg_replace("/[^0-9]/", "", $n);        

		$insert = "INSERT INTO notas2021(cod_alum, codigoNota, nota) VALUES('$cod_alum','$n','$v')";

		if ($conexion->query($insert) === TRUE) {
		  $mensaje = count($notas)." notas agregadas/actualizadas correctamente";
		} 
		else{
		  $mensaje = "Error: " . $insert . "<br>" . $conexion->error;
		}		
    }

    echo json_encode(array('success' => $mensaje));	
	$conexion->close();
	die();
}

function limpiarNotas(){
	$conexion=mysqli_connect('localhost','root','','notas2000');
	mysqli_select_db($conexion,'notas2000') or die ("Ninguna DB seleccionada");

	$insert = "DELETE FROM notas2021";
	if ($conexion->query($insert) === TRUE) {
		$conexion->close();
	  return 'ok';
	} 
	else{
		$conexion->close();
	  return "Error: " . $insert . "<br>" . $conexion->error;
	}
}

?>