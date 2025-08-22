"use client";

import { useState } from "react";
import {
  useCreateCommentMutation,
  useGetUsersQuery,
  defaultDataSource,
  useGetPostQuery,
} from "@graphql-monorepo/react-sdk";
import { useQueryClient } from "@tanstack/react-query";

interface CommentFormProps {
  postId: string;
}

export function CommentForm({ postId }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const queryClient = useQueryClient();

  // Get list of users
  const { data: users } = useGetUsersQuery(
    defaultDataSource,
    { first: 50 },
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
      select: (data) => data.users.data ?? [],
    }
  );

  const createCommentMutation = useCreateCommentMutation(defaultDataSource, {
    onSuccess: () => {
      // Clear form
      setContent("");
      setSelectedUserId("");
      setIsSubmitting(false);

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Invalidate the post query to refresh comments
      queryClient.invalidateQueries({
        queryKey: useGetPostQuery.getKey({ id: postId }),
      });
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || !selectedUserId) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createCommentMutation.mutateAsync({
        input: {
          content: content.trim(),
          post_id: postId,
          user_id: selectedUserId,
        },
      });
    } catch (error) {
      // Error is handled in onError callback
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
      <h4 className="text-lg font-medium font-work-sans text-gray-900 mb-4">
        Leave a Comment
      </h4>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Comment as
          </label>
          <select
            id="userId"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            required
            disabled={isSubmitting}
          >
            <option value="">Select a user...</option>
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Comment
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            placeholder="Share your thoughts..."
            required
            disabled={isSubmitting}
          />
          <div className="mt-1 text-right">
            <span className="text-xs text-gray-500">{content.length}/500</span>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={
              !content.trim() ||
              !selectedUserId ||
              isSubmitting ||
              content.length > 500
            }
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Posting...
              </span>
            ) : (
              "Post Comment"
            )}
          </button>
        </div>
        {/* @ts-ignore */}
        {showSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">
              ✓ Comment posted successfully!
            </p>
          </div>
        )}
        {/* @ts-ignore */}
        {createCommentMutation.error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              Failed to post comment. Please try again.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
