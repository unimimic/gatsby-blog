---
title:       "使用 Hugo 建立免費部落格"
description: "展示如何使用Hugo建立免費部落格"
date:         2022-09-14
tags:        ["教學", "Hugo", "部落格"]
categories:  ["技術筆記" ]
keywords:
- 教學
- Hugo
- 部落格
- 免費
draft: false
---



## ****Hosting on Local****

 安裝 Hugo

```bash
brew install hugo
```

啟動新專案

```bash
hugo new site quickstart
```

添加主題

```bash
cd quickstart
git init
git submodule add https://github.com/dillonzq/LoveIt.git themes/LoveIt
```

設定主題

```bash
echo theme = \"LoveIt\" >> config.toml
```

新增貼文

```bash
hugo new posts/my-first-post.md
```

啟動 Hugo 服務器

```bash
hugo -D
hugo server -D
```

## ****Hosting on GitHub Pages****

---

### 手動**部署 Hugo**

目標：把建構出來的檔案push到`<your-account>.github.io` 儲存庫。

1. 在github建立你的 `<your-account>.github.io`儲存庫。
2. 透過git push public底下檔案到`<your-account>.github.io` 儲存庫。
    
    ```bash
    hugo
    cd public
    git remote add origin https://github.com/<your-account>/<your-account>.github.io
    git add .
    git commit -m "push public"
    git push -u origin master
    ```
    

---

### **自動化部署 Hugo**

目標：更新repo → 產生靜態網站 → 將`./public` 資料夾內的檔案移到GitHub Page repo。

1. 建立repo
    1. 在github建立你的 `<your-account>.github.io`儲存庫。
    2. 在github建立你的專案儲存庫。
2. 產生ssh key 。在命令列輸入`$ ssh-keygen`，照著指示做之後會生成一組 public-private key。Private key 是沒有副檔名的，public key 則有附檔名 `.pub`。
3. 設置key
    1. 專案repo要放 private key。
    2. GitHub Page repo 要設定 deploy key。
4. 設置action
    
    ```yaml
    
    name: github pages
    
    on:
      push:
        branches:
          - master  # Set a branch to deploy
    
    jobs:
      deploy:
        runs-on: ubuntu-latest
        
        steps:
          - uses: actions/checkout@v2
            with:
              submodules: true  # Fetch Hugo themes (true OR recursive)
    
          - name: Setup Hugo # 安裝Hugo
            uses: peaceiris/actions-hugo@v2
            with:
              hugo-version: 'latest'
    
          - name: Build # 產生靜態網站
            run: hugo -D
    
          - name: Deploy # 幫你把某個資料夾下的檔案推到特定分支，也支援推到別的 GitHub repo，完全符合我的需求，只是需要另外在外部 repo 設定 deploy key 讓 action 可以把檔案推過去
            uses: peaceiris/actions-gh-pages@v3
            with:
              external_repository: unimimic/unimimic.github.io
              deploy_key: ${{ secrets.ACTIONS_DEPLOY_KEY }}
              publish_dir: ./public
              publish_branch: master
    ```