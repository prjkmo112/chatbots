import { WebClient, ChatPostMessageResponse, ChatUpdateResponse } from '@slack/web-api';
import axios, { AxiosResponse } from 'axios';
import deasync from 'deasync';
import FormData from 'form-data';
import { Filetypes } from './types/main';
import { SlackBlockInfo, SettedBlockKit, SlackBlockKitType_ActionsButton } from './types/slack';


type CommonMessageTypes = "very_important"|"important"|"normal";

export class chatSlack {
    private bot_token: string;
    private slack_channel: string;
    private slackBot: WebClient;
    
    constructor(bot_token:string, slack_channel:string) {
        this.bot_token = bot_token;
        this.slack_channel = slack_channel;
        this.slackBot = new WebClient(this.bot_token);
    }

    sendChat(text:string):Promise<ChatPostMessageResponse> {
        return this.slackBot.chat.postMessage({
            text: text,
            channel: this.slack_channel
        })
    }

    sendChatSync(text:string):void {
        let done:boolean = false;
        this.slackBot.chat.postMessage({
            text: text,
            channel: this.slack_channel
        }).then((res) => {
            done = true;
        }).catch((err) => {
            done = true;
        })
        deasync.loopWhile(() => !done);
    }

    sendFileContent(filetype:Filetypes, fileName:string, content:any):Promise<AxiosResponse> {
        let formdata = new FormData();
        formdata.append('token', process.env.SLACK_BOT_TOKEN);
        formdata.append('filename', fileName);
        formdata.append('filetype', filetype);
        formdata.append('channels', process.env.SLACK_CHANNEL);
        formdata.append('content', content);

        return axios.post('https://slack.com/api/files.upload', formdata)
    }

    sendFileContentSync(filetype:Filetypes, fileName:string, content:any):void {
        let formdata = new FormData();
        formdata.append('token', process.env.SLACK_BOT_TOKEN);
        formdata.append('filename', fileName);
        formdata.append('filetype', filetype);
        formdata.append('channels', process.env.SLACK_CHANNEL);
        formdata.append('content', content);

        let done:boolean = false;
        axios.post('https://slack.com/api/files.upload', formdata).then((res) => {
            done = true;
        }).catch((err) => {
            done = true;
        })
        deasync.loopWhile(() => !done);
    }

    setBlockKit(setted_block_info:SettedBlockKit, msgType?:CommonMessageTypes):SlackBlockInfo[] {
        let slack_blocks:SlackBlockInfo[] = [];
        
        switch (msgType) {
            case "very_important":
                slack_blocks.push({
                    type: 'section',
                    text: {
                        type: "mrkdwn",
                        text: ":red_circle: *매우 중요한 봇 쓰레드입니다. 반드시 확인부탁드립니다* :red_circle:\n\n",
                    }
                })
                break;
            case "important":
                slack_blocks.push({
                    type: 'section',
                    text: {
                        type: "mrkdwn",
                        text: ":blue_circle: *중요한 봇 쓰레드입니다. 확인부탁드립니다* :blue_circle:\n\n",
                    }
                })
                break;
            case "normal":
                slack_blocks.push({
                    type: 'section',
                    text: {
                        type: "mrkdwn",
                        text: ":white_circle: *일반 봇 쓰레드입니다* :white_circle:\n\n",
                    }
                })
                break;
        }

        if (!!setted_block_info.header) {
            slack_blocks.push({
                type: 'header',
                text: {
                    type: "plain_text",
                    text: setted_block_info.header
                }
            })
        }

        if (!!setted_block_info.header_context) {
            slack_blocks.push({
                type: 'context',
                elements: [
                    {
                        type: 'mrkdwn',
                        text: setted_block_info.header_context
                    }
                ]
            })
        }

        switch(setted_block_info.type) {
            case "simple_select":
            case "option_select":
                // 대충 images_for_dev/simple_select.png 느낌
                slack_blocks = slack_blocks.concat([
                    {
                        type: 'section',
                        text: {
                            type: setted_block_info.textType || "plain_text",
                            text: setted_block_info.text
                        }
                    },
                    { type: 'divider' },
                    { type: "section", text: { type: "plain_text", text: "\n\n" } },
                    { type: 'divider' },
                    { type: "section", text: { type: "plain_text", text: "\n\n\n\n" } },
                ])

                if (setted_block_info.type === "option_select" && setted_block_info.options) {
                    for (const opt_item of setted_block_info.options) {
                        slack_blocks.push({
                            type: "section",
                            text: {
                                type: opt_item.textType,
                                text: opt_item.text,
                                emoji: opt_item.emoji
                            },
                            accessory: {
                                type: "static_select",
                                placeholder: {
                                    type: "plain_text",
                                    text: opt_item.placeholder,
                                    emoji: true
                                },
                                action_id: opt_item.action_id,
                                options: opt_item.info.map((opt_item_v) => ({
                                    text: {
                                        type: "plain_text",
                                        text: opt_item_v.text || "",
                                        emoji: opt_item_v.emoji
                                    },
                                    value: opt_item_v.value || "",
                                    ...(opt_item_v.description ? {
                                        description: {
                                            type: "plain_text",
                                            text: opt_item_v.description,
                                            emoji: true
                                        }
                                    } : {}),
                                    url: opt_item_v.url
                                }))
                            }
                        })
                    }
                }

                if ((setted_block_info.type === "simple_select" || setted_block_info.type === "option_select") && setted_block_info.select) {
                    let btn_action_elements:SlackBlockKitType_ActionsButton[] = [];
                    for (let i in setted_block_info.select) {
                        btn_action_elements.push({
                            type: "button",
                            action_id: setted_block_info.select[i].action_id,
                            text: {
                                type: "plain_text",
                                emoji: true,
                                text: setted_block_info.select[i].text
                            },
                            value: setted_block_info.select[i].value,
                            style: setted_block_info.select[i].color
                        });
                    }
    
                    slack_blocks.push({
                        type: "actions",
                        elements: btn_action_elements
                    });
                }
                break;
            case "alert":
                slack_blocks = slack_blocks.concat([
                    {
                        type: 'section',
                        text: {
                            type: setted_block_info.textType || "plain_text",
                            text: setted_block_info.text
                        }
                    }
                ])
                break;
        }

        return slack_blocks;
    }

    sendChatForBlockKit(blockInfos:SlackBlockInfo[]):Promise<ChatPostMessageResponse> {
        return this.slackBot.chat.postMessage({
            blocks: blockInfos,
            channel: this.slack_channel
        })
    }

    updateChat(message_ts:string, blockInfos:SlackBlockInfo[]):Promise<ChatUpdateResponse> {
        return this.slackBot.chat.update({
            token: this.bot_token,
            channel: this.slack_channel,
            ts: message_ts,
            blocks: blockInfos
        })
    }
}
