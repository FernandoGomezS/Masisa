 <?php
include 'conectBD.php';

$latitud = $_GET['latitud'];
$longitud = $_GET['longitud'];

$params = array(floatval($latitud), floatval($longitud));

$result = pg_query_params($con,"SELECT estacion.latitud, estacion.longitud,estacion.nombre, ecuacion.var_k, ecuacion.var_n , ecuacion.var_m , (ST_Distance_sphere((SELECT DISTINCT (ST_Transform(st_centroid(geom),4326)) FROM predios  WHERE (ST_Contains(geom,ST_Transform(ST_SetSRID(ST_Point($2, $1),4326),32718))) LIMIT 1) ,geom))As distancia FROM  estacion ,ecuacion WHERE estacion.id=ecuacion.id ORDER BY distancia LIMIT 1",$params) or die("Error en la consulta SQL");
if(!$result){ echo pg_error();}
else
{
        $row = pg_fetch_all($result);    
        echo json_encode($row);
}
pg_free_result($result);
pg_close($con);
?>
