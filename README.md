# 챗봇 모음
Line Notify 서비스 종료에 따른 대처

## 설치 방법

```bash
npm install @chat-bots/chatbot
```

모듈의 크기를 줄이려면 아래의 예시처럼 사용할 봇만 선택해 사용할 모듈만 설치하면 됩니다.
```bash
npm install @chat-bots/slack
```

## Bot
### 지원 봇
- slack

### Slack Bot 라이브러리
Block Kit을 지원하고 다양한 파일 포맷을 처리할 수 있습니다.

#### 주요 기능

- 💬 동기/비동기 메시지 전송 지원
- 📁 다양한 형식의 파일 업로드 지원
- 🎨 인터랙티브 메시지를 위한 Block Kit 빌더
- 🔄 메시지 업데이트 기능
- 📝 TypeScript를 통한 타입 안전성 보장

#### 설치 방법

```bash
npm install @chat-bots/slack
```

파라미터 설정:
- SLACK_BOT_TOKEN: xoxb-your-bot-token
- SLACK_CHANNEL: your-channel-id

#### 사용 방법

##### 기본 설정

```typescript
import chatSlack from '@chat-bots/slack';

const bot = new chatSlack("(SLACK_BOT_TOKEN)", "(SLACK_CHANNEL)");

bot.sendChat("hi");
```

##### 메시지 전송

기본 메시지 전송:
```typescript
// 비동기 방식
await bot.sendChat("안녕하세요!");

// 동기 방식
bot.sendChatSync("안녕하세요!");
```

##### 파일 업로드

```typescript
// 비동기 파일 업로드
await bot.sendFileContent('text', 'example.txt', '텍스트 파일 내용입니다.');

// 동기 파일 업로드
bot.sendFileContentSync('json', 'data.json', JSON.stringify({ key: 'value' }));
```

##### Block Kit 사용하기

인터랙티브 메시지 생성:

```typescript
const blockKit = bot.setBlockKit({
    type: "simple_select",
    header: "선택해주세요",
    text: "아래 옵션 중 하나를 선택해주세요:",
    select: [{
        text: "승인",
        action_id: "ok",
        color: "primary"
    }, {
        text: "거절",
        action_id: "no",
        color: "danger"
    }]
}, "important");

await bot.sendChatForBlockKit(blockKit);
```

### 메시지 중요도 타입

메시지 중요도를 3단계로 구분할 수 있습니다:
- `very_important`: 빨간색 원 이모지로 표시 (매우 중요)
- `important`: 파란색 원 이모지로 표시 (중요)
- `normal`: 흰색 원 이모지로 표시 (일반)

### Block Kit 타입

1. Simple Select (단순 선택)
   - 기본적인 버튼 선택 인터페이스
   ```typescript
   const simpleSelect = bot.setBlockKit({
       type: "simple_select",
       header: "간단한 선택",
       text: "선택해주세요:",
       select: [{
           text: "옵션 1",
           action_id: "selectOption"
       }]
   });
   ```

2. Option Select (옵션 선택)
   - 드롭다운 메뉴가 포함된 고급 선택
   ```typescript
   const optionSelect = bot.setBlockKit({
       type: "option_select",
       header: "상세 선택",
       text: "드롭다운에서 선택:",
       options: [{
           textType: "plain_text",
           text: "옵션을 선택하세요",
           placeholder: "선택...",
           action_id: "selectOption",
           info: [{
               text: "옵션 1",
               value: "opt1",
               description: "첫 번째 옵션"
           }]
       }]
   });
   ```

3. Alert (알림)
   - 단순 알림 메시지
   ```typescript
    const alert = bot.setBlockKit({
        type: "alert",
        header: "알림",
        text: "중요한 알림입니다!"
    });
   ```

### 메시지 업데이트

```typescript
// 기존 메시지 업데이트
const messageTs = "1234567890.123456"; // 메시지 타임스탬프
await bot.updateChat(messageTs, newBlockKit);
```

## 지원하는 파일 형식

다음과 같은 다양한 파일 형식을 지원합니다:
- 텍스트 형식: `text`, `markdown`, `csv`, `json`, `html`
- 이미지 형식: `png`, `jpg`, `gif`, `svg`
- 문서 형식: `pdf`, `doc`, `docx`, `xls`, `xlsx`
- 코드 형식: `javascript`, `typescript`, `python`, `java` 등

전체 지원 형식은 `Filetypes` 타입 정의를 참고해주세요.

## 타입 정의

라이브러리는 다음 항목들에 대한 TypeScript 정의를 포함합니다:
- Block Kit 컴포넌트
- 메시지 페이로드
- 액션 핸들러
- 파일 타입

## 에러 처리

```typescript
try {
    await bot.sendChat("안녕하세요");
} catch (error) {
    // 에러 처리
    // 에러 타입은 MainError 인터페이스에 정의되어 있습니다
}
```