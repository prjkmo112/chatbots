export type Filetypes = "auto"|"text"|"ai"|"apk"|"applescript"|"binary"|"bmp"|"boxnote"|"csharp"|"cpp"|"css"|"csv"|"clojure"|"coffeescript"|"cfm"|"dart"|"diff"|"doc"|"docx"|"dockerfile"|"dotx"|"email"|"eps"|"epub"|"erlang"|"fla"|"flv"|"fsharp"|"fortran"|"gdoc"|"gdraw"|"gif"|"go"|"gpres"|"groovy"|"gsheet"|"gzip"|"html"|"handlebars"|"haskell"|"haxe"|"indd"|"java"|"javascript"|"jpg"|"json"|"keynote"|"kotlin"|"latex"|"lisp"|"lua"|"m4a"|"markdown"|"matlab"|"mhtml"|"mkv"|"mov"|"mp3"|"mp4"|"mp4"|"mpg"|"mumps"|"numbers"|"nzb"|"objc"|"ocaml"|"odg"|"odi"|"odp"|"ods"|"odt"|"ogg"|"ogv"|"pages"|"pascal"|"pdf"|"perl"|"php"|"pig"|"png"|"post"|"powershell"|"ppt"|"pptx"|"psd"|"puppet"|"python"|"qtz"|"rtf"|"ruby"|"rust"|"sql"|"sass"|"scala"|"scheme"|"sketch"|"shell"|"smalltalk"|"svg"|"swf"|"swift"|"tar"|"tiff"|"tsv"|"vb"|"vbscript"|"vcard"|"vCard"|"velocity"|"verilog"|"wav"|"webm"|"wmv"|"xls"|"xlsx"|"xlsb"|"xlsm"|"xltx"|"xml"|"yaml"|"zip";

export interface MainSubError {
    response: undefined | {
        data: undefined | {
            errCode?: undefined|string;
        }
    };
}

export type MainError = undefined | MainSubError;

export interface CmdWorks {
    command: string;
    type: ""|"help"|"log"|"hi"|"gather"|"alert";
    params: {
        siteCode?:  string;
        all?:       "all";
        line?:      number;
        date?:      string;
        type?:      "gather"|"order"|"all"|"item"|"list";
        dest?:      "all"|"list"|"manual"|"item";
        code?:      string|string[];
        force?:     boolean;
        imgdel?:    boolean;
        optiondel?: boolean;
    }
}

export interface Proclist {
    [key:number]: {
        state: "ready"|"process"|"done"|"fail";
        info_total: number;
        cur_idx: number;
        process_idx: number;
    }
}