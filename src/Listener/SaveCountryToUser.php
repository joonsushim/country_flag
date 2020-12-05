<?php
namespace Joon\Countryflag\Listener;

use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;

class SaveCountryToUser {
    public function handle(Saving $event)
    {
        $user = $event->user;
        $data = $event->data;
        $actor = $event->actor;

        $isSelf = $actor->id === $user->id;
        $attributes = Arr::get($data, 'attributes', []);

        if (isset($attributes['country'])) {
            if (!$isSelf && $user->exists) {
                $actor->assertCan('edit', $user);
            }

            $user->country = $attributes['country'];
        }
    }
}