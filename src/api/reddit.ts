import axios, { createCancelToken } from "@/axios";
import {
  comment,
  Comment,
  link,
  Link,
  listing,
  Listing,
  Subreddit,
} from "@/types";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";

export interface LinksParams {
  after?: string;
  before?: string;
  count?: number;
  limit?: number;
  show?: "all";
  sr_detail?: unknown;
}

export enum LinksSort {
  hot = "hot",
  new = "new",
  random = "random",
  rising = "rising",
  top = "top",
  controversial = "controversial",
}

export interface AutocompleteParams {
  include_over_18?: boolean;
  include_profiles?: boolean;
  limit?: number;
  query: string;
  search_query_id?: string;
  typeahead_active?: boolean;
}

export async function getAutocomplete({
  abort,
  limit = 10,
  ...params
}: AutocompleteParams & { abort?: AbortSignal }) {
  const { data } = await axios(`/api/subreddit_autocomplete_v2.json`, {
    params: {
      raw_json: 1,
      limit,
      ...params,
    },
    cancelToken: abort && createCancelToken(abort),
  });

  return data as Listing<Comment | Subreddit>;
}

export async function getLinks({
  sort,
  subreddit,
  ...params
}: { sort: LinksSort; subreddit: string } & LinksParams): Promise<
  Listing<Link>
> {
  const { data } = await axios(`/r/${subreddit}/${sort}.json`, {
    params: {
      raw_json: 1,
      ...params,
    },
  });

  return pipe(
    data,
    listing(link).decode,
    E.getOrElse((decoded): Listing<Link> => {
      console.log("getLinks");
      console.error(...decoded);
      return {
        data: { children: [], after: null, before: null, modhash: "" },
        kind: "Listing",
      };
    })
  );
}

export interface CommentsParams {
  comment?: string;
  depth?: number;
  limit?: number;
  context?: number;
}

export async function getComments({
  subreddit,
  article,
  ...params
}: {
  subreddit: string;
  article: string;
} & CommentsParams) {
  const { data } = await axios(`/r/${subreddit}/comments/${article}.json`, {
    params: {
      raw_json: 1,
      ...params,
    },
  });

  return pipe(
    data,
    t.tuple([listing(link), listing(comment)]).decode,
    E.map(([, comments]) => comments),
    E.getOrElseW((errors) => {
      throw errors;
    })
  );
}
