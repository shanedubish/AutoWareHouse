<?php
header('Content-Type: application/json');
include_once __DIR__ . '../models/car.php';

if ($_REQUEST['action'] === 'index') {
  $all_cars = Cars::all();
  echo json_encode($all_cars);
}

?>
