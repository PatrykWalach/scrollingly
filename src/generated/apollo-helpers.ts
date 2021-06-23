import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type LinkKeySpecifier = ('allowLiveComments' | 'archived' | 'author' | 'authorFlairBackgroundColor' | 'authorFlairCssClass' | 'authorFlairTemplateId' | 'authorFlairText' | 'authorFlairTextColor' | 'authorFlairType' | 'authorFullname' | 'authorPatreonFlair' | 'authorPremium' | 'canGild' | 'canModPost' | 'clicked' | 'contestMode' | 'created' | 'createdUtc' | 'domain' | 'downs' | 'edited' | 'gilded' | 'hidden' | 'hideScore' | 'id' | 'isCreatedFromAdsUi' | 'isCrosspostable' | 'isGallery' | 'isMeta' | 'isOriginalContent' | 'isRedditMediaDomain' | 'isRobotIndexable' | 'isSelf' | 'isVideo' | 'linkFlairBackgroundColor' | 'linkFlairCssClass' | 'linkFlairTemplateId' | 'linkFlairText' | 'linkFlairTextColor' | 'linkFlairType' | 'locked' | 'mediaOnly' | 'name' | 'noFollow' | 'numComments' | 'numCrossposts' | 'over18' | 'parentWhitelistStatus' | 'permalink' | 'pinned' | 'postHint' | 'pwls' | 'quarantine' | 'saved' | 'score' | 'selftext' | 'selftextHtml' | 'sendReplies' | 'spoiler' | 'stickied' | 'subreddit' | 'subredditId' | 'subredditNamePrefixed' | 'subredditSubscribers' | 'subredditType' | 'suggestedSort' | 'thumbnail' | 'thumbnailHeight' | 'thumbnailWidth' | 'title' | 'totalAwardsReceived' | 'ups' | 'upvoteRatio' | 'url' | 'urlOverriddenByDest' | 'visited' | 'whitelistStatus' | 'wls' | LinkKeySpecifier)[];
export type LinkFieldPolicy = {
	allowLiveComments?: FieldPolicy<any> | FieldReadFunction<any>,
	archived?: FieldPolicy<any> | FieldReadFunction<any>,
	author?: FieldPolicy<any> | FieldReadFunction<any>,
	authorFlairBackgroundColor?: FieldPolicy<any> | FieldReadFunction<any>,
	authorFlairCssClass?: FieldPolicy<any> | FieldReadFunction<any>,
	authorFlairTemplateId?: FieldPolicy<any> | FieldReadFunction<any>,
	authorFlairText?: FieldPolicy<any> | FieldReadFunction<any>,
	authorFlairTextColor?: FieldPolicy<any> | FieldReadFunction<any>,
	authorFlairType?: FieldPolicy<any> | FieldReadFunction<any>,
	authorFullname?: FieldPolicy<any> | FieldReadFunction<any>,
	authorPatreonFlair?: FieldPolicy<any> | FieldReadFunction<any>,
	authorPremium?: FieldPolicy<any> | FieldReadFunction<any>,
	canGild?: FieldPolicy<any> | FieldReadFunction<any>,
	canModPost?: FieldPolicy<any> | FieldReadFunction<any>,
	clicked?: FieldPolicy<any> | FieldReadFunction<any>,
	contestMode?: FieldPolicy<any> | FieldReadFunction<any>,
	created?: FieldPolicy<any> | FieldReadFunction<any>,
	createdUtc?: FieldPolicy<any> | FieldReadFunction<any>,
	domain?: FieldPolicy<any> | FieldReadFunction<any>,
	downs?: FieldPolicy<any> | FieldReadFunction<any>,
	edited?: FieldPolicy<any> | FieldReadFunction<any>,
	gilded?: FieldPolicy<any> | FieldReadFunction<any>,
	hidden?: FieldPolicy<any> | FieldReadFunction<any>,
	hideScore?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isCreatedFromAdsUi?: FieldPolicy<any> | FieldReadFunction<any>,
	isCrosspostable?: FieldPolicy<any> | FieldReadFunction<any>,
	isGallery?: FieldPolicy<any> | FieldReadFunction<any>,
	isMeta?: FieldPolicy<any> | FieldReadFunction<any>,
	isOriginalContent?: FieldPolicy<any> | FieldReadFunction<any>,
	isRedditMediaDomain?: FieldPolicy<any> | FieldReadFunction<any>,
	isRobotIndexable?: FieldPolicy<any> | FieldReadFunction<any>,
	isSelf?: FieldPolicy<any> | FieldReadFunction<any>,
	isVideo?: FieldPolicy<any> | FieldReadFunction<any>,
	linkFlairBackgroundColor?: FieldPolicy<any> | FieldReadFunction<any>,
	linkFlairCssClass?: FieldPolicy<any> | FieldReadFunction<any>,
	linkFlairTemplateId?: FieldPolicy<any> | FieldReadFunction<any>,
	linkFlairText?: FieldPolicy<any> | FieldReadFunction<any>,
	linkFlairTextColor?: FieldPolicy<any> | FieldReadFunction<any>,
	linkFlairType?: FieldPolicy<any> | FieldReadFunction<any>,
	locked?: FieldPolicy<any> | FieldReadFunction<any>,
	mediaOnly?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	noFollow?: FieldPolicy<any> | FieldReadFunction<any>,
	numComments?: FieldPolicy<any> | FieldReadFunction<any>,
	numCrossposts?: FieldPolicy<any> | FieldReadFunction<any>,
	over18?: FieldPolicy<any> | FieldReadFunction<any>,
	parentWhitelistStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	permalink?: FieldPolicy<any> | FieldReadFunction<any>,
	pinned?: FieldPolicy<any> | FieldReadFunction<any>,
	postHint?: FieldPolicy<any> | FieldReadFunction<any>,
	pwls?: FieldPolicy<any> | FieldReadFunction<any>,
	quarantine?: FieldPolicy<any> | FieldReadFunction<any>,
	saved?: FieldPolicy<any> | FieldReadFunction<any>,
	score?: FieldPolicy<any> | FieldReadFunction<any>,
	selftext?: FieldPolicy<any> | FieldReadFunction<any>,
	selftextHtml?: FieldPolicy<any> | FieldReadFunction<any>,
	sendReplies?: FieldPolicy<any> | FieldReadFunction<any>,
	spoiler?: FieldPolicy<any> | FieldReadFunction<any>,
	stickied?: FieldPolicy<any> | FieldReadFunction<any>,
	subreddit?: FieldPolicy<any> | FieldReadFunction<any>,
	subredditId?: FieldPolicy<any> | FieldReadFunction<any>,
	subredditNamePrefixed?: FieldPolicy<any> | FieldReadFunction<any>,
	subredditSubscribers?: FieldPolicy<any> | FieldReadFunction<any>,
	subredditType?: FieldPolicy<any> | FieldReadFunction<any>,
	suggestedSort?: FieldPolicy<any> | FieldReadFunction<any>,
	thumbnail?: FieldPolicy<any> | FieldReadFunction<any>,
	thumbnailHeight?: FieldPolicy<any> | FieldReadFunction<any>,
	thumbnailWidth?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	totalAwardsReceived?: FieldPolicy<any> | FieldReadFunction<any>,
	ups?: FieldPolicy<any> | FieldReadFunction<any>,
	upvoteRatio?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>,
	urlOverriddenByDest?: FieldPolicy<any> | FieldReadFunction<any>,
	visited?: FieldPolicy<any> | FieldReadFunction<any>,
	whitelistStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	wls?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LinkEdgeKeySpecifier = ('node' | 'cursor' | LinkEdgeKeySpecifier)[];
export type LinkEdgeFieldPolicy = {
	node?: FieldPolicy<any> | FieldReadFunction<any>,
	cursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LinksConnectionKeySpecifier = ('edges' | 'pageInfo' | LinksConnectionKeySpecifier)[];
export type LinksConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PageInfoKeySpecifier = ('hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	startCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	endCursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('links' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	links?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	Link?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LinkKeySpecifier | (() => undefined | LinkKeySpecifier),
		fields?: LinkFieldPolicy,
	},
	LinkEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LinkEdgeKeySpecifier | (() => undefined | LinkEdgeKeySpecifier),
		fields?: LinkEdgeFieldPolicy,
	},
	LinksConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LinksConnectionKeySpecifier | (() => undefined | LinksConnectionKeySpecifier),
		fields?: LinksConnectionFieldPolicy,
	},
	PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier),
		fields?: PageInfoFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	}
};