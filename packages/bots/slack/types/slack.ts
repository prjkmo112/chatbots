import { 
    Block, KnownBlock, PlainTextElement, MrkdwnElement,
    MessageAttachment as SlackMessage,
    Button as SlackBlockKitType_ActionsButton,
    Option as SlackBlockKitType_Option, PlainTextOption as SlackBlockKitType_PlainTextOption
} from '@slack/web-api';


export { Block, KnownBlock, PlainTextElement, MrkdwnElement, SlackMessage, SlackBlockKitType_ActionsButton, SlackBlockKitType_Option, SlackBlockKitType_PlainTextOption };
export type SlackBlockInfo = (KnownBlock | Block);
export { SlackActivePayload } from './slack_active_payload';

interface SettedBlockKitSelect {
    text:       string;
    color?:     "primary"|"danger";
    url?:       string;
    value?:     string;
    action_id?: string;
}

interface SettedBlockKitOptInfo {
    text:           string;
    emoji?:         boolean;
    value?:         string;
    description?:   string;
    url?:           string;
}

interface SettedBlockKitOption {
    textType:    "plain_text"|"mrkdwn";
    text:        string;
    placeholder: string;
    emoji?:      boolean;
    info:        SettedBlockKitOptInfo[];
    action_id?:  string;
}

interface __SettedBlockKit {
    header?:            string;
    textType?:          "plain_text"|"mrkdwn";
    text:               string;
    placeholder?:       string;
    header_context?:    string;
}

export type SettedBlockKit = (
    {
        type: "alert";
    } |
    {
        type: "simple_select"|"option_select";
        select?:            SettedBlockKitSelect[];
        options?:           SettedBlockKitOption[];
    }
) & __SettedBlockKit;

export interface ChatActivePayload {
    type:       string;
}

interface PayloadActValueGather {
    type?:          "gather_site";
    gather_type?:   "all"|"list"|"item";
    siteCode?:      string;
    code?:          string|string[];
    value?:         string;
    imgdel?:        boolean;
    optiondel?:     boolean;
}

export type PayloadActValue = PayloadActValueGather;