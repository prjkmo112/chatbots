export interface MM_API_POSTS {
    id:              string;
    create_at:       number;
    update_at:       number;
    delete_at:       number;
    edit_at:         number;
    user_id:         string;
    channel_id:      string;
    root_id:         string;
    original_id:     string;
    message:         string;
    type:            string;
    props:           Props;
    hashtag:         string;
    file_ids:        string[];
    pending_post_id: string;
    metadata:        Metadata;
}

interface Metadata {
    embeds:           Embed[];
    emojis:           Emoji[];
    files:            File[];
    images:           Props;
    reactions:        Reaction[];
    priority:         Priority;
    acknowledgements: Acknowledgement[];
}

interface Acknowledgement {
    user_id:         string;
    post_id:         string;
    acknowledged_at: number;
}

interface Embed {
    type: string;
    url:  string;
    data: Props;
}

interface Props {
}

interface Emoji {
    id:         string;
    creator_id: string;
    name:       string;
    create_at:  number;
    update_at:  number;
    delete_at:  number;
}

interface File {
    id:                string;
    user_id:           string;
    post_id:           string;
    create_at:         number;
    update_at:         number;
    delete_at:         number;
    name:              string;
    extension:         string;
    size:              number;
    mime_type:         string;
    width:             number;
    height:            number;
    has_preview_image: boolean;
}

interface Priority {
    priority:      string;
    requested_ack: boolean;
}

interface Reaction {
    user_id:    string;
    post_id:    string;
    emoji_name: string;
    create_at:  number;
}
