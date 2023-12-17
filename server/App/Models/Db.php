<?php


namespace App\Models;



class Db
{
    protected  static $drive = "mysql";
    protected  static $host = "localhost";
    protected  static $name = "sprints";
    protected  static $user = "root";
    protected  static $pass = "";
    protected static $schema  =  "sprint.";


    public static function connect()
    {

        return  new \PDO(self::$drive .  ': host=' . self::$host . '; dbname=' .  self::$name, self::$user, self::$pass);
    }
}
