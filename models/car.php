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
  // create
  static function create($car)
  {
    $query =
      "INSERT INTO cars (make, model, year, description, img) VALUES ($1, $2, $3, $4, $5)";
    $query_params = [
      $car->make,
      $car->model,
      $car->year,
      $car->description,
      $car->img,
    ];
    pg_query_params($query, $query_params);
    return self::all();
  }

  // show all
  static function all()
  {
    $cars = [];
    $results = pg_query("SELECT * FROM cars ORDER by id ASC");

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

      $cars[] = $new_car;
      $row_object = pg_fetch_object($results);
    }
    return $cars;
  }

  // update
  static function update($update_car)
  {
    $query =
      "UPDATE cars SET make = $1, model = $2, year = $3, description = $4, img = $5";
    $query_params = [
      $update_car->make,
      $update_car->model,
      $update_car->year,
      $update_car->description,
      $update_car->img,
    ];
    $result = pg_query_params($query, $query_params);
    return self::all();
  }
}

?>
