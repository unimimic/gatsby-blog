---

title:  "淺談遠程登錄"

description: "淺談遠程登錄"

date: 2023-12-15

draft: false

categories:

- 技術筆記

tags:

- remote login
- SSH

keywords:

- remote login
- SSH

---


## 簡介

遠程登錄是指在一臺電腦上遠程登錄到另一臺電腦，並可以像本地電腦一樣對其進行操作和管理。遠程登錄可以大大提高電腦管理和維護的效率和方便性。

## 常見的遠程登錄和數據傳輸的方法

1. SSH（Secure Shell）：SSH是一種安全的遠程登錄和數據傳輸協議。通過SSH，用戶可以在本地計算機上使用遠程計算機的命令行界面。
2. Telnet：Telnet是一種基於文本的遠程登錄協議，用戶可以通過Telnet在遠程計算機上運行應用程序，管理文件和目錄，執行命令等。Telnet不提供加密，因此在互聯網上使用Telnet時會存在安全風險。
3. RDP（Remote Desktop Protocol）：RDP是一種用於Windows操作系統的遠程桌面協議。通過RDP，用戶可以在本地計算機上使用遠程計算機的桌面。
4. VNC（Virtual Network Computing）：VNC是一種遠程桌面協議，用戶可以在本地計算機上使用遠程計算機的桌面。
5. FTP（File Transfer Protocol）：FTP是一種用於在不同計算機之間傳輸文件的協議。通過FTP，用戶可以從一個計算機將文件上傳到另一個計算機，或者從一個計算機下載文件到本地計算機。FTP使用明文傳輸，因此在互聯網上使用FTP時會存在安全風險。
6. SFTP（SSH File Transfer Protocol）：SFTP是一種基於SSH協議的安全文件傳輸協議。通過SFTP，用戶可以安全地在遠程計算機和本地計算機之間傳輸文件。

## 常見終端連線軟體

以下是常見的終端連線軟體，您可以根據自己的需要選擇合適的軟體：

1. PuTTY：一個免費且開源的 SSH 和 telnet 客戶端，可在 Windows、Mac 和 Linux 平台上運行。
2. Termius：一個跨平台的 SSH 客戶端，支援 Windows、Mac 和 Linux，還有 iOS 和 Android 手機應用程式。
3. MobaXterm：支援 SSH、Telnet、FTP、RDP 和 VNC連線，只能在 Windows 平台上運行。