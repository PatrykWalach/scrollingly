export enum Kind {
  Comment = "t1",
  Account = "t2",
  Link = "t3",
  Message = "t4",
  Subreddit = "t5",
  Award = "t6",
}

import * as t from "io-ts";

export const listing = <T extends t.Mixed>(type: T) =>
  t.type({
    kind: t.literal("Listing"),
    data: t.type({
      children: t.array(type),
      modhash: t.string,
      before: t.union([t.null, t.string]),
      after: t.union([t.null, t.string]),
    }),
  });

export interface Listing<T> {
  kind: "Listing";
  data: {
    children: T[];
    modhash: string;
    before: string | null;
    after: string | null;
  };
}

const img = t.type({
  height: t.number,
  width: t.number,
  url: t.string,
});

const image = t.type({
  resolutions: t.array(img),
  source: img,
});

export type Image = t.TypeOf<typeof image>;
export type Img = t.TypeOf<typeof img>;

const linkData = t.type({
  // crosspost_parent: t.union([t.undefined, t.string]),
  // thumbnail: t.string,
  url: t.string,
  permalink: t.string,
  subreddit: t.string,
  id: t.string,
  is_video: t.boolean,
  post_hint: t.union([t.string, t.undefined]),
  num_comments: t.number,
  media_metadata: t.union([
    t.undefined,
    t.record(
      t.string,
      t.type({
        e: t.string,
        id: t.string,
        m: t.string,
        p: t.array(
          t.type({
            u: t.string,
            x: t.number,
            y: t.number,
          })
        ),
        s: t.type({
          u: t.union([t.undefined, t.string]),
          gif: t.union([t.undefined, t.string]),
          mp4: t.union([t.undefined, t.string]),
          x: t.number,
          y: t.number,
        }),
        status: t.string,
      })
    ),
  ]),
  secure_media_embed: t.union([
    t.type({}),
    t.type({
      content: t.string,
      width: t.number,
      scrolling: t.boolean,
      media_domain_url: t.string,
      height: t.number,
    }),
  ]),
  secure_media: t.union([
    t.null,

    t.type({
      reddit_video: t.union([
        t.undefined,
        t.type({
          bitrate_kbps: t.number,
          dash_url: t.string,
          duration: t.number,
          fallback_url: t.string,
          height: t.number,
          hls_url: t.string,
          is_gif: t.boolean,
          scrubber_media_url: t.string,
          transcoding_status: t.string,
          width: t.number,
        }),
      ]),
    }),
  ]),
  preview: t.union([
    t.undefined,
    t.type({
      enabled: t.boolean,
      images: t.array(
        t.type({
          id: t.string,
          resolutions: t.array(img),
          source: img,
          variants: t.record(
            t.union([
              t.literal("mp4"),
              t.literal("gif"),
              t.literal("obfuscated"),
              t.literal("nsfw"),
            ]),
            t.union([t.undefined, image])
          ),
        })
      ),
    }),
  ]),
});

export const link = t.type({
  kind: t.literal(Kind.Link),
  data: linkData,
});

export type LinkData = t.TypeOf<typeof linkData>;
export type Link = t.TypeOf<typeof link>;

export interface SubredditData {
  user_flair_background_color: null;
  submit_text_html: string | null;
  restrict_posting: boolean | null;
  user_is_banned: null;
  free_form_reports: boolean | null;
  wiki_enabled: boolean | null;
  user_is_muted: null;
  user_can_flair_in_sr: null;
  display_name: string;
  header_img: string | null;
  title: string;
  allow_galleries: boolean | null;
  icon_size: number[] | null;
  primary_color: string | null;
  active_user_count: null;
  icon_img: string | null;
  display_name_prefixed: string;
  accounts_active: null;
  public_traffic: boolean | null;
  subscribers: number | null;
  user_flair_richtext: never[];
  videostream_links_count?: number | undefined;
  name: string;
  quarantine: boolean | null;
  hide_ads: boolean | null;
  prediction_leaderboard_entry_type: string;
  emojis_enabled: boolean;
  advertiser_category: string | null;
  public_description: string;
  comment_score_hide_mins: number | null;
  allow_predictions: boolean;
  user_has_favorited: null;
  user_flair_template_id: null;
  community_icon: string;
  banner_background_image: string;
  original_content_tag_enabled: boolean | null;
  community_reviewed: boolean | null;
  submit_text: string | null;
  description_html: string | null;
  spoilers_enabled: boolean | null;
  header_title: string | null;
  header_size: number[] | null;
  user_flair_position: string | null;
  all_original_content: boolean | null;
  has_menu_widget: boolean;
  is_enrolled_in_new_modmail: null;
  key_color: string | null;
  can_assign_user_flair: boolean;
  created: number;
  wls: number | null;
  show_media_preview: boolean | null;
  submission_type: string | null;
  user_is_subscriber: null;
  disable_contributor_requests: boolean | null;
  allow_videogifs: boolean;
  user_flair_type: string;
  allow_polls: boolean | null;
  collapse_deleted_comments: boolean | null;
  emojis_custom_size: number[] | null;
  public_description_html: string | null;
  allow_videos: boolean;
  is_crosspostable_subreddit: boolean;
  notification_level: null;
  can_assign_link_flair: boolean;
  accounts_active_is_fuzzed: boolean | null;
  submit_text_label: string | null;
  link_flair_position: string | null;
  user_sr_flair_enabled: null;
  user_flair_enabled_in_sr: boolean | null;
  allow_chat_post_creation?: boolean | undefined;
  allow_discovery: boolean | null;
  user_sr_theme_enabled: boolean | null;
  link_flair_enabled: boolean | null;
  subreddit_type: string;
  suggested_comment_sort: string | null;
  banner_img: string | null;
  user_flair_text: null;
  banner_background_color: string | null;
  show_media: boolean | null;
  id: string;
  user_is_moderator: null;
  over18: boolean | null;
  description: string | null;
  is_chat_post_feature_enabled?: boolean | undefined;
  submit_link_label: string | null;
  user_flair_text_color: null;
  restrict_commenting: boolean | null;
  user_flair_css_class: null;
  allow_images: boolean | null;
  lang: string | null;
  whitelist_status: string | null;
  url: string;
  created_utc: number;
  banner_size: number[] | null;
  mobile_banner_image: string | null;
  user_is_contributor: null;
  allow_predictions_tournament: boolean;
  content_category?: string | undefined;
}

export interface Subreddit {
  kind: Kind.Subreddit;
  data: SubredditData;
}

export interface Account {
  kind: Kind.Account;
  data: {
    id: string;
  };
}

export interface Comment {
  kind: Kind.Comment;
  data: {
    id: string;
    author: string;
    body_html: string;
    created_utc: number;
    ups: number;
    replies: string | Listing<Comment>;
  };
}

export const comment: t.Type<Comment, Comment> = t.recursion(
  "comment",
  (self) =>
    t.type({
      kind: t.literal(Kind.Comment),
      data: t.type({
        id: t.string,
        body_html: t.string,
        author: t.string,
        created_utc: t.number,
        ups: t.number,
        replies: t.union([t.string, listing(self)]),
      }),
    })
);
