 <?php
include 'conectBD.php';

$tipo_superficie = $_GET['tipo_superficie'];
$retorno = $_GET['retorno'];

$query="SELECT $retorno, tipo_pendiente FROM tabla_escorrentia WHERE tipo_superficie='$tipo_superficie' ORDER BY tipo_pendiente";

$result = pg_query($con,$query) or die("Error en la consulta SQL");
if(!$result) echo pg_error();
else
{
	echo '<option value="0">Selecciona una opción</option>';
	while (($fila = pg_fetch_array($result)) != NULL) {		
		echo '<option value="'.$fila[$retorno].'">'.$fila["tipo_pendiente"].'</option>';
	}         
        
}
pg_free_result($result);
pg_close($con);
?>

