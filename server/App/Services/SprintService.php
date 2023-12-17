<?php


namespace App\Services;

use App\Models\Sprint;
use App\Models\Sprint;

class SprintService
{
    public function get($id = null)
    {
        if ($id) {
            $sprint = [
                'config' => Sprint::select($id),
                'pausas' => Sprint::selectPausas($id),
                'pessoas' => Sprint::selectAllBySprint($id),
            ];


            return $sprint;
        } else {
            return Sprint::selectAll($id);
        }
    }
    public function post()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $updates = self::get_uptate_list($data);
        $error = [];

        foreach ($updates['updates'] as $up) {
            Sprint::update($up);
        }

        foreach ($updates['inserts'] as $up) {
            Sprint::insert($up);
        }

        foreach ($updates['deletes'] as $del) {
            Sprint::delete($del);
        }


        return Sprint::selectAll();
    }


    private function get_uptate_list($data)
    {
        $sel =  Sprint::selectAll(false);


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
