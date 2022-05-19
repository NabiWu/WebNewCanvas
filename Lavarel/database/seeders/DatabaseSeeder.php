<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //  \App\Models\User::factory(2)->create();

        User::create([
            'name' => 'admin',
            'password'=> bcrypt('password'),
            'email' => 'admin@admin.com',
            'role' => 'admin',
            'isActive' => True,

        ]);
    }
}
