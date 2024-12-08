import axios, { AxiosResponse } from "axios";
import * as deasync from "deasync";
import WebSocket from "ws";
import { InitWebSocketOptions, post_message_data, SendMessageOptions } from "./types/data";
import { MM_API_POSTS } from "./types/api-response/posts";

export { post_message_data, SendMessageOptions, MM_API_POSTS };

export class chatmm {
    private server_url: string;
    private bot_token: string;
    private channelid: string;
    private ws: null|WebSocket;

    constructor(url:string, token:string, channelid:string) {
        this.server_url = url;
        this.bot_token = token;
        this.channelid = channelid;
    }
    
    public get url() : string {
        return this.server_url;
    }
    
    public get VAL_channel_id(): string {
        return this.channelid;
    }
    
    public set VAL_channel_id(v : string) {
        this.channelid = v;
    }
    
    send(options:SendMessageOptions):Promise<AxiosResponse<MM_API_POSTS, any>> {
        let data:post_message_data = {
            channel_id: this.channelid,
            message: options.msg
        }

        return axios.post(`${this.url}/api/v4/posts`, data, {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${this.bot_token}`,
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
    }

    sendSync(options:SendMessageOptions) {
        let data;

        let done = false;
        this.send(options).then((res) => {
            if ((res.status == 200 || res.status == 201) && !!res.data.id && res.data.create_at > 0)
                data = res.data;
            done = true;
        }).catch(() => {
            done = true;
        })
        deasync.loopWhile(() => !done);

        return data;
    }

    get(url:string) {
        return axios.get(`${this.url}${url}`, {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${this.bot_token}`,
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
    }

    post(url:string, data:any) {
        return axios.post(`${this.url}${url}`, data, {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${this.bot_token}`,
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
    }

    initWebSocket(options:InitWebSocketOptions) {
        const ws_url = `ws://${new URL(this.server_url).host}/api/v4/websocket`;
        this.ws = new WebSocket(ws_url);

        if (!!options.messageHandler === false) {
            options.messageHandler = async (post) => {
                const message = post.message.toLowerCase();
                this.channelid = post.channel_id;

                if (message.includes('hello')) {
                    await this.send({ msg: 'hello!' });
                }
            }
        }

        this.ws.on('open', () => {
            console.log('WebSocket connection established');
            // Authentication
            this.ws.send(JSON.stringify({
                seq: 1,
                action: 'authentication_challenge',
                data: { token: this.bot_token }
            }));
        })

        this.ws.on('message', async (data:string) => {
            const event = JSON.parse(data);

            // Handle different event types
            if (event.event === 'posted') {
                const post = JSON.parse(event.data.post);
                
                // Ignore bot's own messages
                if (post.user_id !== options.botId) {
                    await options.messageHandler(post);
                }
            }
        })

        this.ws.on('error', (error) => {
            if (!!options.fnErr)
                options.fnErr(error);
            else 
                console.error('WebSocket error:', error);
        })

        this.ws.on('close', () => {
            if (!!options.fnClose)
                options.fnClose();
            else
                console.log('WebSocket connection closed');
        })
    }

    closeWebSocket() {
        this.ws.close();
    }
}