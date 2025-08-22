import { useMutation, useQuery, useSuspenseQuery, useInfiniteQuery, useSuspenseInfiniteQuery, UseMutationOptions, UseQueryOptions, UseSuspenseQueryOptions, UseInfiniteQueryOptions, InfiniteData, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: { input: string; output: string; }
};

/** A comment on a post. */
export type Comment = {
  __typename?: 'Comment';
  /** Content of the comment. */
  content: Scalars['String']['output'];
  /** When the comment was created. */
  created_at: Scalars['DateTime']['output'];
  /** Unique primary key. */
  id: Scalars['ID']['output'];
  /** The post this comment belongs to. */
  post: Post;
  /** When the comment was last updated. */
  updated_at: Scalars['DateTime']['output'];
  /** The user who created this comment. */
  user: User;
};

/** A paginated list of Comment items. */
export type CommentPaginator = {
  __typename?: 'CommentPaginator';
  /** A list of Comment items. */
  data: Array<Comment>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Input for creating a new comment. */
export type CreateCommentInput = {
  /** Content of the comment. */
  content: Scalars['String']['input'];
  /** The post this comment belongs to. */
  post_id: Scalars['ID']['input'];
  /** The user who created this comment. */
  user_id: Scalars['ID']['input'];
};

/** Input for creating a new post. */
export type CreatePostInput = {
  /** Content of the post. */
  content: Scalars['String']['input'];
  /** Whether the post is published. */
  published?: InputMaybe<Scalars['Boolean']['input']>;
  /** Title of the post. */
  title: Scalars['String']['input'];
  /** The user who created this post. */
  user_id: Scalars['ID']['input'];
};

/** Indicates what fields are available at the top level of a mutation operation. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new comment. */
  createComment?: Maybe<Comment>;
  /** Create a new post. */
  createPost?: Maybe<Post>;
  /** Delete a comment. */
  deleteComment?: Maybe<Comment>;
  /** Delete a post. */
  deletePost?: Maybe<Post>;
  /** Update an existing comment. */
  updateComment?: Maybe<Comment>;
  /** Update an existing post. */
  updatePost?: Maybe<Post>;
};


/** Indicates what fields are available at the top level of a mutation operation. */
export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


/** Indicates what fields are available at the top level of a mutation operation. */
export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


/** Indicates what fields are available at the top level of a mutation operation. */
export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a mutation operation. */
export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a mutation operation. */
export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


/** Indicates what fields are available at the top level of a mutation operation. */
export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String']['input'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  COUNT = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  AVG = 'AVG',
  /** Amount of items. */
  COUNT = 'COUNT',
  /** Maximum. */
  MAX = 'MAX',
  /** Minimum. */
  MIN = 'MIN',
  /** Sum. */
  SUM = 'SUM'
}

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int']['output'];
  /** Index of the current page. */
  currentPage: Scalars['Int']['output'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']['output']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean']['output'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']['output']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int']['output'];
  /** Number of items per page. */
  perPage: Scalars['Int']['output'];
  /** Number of total available items. */
  total: Scalars['Int']['output'];
};

/** A blog post. */
export type Post = {
  __typename?: 'Post';
  /** Comments on this post. */
  comments: Array<Comment>;
  /** Content of the post. */
  content: Scalars['String']['output'];
  /** When the post was created. */
  created_at: Scalars['DateTime']['output'];
  /** Unique primary key. */
  id: Scalars['ID']['output'];
  /** Whether the post is published. */
  published: Scalars['Boolean']['output'];
  /** Title of the post. */
  title: Scalars['String']['output'];
  /** When the post was last updated. */
  updated_at: Scalars['DateTime']['output'];
  /** The user who created this post. */
  user: User;
};

/** A paginated list of Post items. */
export type PostPaginator = {
  __typename?: 'PostPaginator';
  /** A list of Post items. */
  data: Array<Post>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Indicates what fields are available at the top level of a query operation. */
export type Query = {
  __typename?: 'Query';
  /** Find a single comment by an identifying attribute. */
  comment?: Maybe<Comment>;
  /** List multiple comments. */
  comments: CommentPaginator;
  /** Find a single post by an identifying attribute. */
  post?: Maybe<Post>;
  /** List multiple posts. */
  posts: PostPaginator;
  /** Find a single user by an identifying attribute. */
  user?: Maybe<User>;
  /** List multiple users. */
  users: UserPaginator;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryCommentArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryCommentsArgs = {
  first?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<QueryCommentsOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  post_id?: InputMaybe<Scalars['ID']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryPostArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryPostsArgs = {
  first?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<QueryPostsOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryUsersArgs = {
  first?: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Array<QueryUsersOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** Allowed column names for Query.comments.orderBy. */
export enum QueryCommentsOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  ID = 'ID',
  UPDATED_AT = 'UPDATED_AT'
}

/** Order by clause for Query.comments.orderBy. */
export type QueryCommentsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryCommentsOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Allowed column names for Query.posts.orderBy. */
export enum QueryPostsOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  ID = 'ID',
  PUBLISHED = 'PUBLISHED',
  TITLE = 'TITLE',
  UPDATED_AT = 'UPDATED_AT'
}

/** Order by clause for Query.posts.orderBy. */
export type QueryPostsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryPostsOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Allowed column names for Query.users.orderBy. */
export enum QueryUsersOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  EMAIL = 'EMAIL',
  ID = 'ID',
  NAME = 'NAME',
  UPDATED_AT = 'UPDATED_AT'
}

/** Order by clause for Query.users.orderBy. */
export type QueryUsersOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: QueryUsersOrderByColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  ASC = 'ASC',
  /** Sort records in descending order. */
  DESC = 'DESC'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  ONLY = 'ONLY',
  /** Return both trashed and non-trashed results. */
  WITH = 'WITH',
  /** Only return non-trashed results. */
  WITHOUT = 'WITHOUT'
}

/** Input for updating an existing comment. */
export type UpdateCommentInput = {
  /** Content of the comment. */
  content?: InputMaybe<Scalars['String']['input']>;
  /** Unique primary key. */
  id: Scalars['ID']['input'];
};

/** Input for updating an existing post. */
export type UpdatePostInput = {
  /** Content of the post. */
  content?: InputMaybe<Scalars['String']['input']>;
  /** Unique primary key. */
  id: Scalars['ID']['input'];
  /** Whether the post is published. */
  published?: InputMaybe<Scalars['Boolean']['input']>;
  /** Title of the post. */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Account of a person who uses this application. */
export type User = {
  __typename?: 'User';
  /** Comments created by this user. */
  comments: Array<Comment>;
  /** When the account was created. */
  created_at: Scalars['DateTime']['output'];
  /** Unique email address. */
  email: Scalars['String']['output'];
  /** When the email was verified. */
  email_verified_at?: Maybe<Scalars['DateTime']['output']>;
  /** Unique primary key. */
  id: Scalars['ID']['output'];
  /** Non-unique name. */
  name: Scalars['String']['output'];
  /** Posts created by this user. */
  posts: Array<Post>;
  /** When the account was last updated. */
  updated_at: Scalars['DateTime']['output'];
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** A list of User items. */
  data: Array<User>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'Comment', id: string, content: string, created_at: string, updated_at: string, user: { __typename?: 'User', id: string, name: string, email: string }, post: { __typename?: 'Post', id: string, title: string } } | null | undefined };

export type UpdateCommentMutationVariables = Exact<{
  input: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment?: { __typename?: 'Comment', id: string, content: string, created_at: string, updated_at: string, user: { __typename?: 'User', id: string, name: string, email: string }, post: { __typename?: 'Post', id: string, title: string } } | null | undefined };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment?: { __typename?: 'Comment', id: string, content: string } | null | undefined };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', id: string, title: string, content: string, published: boolean, created_at: string, updated_at: string, user: { __typename?: 'User', id: string, name: string, email: string } } | null | undefined };

export type UpdatePostMutationVariables = Exact<{
  input: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'Post', id: string, title: string, content: string, published: boolean, created_at: string, updated_at: string, user: { __typename?: 'User', id: string, name: string, email: string } } | null | undefined };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'Post', id: string, title: string } | null | undefined };

export type GetCommentsQueryVariables = Exact<{
  post_id?: InputMaybe<Scalars['ID']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QueryCommentsOrderByOrderByClause> | QueryCommentsOrderByOrderByClause>;
}>;


export type GetCommentsQuery = { __typename?: 'Query', comments: { __typename?: 'CommentPaginator', data: Array<{ __typename?: 'Comment', id: string, content: string, created_at: string, updated_at: string, user: { __typename?: 'User', id: string, name: string, email: string }, post: { __typename?: 'Post', id: string, title: string, user: { __typename?: 'User', id: string, name: string } } }>, paginatorInfo: { __typename?: 'PaginatorInfo', count: number, currentPage: number, hasMorePages: boolean, lastPage: number, perPage: number, total: number } } };

export type GetCommentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCommentQuery = { __typename?: 'Query', comment?: { __typename?: 'Comment', id: string, content: string, created_at: string, updated_at: string, user: { __typename?: 'User', id: string, name: string, email: string }, post: { __typename?: 'Post', id: string, title: string, content: string, user: { __typename?: 'User', id: string, name: string } } } | null | undefined };

export type GetPostsQueryVariables = Exact<{
  published?: InputMaybe<Scalars['Boolean']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QueryPostsOrderByOrderByClause> | QueryPostsOrderByOrderByClause>;
}>;


export type GetPostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostPaginator', data: Array<{ __typename?: 'Post', id: string, title: string, content: string, published: boolean, created_at: string, updated_at: string, user: { __typename?: 'User', id: string, name: string, email: string }, comments: Array<{ __typename?: 'Comment', id: string, content: string, created_at: string, user: { __typename?: 'User', id: string, name: string } }> }>, paginatorInfo: { __typename?: 'PaginatorInfo', count: number, currentPage: number, hasMorePages: boolean, lastPage: number, perPage: number, total: number } } };

export type GetPostQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, title: string, content: string, published: boolean, created_at: string, updated_at: string, user: { __typename?: 'User', id: string, name: string, email: string }, comments: Array<{ __typename?: 'Comment', id: string, content: string, created_at: string, updated_at: string, user: { __typename?: 'User', id: string, name: string, email: string } }> } | null | undefined };

export type GetUsersQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<QueryUsersOrderByOrderByClause> | QueryUsersOrderByOrderByClause>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: { __typename?: 'UserPaginator', data: Array<{ __typename?: 'User', id: string, name: string, email: string, created_at: string, updated_at: string }>, paginatorInfo: { __typename?: 'PaginatorInfo', count: number, currentPage: number, hasMorePages: boolean, lastPage: number, perPage: number, total: number } } };

export type GetUserQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, email: string, email_verified_at?: string | null | undefined, created_at: string, updated_at: string, posts: Array<{ __typename?: 'Post', id: string, title: string, content: string, published: boolean, created_at: string, updated_at: string }>, comments: Array<{ __typename?: 'Comment', id: string, content: string, created_at: string, updated_at: string, post: { __typename?: 'Post', id: string, title: string } }> } | null | undefined };



export const CreateCommentDocument = `
    mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    id
    content
    created_at
    updated_at
    user {
      id
      name
      email
    }
    post {
      id
      title
    }
  }
}
    `;

export const useCreateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      {
    mutationKey: ['CreateComment'],
    mutationFn: (variables?: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateCommentDocument, variables)(),
    ...options
  }
    )};


useCreateCommentMutation.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables: CreateCommentMutationVariables) => fetcher<CreateCommentMutation, CreateCommentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateCommentDocument, variables);

export const UpdateCommentDocument = `
    mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    id
    content
    created_at
    updated_at
    user {
      id
      name
      email
    }
    post {
      id
      title
    }
  }
}
    `;

export const useUpdateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateCommentMutation, TError, UpdateCommentMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateCommentMutation, TError, UpdateCommentMutationVariables, TContext>(
      {
    mutationKey: ['UpdateComment'],
    mutationFn: (variables?: UpdateCommentMutationVariables) => fetcher<UpdateCommentMutation, UpdateCommentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateCommentDocument, variables)(),
    ...options
  }
    )};


useUpdateCommentMutation.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables: UpdateCommentMutationVariables) => fetcher<UpdateCommentMutation, UpdateCommentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateCommentDocument, variables);

export const DeleteCommentDocument = `
    mutation DeleteComment($id: ID!) {
  deleteComment(id: $id) {
    id
    content
  }
}
    `;

export const useDeleteCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteCommentMutation, TError, DeleteCommentMutationVariables, TContext>
    ) => {
    
    return useMutation<DeleteCommentMutation, TError, DeleteCommentMutationVariables, TContext>(
      {
    mutationKey: ['DeleteComment'],
    mutationFn: (variables?: DeleteCommentMutationVariables) => fetcher<DeleteCommentMutation, DeleteCommentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteCommentDocument, variables)(),
    ...options
  }
    )};


useDeleteCommentMutation.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables: DeleteCommentMutationVariables) => fetcher<DeleteCommentMutation, DeleteCommentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteCommentDocument, variables);

export const CreatePostDocument = `
    mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    content
    published
    created_at
    updated_at
    user {
      id
      name
      email
    }
  }
}
    `;

export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>
    ) => {
    
    return useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      {
    mutationKey: ['CreatePost'],
    mutationFn: (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreatePostDocument, variables)(),
    ...options
  }
    )};


useCreatePostMutation.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreatePostDocument, variables);

export const UpdatePostDocument = `
    mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    id
    title
    content
    published
    created_at
    updated_at
    user {
      id
      name
      email
    }
  }
}
    `;

export const useUpdatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>(
      {
    mutationKey: ['UpdatePost'],
    mutationFn: (variables?: UpdatePostMutationVariables) => fetcher<UpdatePostMutation, UpdatePostMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdatePostDocument, variables)(),
    ...options
  }
    )};


useUpdatePostMutation.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables: UpdatePostMutationVariables) => fetcher<UpdatePostMutation, UpdatePostMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdatePostDocument, variables);

export const DeletePostDocument = `
    mutation DeletePost($id: ID!) {
  deletePost(id: $id) {
    id
    title
  }
}
    `;

export const useDeletePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeletePostMutation, TError, DeletePostMutationVariables, TContext>
    ) => {
    
    return useMutation<DeletePostMutation, TError, DeletePostMutationVariables, TContext>(
      {
    mutationKey: ['DeletePost'],
    mutationFn: (variables?: DeletePostMutationVariables) => fetcher<DeletePostMutation, DeletePostMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeletePostDocument, variables)(),
    ...options
  }
    )};


useDeletePostMutation.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables: DeletePostMutationVariables) => fetcher<DeletePostMutation, DeletePostMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeletePostDocument, variables);

export const GetCommentsDocument = `
    query GetComments($post_id: ID, $user_id: ID, $first: Int = 10, $page: Int, $orderBy: [QueryCommentsOrderByOrderByClause!]) {
  comments(
    post_id: $post_id
    user_id: $user_id
    first: $first
    page: $page
    orderBy: $orderBy
  ) {
    data {
      id
      content
      created_at
      updated_at
      user {
        id
        name
        email
      }
      post {
        id
        title
        user {
          id
          name
        }
      }
    }
    paginatorInfo {
      count
      currentPage
      hasMorePages
      lastPage
      perPage
      total
    }
  }
}
    `;

export const useGetCommentsQuery = <
      TData = GetCommentsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetCommentsQueryVariables,
      options?: Omit<UseQueryOptions<GetCommentsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCommentsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetCommentsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetComments'] : ['GetComments', variables],
    queryFn: fetcher<GetCommentsQuery, GetCommentsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCommentsDocument, variables),
    ...options
  }
    )};

useGetCommentsQuery.document = GetCommentsDocument;

useGetCommentsQuery.getKey = (variables?: GetCommentsQueryVariables) => variables === undefined ? ['GetComments'] : ['GetComments', variables];

export const useSuspenseGetCommentsQuery = <
      TData = GetCommentsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetCommentsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<GetCommentsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<GetCommentsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<GetCommentsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetCommentsSuspense'] : ['GetCommentsSuspense', variables],
    queryFn: fetcher<GetCommentsQuery, GetCommentsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCommentsDocument, variables),
    ...options
  }
    )};

useSuspenseGetCommentsQuery.document = GetCommentsDocument;

useSuspenseGetCommentsQuery.getKey = (variables?: GetCommentsQueryVariables) => variables === undefined ? ['GetCommentsSuspense'] : ['GetCommentsSuspense', variables];

export const useInfiniteGetCommentsQuery = <
      TData = InfiniteData<GetCommentsQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetCommentsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetCommentsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetCommentsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetCommentsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetComments.infinite'] : ['GetComments.infinite', variables],
      queryFn: (metaData) => fetcher<GetCommentsQuery, GetCommentsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCommentsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetCommentsQuery.getKey = (variables?: GetCommentsQueryVariables) => variables === undefined ? ['GetComments.infinite'] : ['GetComments.infinite', variables];

export const useSuspenseInfiniteGetCommentsQuery = <
      TData = InfiniteData<GetCommentsQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetCommentsQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<GetCommentsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<GetCommentsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<GetCommentsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetComments.infiniteSuspense'] : ['GetComments.infiniteSuspense', variables],
      queryFn: (metaData) => fetcher<GetCommentsQuery, GetCommentsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCommentsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteGetCommentsQuery.getKey = (variables?: GetCommentsQueryVariables) => variables === undefined ? ['GetComments.infiniteSuspense'] : ['GetComments.infiniteSuspense', variables];


useGetCommentsQuery.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables?: GetCommentsQueryVariables) => fetcher<GetCommentsQuery, GetCommentsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCommentsDocument, variables);

export const GetCommentDocument = `
    query GetComment($id: ID!) {
  comment(id: $id) {
    id
    content
    created_at
    updated_at
    user {
      id
      name
      email
    }
    post {
      id
      title
      content
      user {
        id
        name
      }
    }
  }
}
    `;

export const useGetCommentQuery = <
      TData = GetCommentQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetCommentQueryVariables,
      options?: Omit<UseQueryOptions<GetCommentQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetCommentQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetCommentQuery, TError, TData>(
      {
    queryKey: ['GetComment', variables],
    queryFn: fetcher<GetCommentQuery, GetCommentQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCommentDocument, variables),
    ...options
  }
    )};

useGetCommentQuery.document = GetCommentDocument;

useGetCommentQuery.getKey = (variables: GetCommentQueryVariables) => ['GetComment', variables];

export const useSuspenseGetCommentQuery = <
      TData = GetCommentQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetCommentQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<GetCommentQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<GetCommentQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<GetCommentQuery, TError, TData>(
      {
    queryKey: ['GetCommentSuspense', variables],
    queryFn: fetcher<GetCommentQuery, GetCommentQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCommentDocument, variables),
    ...options
  }
    )};

useSuspenseGetCommentQuery.document = GetCommentDocument;

useSuspenseGetCommentQuery.getKey = (variables: GetCommentQueryVariables) => ['GetCommentSuspense', variables];

export const useInfiniteGetCommentQuery = <
      TData = InfiniteData<GetCommentQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetCommentQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetCommentQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetCommentQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetCommentQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetComment.infinite', variables],
      queryFn: (metaData) => fetcher<GetCommentQuery, GetCommentQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCommentDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetCommentQuery.getKey = (variables: GetCommentQueryVariables) => ['GetComment.infinite', variables];

export const useSuspenseInfiniteGetCommentQuery = <
      TData = InfiniteData<GetCommentQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetCommentQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<GetCommentQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<GetCommentQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<GetCommentQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetComment.infiniteSuspense', variables],
      queryFn: (metaData) => fetcher<GetCommentQuery, GetCommentQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCommentDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteGetCommentQuery.getKey = (variables: GetCommentQueryVariables) => ['GetComment.infiniteSuspense', variables];


useGetCommentQuery.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables: GetCommentQueryVariables) => fetcher<GetCommentQuery, GetCommentQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCommentDocument, variables);

export const GetPostsDocument = `
    query GetPosts($published: Boolean, $user_id: ID, $search: String, $first: Int = 10, $page: Int, $orderBy: [QueryPostsOrderByOrderByClause!]) {
  posts(
    published: $published
    user_id: $user_id
    search: $search
    first: $first
    page: $page
    orderBy: $orderBy
  ) {
    data {
      id
      title
      content
      published
      created_at
      updated_at
      user {
        id
        name
        email
      }
      comments {
        id
        content
        created_at
        user {
          id
          name
        }
      }
    }
    paginatorInfo {
      count
      currentPage
      hasMorePages
      lastPage
      perPage
      total
    }
  }
}
    `;

export const useGetPostsQuery = <
      TData = GetPostsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetPostsQueryVariables,
      options?: Omit<UseQueryOptions<GetPostsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPostsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPostsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPosts'] : ['GetPosts', variables],
    queryFn: fetcher<GetPostsQuery, GetPostsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPostsDocument, variables),
    ...options
  }
    )};

useGetPostsQuery.document = GetPostsDocument;

useGetPostsQuery.getKey = (variables?: GetPostsQueryVariables) => variables === undefined ? ['GetPosts'] : ['GetPosts', variables];

export const useSuspenseGetPostsQuery = <
      TData = GetPostsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetPostsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<GetPostsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<GetPostsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<GetPostsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetPostsSuspense'] : ['GetPostsSuspense', variables],
    queryFn: fetcher<GetPostsQuery, GetPostsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPostsDocument, variables),
    ...options
  }
    )};

useSuspenseGetPostsQuery.document = GetPostsDocument;

useSuspenseGetPostsQuery.getKey = (variables?: GetPostsQueryVariables) => variables === undefined ? ['GetPostsSuspense'] : ['GetPostsSuspense', variables];

export const useInfiniteGetPostsQuery = <
      TData = InfiniteData<GetPostsQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetPostsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetPostsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetPostsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetPostsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetPosts.infinite'] : ['GetPosts.infinite', variables],
      queryFn: (metaData) => fetcher<GetPostsQuery, GetPostsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPostsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetPostsQuery.getKey = (variables?: GetPostsQueryVariables) => variables === undefined ? ['GetPosts.infinite'] : ['GetPosts.infinite', variables];

export const useSuspenseInfiniteGetPostsQuery = <
      TData = InfiniteData<GetPostsQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetPostsQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<GetPostsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<GetPostsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<GetPostsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetPosts.infiniteSuspense'] : ['GetPosts.infiniteSuspense', variables],
      queryFn: (metaData) => fetcher<GetPostsQuery, GetPostsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPostsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteGetPostsQuery.getKey = (variables?: GetPostsQueryVariables) => variables === undefined ? ['GetPosts.infiniteSuspense'] : ['GetPosts.infiniteSuspense', variables];


useGetPostsQuery.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables?: GetPostsQueryVariables) => fetcher<GetPostsQuery, GetPostsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPostsDocument, variables);

export const GetPostDocument = `
    query GetPost($id: ID!) {
  post(id: $id) {
    id
    title
    content
    published
    created_at
    updated_at
    user {
      id
      name
      email
    }
    comments {
      id
      content
      created_at
      updated_at
      user {
        id
        name
        email
      }
    }
  }
}
    `;

export const useGetPostQuery = <
      TData = GetPostQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetPostQueryVariables,
      options?: Omit<UseQueryOptions<GetPostQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetPostQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetPostQuery, TError, TData>(
      {
    queryKey: ['GetPost', variables],
    queryFn: fetcher<GetPostQuery, GetPostQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPostDocument, variables),
    ...options
  }
    )};

useGetPostQuery.document = GetPostDocument;

useGetPostQuery.getKey = (variables: GetPostQueryVariables) => ['GetPost', variables];

export const useSuspenseGetPostQuery = <
      TData = GetPostQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetPostQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<GetPostQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<GetPostQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<GetPostQuery, TError, TData>(
      {
    queryKey: ['GetPostSuspense', variables],
    queryFn: fetcher<GetPostQuery, GetPostQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPostDocument, variables),
    ...options
  }
    )};

useSuspenseGetPostQuery.document = GetPostDocument;

useSuspenseGetPostQuery.getKey = (variables: GetPostQueryVariables) => ['GetPostSuspense', variables];

export const useInfiniteGetPostQuery = <
      TData = InfiniteData<GetPostQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetPostQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetPostQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetPostQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetPostQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetPost.infinite', variables],
      queryFn: (metaData) => fetcher<GetPostQuery, GetPostQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPostDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetPostQuery.getKey = (variables: GetPostQueryVariables) => ['GetPost.infinite', variables];

export const useSuspenseInfiniteGetPostQuery = <
      TData = InfiniteData<GetPostQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetPostQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<GetPostQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<GetPostQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<GetPostQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['GetPost.infiniteSuspense', variables],
      queryFn: (metaData) => fetcher<GetPostQuery, GetPostQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPostDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteGetPostQuery.getKey = (variables: GetPostQueryVariables) => ['GetPost.infiniteSuspense', variables];


useGetPostQuery.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables: GetPostQueryVariables) => fetcher<GetPostQuery, GetPostQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPostDocument, variables);

export const GetUsersDocument = `
    query GetUsers($name: String, $first: Int = 10, $page: Int, $orderBy: [QueryUsersOrderByOrderByClause!]) {
  users(name: $name, first: $first, page: $page, orderBy: $orderBy) {
    data {
      id
      name
      email
      created_at
      updated_at
    }
    paginatorInfo {
      count
      currentPage
      hasMorePages
      lastPage
      perPage
      total
    }
  }
}
    `;

export const useGetUsersQuery = <
      TData = GetUsersQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetUsersQueryVariables,
      options?: Omit<UseQueryOptions<GetUsersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUsersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUsersQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetUsers'] : ['GetUsers', variables],
    queryFn: fetcher<GetUsersQuery, GetUsersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUsersDocument, variables),
    ...options
  }
    )};

useGetUsersQuery.document = GetUsersDocument;

useGetUsersQuery.getKey = (variables?: GetUsersQueryVariables) => variables === undefined ? ['GetUsers'] : ['GetUsers', variables];

export const useSuspenseGetUsersQuery = <
      TData = GetUsersQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetUsersQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<GetUsersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<GetUsersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<GetUsersQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetUsersSuspense'] : ['GetUsersSuspense', variables],
    queryFn: fetcher<GetUsersQuery, GetUsersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUsersDocument, variables),
    ...options
  }
    )};

useSuspenseGetUsersQuery.document = GetUsersDocument;

useSuspenseGetUsersQuery.getKey = (variables?: GetUsersQueryVariables) => variables === undefined ? ['GetUsersSuspense'] : ['GetUsersSuspense', variables];

export const useInfiniteGetUsersQuery = <
      TData = InfiniteData<GetUsersQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetUsersQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetUsersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetUsersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetUsersQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetUsers.infinite'] : ['GetUsers.infinite', variables],
      queryFn: (metaData) => fetcher<GetUsersQuery, GetUsersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUsersDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetUsersQuery.getKey = (variables?: GetUsersQueryVariables) => variables === undefined ? ['GetUsers.infinite'] : ['GetUsers.infinite', variables];

export const useSuspenseInfiniteGetUsersQuery = <
      TData = InfiniteData<GetUsersQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetUsersQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<GetUsersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<GetUsersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<GetUsersQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetUsers.infiniteSuspense'] : ['GetUsers.infiniteSuspense', variables],
      queryFn: (metaData) => fetcher<GetUsersQuery, GetUsersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUsersDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteGetUsersQuery.getKey = (variables?: GetUsersQueryVariables) => variables === undefined ? ['GetUsers.infiniteSuspense'] : ['GetUsers.infiniteSuspense', variables];


useGetUsersQuery.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables?: GetUsersQueryVariables) => fetcher<GetUsersQuery, GetUsersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUsersDocument, variables);

export const GetUserDocument = `
    query GetUser($id: ID, $email: String) {
  user(id: $id, email: $email) {
    id
    name
    email
    email_verified_at
    created_at
    updated_at
    posts {
      id
      title
      content
      published
      created_at
      updated_at
    }
    comments {
      id
      content
      created_at
      updated_at
      post {
        id
        title
      }
    }
  }
}
    `;

export const useGetUserQuery = <
      TData = GetUserQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetUserQueryVariables,
      options?: Omit<UseQueryOptions<GetUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetUserQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetUser'] : ['GetUser', variables],
    queryFn: fetcher<GetUserQuery, GetUserQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUserDocument, variables),
    ...options
  }
    )};

useGetUserQuery.document = GetUserDocument;

useGetUserQuery.getKey = (variables?: GetUserQueryVariables) => variables === undefined ? ['GetUser'] : ['GetUser', variables];

export const useSuspenseGetUserQuery = <
      TData = GetUserQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetUserQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<GetUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<GetUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<GetUserQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetUserSuspense'] : ['GetUserSuspense', variables],
    queryFn: fetcher<GetUserQuery, GetUserQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUserDocument, variables),
    ...options
  }
    )};

useSuspenseGetUserQuery.document = GetUserDocument;

useSuspenseGetUserQuery.getKey = (variables?: GetUserQueryVariables) => variables === undefined ? ['GetUserSuspense'] : ['GetUserSuspense', variables];

export const useInfiniteGetUserQuery = <
      TData = InfiniteData<GetUserQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetUserQueryVariables,
      options: Omit<UseInfiniteQueryOptions<GetUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<GetUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<GetUserQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetUser.infinite'] : ['GetUser.infinite', variables],
      queryFn: (metaData) => fetcher<GetUserQuery, GetUserQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUserDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteGetUserQuery.getKey = (variables?: GetUserQueryVariables) => variables === undefined ? ['GetUser.infinite'] : ['GetUser.infinite', variables];

export const useSuspenseInfiniteGetUserQuery = <
      TData = InfiniteData<GetUserQuery>,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetUserQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<GetUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<GetUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<GetUserQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['GetUser.infiniteSuspense'] : ['GetUser.infiniteSuspense', variables],
      queryFn: (metaData) => fetcher<GetUserQuery, GetUserQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUserDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteGetUserQuery.getKey = (variables?: GetUserQueryVariables) => variables === undefined ? ['GetUser.infiniteSuspense'] : ['GetUser.infiniteSuspense', variables];


useGetUserQuery.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables?: GetUserQueryVariables) => fetcher<GetUserQuery, GetUserQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUserDocument, variables);
