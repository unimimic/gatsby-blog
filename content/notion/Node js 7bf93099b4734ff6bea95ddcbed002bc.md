# Node.js

# 🌐 基礎說明

- **定義**：Node.js 是一個建構在 **Chrome V8 引擎** 之上的 JavaScript 執行環境。
- **特色**：
    - 打破 JavaScript 僅能在瀏覽器使用的限制。
    - 可以用 JavaScript 開發 **後端應用程式**，甚至 CLI 工具。
    - 適合 **跨平台**（Windows / Mac / Linux）。

---

## NVM (Node Version Manager)

**用途**：管理多個 Node.js 版本，方便切換與維護。

### 📦 安裝

- **Windows**: [nvm-windows 下載](https://github.com/coreybutler/nvm-windows/releases)
- **Mac/Linux**: 使用 `nvm-sh/nvm` 套件安裝

### 🔑 常用指令

| 指令 | 功能 |
| --- | --- |
| `nvm ls` | 列出已安裝的 Node.js 版本 |
| `nvm install <版本號>` | 安裝指定 Node.js 版本 |
| `nvm uninstall <版本號>` | 移除指定 Node.js 版本 |
| `nvm use <版本號>` | 切換到特定 Node.js 版本 |
| `nvm alias default <版本號>` | 設定預設版本 |

---

## npm 與 npx

- **npm (Node Package Manager)**
    - Node.js 內建的套件管理工具。
    - 用於安裝、更新與管理專案依賴。
    - 範例：`npm install express`
- **npx**
    - npm 內建的輔助工具。
    - 用於執行一次性/臨時的套件（無需全域安裝）。
    - 範例：`npx create-react-app my-app`

---

## Yarn

- **特點**：另一個 JavaScript 套件管理工具。
- 與 npm 相比：
    - **速度更快**（平行下載）
    - **版本鎖定更嚴謹**

---

## Node.js 專案建置

### 📂 `package.json`

- **用途**：專案的核心設定檔，記錄專案資訊與依賴套件。
- 範例：
    
    ```json
    {
      "name": "test",              // 專案名稱
      "version": "1.0.0",          // 專案版本
      "description": "",           // 專案描述
      "main": "index.js",          // 程式進入點
      "scripts": {                 // 自定義指令區
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": [],              // 專案關鍵字
      "author": "",                // 專案作者
      "license": "MIT",            // 專案授權條款
      "dependencies": {},          // 專案使用到的套件
      "devDependencies": {}        // 只在開發環境使用的套件
    }
    
    ```
    

### 📂 `package-lock.json`

- 記錄每個依賴套件的**精確版本號**。
- 確保團隊成員安裝的套件版本一致，避免版本差異造成錯誤。