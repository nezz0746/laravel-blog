<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GraphiQL - GraphQL API Explorer</title>

    <!-- Load React and ReactDOM first -->
    <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>

    <!-- Load GraphiQL -->
    <script crossorigin src="https://unpkg.com/graphiql@1.11.5/graphiql.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/graphiql@1.11.5/graphiql.min.css" />

    <style>
        body {
            height: 100vh;
            margin: 0;
            width: 100%;
            overflow: hidden;
            font-family: system-ui, -apple-system, sans-serif;
        }

        #graphiql {
            height: 100vh;
        }

        .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            font-size: 18px;
            color: #666;
        }

        .error {
            padding: 40px;
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 40px auto;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
        }

        .error h2 {
            color: #d32f2f;
            margin-top: 0;
        }

        .error a {
            color: #1976d2;
            text-decoration: none;
        }

        .error a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <div id="graphiql" class="loading">Loading GraphiQL...</div>

    <script>
        // GraphQL Fetcher function
        function graphQLFetcher(graphQLParams) {
            return fetch("{{ url('/graphql') }}", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify(graphQLParams),
                credentials: 'same-origin',
            }).then(function(response) {
                if (!response.ok) {
                    throw new Error('HTTP ' + response.status + ': ' + response.statusText);
                }
                return response.json();
            }).catch(function(error) {
                console.error('GraphQL request error:', error);
                return {
                    errors: [{
                        message: error.message
                    }]
                };
            });
        }

        // Default query with ordering example
        const defaultQuery = `# Welcome to GraphiQL
# 
# GraphiQL is an in-browser tool for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the current GraphQL type schema and live syntax and
# validation errors highlighted within the text.
#
# Keyboard shortcuts:
#   Prettify Query:  Shift-Ctrl-P (or press the prettify button above)
#       Run Query:  Ctrl-Enter (or press the play button above)
#   Auto Complete:  Ctrl-Space (or just start typing)
#
# Here are some example queries to get you started:

# Get users with pagination
query GetUsers {
  users(first: 5) {
    data {
      id
      name
      email
      created_at
    }
    paginatorInfo {
      count
      currentPage
      hasMorePages
      total
    }
  }
}

# Get posts ordered by creation date (newest first)
query GetRecentPosts {
  posts(
    first: 5
    published: true
    orderBy: [{column: CREATED_AT, order: DESC}]
  ) {
    data {
      id
      title
      content
      created_at
      user {
        name
      }
      comments {
        id
        content
        user {
          name
        }
      }
    }
    paginatorInfo {
      total
      currentPage
    }
  }
}`;

        function showError(message) {
            document.getElementById('graphiql').innerHTML =
                '<div class="error">' +
                '<h2>Failed to load GraphiQL</h2>' +
                '<p><strong>Error:</strong> ' + message + '</p>' +
                '<p>This usually happens when the required JavaScript libraries fail to load.</p>' +
                '<h3>What you can do:</h3>' +
                '<ul>' +
                '<li>Check your internet connection</li>' +
                '<li>Try refreshing the page</li>' +
                '<li>Check the browser console for more details</li>' +
                `<li><a href="{{ url('/graphql') }}" target="_blank">Test the GraphQL endpoint directly</a></li>` +
                '</ul>' +
                '<h3>Alternative: Test GraphQL directly</h3>' +
                '<p>You can test GraphQL queries using curl:</p>' +
                `<  pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto;">curl -X POST {{ url('/graphql') }} \\\n  -H "Content-Type: application/json" \\\n  -d '{"query":"{ users { data { id name email } } }"}' | jq</pre>` +
                '</div>';
        }

        // Wait for everything to load
        function initializeGraphiQL() {
            console.log('Checking dependencies...');

            // Check React
            if (typeof React === 'undefined') {
                console.error('React is not loaded');
                showError('React library failed to load from CDN');
                return;
            }
            console.log('✓ React loaded');

            // Check ReactDOM
            if (typeof ReactDOM === 'undefined') {
                console.error('ReactDOM is not loaded');
                showError('ReactDOM library failed to load from CDN');
                return;
            }
            console.log('✓ ReactDOM loaded');

            // Check GraphiQL
            if (typeof GraphiQL === 'undefined') {
                console.error('GraphiQL is not loaded');
                showError('GraphiQL library failed to load from CDN');
                return;
            }
            console.log('✓ GraphiQL loaded');

            try {
                console.log('Initializing GraphiQL...');

                // Create GraphiQL element
                const graphiQLElement = React.createElement(GraphiQL, {
                    fetcher: graphQLFetcher,
                    defaultQuery: defaultQuery,
                });

                // Render to DOM
                ReactDOM.render(graphiQLElement, document.getElementById('graphiql'));

                console.log('✅ GraphiQL initialized successfully!');
            } catch (error) {
                console.error('GraphiQL initialization error:', error);
                showError('Failed to initialize GraphiQL: ' + error.message);
            }
        }

        // Initialize when page loads
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(initializeGraphiQL, 100);
            });
        } else {
            setTimeout(initializeGraphiQL, 100);
        }

        // Fallback error handler
        window.addEventListener('error', function(e) {
            console.error('Global error:', e.error);
            if (document.getElementById('graphiql').innerHTML.includes('Loading')) {
                showError('JavaScript error: ' + e.error.message);
            }
        });
    </script>
</body>

</html>