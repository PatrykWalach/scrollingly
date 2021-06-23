import { gql } from '@apollo/client';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Link = {
  __typename?: 'Link';
  allowLiveComments: Scalars['Boolean'];
  archived: Scalars['Boolean'];
  author: Scalars['String'];
  authorFlairBackgroundColor?: Maybe<Scalars['String']>;
  authorFlairCssClass?: Maybe<Scalars['String']>;
  authorFlairTemplateId?: Maybe<Scalars['String']>;
  authorFlairText?: Maybe<Scalars['String']>;
  authorFlairTextColor?: Maybe<Scalars['String']>;
  authorFlairType: Scalars['String'];
  authorFullname: Scalars['String'];
  authorPatreonFlair: Scalars['Boolean'];
  authorPremium: Scalars['Boolean'];
  canGild: Scalars['Boolean'];
  canModPost: Scalars['Boolean'];
  clicked: Scalars['Boolean'];
  contestMode: Scalars['Boolean'];
  created: Scalars['Int'];
  createdUtc: Scalars['Int'];
  domain: Scalars['String'];
  downs: Scalars['Int'];
  edited: Scalars['Boolean'];
  gilded: Scalars['Int'];
  hidden: Scalars['Boolean'];
  hideScore: Scalars['Boolean'];
  id: Scalars['String'];
  isCreatedFromAdsUi: Scalars['Boolean'];
  isCrosspostable: Scalars['Boolean'];
  isGallery: Scalars['Boolean'];
  isMeta: Scalars['Boolean'];
  isOriginalContent: Scalars['Boolean'];
  isRedditMediaDomain: Scalars['Boolean'];
  isRobotIndexable: Scalars['Boolean'];
  isSelf: Scalars['Boolean'];
  isVideo: Scalars['Boolean'];
  linkFlairBackgroundColor: Scalars['String'];
  linkFlairCssClass?: Maybe<Scalars['String']>;
  linkFlairTemplateId: Scalars['String'];
  linkFlairText?: Maybe<Scalars['String']>;
  linkFlairTextColor: Scalars['String'];
  linkFlairType: Scalars['String'];
  locked: Scalars['Boolean'];
  mediaOnly: Scalars['Boolean'];
  name: Scalars['String'];
  noFollow: Scalars['Boolean'];
  numComments: Scalars['Int'];
  numCrossposts: Scalars['Int'];
  over18: Scalars['Boolean'];
  parentWhitelistStatus: Scalars['String'];
  permalink: Scalars['String'];
  pinned: Scalars['Boolean'];
  postHint: Scalars['String'];
  pwls: Scalars['Int'];
  quarantine: Scalars['Boolean'];
  saved: Scalars['Boolean'];
  score: Scalars['Int'];
  selftext: Scalars['String'];
  selftextHtml?: Maybe<Scalars['String']>;
  sendReplies: Scalars['Boolean'];
  spoiler: Scalars['Boolean'];
  stickied: Scalars['Boolean'];
  subreddit: Scalars['String'];
  subredditId: Scalars['String'];
  subredditNamePrefixed: Scalars['String'];
  subredditSubscribers: Scalars['Int'];
  subredditType: Scalars['String'];
  suggestedSort?: Maybe<Scalars['String']>;
  thumbnail: Scalars['String'];
  thumbnailHeight?: Maybe<Scalars['Int']>;
  thumbnailWidth?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  totalAwardsReceived: Scalars['Int'];
  ups: Scalars['Int'];
  upvoteRatio: Scalars['Int'];
  url: Scalars['String'];
  urlOverriddenByDest: Scalars['String'];
  visited: Scalars['Boolean'];
  whitelistStatus: Scalars['String'];
  wls: Scalars['Int'];
};

export type LinkEdge = {
  __typename?: 'LinkEdge';
  node?: Maybe<Link>;
  cursor?: Maybe<Scalars['String']>;
};

export type LinksConnection = {
  __typename?: 'LinksConnection';
  edges?: Maybe<Array<Maybe<LinkEdge>>>;
  pageInfo: PageInfo;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  links?: Maybe<LinksConnection>;
};


export type QueryLinksArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  subreddit: Scalars['String'];
};

export type Link_NodeFragment = (
  { __typename?: 'Link' }
  & Pick<Link, 'url' | 'thumbnail' | 'id' | 'permalink' | 'title' | 'subreddit'>
);

export type LinksQueryVariables = Exact<{
  subreddit: Scalars['String'];
  after: Scalars['String'];
}>;


export type LinksQuery = (
  { __typename?: 'Query' }
  & { links?: Maybe<(
    { __typename?: 'LinksConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'LinkEdge' }
      & Pick<LinkEdge, 'cursor'>
      & { node?: Maybe<(
        { __typename?: 'Link' }
        & Pick<Link, 'url' | 'thumbnail' | 'id' | 'permalink' | 'title' | 'subreddit'>
      )> }
    )>>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'>
    ) }
  )> }
);

export const Link_NodeFragmentDoc = gql`
    fragment Link_node on Link {
  url
  thumbnail
  id
  permalink
  title
  subreddit
}
    `;
export const LinksDocument = gql`
    query Links($subreddit: String!, $after: String!) {
  links(subreddit: $subreddit, first: 100, after: $after) @rest(type: "LinksConnection", path: "/r/{args.subreddit}/new.json?{args}&limit={args.first}") {
    edges {
      node {
        url
        thumbnail
        id
        permalink
        title
        subreddit
      }
      cursor
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
  }
}
    `;

/**
 * __useLinksQuery__
 *
 * To run a query within a Vue component, call `useLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useLinksQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useLinksQuery({
 *   subreddit: // value for 'subreddit'
 *   after: // value for 'after'
 * });
 */
export function useLinksQuery(variables: LinksQueryVariables | VueCompositionApi.Ref<LinksQueryVariables> | ReactiveFunction<LinksQueryVariables>, options: VueApolloComposable.UseQueryOptions<LinksQuery, LinksQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<LinksQuery, LinksQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<LinksQuery, LinksQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<LinksQuery, LinksQueryVariables>(LinksDocument, variables, options);
}
export type LinksQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<LinksQuery, LinksQueryVariables>;