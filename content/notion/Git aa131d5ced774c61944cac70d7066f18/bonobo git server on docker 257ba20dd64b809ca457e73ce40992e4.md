# bonobo git server on docker

自建 Git 伺服器（Bonobo Git Server）透過 Docker

建立方法

1. **拉取映像檔**
    
    ```powershell
    docker pull dockeronwindows/ch10-bonobo
    ```
    
2. **啟動容器**
    - 將宿主機資料夾映射到容器內的 `C:\data`
    
    ```powershell
    docker run -dp 80:80 -v C:\Users\weichieh.lee\Desktop\bonobo:C:\data dockeronwindows/ch10-bonobo
    ```
    

### 注意事項

- Bonobo Git Server 的儲存路徑在容器內：
    
    ```
    C:\Bonobo\Bonobo.Git.Server\App_Data\Repositories
    ```
    
- 問題：外部沒有直接分享 `.git` 檔案，可能需要透過界面操作或額外配置才能存取原始倉庫檔案。