import axios, { AxiosResponse } from "axios";
import deasync from "deasync";
import { post_message_data, SendMessageOptions } from "./types/data";
import { MM_API_POSTS } from "./types/api-response/posts";

export { post_message_data, SendMessageOptions, MM_API_POSTS };

export class chatmm {
    private server_url: string;
    private bot_token: string;
    private channelid: string;

    constructor(url:string, token:string, channelid:string) {
        this.server_url = url;
        this.bot_token = token;
        this.channelid = channelid;
    }
    
    public get url() : string {
        return this.server_url;
    }
    
    public get VAL_token() : string {
        return this.bot_token;
    }

    public set VAL_token(v : string) {
        this.bot_token = v;
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
}