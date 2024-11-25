import { MrkdwnElement, PlainTextElement, SlackBlockInfo } from "./slack";

interface SelectedOptionValue {
    description: PlainTextElement|MrkdwnElement;
    text:        PlainTextElement|MrkdwnElement;
    value:       string;
}

interface Action {
    action_id:        string;
    block_id:         string;
    text:             Text;
    value?:           string;
    selected_option?: SelectedOptionValue;
    style:            string;
    type:             string;
    action_ts:        string;
}

interface Text {
    type:      string;
    text:      string;
    emoji?:    boolean;
    verbatim?: boolean;
}

interface Channel {
    id:   string;
    name: string;
}

interface Container {
    type:         string;
    message_ts:   string;
    channel_id:   string;
    is_ephemeral: boolean;
}

interface Message {
    bot_id: string;
    type:   string;
    text:   string;
    user:   string;
    ts:     string;
    app_id: string;
    blocks: SlackBlockInfo[];
    team:   string;
}

interface State {
    values: Values;
}

interface Values {
}

interface Team {
    id:     string;
    domain: string;
}

interface User {
    id:       string;
    username: string;
    name:     string;
    team_id:  string;
}

export interface SlackActivePayload {
    type:                  string;
    user:                  User;
    api_app_id:            string;
    token:                 string;
    container:             Container;
    trigger_id:            string;
    team:                  Team;
    enterprise:            null;
    is_enterprise_install: boolean;
    channel:               Channel;
    message:               Message;
    state:                 State;
    response_url:          string;
    actions:               Action[];
}