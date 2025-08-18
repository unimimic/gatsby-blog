---
title:       "結合react + electron 快速建立桌面應用程式"
description: ""
date:         2023-02-10
tags:        ["教學", "快速", "electron", "react"]
categories:  ["技術筆記" ]
keywords:
- 教學
- 快速
- electron
- react
draft: false
---


## 創建react app

```bash
npx create-react-app electron-app
```

## 安裝套件

```bash
cd electron-app
yarn add --dev  electron electron-builder
yarn add concurrently wait-on cross-env
```

## 設定 `package.json`

```json
{
  "main": "public/main.js",
  "homepage": "./",
  "scripts": {
    "electron:serve": "concurrently -k \"cross-env BROWSER=none yarn start\" \"yarn electron:start\"",
    "electron:build": "yarn build && electron-builder -c.extraMetadata.main=build/main.js",
    "electron:start": "wait-on tcp:3000 && electron ."
	}
}
```

## 新增 `public/main.js`

```jsx
// public/main.js
const { app, BrowserWindow } = require('electron')

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true
    }
  })

  win.loadURL('http://localhost:3000')
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
```

## 開啟服務

```bash
yarn electron:serve
```