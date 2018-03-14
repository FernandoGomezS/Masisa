<?php


/*png*/
 $data = $_POST['png'];

// Save image to file
    $uri =  substr($data,strpos($data,",") +1);
    $file = md5(uniqid()) . '.png';
    $filePng='/sites/masisa/images/'.$file;
file_put_contents($filePng, base64_decode($uri));

//jpg
$image = imagecreatefrompng($filePng);
$bg = imagecreatetruecolor(imagesx($image), imagesy($image));

imagefill($bg, 0, 0, imagecolorallocate($bg, 255, 255, 255));
imagealphablending($bg, TRUE);
imagecopy($bg, $image, 0, 0, 0, 0, imagesx($image), imagesy($image));
imagedestroy($image);

header('Content-Type: image/jpeg');
$fileJpg = md5(uniqid()) . '.jpg';

$quality = 100;
imagejpeg($bg, '/sites/masisa/images/'.$fileJpg, $quality);
imagedestroy($bg);
unlink($filePng);

echo $fileJpg;

?>