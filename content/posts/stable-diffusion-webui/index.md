---

title:  "在 windows 使用 conda 環境搭建 Stable Diffusion web UI"

description: "展示使用 conda 環境搭建 Stable Diffusion web UI"

date: 2023-03-15

draft: false

categories:

- 技術筆記

tags:

- 教學
- anaconda
- Stable Diffusion
- windows

keywords:

- 教學
- anaconda
- Stable Diffusion
- windows

---



## 說明

官方做法沒有針對 conda 環境說明手動安裝。以下是紀錄在 windows 使用 conda 環境搭建 Stable Diffusion web UI，主要是給原本就有 conda 環境的使用者參考。

## 實作

1. 使用`conda`創建虛擬環境。
    
    ```bash
    conda create -n test python=3.8
    ```
    
2. 安裝`torch`，到官方選擇與電腦可匹配的 torch GPU 版本。
    
    ```bash
    pip3 install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu116
    ```
    
3. 拉取專案。
    
    ```bash
    git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
    cd stable-diffusion-webui
    ```
    
4. 安裝其他依賴套件。
    
    ```bash
    pip install -r requirements.txt
    ```
    
5. 執行腳本。執行過程中會安裝一些相依套件，最後會跑出`Running on local URL: http://127.0.0.1:7860`訊息代表成功執行。
    
    ```bash
    python launch.py
    ```