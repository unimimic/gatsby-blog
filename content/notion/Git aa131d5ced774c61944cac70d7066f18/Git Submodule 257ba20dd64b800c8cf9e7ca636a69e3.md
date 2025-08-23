# Git Submodule

### Git Submodule 使用教學

Git Submodule 用來在一個 Git 專案中加入另一個 Git repository（作為子模組），常見於管理第三方函式庫或共用模組。

---

### 新增 Submodule

```bash
git submodule add <repository-url> <local-path>
```

這會產生兩個變動：

- `.gitmodules` 檔案：記錄子模組來源與路徑。
- `<local-path>` 目錄：子模組內容。

**接著：**

```bash
git commit -m "Add submodule"
git push origin main
```

---

### 初始化與更新 Submodule

若是你 **clone** 了一個含有 submodule 的專案，請執行：

```bash
git submodule update --init --recursive
```

或分開執行：

```bash
git submodule init
git submodule update
```

如果要一起 clone 主專案與子模組：

```bash
git clone --recurse-submodules <repo-url>
```

---

### 同步 Submodule 更新（子模組有新 commit）

1. 進入子模組目錄，拉取最新：
    
    ```bash
    cd mysubmodule
    git pull
    ```
    
2. 回到主專案目錄，提交子模組引用的 commit 更新：
    
    ```bash
    cd ..
    git add mysubmodule
    git commit -m "Update submodule"
    git push
    
    ```
    

> ✅ 注意：主專案只會記錄子模組所指向的特定 commit，而非完整歷史紀錄。
> 

---

### 移除 Submodule

1. 移除索引：
    
    ```bash
    git rm --cached <submodule-folder>
    ```
    
2. 手動刪除 `.gitmodules` 中對應段落。
3. 若有 `.git/config` 中也有相關條目，可一起刪除。
4. 最後：
    
    ```bash
    rm -rf <submodule-folder>
    git commit -m "Remove submodule"
    git push
    ```
    

---

### ⚠️ 小提醒

- Submodule 指向的是「某個特定 commit」，不會自動追蹤主線更新。
- 若有多個人協作，請務必執行 `git submodule update`，以避免版本不一致。