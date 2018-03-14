<?php

 $data = $_POST['jpg'];
 unlink('/sites/masisa/images/'.$data)or print_r(error_get_last());
?>