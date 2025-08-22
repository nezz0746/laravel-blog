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

// GraphiQL interface for exploring the GraphQL API
Route::get('/graphiql', function () {
    return view('graphiql');
});
