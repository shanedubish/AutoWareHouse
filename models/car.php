<?php

// database connection
$dbconn = null;
if (getenv('DATABASE_URL')) {
  $connectionConfig = parse_url(getenv('DATABASE_URL'));
  $host = $connectionConfig['host'];
  $user = $connectionConfig['user'];
  $password = $connectionConfig['pass'];
  $port = $connectionConfig['port'];
  $dbname = trim($connectionConfig['path'], '/');
  $dbconn = pg_connect(
    "host=" .
      $host .
      " " .
      "user=" .
      $user .
      " " .
      "password=" .
      $password .
      " " .
      "port=" .
      $port .
      " " .
      "dbname=" .
      $dbname
  );
} else {
  $dbconn = pg_connect("host=localhost dbname=autowarehouse");
}

class Car
{
  public $id, $make, $model, $year, $description, $img;

  public function __construct($id, $make, $model, $year, $description, $img)
  {
    $this->id = $id;
    $this->make = $make;
    $this->model = $model;
    $this->year = $year;
    $this->description = $description;
    $this->img = $img;
  }
}

class Cars
{
  // show all function
  static function all()
  {
    $cars = [];
    $results = pg_query["SELECT * FROM cars ORDER by id ASC"];

    $row_object = pg_fetch_object($results);
    while ($row_object !== false) {
      $new_car = new Car(
        intval($row_object->id),
        $row_object->make,
        $row_object->model,
        intval($row_object->year),
        $row_object->description,
        $row_object->img
      );
    }
    return $cars;
  }
}

?>
