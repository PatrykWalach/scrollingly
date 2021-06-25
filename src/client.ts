import { ApolloClient, gql, InMemoryCache, ApolloLink } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { relayStylePagination } from "@apollo/client/utilities";
import typeDefs from "./schema";
import { TypedTypePolicies } from "./generated/apollo-helpers";
import generatedIntrospection from "./generated/fragment-matcher.json";
import { RetryLink } from "@apollo/client/link/retry";

interface Listing<T> {
  kind: "Listing";
  data: {
    modhash: "";
    dist: number;
    children: T[];
    after: string | null;
    before: string | null;
  };
}

interface Link {
  kind: "t3";
  data: {
    id: string;
  };
}

const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      links: relayStylePagination(["params"]),
    },
  },
};

import camelCase from "camelcase";
import { snakeCase } from "snake-case";

const isListing = (data: unknown): data is Listing<unknown> =>
  (data as Listing<unknown>).kind === "Listing";

const isLink = (data: unknown): data is Link => (data as Link).kind === "t3";

const isLinkListing = (data: unknown): data is Listing<Link> =>
  isListing(data) && data.data.children.every(isLink);

const patchField =
  (field: string, __typename: string): RestLink.FunctionalTypePatcher =>
  (data, outerType, patchDeeper) => ({
    ...data,
    [field]: patchDeeper(
      {
        ...data[field],
        __typename,
      },
      __typename,
      patchDeeper
    ),
  });

const patchArray =
  (field: string, __typename: string): RestLink.FunctionalTypePatcher =>
  (data, outerType, patchDeeper) => ({
    ...data,
    [field]: data[field].map((element: any) =>
      patchDeeper(
        {
          ...element,
          __typename,
        },
        __typename,
        patchDeeper
      )
    ),
  });

export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies,
    possibleTypes: generatedIntrospection.possibleTypes,
  }),

  link: ApolloLink.from([
    new RestLink({
      uri: "https://www.reddit.com",

      fieldNameNormalizer: (key: string) => camelCase(key),
      fieldNameDenormalizer: (key: string) => snakeCase(key),

      typePatcher: {
        LinksConnection(data, ...args) {
          const patched = patchArray("edges", "LinkEdge")(data, ...args);

          return patchField("pageInfo", "PageInfo")(patched, ...args);
        },

        LinkEdge: patchField("node", "Link"),
      },

      async responseTransformer(response, typeName) {
        const jsonData = await response.json();
        if (typeName === "LinksConnection" && isLinkListing(jsonData)) {
          const edges = jsonData.data.children.map(({ data, kind }: any) => ({
            node: data,
            cursor: data.name, //kind + "_" + data.id,
          }));
          console.log(edges);
          // console.log(detectTypes(edges));

          const pageInfo = {
            hasPreviousPage: typeof jsonData.data.before === "string",
            hasNextPage: typeof jsonData.data.after === "string",
            startCursor: jsonData.data.before ?? edges[0].cursor,
            endCursor: jsonData.data.after ?? edges[edges.length - 1].cursor,
          };

          return {
            edges,
            pageInfo,
          };
        }

        return jsonData;
      },
    }),
    new RetryLink(),
  ]),

  typeDefs,
});

function detectTypes(edges: { node: { id: string }; cursor: string }[]): any {
  return edges.reduce<Record<string, string[]>>((acc, { node }: any) => {
    for (const key in node) {
      const type =
        node[key] === null
          ? "null"
          : Array.isArray(node[key])
          ? "array"
          : typeof node[key];
      if (!Array.isArray(acc[camelCase(key)])) {
        acc[camelCase(key)] = [];
      }
      if (!acc[camelCase(key)].includes(type)) {
        acc[camelCase(key)].push(type);
      }
    }
    return acc;
  }, Object.fromEntries(Object.keys(edges[0].node).map((k) => [camelCase(k), []])));
}
