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

// Health check endpoint for Railway
Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'timestamp' => now()->toISOString(),
        'database' => 'connected'
    ]);
});

// GraphiQL interface for exploring the GraphQL API
Route::get('/graphiql', function () {
    return view('graphiql');
});
