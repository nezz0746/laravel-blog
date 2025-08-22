"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useGetPostQuery,
  defaultDataSource,
} from "@graphql-monorepo/react-sdk";
import Link from "next/link";

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const {
    data: post,
    isLoading: loading,
    error,
  } = useGetPostQuery(
    defaultDataSource,
    { id: postId },
    {
      enabled: !!postId,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      select: (data) => data.post,
    }
  );

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Back button skeleton */}
        <div className="mb-8">
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>

        {/* Header skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-4 animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>

        {/* Comments skeleton */}
        <div className="mt-12 space-y-6">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-medium font-work-sans text-red-800 mb-4">
            Post Not Found
          </h2>
          <p className="text-red-600 mb-6">
            {error instanceof Error
              ? error.message
              : "The post you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium font-work-sans text-gray-900 mb-4">
            Post Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The post you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Navigation */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          ← Back
        </button>
      </div>

      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-medium font-work-sans text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-semibold">
                {post.user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900 font-inter">
                {post.user.name}
              </p>
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <time>
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>•</span>
                <span>{Math.ceil(post.content.length / 200)} min read</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              💬 {post.comments.length} comment
              {post.comments.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </header>

      {/* Post Content */}
      <article className="prose prose-lg max-w-none mb-12">
        <div className="text-gray-700 font-crimson leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </article>

      {/* Comments Section */}
      {post.comments.length > 0 && (
        <section className="border-t border-gray-200 pt-12">
          <h3 className="text-2xl font-medium font-work-sans text-gray-900 mb-8">
            Comments ({post.comments.length})
          </h3>

          <div className="space-y-6">
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-medium text-sm">
                      {comment.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 font-inter">
                      {comment.user.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 font-crimson leading-relaxed">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Actions */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            ← All Posts
          </Link>

          <Link
            href="/create"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Write a Post
          </Link>
        </div>
      </div>
    </div>
  );
}
