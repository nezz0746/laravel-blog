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
      <div className="space-y-8">
        {/* Featured post skeleton */}
        <div className="bg-white rounded-2xl shadow-sm p-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>

        {/* Other posts skeleton */}
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
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

  const featuredPost = posts?.[0];
  const otherPosts = posts?.slice(1) || [];

  return (
    <div className="space-y-12">
      {/* Featured Post */}
      {featuredPost && (
        <article className="bg-white rounded-2xl shadow-sm blog-card p-8 border border-gray-100">
          <div className="flex items-center mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
              Featured
            </span>
            <span className="ml-3 text-sm text-gray-500">
              {new Date(featuredPost.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h2 className="text-2xl font-medium font-work-sans text-gray-900 mb-4 leading-tight">
            {featuredPost.title}
          </h2>

          <p className="text-base text-gray-600 font-crimson mb-6 leading-relaxed line-clamp-3">
            {featuredPost.content.substring(0, 200)}...
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-semibold">
                  {featuredPost.user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-normal text-gray-900 font-inter">
                  {featuredPost.user.name}
                </p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                💬 {featuredPost.comments.length} comment
                {featuredPost.comments.length !== 1 ? "s" : ""}
              </span>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Read More
              </button>
            </div>
          </div>
        </article>
      )}

      {/* Other Posts Grid */}
      {otherPosts.length > 0 && (
        <div>
          <h4 className="text-xl font-medium font-work-sans text-gray-900 mb-6">
            More Stories
          </h4>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm blog-card p-6 border border-gray-100 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-xs text-gray-400">
                    {Math.ceil(post.content.length / 200)} min read
                  </span>
                </div>

                <h3 className="text-lg font-medium font-work-sans text-gray-900 mb-3 line-clamp-2 leading-tight">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-600 font-crimson mb-4 line-clamp-3 leading-relaxed">
                  {post.content.substring(0, 120)}...
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-medium text-white">
                        {post.user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {post.user.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    💬 {post.comments.length}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
