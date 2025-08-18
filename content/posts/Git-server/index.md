---
title:  "淺談 GitLab 與 Gitea"
description: "淺談 GitLab 與 Gitea"
date: 2023-03-15
draft: false
categories:
- 技術筆記
tags:
- Git server
- Gitea
- GitLab
keywords:
- Git server
- Gitea
- GitLab
---



## GitLab與Gitea

- 兩者皆是可自行託管的 Git 服務。它們之間存在一些差異，下面是一些主要的區別，可視團隊使用人數以及使用功能選擇看要用哪一種服務。
    1. 功能和可定制性：GitLab擁有較多的功能和選項，如CI/CD、自動測試等。Gitea則較為輕量，更適合小型團隊或個人使用，且具有高度的可定制性和自定義配置。
    2. 部署和運維：GitLab (約2.8G)需要較多的系統資源和配置才能正常運行。Gitea (約256MB)則可以較為輕鬆地安裝和運行，甚至可以運行在嵌入式設備上。

## 快速架設GitLab (Docker)

GitLab 分為 GitLab CE（社群版）和 GitLab EE（企業版）。

參考網址：[https://docs.gitlab.com/ee/install/docker.html](https://docs.gitlab.com/ee/install/docker.html)

1. 抓取image
    
    ```docker
    docker pull gitlab/gitlab-ce
    ```
    
2. 撰寫`docker-compose.yml`。(參考官網寫法，沒有在windows上測試過)
    
    ```docker
    version: '3.6'
    services:
      web:
        image: 'gitlab/gitlab-ce:latest'
        restart: always
        hostname: 'localhost'
        environment:
          GITLAB_OMNIBUS_CONFIG: |
            external_url 'https://localhost'
            # Add any other gitlab.rb configuration here, each on its own line
        ports:
          - '8080:80'
          - '443:443'
          - '22:22'
        volumes:
          - '$GITLAB_HOME/config:/etc/gitlab'
          - '$GITLAB_HOME/logs:/var/log/gitlab'
          - '$GITLAB_HOME/data:/var/opt/gitlab'
        shm_size: '256m'
    ```
    
3. 執行 `docker-compose up -d`，到`/etc/gitlab/initial_root_password`尋找初始密碼(帳號是root)。

## 快速架設Gitea (Docker)

參考網址：[https://docs.gitea.io/en-us/install-with-docker/#mysql-database](https://docs.gitea.io/en-us/install-with-docker/#mysql-database)

1. 抓取image
    
    ```docker
    docker pull gitea/gitea
    ```
    
2. 撰寫`docker-compose.yml`
    
    ```docker
    version: "3"
    
    networks:
      gitea:
        external: false
    
    services:
      server:
        image: gitea/gitea:latest
        container_name: gitea
        environment:
          - USER_UID=1000
          - USER_GID=1000
        restart: always
        networks:
          - gitea
        volumes:
          - ./gitea:/data
          - /etc/timezone:/etc/timezone:ro
          - /etc/localtime:/etc/localtime:ro
        ports:
          - "8080:3000"
          - "2221:22"
    ```
    
3. 執行 `docker-compose up -d`，接著到 `http://localhost:8080/`，會跳轉到初始設定頁面，設定完成就可以開始使用gitea。