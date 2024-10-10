---
title:       "結合 Flask + vue 快速建立網頁服務"
description: ""
date:         2023-02-10
tags:        ["教學", "快速", "靜態網頁", "vue"]
categories:  ["技術筆記" ]
keywords:
- 教學
- 快速
- 靜態網頁
- vue
draft: false
---



## 專案結構

這邊展示使用python flask輕量網頁框架結合前端vue.js。

以下是專案的主架構，分為前後端。

```
.
├── backend
│   └── server.py
└── frontend
    └── vue app
```

## 建立前端

安裝`Vue CLI`

```bash
npm install -g @vue/cli
```

建立vue app

```bash
vue create frontend
```

新增vue設定檔

```jsx
// frontend/vue.config.js
module.exports = {
    assetsDir: "static" 
};
```

建置vue app

```bash
cd frontend
npm run build
```

## 新增後端程式

```python
# backend/server.py
from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__,
  static_folder = "../frontend/build/static",
  template_folder = "../frontend/build")
  
CORS(app)

@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
  app.run(host='localhost', port=3000)
```

最後執行`server.py` 會啟動由後端服務前端的程式。