import { GraphQLClient, RequestOptions } from 'graphql-request';
import { gql } from 'graphql-request';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
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


export const CreateCommentDocument = gql`
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
export const UpdateCommentDocument = gql`
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
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: ID!) {
  deleteComment(id: $id) {
    id
    content
  }
}
    `;
export const CreatePostDocument = gql`
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
export const UpdatePostDocument = gql`
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
export const DeletePostDocument = gql`
    mutation DeletePost($id: ID!) {
  deletePost(id: $id) {
    id
    title
  }
}
    `;
export const GetCommentsDocument = gql`
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
export const GetCommentDocument = gql`
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
export const GetPostsDocument = gql`
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
export const GetPostDocument = gql`
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
export const GetUsersDocument = gql`
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
export const GetUserDocument = gql`
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateComment(variables: CreateCommentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateCommentMutation>({ document: CreateCommentDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateComment', 'mutation', variables);
    },
    UpdateComment(variables: UpdateCommentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateCommentMutation>({ document: UpdateCommentDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateComment', 'mutation', variables);
    },
    DeleteComment(variables: DeleteCommentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteCommentMutation>({ document: DeleteCommentDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteComment', 'mutation', variables);
    },
    CreatePost(variables: CreatePostMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreatePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePostMutation>({ document: CreatePostDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreatePost', 'mutation', variables);
    },
    UpdatePost(variables: UpdatePostMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdatePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdatePostMutation>({ document: UpdatePostDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdatePost', 'mutation', variables);
    },
    DeletePost(variables: DeletePostMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeletePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeletePostMutation>({ document: DeletePostDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeletePost', 'mutation', variables);
    },
    GetComments(variables?: GetCommentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetCommentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCommentsQuery>({ document: GetCommentsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetComments', 'query', variables);
    },
    GetComment(variables: GetCommentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetCommentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCommentQuery>({ document: GetCommentDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetComment', 'query', variables);
    },
    GetPosts(variables?: GetPostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPostsQuery>({ document: GetPostsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetPosts', 'query', variables);
    },
    GetPost(variables: GetPostQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetPostQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPostQuery>({ document: GetPostDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetPost', 'query', variables);
    },
    GetUsers(variables?: GetUsersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersQuery>({ document: GetUsersDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetUsers', 'query', variables);
    },
    GetUser(variables?: GetUserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>({ document: GetUserDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetUser', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;