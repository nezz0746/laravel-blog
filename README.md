# GraphQL Monorepo

A comprehensive monorepo setup featuring a Laravel backend with Lighthouse GraphQL and TypeScript applications that consume the API through a generated SDK.

## Architecture

```
graphql-monorepo/
├── apps/
│   ├── api/          # Laravel backend with Lighthouse GraphQL
│   └── web/          # Next.js frontend application
├── packages/
│   └── graphql-sdk/  # Generated GraphQL SDK package
├── package.json      # Root workspace configuration
└── turbo.json        # Turborepo configuration
```

## Features

- **Laravel Backend**: Modern Laravel application with Eloquent ORM
- **Lighthouse GraphQL**: Code-first GraphQL API with automatic schema generation
- **TypeScript SDK**: Auto-generated, type-safe GraphQL client
- **Next.js Frontend**: React application consuming the GraphQL API
- **Turborepo**: Efficient build system and task runner
- **Code Generation**: Automatic TypeScript types and operations from GraphQL schema

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PHP 8.1+ and Composer
- SQLite (default) or MySQL/PostgreSQL

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Start the Laravel API server:**
   ```bash
   cd apps/api
   php artisan serve
   ```
   The GraphQL API will be available at http://localhost:8000/graphql

3. **Generate SDK from GraphQL schema:**
   ```bash
   cd packages/graphql-sdk
   npm run generate
   npm run build
   ```

4. **Start the Next.js application:**
   ```bash
   cd apps/web
   npm run dev
   ```
   The web app will be available at http://localhost:3000

### Development

#### Run all applications in development mode:
```bash
npm run dev
```

#### Build all packages:
```bash
npm run build
```

#### Run tests:
```bash
npm run test
```

#### Lint code:
```bash
npm run lint
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

### Example Usage

```typescript
import { createGraphQLSDK } from '@graphql-monorepo/sdk';

const sdk = createGraphQLSDK({
  endpoint: 'http://localhost:8000/graphql'
});

// Get all published posts
const { posts } = await sdk.getPosts({ published: true });

// Create a new post
const newPost = await sdk.createPost({
  input: {
    title: 'My New Post',
    content: 'This is the content of my post.',
    user_id: '1',
    published: true
  }
});
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
- **GraphQL Integration**: Uses the generated SDK for API calls
- **Styling**: Tailwind CSS for modern UI

### Packages

#### `/packages/graphql-sdk` - Generated SDK
- **Code Generation**: Automatically generates TypeScript types and operations
- **Type Safety**: Full type safety for GraphQL operations
- **Easy Integration**: Simple SDK for consuming the GraphQL API

## Development Workflow

1. **Modify GraphQL Schema**: Update `apps/api/graphql/schema.graphql`
2. **Regenerate SDK**: Run `npm run generate` in `packages/graphql-sdk`
3. **Update Frontend**: Use the new types and operations in your applications
4. **Build and Test**: Run `npm run build` and `npm run test`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all applications in development mode |
| `npm run build` | Build all packages and applications |
| `npm run test` | Run tests across all packages |
| `npm run lint` | Lint code across all packages |
| `npm run clean` | Clean build artifacts |

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

## GraphQL Playground

Visit http://localhost:8000/graphql when the Laravel server is running to access the GraphQL Playground for testing queries and mutations.

## Environment Variables

### API (`apps/api/.env`)
Standard Laravel environment variables

### Web (`apps/web/.env.local`)
```
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:8000/graphql
```

## Contributing

1. Make your changes
2. Ensure tests pass: `npm run test`
3. Ensure linting passes: `npm run lint`
4. Build successfully: `npm run build`
5. Submit a pull request

## Tech Stack

- **Backend**: Laravel 12, Lighthouse GraphQL, Eloquent ORM
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Code Generation**: GraphQL Code Generator
- **Build System**: Turborepo, tsup
- **Database**: SQLite (configurable for MySQL/PostgreSQL)
