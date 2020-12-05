<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function(Builder $schema) {
            $schema->table('users', function (Blueprint $table) use ($schema) {
                $table->string('country', 5);
            });
    },
    'down' => function(Builder $schema) {
        $schema->table('users', function (Blueprint $table) use ($schema) {
            $table->dropColumn('country');
        });
    }
];