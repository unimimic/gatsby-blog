# Git Flow

Vincent Driessen提出了一套Git Flow開發流程 A successful Git branching model

## Git Flow 分支模型

1. **master（主分支）**
    - 保存 **穩定、可上線** 的版本。
    - 每次合併到 `master` 通常對應一次正式發佈（tag）。
    - 合併最好由專人負責，避免隨意推送。
2. **develop（開發分支）**
    - 保存 **最新開發狀態**。
    - 功能完成後會合併回這裡，供測試與整合。
    - 最後會從這裡建立 `release` 分支。
3. **feature（功能分支）**
    - 從 `develop` 建出，開發新功能。
    - 命名慣例：`feature/功能名稱`。
    - 完成後 **合併回 develop**，刪掉該分支。
4. **release（釋出分支）**
    - 從 `develop` 建出，準備釋出版本。
    - 只進行 **版本穩定化、修 bug**，不再新增功能。
    - 合併到 `master`（發佈正式版）並 **回合併 develop**（確保開發分支也有修正）。
5. **hotfix（緊急修補分支）**
    - 從 `master` 建出，用於修正式版的緊急 bug。
    - 修好後要 **合併回 master**（馬上上線）和 **develop**（避免下個版本漏掉修補）。

---

## Git Flow 運作範例

1. 平常開發：
    - 從 `develop` 建 `feature/login`。
    - 功能完成後，合併回 `develop`，刪除 `feature/login`。
2. 準備發佈：
    - 從 `develop` 建 `release/1.2.0`。
    - 測試與修 bug 完成後，合併 `release/1.2.0` → `master`，並打 tag `v1.2.0`。
    - 同時把 `release/1.2.0` 合併回 `develop`。
3. 緊急修補：
    - 線上 `master` 出現 bug。
    - 建立 `hotfix/1.2.1` → 修 bug → 合併回 `master`（並打 tag `v1.2.1`）+ `develop`。

---

## 適用情境

- 適合有 明確版本規劃、團隊合作、多人並行開發的專案。
- 對於 小型專案 或 持續交付 (Continuous Delivery)，可能會顯得太複雜，會用 GitHub Flow 或 GitLab Flow 取代。