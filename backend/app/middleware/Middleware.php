<?php

class Middleware {

    public $perms = array(
        "admin" => 'admin',
        "client" => 'client',
    );

    public function __construct() {
        // Constructor del middleware
    }

    public function handle($allowed) {
        // Método handle que será implementado en las clases hijas
    }
}

?>