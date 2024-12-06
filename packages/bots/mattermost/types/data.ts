export interface post_message_data {
    channel_id: string;
    message: string;
    files?: string[];
}

export interface SendMessageOptions {
    msg: string;
}