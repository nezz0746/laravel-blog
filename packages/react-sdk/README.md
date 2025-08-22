# @graphql-monorepo/react-sdk

Generated React Query hooks for the GraphQL API with automatic caching, background updates, and optimistic updates.

## Features

- **🔄 Automatic Caching**: Smart caching with configurable stale times
- **🔄 Background Updates**: Automatic refetching and background synchronization
- **⚡ Optimistic Updates**: Immediate UI updates with rollback on errors
- **🎯 Type Safety**: Full TypeScript support for all operations
- **🛠️ Error Handling**: Built-in error states and retry logic
- **📊 DevTools**: React Query DevTools integration for debugging

## Installation

This package is part of the monorepo and should be installed via the workspace:

```bash
pnpm install @graphql-monorepo/react-sdk
```

## Setup

### 1. Install Required Dependencies

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
```

### 2. Setup Query Client

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

## Usage

### Queries

#### Basic Query Usage

```tsx
import {
  useGetPostsQuery,
  defaultDataSource,
} from "@graphql-monorepo/react-sdk";

function PostList() {
  const { data, isLoading, error } = useGetPostsQuery(defaultDataSource, {
    published: true,
    first: 10,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.posts.data?.map((post) => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
```

#### Query with Pagination and Ordering

```tsx
import {
  useGetPostsQuery,
  defaultDataSource,
  QueryPostsOrderByColumn,
  SortOrder,
} from "@graphql-monorepo/react-sdk";

function PostList() {
  const { data, isLoading, error, refetch } = useGetPostsQuery(
    defaultDataSource,
    {
      published: true,
      first: 20,
      page: 1,
      orderBy: [
        { column: QueryPostsOrderByColumn.CREATED_AT, order: SortOrder.DESC },
      ],
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      select: (data) => data.posts.data ?? [],
    }
  );

  return (
    <div>
      <button onClick={() => refetch()}>Refresh Posts</button>
      {/* Render posts */}
    </div>
  );
}
```

#### Single Item Query

```tsx
import {
  useGetPostQuery,
  defaultDataSource,
} from "@graphql-monorepo/react-sdk";

function PostDetail({ postId }: { postId: string }) {
  const { data: post, isLoading } = useGetPostQuery(
    defaultDataSource,
    { id: postId },
    {
      enabled: !!postId, // Only run query if postId exists
    }
  );

  if (isLoading) return <div>Loading post...</div>;

  return (
    <article>
      <h1>{post?.post?.title}</h1>
      <p>{post?.post?.content}</p>
      <small>By {post?.post?.user.name}</small>
    </article>
  );
}
```

### Mutations

#### Basic Mutation Usage

```tsx
import {
  useCreatePostMutation,
  defaultDataSource,
} from "@graphql-monorepo/react-sdk";
import { useQueryClient } from "@tanstack/react-query";

function CreatePostForm() {
  const queryClient = useQueryClient();

  const mutation = useCreatePostMutation(defaultDataSource, {
    onSuccess: (data) => {
      // Invalidate and refetch posts list
      queryClient.invalidateQueries({ queryKey: ["GetPosts"] });
      console.log("Post created:", data.createPost);
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    mutation.mutate({
      input: {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        user_id: "1",
        published: true,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Post title" required />
      <textarea name="content" placeholder="Post content" required />

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create Post"}
      </button>

      {mutation.isSuccess && (
        <div className="success">Post created successfully!</div>
      )}

      {mutation.isError && (
        <div className="error">Error: {mutation.error?.message}</div>
      )}
    </form>
  );
}
```

#### Optimistic Updates

```tsx
import {
  useUpdatePostMutation,
  defaultDataSource,
} from "@graphql-monorepo/react-sdk";
import { useQueryClient } from "@tanstack/react-query";

function EditPost({ post }: { post: Post }) {
  const queryClient = useQueryClient();

  const mutation = useUpdatePostMutation(defaultDataSource, {
    // Optimistic update
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["GetPosts"] });

      // Snapshot previous value
      const previousPosts = queryClient.getQueryData(["GetPosts"]);

      // Optimistically update the cache
      queryClient.setQueryData(["GetPosts"], (old: any) => {
        return {
          ...old,
          posts: {
            ...old.posts,
            data: old.posts.data.map((p: any) =>
              p.id === post.id ? { ...p, ...variables.input } : p
            ),
          },
        };
      });

      return { previousPosts };
    },

    // Rollback on error
    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["GetPosts"], context.previousPosts);
      }
    },

    // Always refetch after success or error
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GetPosts"] });
    },
  });

  return (
    <button
      onClick={() =>
        mutation.mutate({
          id: post.id,
          input: { title: "Updated Title" },
        })
      }
    >
      Update Post
    </button>
  );
}
```

## Available Hooks

### Query Hooks

- `useGetUsersQuery` - Get paginated users list
- `useGetUserQuery` - Get single user by ID
- `useGetPostsQuery` - Get paginated posts with filtering and ordering
- `useGetPostQuery` - Get single post by ID
- `useGetCommentsQuery` - Get paginated comments with filtering
- `useGetCommentQuery` - Get single comment by ID

### Mutation Hooks

- `useCreatePostMutation` - Create a new post
- `useUpdatePostMutation` - Update existing post
- `useDeletePostMutation` - Delete a post
- `useCreateCommentMutation` - Create a new comment
- `useUpdateCommentMutation` - Update existing comment
- `useDeleteCommentMutation` - Delete a comment

## Configuration

### Default Data Source

The `defaultDataSource` is configured to point to `http://localhost:8000/graphql`. You can create custom data sources:

```tsx
import { createDataSource } from "@graphql-monorepo/react-sdk";

const customDataSource = createDataSource("https://api.myapp.com/graphql");

// Use with any hook
const { data } = useGetPostsQuery(customDataSource, { published: true });
```

### Custom Headers

```tsx
import { createGraphQLClient } from "@graphql-monorepo/react-sdk";

const clientWithAuth = createGraphQLClient("http://localhost:8000/graphql", {
  headers: {
    Authorization: "Bearer your-token-here",
    "Content-Type": "application/json",
  },
});

const customDataSource = {
  endpoint: "http://localhost:8000/graphql",
  fetchParams: {
    headers: {
      Authorization: "Bearer your-token-here",
      "Content-Type": "application/json",
    },
  },
};
```

## React Query Options

All hooks accept standard React Query options as the third parameter:

```tsx
const { data } = useGetPostsQuery(
  defaultDataSource,
  { published: true },
  {
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    refetchInterval: 30000, // 30 seconds
    enabled: someCondition,
    select: (data) => data.posts.data,
    onSuccess: (data) => console.log("Data loaded:", data),
    onError: (error) => console.error("Error:", error),
  }
);
```

## Development

### Regenerating Hooks

When the GraphQL schema changes, regenerate the hooks:

```bash
cd packages/react-sdk
pnpm run generate
```

### Available Scripts

- `pnpm run generate` - Generate hooks from GraphQL schema
- `pnpm run introspect` - Introspect schema from API
- `pnpm run type-check` - Type check the package

## Best Practices

1. **Use Query Keys Wisely**: React Query uses query keys for caching. The generated hooks use consistent keys.

2. **Handle Loading States**: Always handle `isLoading` and `error` states in your components.

3. **Optimize with `select`**: Use the `select` option to transform data and prevent unnecessary re-renders.

4. **Cache Invalidation**: Use `queryClient.invalidateQueries()` after mutations to keep data fresh.

5. **Error Boundaries**: Wrap your app in error boundaries to catch query errors gracefully.

6. **DevTools**: Use React Query DevTools in development to debug cache behavior.

## TypeScript Support

All hooks are fully typed with generated TypeScript definitions. You get:

- ✅ Type-safe query variables
- ✅ Type-safe response data
- ✅ IntelliSense for all fields
- ✅ Compile-time error checking
- ✅ Auto-completion in your IDE

```tsx
// Types are automatically inferred
const { data } = useGetPostsQuery(defaultDataSource, {
  published: true, // ✅ Type-safe
  first: 10, // ✅ Type-safe
  // invalid: true // ❌ TypeScript error
});

// Response data is fully typed
data?.posts.data?.forEach((post) => {
  console.log(post.title); // ✅ Type-safe
  console.log(post.user.name); // ✅ Type-safe
  // console.log(post.invalid); // ❌ TypeScript error
});
```
