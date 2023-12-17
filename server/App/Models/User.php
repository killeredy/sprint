<?php

namespace App\Models;

use App\Models\Db;
use Exception;

class User extends Db
{

    public static function select(int $id)
    {

        $connPdo =  self::connect();
        $query =  'SELECT * FROM pessoas where id =  :id';
        $data =  $connPdo->prepare($query);
        $data->bindValue(':id', $id);
        $data->execute();

        if ($data->rowCount() > 0) {
            return $data->fetch((\PDO::FETCH_ASSOC));
        } else {
            throw new Exception("Nenhum usuário encontrado #1");
        }
    }

    public static function selectAll($show_erro =  true)
    {
        $connPdo =  self::connect();
        $query =  'SELECT * FROM pessoa';
        $data =  $connPdo->prepare($query);
        $data->execute();

        if ($data->rowCount() > 0) {
            $resp =   $data->fetchAll((\PDO::FETCH_ASSOC));
            return $resp;
        } else {
            if ($show_erro) {
                throw new Exception("Nenhum usuário encontrado #2");
            } else {
                return [];
            }
        }
    }


    public static function selectAllBySprint($sprint_id, $show_erro =  true)
    {
        $connPdo =  self::connect();
        $query =  'SELECT 
                    pessoas.id as id_pessoa,
                    pessoas.nome as nome,
                    pessoas.matricula as matricula

                    FROM sprints.pessoa_sprint as pes
                    left join sprints.pessoa as pessoas
                    on pessoas.id = pes.pessoa_id
                    and pes.sprint_id = :id';


        $data =  $connPdo->prepare($query);
        $data->bindValue(':id', $sprint_id);
        $data->execute();

        if ($data->rowCount() > 0) {
            return $data->fetchAll((\PDO::FETCH_ASSOC));
        } else {
            if ($show_erro) {
                throw new Exception("Nenhum usuário encontrado #2");
            } else {
                return [];
            }
        }
    }

    public static function update($data)
    {
        $id =  (int) $data['id'];
        $nome =  $data['nome'];
        $matricula = (int) $data['matricula'];


        $connPdo =  self::connect();
        $query =  'UPDATE pessoas SET nome = :nome, matricula = :matricula WHERE id = :id';
        $data =  $connPdo->prepare($query);
        $data->bindValue(':id', $id);
        $data->bindValue(':nome', $nome);
        $data->bindValue(':matricula', $matricula);

        try {
            $result = $data->execute();
            return !$result;
        } catch (PDOException $e) {
            throw new Exception("Erro ao atualizar " . $e->getMessage());
        }
    }

    public static function insert($data)
    {

        $nome =  $data['nome'];
        $matricula = (int) $data['matricula'];

        $connPdo =  self::connect();
        $query =  'INSERT INTO pessoas (nome, matricula) VALUE (:nome, :matricula)';
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
