<?php


/*jpeg*/
 $data = $_POST['png'];

try{
// Save image to file
file_put_contents('ecuacion.png', base64_decode($data));

$image = imagecreatefrompng('ecuacion.png');
imagejpeg($image, 'ecuacion.jpg', 100);
imagedestroy($image);
echo 'siii';
}
catch (Exception $e) {
    echo $e;
}
?>