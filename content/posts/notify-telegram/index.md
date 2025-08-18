---

title:  "使用 python 快速製作 Telegram Notify"

description: "展示使用 python 快速製作 Telegram Notify"

date: 2023-07-15

draft: false

categories:

- 技術筆記

tags:

- 教學
- python
- Telegram
- 快速
- Notify
- 推播

keywords:

- 教學
- python
- Telegram
- 快速
- Notify
- 推播

---



## **註冊服務**

### 新增機器人

1. 在 Telegram App 中，打開與 BotFather 的聊天室。
2. 在BotFather聊天室輸入`/newbot`，輸入名稱 (可改)，輸入 username (不可改)。記下 token。

### 取得群組ChatID

1. 建立群組，並將你的Bot加入群組。
2. 前往網址 `https://api.telegram.org/bot<your bot token>/getUpdates`，會看到以下回傳結果。
    
    ```json
    {
      "ok":true,
      "result":[]
    }
    ```
    
3. 你的群組輸入 `****/my_id @<bot username**>` ****，再次前往網址 `https://api.telegram.org/bot<your bot token>/getUpdates`。會看到以下回傳結果，以下訊息有縮減其它資訊只要記住ChatID即可。
    
    ```json
    {
      "ok":true,
      "result":[
        {
          "message":{
            "chat":{
              "id": <ChatID>,
            }
          }
        }
      ]
    }
    ```
    

## **Python程式實作**

```python
import requests

def TelegramNotify(token, chatID, msg, image=None):
  # get
  url = f'https://api.telegram.org/bot{token}/sendMessage?chat_id={chatID}&text={msg}'
  r = requests.get(url)
  print(r)
  if r.status_code==requests.codes.ok:
    print('成功')
  else:
    print(f'失敗: {r.status_code}')

if __name__ == "__main__":
  token = "" # 填入token
  chatID = ""
  msg = "test"
  TelegramNotify(token ,chatID ,msg ,image=None)
  # with open("test.jpg","rb") as img:
  #     LineNotify(token, msg='rser', sticker=(1,4),image=img)
```