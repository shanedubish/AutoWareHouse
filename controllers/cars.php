<?php
header('Content-Type: application/json');
include_once __DIR__ . '/../models/car.php';

if ($_REQUEST['action'] === 'index') {
  $all_cars = Cars::all();
  echo json_encode($all_cars);
} elseif ($_REQUEST['action'] === 'post') {
  $request_body = file_get_contents('php://input');
  $body_object = json_decode($request_body);

  $new_car = new Car(
    null,
    $body_object->make,
    $body_object->model,
    $body_object->year,
    $body_object->description,
    $body_object->img
  );
  $all_cars = Cars::create($new_car);
} elseif ($_REQUEST['action'] === 'update') {
  $request_body = file_get_contents('php://input');
  $body_object = json_decode($request_body);

  $update_car = new Car(
    $_REQUEST['id'],
    $body_object->make,
    $body_object->model,
    $body_object->year,
    $body_object->description,
    $body_object->img
  );
  $all_cars = Cars::update($update_car);
  echo json_encode($all_cars);
}

?>
