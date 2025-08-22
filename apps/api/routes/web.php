<?php

use Illuminate\Support\Facades\Route;

// API status endpoint
Route::get('/', function () {
    return response()->json([
        'message' => 'GraphQL API is running',
        'endpoints' => [
            'graphql' => url('/graphql'),
            'graphiql' => url('/graphiql'),
        ]
    ]);
});

Route::get('/posts', function () {
    // Basic query with relationships
    $posts = \App\Models\Post::with(['user', 'comments'])->get();

    return response()->json([
        'data' => $posts,
        'count' => $posts->count(),
    ]);
});



Route::get('/posts/{id}', function ($id) {
    // Single post by ID
    $post = \App\Models\Post::with(['user', 'comments'])->find($id);

    if (!$post) {
        return response()->json(['error' => 'Post not found'], 404);
    }

    return response()->json($post);
});

// Health check endpoint for Railway
Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'timestamp' => now()->toISOString(),
        'database' => 'connected'
    ]);
});

// Debug endpoint (remove after fixing)
Route::get('/debug', function () {
    return response()->json([
        'app_key_set' => !empty(config('app.key')),
        'app_env' => config('app.env'),
        'app_debug' => config('app.debug'),
        'db_connection' => config('database.default'),
        'db_file_exists' => file_exists(database_path('database.sqlite')),
        'lighthouse_installed' => class_exists('Nuwave\\Lighthouse\\GraphQL'),
        'php_version' => PHP_VERSION,
        'timestamp' => now()->toISOString(),
        'schema_file_exists' => file_exists(base_path('graphql/schema.graphql')),
        'lighthouse_config' => config('lighthouse.schema.register'),
        'lighthouse_schema_path' => config('lighthouse.schema.register'),
        'lighthouse_route_name' => config('lighthouse.route.name'),
        'lighthouse_route_uri' => config('lighthouse.route.uri'),
        'graphql_route' => url('/graphql'),
        'routes_cached' => app()->routesAreCached(),
    ]);
});

// Enable debug mode temporarily
Route::get('/enable-debug', function () {
    return response()->json([
        'message' => 'Set APP_DEBUG=true in Railway environment variables to see detailed errors',
        'current_debug' => config('app.debug'),
        'instructions' => 'After setting APP_DEBUG=true, redeploy and visit /graphql or /graphiql to see the actual error'
    ]);
});

// GraphiQL interface for exploring the GraphQL API
Route::get('/graphiql', function () {
    return view('graphiql');
});
