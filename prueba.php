<?php
$array = [1, 2, 3, 4, 5];
$result = 0;

for ($i=0; $i < count($array); $i++) { 
    $result += $array[$i];
    echo $result . " ";
}


// $suma = array(10, 5, 4, 6, 5);
// $resultado= array_reduce($suma,function($vacio, $contenido){

//     return $vacio + $contenido;
// });
// var_dump($resultado);

// ?>
