export interface post_message_data {
    channel_id: string;
    message: string;
    files?: string[];
}

export interface SendMessageOptions {
    msg: string;
}

export interface InitWebSocketOptions {
    botId?: string;
    messageHandler?: (post:any) => Promise<void>;
    fnErr?: (error:Error) => void;
    fnClose?: () => void;
}