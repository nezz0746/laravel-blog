# GraphQL Monorepo

A comprehensive monorepo setup featuring a Laravel backend with Lighthouse GraphQL and TypeScript applications that consume the API through generated SDKs with React Query integration.

## Architecture

```
graphql-monorepo/
├── apps/
│   ├── api/          # Laravel backend with Lighthouse GraphQL
│   └── web/          # Next.js frontend application
├── packages/
│   ├── graphql-sdk/  # Generated GraphQL SDK package
│   └── react-sdk/    # React Query hooks for GraphQL operations
├── package.json      # Root workspace configuration
└── turbo.json        # Turborepo configuration
```

## Features

- **Laravel Backend**: Modern Laravel application with Eloquent ORM
- **Lighthouse GraphQL**: Code-first GraphQL API with automatic schema generation
- **TypeScript SDK**: Auto-generated, type-safe GraphQL client
- **React Query SDK**: Generated React hooks with caching, background updates, and optimistic updates
- **Next.js Frontend**: React application consuming the GraphQL API
- **Turborepo**: Efficient build system and task runner
- **Code Generation**: Automatic TypeScript types and operations from GraphQL schema
- **Pagination & Ordering**: Built-in support for paginated queries and custom ordering

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- PHP 8.1+ and Composer
- SQLite (default) or MySQL/PostgreSQL

### Installation

1. **Clone and install dependencies:**

   ```bash
   pnpm install
   ```

2. **Start the Laravel API server:**

   ```bash
   cd apps/api
   php artisan serve
   ```

   The GraphQL API will be available at http://localhost:8000/graphql
   GraphiQL interface available at http://localhost:8000/graphiql

3. **Generate SDKs from GraphQL schema:**

   ```bash
   cd packages/graphql-sdk
   pnpm run generate

   cd ../react-sdk
   pnpm run generate
   ```

4. **Start the Next.js application:**
   ```bash
   cd apps/web
   pnpm run dev
   ```
   The web app will be available at http://localhost:3000

### Development

#### Run all applications in development mode:

```bash
pnpm run dev
```

#### Run API server separately:

```bash
pnpm run dev:api
```

#### Build all packages:

```bash
pnpm run build
```

#### Run tests:

```bash
pnpm run test
```

#### Lint code:

```bash
pnpm run lint
```

## API Overview

The GraphQL API provides the following operations:

### Queries

- `users` - List users with pagination
- `user` - Get a single user by ID or email
- `posts` - List posts with filtering and search
- `post` - Get a single post by ID
- `comments` - List comments with filtering
- `comment` - Get a single comment by ID

### Mutations

- `createPost` - Create a new blog post
- `updatePost` - Update an existing post
- `deletePost` - Delete a post
- `createComment` - Add a comment to a post
- `updateComment` - Update an existing comment
- `deleteComment` - Delete a comment

### Example Usage with React Query Hooks

The React SDK provides powerful hooks with automatic caching, background updates, and optimistic updates:

#### Querying Data

```tsx
import {
  useGetPostsQuery,
  defaultDataSource,
  QueryPostsOrderByColumn,
  SortOrder,
} from "@graphql-monorepo/react-sdk";

function PostList() {
  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useGetPostsQuery(
    defaultDataSource,
    {
      published: true,
      first: 10,
      orderBy: [
        { column: QueryPostsOrderByColumn.CREATED_AT, order: SortOrder.DESC },
      ],
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      select: (data) => data.posts.data ?? [],
    }
  );

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {posts?.map((post) => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>By {post.user.name}</small>
        </article>
      ))}
    </div>
  );
}
```

#### Creating Data with Mutations

```tsx
import {
  useCreatePostMutation,
  defaultDataSource,
} from "@graphql-monorepo/react-sdk";
import { useQueryClient } from "@tanstack/react-query";

function CreatePostForm() {
  const queryClient = useQueryClient();

  const mutation = useCreatePostMutation(defaultDataSource, {
    onSuccess: () => {
      // Automatically refetch posts list
      queryClient.invalidateQueries({ queryKey: ["GetPosts"] });
    },
  });

  const handleSubmit = (formData: FormData) => {
    mutation.mutate({
      input: {
        title: formData.title,
        content: formData.content,
        user_id: "1",
        published: true,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create Post"}
      </button>

      {mutation.isSuccess && <p>Post created successfully!</p>}
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
    </form>
  );
}
```

#### Setting up React Query Provider

```tsx
// app/layout.tsx or _app.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

## Project Structure

### Apps

#### `/apps/api` - Laravel GraphQL API

- **Models**: User, Post, Comment with Eloquent relationships
- **GraphQL Schema**: Located in `graphql/schema.graphql`
- **Database**: SQLite with migrations and seeders
- **Lighthouse**: Provides GraphQL server functionality

#### `/apps/web` - Next.js Frontend

- **Components**: React components for displaying posts and comments
- **GraphQL Integration**: Uses React Query hooks from the react-sdk
- **Form Management**: React Hook Form for creating posts
- **Styling**: Tailwind CSS for modern UI

### Packages

#### `/packages/graphql-sdk` - Core GraphQL SDK

- **Code Generation**: Automatically generates TypeScript types and operations
- **Type Safety**: Full type safety for GraphQL operations
- **GraphQL Client**: Raw GraphQL client for non-React environments

#### `/packages/react-sdk` - React Query Hooks

- **React Query Integration**: Generated hooks with caching and background updates
- **Optimistic Updates**: Automatic cache invalidation and refetching
- **Error Handling**: Built-in error states and retry logic
- **TypeScript Support**: Full type safety for all operations

## Development Workflow

1. **Modify GraphQL Schema**: Update `apps/api/graphql/schema.graphql`
2. **Regenerate SDKs**:
   ```bash
   cd packages/graphql-sdk && pnpm run generate
   cd ../react-sdk && pnpm run generate
   ```
3. **Update Frontend**: Use the new React Query hooks in your components
4. **Build and Test**: Run `pnpm run build` and `pnpm run test`

## Available Scripts

| Command            | Description                                |
| ------------------ | ------------------------------------------ |
| `pnpm run dev`     | Start all applications in development mode |
| `pnpm run dev:api` | Start only the Laravel API server          |
| `pnpm run build`   | Build all packages and applications        |
| `pnpm run test`    | Run tests across all packages              |
| `pnpm run lint`    | Lint code across all packages              |
| `pnpm run clean`   | Clean build artifacts                      |

## Database

The API uses SQLite by default with sample data including:

- 5 users (including test users John Doe and Jane Smith)
- Multiple blog posts per user
- Comments on posts

To reset the database:

```bash
cd apps/api
php artisan migrate:fresh --seed
```

## GraphQL Interface

Visit http://localhost:8000/graphiql when the Laravel server is running to access the GraphiQL interface for testing queries and mutations with features like:

- **Schema Explorer**: Browse available types, queries, and mutations
- **Auto-completion**: IntelliSense for GraphQL operations
- **Query History**: Access previously executed queries
- **Documentation**: Built-in docs for all GraphQL operations

### Example Queries

```graphql
# Get posts with pagination and ordering
query GetRecentPosts {
  posts(
    first: 5
    published: true
    orderBy: [{ column: CREATED_AT, order: DESC }]
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
      hasMorePages
    }
  }
}

# Create a new post
mutation CreatePost {
  createPost(
    input: {
      title: "My New Post"
      content: "This is the content of my post."
      user_id: "1"
      published: true
    }
  ) {
    id
    title
    user {
      name
    }
  }
}
```

## Environment Variables

### API (`apps/api/.env`)

Standard Laravel environment variables

### Web (`apps/web/.env.local`)

```
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:8000/graphql
```

## Contributing

1. Make your changes
2. Ensure tests pass: `pnpm run test`
3. Ensure linting passes: `pnpm run lint`
4. Build successfully: `pnpm run build`
5. Submit a pull request

## Tech Stack

- **Backend**: Laravel 12, Lighthouse GraphQL, Eloquent ORM
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **State Management**: TanStack React Query for server state
- **Form Management**: React Hook Form with validation
- **Code Generation**: GraphQL Code Generator
- **Build System**: Turborepo, pnpm workspaces
- **Database**: SQLite (configurable for MySQL/PostgreSQL)
- **Package Manager**: pnpm with workspace support
