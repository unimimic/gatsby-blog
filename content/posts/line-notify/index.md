---
title:       "使用 python 快速製作LINE Notify"
description: "展示如何使用python製作推播通知"
date:         2022-12-29
tags:        ["教學", "python", "LINE", "快速", "Notify", "推播"]
categories:  ["技術筆記" ]
keywords:
- 教學
- Pythons
- LINE
- Notify
- 推播
- 快速
draft: false
---



## 註冊服務

步驟：

- 到LINE Notify的官方服務網站([https://notify-bot.line.me/zh_TW/](https://notify-bot.line.me/zh_TW/))。點選右上角的登入>點擊帳號旁下拉選單>管理登錄服務>登錄服務>填寫LINE Notify服務的各項資料>同意並前往下一步>登錄>點擊信箱連結啟用。

備註：

- 僅「服務網址」及「Callback URL」兩項需填上http://127.0.0.1，這是因為等等我們的Python會在本機上執行，資料填完再點擊「同意並前往下一步」。
- Email要填寫能夠正常收信的，沒收到認證信不能啟用服務。

## 發行權杖

步驟：

- 個人頁面>發行權杖>填寫權杖名稱>選擇要接收通知的聊天室>發行。

備註：

- 按下發行時會跳出Token，把這一整串Token保存起來。

## Python程式實作

```python
import requests

def LineNotify(token, msg, sticker=None, image=None):
    data = {
        "url":"https://notify-api.line.me/api/notify",
        "headers": {"Authorization": "Bearer " + token}
    }
    # msg
    data.update({
        "data": {
            "message": msg
        }
    })
    # sticker
    if sticker is not None:
        data.update({
            "params":{
                "stickerPackageId": sticker[0],
                "stickerId": sticker[1],
            }
        })
    # image
    if image is not None:
        data.update({
            "files":{
                "imageFile": image
            }
        })
    # post
    r = requests.post(**data)
    print(r)
    if r.status_code==requests.codes.ok:
        print('成功')
    else:
	    print(f'失敗: {r.status_code}')

if __name__ == "__main__":
    token = "" # 填入token
    msg = "test"
    LineNotify(token, msg='rser', sticker=(1,4),image=None)
    # with open("test.jpg","rb") as img:
    #     LineNotify(token, msg='rser', sticker=(1,4),image=img)
```