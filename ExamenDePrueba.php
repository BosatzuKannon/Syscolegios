<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Examen de Prueba</title>

	<link rel="stylesheet" type="text/css" href="static/css/styles.css">
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="static/js/jsScript.js"></script>

	<?php
		include 'static/php/includes.php';
	?>

	<script>Alumnos=<?PHP echo json_encode($Alumnos); ?></script>
	<script>CodsAlum=<?PHP echo json_encode($CodsAlum); ?></script>

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