<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test users
        $user1 = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);

        $user2 = User::factory()->create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
        ]);

        // Create additional users
        $users = User::factory(3)->create();
        $allUsers = collect([$user1, $user2])->merge($users);

        // Create posts
        $posts = collect();
        $allUsers->each(function ($user) use ($posts) {
            $userPosts = Post::factory(rand(2, 5))->create([
                'user_id' => $user->id,
            ]);
            $posts->push(...$userPosts);
        });

        // Create comments
        $posts->each(function ($post) use ($allUsers) {
            Comment::factory(rand(1, 4))->create([
                'post_id' => $post->id,
                'user_id' => $allUsers->random()->id,
            ]);
        });
    }
}
