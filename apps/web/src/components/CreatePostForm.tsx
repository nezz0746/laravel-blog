"use client";

import { useForm } from "react-hook-form";
import {
  useCreatePostMutation,
  defaultDataSource,
} from "@graphql-monorepo/react-sdk";
import type { CreatePostMutationVariables } from "@graphql-monorepo/react-sdk";
import { useQueryClient } from "@tanstack/react-query";

interface PostFormData {
  title: string;
  content: string;
  published: boolean;
  user_id: string;
}

interface CreatePostFormProps {
  onSuccess?: () => void;
}

export default function CreatePostForm({ onSuccess }: CreatePostFormProps) {
  const queryClient = useQueryClient();

  const mutation = useCreatePostMutation(defaultDataSource, {
    onSuccess: (data) => {
      // Invalidate and refetch posts query to show the new post
      queryClient.invalidateQueries({ queryKey: ["GetPosts"] });

      reset(); // Clear the form
      onSuccess?.(); // Call success callback if provided
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<PostFormData>({
    defaultValues: {
      title: "",
      content: "",
      published: false,
      user_id: "1", // Default to first user - you might want to get this from auth context
    },
    mode: "onChange",
  });

  const onSubmit = async (data: PostFormData) => {
    const variables: CreatePostMutationVariables = {
      input: {
        title: data.title,
        content: data.content,
        published: data.published,
        user_id: data.user_id,
      },
    };

    mutation.mutate(variables);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters long",
              },
              maxLength: {
                value: 255,
                message: "Title must not exceed 255 characters",
              },
            })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter post title..."
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Content Field */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content *
          </label>
          <textarea
            id="content"
            rows={6}
            {...register("content", {
              required: "Content is required",
              minLength: {
                value: 10,
                message: "Content must be at least 10 characters long",
              },
            })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.content ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Write your post content..."
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* User ID Field */}
        <div>
          <label
            htmlFor="user_id"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Author ID *
          </label>
          <select
            id="user_id"
            {...register("user_id", {
              required: "Author is required",
            })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.user_id ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="1">John Doe</option>
            <option value="2">Jane Smith</option>
            <option value="3">Mr. Edgar Dickinson Jr.</option>
            <option value="4">Bettie Mills</option>
            <option value="5">Deborah Kub III</option>
          </select>
          {errors.user_id && (
            <p className="mt-1 text-sm text-red-600">
              {errors.user_id.message}
            </p>
          )}
        </div>

        {/* Published Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            {...register("published")}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="published"
            className="ml-2 block text-sm text-gray-700"
          >
            Publish immediately
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={!isValid || mutation.isPending}
            className={`px-6 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              !isValid || mutation.isPending
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
            }`}
          >
            {mutation.isPending ? "Creating..." : "Create Post"}
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            Clear Form
          </button>
        </div>

        {/* Success Message */}
        {mutation.isSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Post created successfully! 🎉
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {mutation.isError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  Error:{" "}
                  {mutation.error instanceof Error
                    ? mutation.error.message
                    : "An unexpected error occurred while creating the post."}
                </p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
