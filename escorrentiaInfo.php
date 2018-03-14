 <?php
include 'conectBD.php';


$result = pg_query($con,"SELECT DISTINCT tipo_superficie FROM tabla_escorrentia ORDER BY tipo_superficie") or die("Error en la consulta SQL");
if(!$result) echo pg_error();
else
{
	echo '<option value="0">Selecciona una opción</option>';
	while (($fila = pg_fetch_array($result)) != NULL) {
		echo '<option value="'.$fila["tipo_superficie"].'">'.$fila["tipo_superficie"].'</option>';
	}         
        
}
pg_free_result($result);
pg_close($con);
?>

