# Using multiple GitHub accounts on one computer

## **在一台電腦使用多個GitHub帳號**

1. **產生 SSH Key**
    
    ```bash
    ssh-keygen -t rsa -C "your_email@example.com" -f ~/.ssh/your_key
    ```
    
2. **複製公鑰至 GitHub**
    
    ```bash
    pbcopy < ~/.ssh/your_key.pub
    ```
    
    > 將內容貼到 GitHub 的 SSH Keys 設定。
    > 
3. **啟動 SSH-Agent 並加入密鑰**
    
    ```bash
    eval "$(ssh-agent -s)"
    ssh-add -K ~/.ssh/your_key
    ```
    
4. **設定 SSH config**
    
    ```bash
    touch ~/.ssh/config
    ```
    
    編輯 `~/.ssh/config`：
    
    ```
    Host github-work
      HostName github.com
      User git
      IdentityFile ~/.ssh/your_key
    ```
    
5. **測試連線**
    
    ```bash
    ssh -T git@github.com
    ```