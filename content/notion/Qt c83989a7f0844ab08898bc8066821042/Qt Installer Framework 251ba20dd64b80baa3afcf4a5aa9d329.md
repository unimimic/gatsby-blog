# Qt Installer Framework

## **📦**基本架構

```bash
project/
├─ config/              # 全域安裝設定
│  └─ config.xml        # 定義產品資訊與安裝器屬性
├─ packages/            # 各組件 (Component)
│  └─ <component>/ 
│     ├─ meta/          
│     │  └─ package.xml      # 組件描述、依賴設定、必選/可選
│     │  └─ installscript.qs # (可選) 安裝層級腳本（依需求）
│     └─ data/               # 實際安裝檔案
```

### 檔案用途

- config/config.xml
    - 定義整體產品資訊（名稱、版本、圖示）
    - 設定語言、授權條款等全域屬性
- packages/`<component>`/meta/package.xml
    - 描述單一組件的資訊（名稱、依賴、是否可選/必選）
- packages/`<component>`/meta/script.js *(可選)*
    - 撰寫客製化安裝邏輯（例如環境檢查、條件安裝）
- packages/`<component>`/data/
    - 儲存實際安裝到系統的檔案

## ⚙️ 工具

- binarycreator → 打包產生最終安裝程式
- repogen → 產生安裝來源 (Repository)，可用於線上或離線安裝