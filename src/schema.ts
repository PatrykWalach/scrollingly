import { gql } from "@apollo/client";

export default gql`
  type PageInfo {
    hasPreviousPage: Boolean!
    hasNextPage: Boolean!
    startCursor: String!
    endCursor: String!
  }

  type Link {
    #       allAwardings: ["array"]
    allowLiveComments: Boolean!
    # approvedAtUtc: ["null"]
    # approvedBy: ["null"]
    archived: Boolean!
    author: String!
    authorFlairBackgroundColor: String
    authorFlairCssClass: String
    # authorFlairRichtext: ["array"]
    authorFlairTemplateId: String
    authorFlairText: String
    authorFlairTextColor: String
    authorFlairType: String!
    authorFullname: String!
    authorPatreonFlair: Boolean!
    authorPremium: Boolean!
    # awarders: ["array"]
    # bannedAtUtc: ["null"]
    # bannedBy: ["null"]
    canGild: Boolean!
    canModPost: Boolean!
    # category: ["null"]
    clicked: Boolean!
    # contentCategories: ["null"]
    contestMode: Boolean!
    created: Int!
    createdUtc: Int!
    # discussionType: ["null"]
    # distinguished: ["null"]
    domain: String!
    downs: Int!
    edited: Boolean!
    # galleryData: ["object"]
    gilded: Int!
    # gildings: ["object"]
    hidden: Boolean!
    hideScore: Boolean!
    id: String!
    isCreatedFromAdsUi: Boolean!
    isCrosspostable: Boolean!
    isGallery: Boolean!
    isMeta: Boolean!
    isOriginalContent: Boolean!
    isRedditMediaDomain: Boolean!
    isRobotIndexable: Boolean!
    isSelf: Boolean!
    isVideo: Boolean!
    # likes: ["null"]
    linkFlairBackgroundColor: String!
    linkFlairCssClass: String
    # linkFlairRichtext: ["array"]
    linkFlairTemplateId: String!
    linkFlairText: String
    linkFlairTextColor: String!
    linkFlairType: String!
    locked: Boolean!
    # media: (2) ["null", "object"]
    # mediaEmbed: ["object"]
    # mediaMetadata: ["object"]
    mediaOnly: Boolean!
    # modNote: ["null"]
    # modReasonBy: ["null"]
    # modReasonTitle: ["null"]
    # modReports: ["array"]
    name: String!
    noFollow: Boolean!
    numComments: Int!
    numCrossposts: Int!
    # numReports: ["null"]
    over18: Boolean!
    parentWhitelistStatus: String!
    permalink: String!
    pinned: Boolean!
    postHint: String!
    # preview: ["object"]
    pwls: Int!
    quarantine: Boolean!
    # removalReason: ["null"]
    # removedBy: ["null"]
    # removedByCategory: ["null"]
    # reportReasons: ["null"]
    saved: Boolean!
    score: Int!
    # secureMedia: (2) ["null", "object"]
    # secureMediaEmbed: ["object"]
    selftext: String!
    selftextHtml: String
    sendReplies: Boolean!
    spoiler: Boolean!
    stickied: Boolean!
    subreddit: String!
    subredditId: String!
    subredditNamePrefixed: String!
    subredditSubscribers: Int!
    subredditType: String!
    suggestedSort: String
    thumbnail: String!
    thumbnailHeight: Int
    thumbnailWidth: Int
    title: String!
    # topAwardedType: ["null"]
    totalAwardsReceived: Int!
    # treatmentTags: ["array"]
    ups: Int!
    upvoteRatio: Int!
    url: String!
    urlOverriddenByDest: String!
    # userReports: ["array"]
    # viewCount: ["null"]
    visited: Boolean!
    whitelistStatus: String!
    wls: Int!
  }

  type LinkEdge {
    node: Link
    cursor: String
  }

  type LinksConnection {
    edges: [LinkEdge]
    pageInfo: PageInfo!
  }

  type Query {
    links(first: Int, after: String, subreddit: String!): LinksConnection
  }
`;
