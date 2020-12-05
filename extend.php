<?php

/*
 * This file is part of joon/country-flag.
 *
 * Copyright (c) 2020 Joon.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Joon\Countryflag;
use Flarum\User\Event\Saving;
use Flarum\Extend;
use Flarum\Api\Serializer\UserSerializer; 

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js'),
        
    
    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Event)->listen(Saving::class, Listener\SaveCountryToUser::class),
    
    (new Extend\ApiSerializer(UserSerializer::class))->attribute("country", function ($serializer, $user) {
        return $user->country;
    }),

];
