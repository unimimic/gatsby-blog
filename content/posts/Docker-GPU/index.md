---

title:  "實作在 Docker 環境中使用 GPU"

description: "展示如何在 Docker 環境中使用 GPU"

date: 2023-10-15

draft: false

categories:

- 技術筆記

tags:

- 教學
- GPU
- Docker

keywords:

- 教學
- GPU
- Docker

---


- 在 ubuntu 環境進行測試
- 以下主要有三大部分，有安裝Docker、安裝Nvidia Driver、安裝NVIDIA Container Toolkit。其中NVIDIA Container Toolkit 有兩種方法，挑其中一種進行安裝即可。

## 安裝Docker

> 如有需要更詳細的安裝，可[參考官方教學](https://docs.docker.com/engine/install/ubuntu/)。
> 
1. 移除舊版Docker (可選)
    
    ```bash
    sudo apt-get remove docker docker-engine docker.io containerd runc
    ```
    
2. 更新apt安裝包以及所需的相關套件
    
    ```bash
    sudo apt-get update
    
    sudo apt-get install \
        ca-certificates \
        curl \
        gnupg \
        lsb-release
    ```
    
3. 加入docker的官方GPG Key
    
    ```bash
    sudo mkdir -m 0755 -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    ```
    
4. 設置repository
    
    ```bash
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```
    
5. 更新apt安裝包
    
    ```bash
    sudo apt-get update
    ```
    
6. 安裝docker
    
    ```bash
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```
    
7. 確認是否安裝成功
    
    ```bash
    sudo docker run hello-world
    ```
    

## 安裝Nvidia Driver

1. 移除舊的Nvidia Driver
    
    ```bash
    sudo apt-get purge nvidia*
    sudo apt-get autoremove
    sudo apt-get autoclean
    sudo rm -rf /usr/local/cuda*
    ```
    
2. 查詢安裝版本，[點此連結到官網查詢](https://www.nvidia.com.tw/Download/index.aspx?lang=tw)。
3. 安裝Nvidia Driver
    
    ```bash
    sudo apt update
    sudo apt install nvidia-utils-<版號前三碼>
    sudo apt install nvidia-driver-<版號前三碼>
    ```
    
4. 重啟電腦
    
    ```bash
    sudo reboot
    ```
    
5. 確認安裝成功
    
    ```bash
    nvidia-smi
    ```
    

## 安裝NVIDIA Container Toolkit

> 如有需要更詳細的安裝，可[參考官方教學](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html)。
> 
1. 設定repo以及GPG key
    
    ```bash
    distribution=$(. /etc/os-release;echo $ID$VERSION_ID) \
          && curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
          && curl -s -L https://nvidia.github.io/libnvidia-container/$distribution/libnvidia-container.list | \
                sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
                sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
    ```
    
2. 安裝 nvidia-container-toolkit
    
    ```bash
    sudo apt-get update
    sudo apt-get install -y nvidia-container-toolkit
    ```
    
3. 配置 Docker daemon
    
    ```bash
    sudo nvidia-ctk runtime configure --runtime=docker
    ```
    
4. 重啟 Docker 
    
    ```bash
    sudo systemctl restart docker
    ```
    
5. 測試是否安裝成功
    
    ```bash
    sudo docker run --rm --runtime=nvidia --gpus all nvidia/cuda:11.6.2-base-ubuntu20.04 nvidia-smi
    ```
    

## 安裝NVIDIA Container Toolkit (nvidia-docker2)

1. 設定repo以及GPG key
    
    ```bash
    distribution=$(. /etc/os-release;echo $ID$VERSION_ID) \
       && curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add - \
       && curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
    ```
    
2. 安裝 nvidia-docker2
    
    ```bash
    sudo apt-get update
    sudo apt-get install -y nvidia-docker2
    ```
    
3. 重啟 Docker 
    
    ```bash
    sudo systemctl restart docker
    ```
    
4. 測試是否安裝成功
    
    ```bash
    sudo docker run --rm --gpus all nvidia/cuda:11.6.2-base-ubuntu20.04 nvidia-smi
    ```