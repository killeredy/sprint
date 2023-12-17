<?php


namespace App\Services;

use App\Models\User;

class UserService
{
    public function get($id = null)
    {
        if ($id) {
            return User::select($id);
        } else {
            return User::selectAll();
        }
    }
    public function post()
    {

        $data = json_decode(file_get_contents('php://input'), true);


        $updates = self::get_uptate_list($data);
        $error = [];

        foreach ($updates['updates'] as $up) {
            User::update($up);
        }

        foreach ($updates['inserts'] as $up) {
            User::insert($up);
        }

        foreach ($updates['deletes'] as $del) {
            User::delete($del);
        }


        return User::selectAll();
    }

    private function get_uptate_list($data)
    {
        $sel =  User::selectAll(false);


        $resp  = [
            'updates' => [],
            'inserts' => [],
            'deletes' => [],
        ];

        foreach ($data as $key_req => $value) {
            foreach ($sel as $key_db => $val) {
                if ($val['id'] == $value['id']) {
                    if ($val != $value) {
                        $resp['updates'][] =  $value;
                    }
                    unset($sel[$key_db]);
                    unset($data[$key_req]);
                }
            }
        }

        $resp['deletes'] =  $sel;
        $resp['inserts'] =  $data;

        return  $resp;
    }
}
