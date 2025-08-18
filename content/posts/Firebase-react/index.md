---
title:  "使用 React 和 Firebase Hosting 快速架設靜態網站"
description: "展示如何使用Firebase Hosting "
date: 2023-03-01
draft: false
categories:
- 技術筆記
tags:
- 教學
- 快速
- Firebase
- Vite
- React
keywords:
- 教學
- 快速
- Firebase
- Vite
- React
---


## 說明

Firebase是Google提供的一個用於開發Web和行動應用程序的後端平台，它為開發人員提供了一個全面的解決方案，用於構建高質量的應用程序。Firebase包含了各種工具和服務，例如：數據庫、身份驗證、存儲、推送通知、分析、測試和性能監測等。Firebase使得開發人員能夠快速開發，測試和發佈應用程序，並且能夠與Google Cloud和其他第三方服務輕鬆集成。

## 實作

### 建立 Firebase 專案

[點擊此連結](https://console.firebase.google.com/)，到Firebase網站建立專案，名稱自己設定。

### 建立React專案

1. 使用 vite 建置 react 專案
    
    ```bash
    npm create vite@latest
    cd <project name>
    npm install
    npm run build
    ```
    
2. 全域環境中安裝Firebase CLI 工具
    
    ```bash
    npm install -g firebase-tools
    ```
    
3. 連結至Firebase
    
    ```bash
    firebase login
    ```
    
4. 初始化firebase專案 
    
    選擇`Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys`
    
    ```bash
    firebase init
    ```
    
5. 部署至Firebase
    
    注意要更改輸出目錄。`? What do you want to use as your public directory? dist`
    
    ```bash
    firebase deploy
    ```