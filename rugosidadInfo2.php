 <?php
include 'conectBD.php';

$tipo_valor = $_GET['tipo_valor'];
$tipo_material = $_GET['tipo_material'];

$result = pg_query($con,"SELECT material, descripcion, $tipo_valor FROM tabla_rugosidad WHERE tipo_material='$tipo_material' ORDER BY id") or die("Error en la consulta SQL");
if(!$result) echo pg_error();
else
{
	echo '<option value="0">Selecciona una opción</option>';
	while (($fila = pg_fetch_array($result)) != NULL) {
		if( $fila["descripcion"]==NULL){
			echo '<option value="'.$fila[$tipo_valor].'">'.$fila["material"].'</option>';
		}
		else{
			echo '<option value="'.$fila[$tipo_valor].'">'.$fila["material"].'('.$fila["descripcion"].')</option>';
		}
	}                 
}
pg_free_result($result);
pg_close($con);
?>

