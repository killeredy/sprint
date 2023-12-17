<?php

namespace App\Models;

use App\Models\Db;
use Exception;

class Sprint extends Db
{

    public static function select(int $id)
    {

        $connPdo =  self::connect();
        $query =  'SELECT * FROM sprint where id =  :id';
        $data =  $connPdo->prepare($query);
        $data->bindValue(':id', $id);
        $data->execute();

        if ($data->rowCount() > 0) {
            return $data->fetch((\PDO::FETCH_ASSOC));
        } else {
            throw new Exception("Nenhum sprint encontrado");
        }
    }

    public static function selectPausas($id)
    {
        $connPdo =  self::connect();
        $query =  'SELECT * FROM sprint where id =  :id';
        $data =  $connPdo->prepare($query);
        $data->bindValue(':id', $id);
        $data->execute();

        if ($data->rowCount() > 0) {
            return $data->fetch((\PDO::FETCH_ASSOC));
        } else {
            throw new Exception("Nenhum sprint encontrado");
        }
    }

    public static function selectAll()
    {

        $connPdo =  self::connect();
        $query =  'SELECT * FROM sprint';
        $data =  $connPdo->prepare($query);
        $data->execute();

        if ($data->rowCount() > 0) {
            return $data->fetchAll((\PDO::FETCH_ASSOC));
        } else {
            throw new Exception("Nenhum sprint encontrado");
        }
    }


    public static function insert($data)
    {

        $nome =  $data['nome'];
        $matricula = (int) $data['matricula'];

        $connPdo =  self::connect();
        $query =  'INSERT INTO sprint (nome, matricula) VALUE (:nome, :matricula)';
        $data =  $connPdo->prepare($query);
        $data->bindValue(':nome', $nome);
        $data->bindValue(':matricula', $matricula);

        try {
            $result = $data->execute();
            return !$result;
        } catch (PDOException $e) {
            throw new Exception("Erro ao inserir " . $e->getMessage());
        }
    }

    public static function delete($data)
    {

        $id =  (int) $data['id'];
        $connPdo =  self::connect();
        $query =  'DELETE FROM pessoas WHERE ID = :id';
        $data =  $connPdo->prepare($query);
        $data->bindValue(':id', $id);

        try {
            $result = $data->execute();
            return !$result;
        } catch (PDOException $e) {
            throw new Exception("Erro ao deletar " . $e->getMessage());
        }
    }
}
