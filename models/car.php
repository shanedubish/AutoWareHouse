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
  // show all
  static function all()
  {
    $cars = [];
    $results = pg_query["SELECT * FROM cars ORDER by id ASC"];
  }
}

?>
