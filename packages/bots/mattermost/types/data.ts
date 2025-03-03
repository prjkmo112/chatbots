export interface post_message_data {
    channel_id: string;
    message: string;
    files?: string[];
}

export interface SendMessageOptions {
    msg: string;
}

export interface UpdateMessageOptions {
    post_id: string;
    msg: string;
    is_pinned?: boolean;
}

export interface InitWebSocketOptions {
    botId?: string;
    messageHandler?: (post:any) => Promise<void>;
    fnErr?: (error:Error) => void;
    fnClose?: () => void;
}