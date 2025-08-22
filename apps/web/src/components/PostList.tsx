"use client";

import {
  useGetPostsQuery,
  defaultDataSource,
  QueryPostsOrderByColumn,
  SortOrder,
} from "@graphql-monorepo/react-sdk";

export function PostList() {
  const {
    data: posts,
    isLoading: loading,
    error,
    refetch,
  } = useGetPostsQuery(
    defaultDataSource,
    {
      published: true,
      first: 100,
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

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="flex items-center mt-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-medium">Error loading posts</h3>
        <p className="text-red-600 mt-2">
          {error instanceof Error ? error.message : "Failed to fetch posts"}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (posts?.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-gray-500 text-lg mb-2">No posts found</h3>
        <p className="text-gray-400">Check back later for new content.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts?.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.content.substring(0, 150)}...
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                <span className="text-xs font-medium text-gray-600">
                  {post.user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {post.user.name}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {post.comments.length} comment
              {post.comments.length !== 1 ? "s" : ""}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
