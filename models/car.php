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
  public $id, $make, $model, $year, $desc, $img;

  public function __construct($id, $make, $model, $year, $desc, $img)
  {
    $this->id = $id;
    $this->make = $make;
    $this->model = $model;
    $this->year = $year;
    $this->desc = $desc;
    $this->img = $img;
  }
}

class Cars
{
}

?>
