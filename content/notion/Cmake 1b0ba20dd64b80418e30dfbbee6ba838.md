# Cmake

## **CMake 基本說明**

![Untitled.png](Cmake%201b0ba20dd64b80418e30dfbbee6ba838/Untitled.png)

CMake是一個跨平台自動化建構系統，主要用於管理軟體的建置流程。CMake用一個名為 CMakeLists.txt 的組態檔來描述整個專案的編譯、鏈接和打包方式，不依賴於特定編譯器，並能支援多層目錄、多個程式與多個函式庫的建置管理。

- **CPack：自動打包安裝包。**
    
    CPack 是 CMake 的內建打包工具，用來將你的軟體專案建立成多種安裝包或發行包格式（如 zip、tar.gz、deb、rpm、nsis 等）。它會根據專案的 CMakeLists.txt 或 CPack 設定檔來打包目標檔案、二進位與相關文件，方便在不同平台進行安裝或釋出。
    
    常見用法：
    
    - 設定好安裝規則（如 install 命令）。
    - 執行 **`cpack`** 指令即可自動打包成指定格式。
- **CTest：自動化項目測試。**
    
    CTest 是 CMake 內建的測試驅動工具，讓你能管理與自動化執行測試（例如單元測試）。你可以在 CMakeLists.txt 中定義各種測試（如 add_test），然後用 **`ctest`** 指令批量跑這些測試、匯出報告，方便 CI/CD 整合與持續驗證軟體品質。
    
    常見用法：
    
    - 在專案內加入測試設定（add_test）。
    - 編譯好後執行 **`ctest`** 指令即可自動執行全部測試案例並輸出結果。

## **CMake 基本工作流程**

1. 撰寫 CMakeLists.txt（設定專案與目標）
2. 建立獨立 build 目錄（out-of-source build）
3. 執行 `cmake ../` 生成構建系統
4. 執行 `cmake --build .` 編譯專案
5. 執行 `ctest` 進行測試
6. 執行 `cmake --install .` 安裝產物
7. 執行 `cpack` 打包發行
8. 使用 包管理 / 介面庫 實現模組化與重用

## **命令行選項**

### **基本語法**

```bash
cmake -D<變數>="<值>" <來源目錄>
```

- `D`：設定變數值。

**範例**：

```bash
cmake -DCMAKE_CXX_COMPILER=clang++ \
      -DCMAKE_CXX_FLAGS="-std=c++20 -Wall" \
      -DCMAKE_BUILD_TYPE=Debug \
      ../source
```

- `CMAKE_CXX_COMPILER`：指定編譯器
- `CMAKE_CXX_FLAGS`：附加全域旗標
- `CMAKE_BUILD_TYPE`：`Debug` / `Release` / `RelWithDebInfo` / `MinSizeRel`

---

### **進階功能**

1. **互動式配置**：
    
    ```bash
    ccmake <來源目錄>   # 終端互動介面 (Unix)
    cmake -i           # 基本互動介面 (較少用)
    ```
    
2. 測試功能（CTest）
    1. 在 `CMakeLists.txt` 中啟用測試：
        
        ```
        enable_testing()
        add_executable(myTest test.cpp)
        add_test(NAME RunMyTest COMMAND myTest)
        ```
        
    2. 執行測試：
        
        ```bash
        ctest
        ```
        
        常用參數：
        
        - `ctest -V`：顯示詳細測試輸出
        - `ctest -R <pattern>`：僅執行符合名稱的測試
        - `ctest --output-on-failure`：測試失敗時顯示輸出
3. 打包功能（CPack）：CMake 內建 **CPack** 可直接產生安裝包（壓縮檔、deb、rpm、dmg 等）。
    1. 基本設定 在 `CMakeLists.txt` 中加入：
        
        ```
        include(InstallRequiredSystemLibraries)
        
        set(CPACK_PACKAGE_NAME "MyApp")
        set(CPACK_PACKAGE_VERSION "1.0.0")
        set(CPACK_GENERATOR "ZIP;TGZ")  # 可以指定多種格式
        include(CPack)
        ```
        
    2. 執行打包
        
        ```bash
        cpack
        ```
        
        常見參數：
        
        - `cpack -G ZIP` → 產生 ZIP 壓縮包
        - `cpack -G TGZ` → 產生 .tar.gz
        - `cpack -G DEB` → 產生 Debian 套件 (Linux)
        - `cpack -G RPM` → 產生 RPM 套件 (Linux)
        - `cpack -G DragNDrop` → 產生 macOS `.dmg` 安裝包

---

## **CMake 指令**

CMake 支援多種指令，可分為專案命令和腳本命令。

### **常見專案命令 (Project Commands)**

1. **新增子目錄**：
    
    ```
    add_subdirectory(src)     # src 必須含有 CMakeLists.txt
    ```
    
2. **新增可執行檔**：
    
    ```
    add_executable(myApp main.cpp utils.cpp)
    ```
    
3. **新增函式庫**：
    
    ```
    add_library(myLib STATIC lib.cpp)
    add_library(myShared SHARED shared.cpp)
    ```
    
4.  鏈結函式庫
    
    ```
    target_link_libraries(myApp PRIVATE myLib pthread)
    ```
    
5. 設定編譯選項
    
    ```
    target_compile_features(myApp PRIVATE cxx_std_17)
    target_compile_definitions(myApp PRIVATE USE_FEATURE_X=1)
    target_compile_options(myApp PRIVATE -Wall -Wextra)
    ```
    
6. 設定輸出目錄
    
    ```
    set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)
    set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
    set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
    ```
    

### 常見腳本命令 (Scripting Commands)

1. 基本輸出與訊息 `message()`
    
    用來輸出訊息，可設定不同等級：
    
    ```
    message(STATUS "Building project...")
    message(WARNING "This is a warning")
    message(FATAL_ERROR "Stop build!")
    ```
    
    - `STATUS`：一般狀態（預設只在正常輸出顯示）
    - `WARNING`：警告，但繼續執行
    - `FATAL_ERROR`：錯誤，停止執行
2. 條件判斷 `if()/elseif()/else()/endif()`
    
    ```
    if(CMAKE_BUILD_TYPE STREQUAL "Debug")
        message(STATUS "Debug build enabled")
    elseif(CMAKE_BUILD_TYPE STREQUAL "Release")
        message(STATUS "Release build enabled")
    else()
        message(WARNING "Unknown build type")
    endif()
    ```
    
    常見判斷運算子：
    
    - `STREQUAL`：字串相等
    - `EQUAL`：數字相等
    - `LESS` / `GREATER`：數值比較
    - `DEFINED VAR`：檢查變數是否存在
    - `EXISTS <path>`：檔案/資料夾是否存在
    - `ON` / `OFF` / `TRUE` / `FALSE`：布林值
3. 迴圈控制 **`foreach()`**
    
    ```
    foreach(file IN LISTS SRC_LIST)
        message(STATUS "Source file: ${file}")
    endforeach()
    ```
    
    - **`while()`**
    
    ```
    set(i 0)
    while(i LESS 3)
        message(STATUS "i = ${i}")
        math(EXPR i "${i} + 1")
    endwhile()
    ```
    
    - **`break()` / `continue()`** 和一般程式語言類似，跳出迴圈或跳到下一次迭代。
4. 變數操作
    - **`set()`**：設定變數
        
        ```
        set(MY_VAR "Hello CMake")
        ```
        
    - **`unset()`**：清除變數
    - **`list()`**：處理清單
        
        ```
        set(myList a b c)
        list(APPEND myList d e)     # 新增元素
        list(REMOVE_ITEM myList b)  # 移除元素
        list(LENGTH myList len)     # 取得長度
        ```
        
    - **`math(EXPR ...)`**：數學運算
    - **`string()`**：字串處理
5. 函數與巨集
    - **`function()`**
        
        ```
        function(print_info name)
            message("Name: ${name}")
        endfunction()
        
        print_info("CMake")
        ```
        
    - **`macro()` ：**與 function 類似，但參數替換較「單純」(文字替換)，建議盡量用 `function()`。
6. 檔案與流程控制
    - **`file()`**：操作檔案/資料夾
        
        ```
        file(READ "config.txt" content)   # 讀檔
        file(WRITE "output.txt" "Hello") # 寫檔
        file(MAKE_DIRECTORY "logs")      # 建資料夾
        file(GLOB SOURCES "*.cpp")       # 搜尋檔案
        ```
        
    - **`execute_process()`**：呼叫外部程式
        
        ```
        execute_process(COMMAND echo "Hello from shell"
                        OUTPUT_VARIABLE result
                        OUTPUT_STRIP_TRAILING_WHITESPACE)
        message("Output: ${result}")
        ```
        
    - **`include()`**：載入其他 `.cmake` 檔
        
        ```
        include(extra_settings.cmake)
        ```
        
    - **`return()`**：結束目前 CMakeLists 或函式。

### 常見 CMake 預設變數對照表

| 變數名稱 | 說明 |
| --- | --- |
| `CMAKE_SOURCE_DIR` | 專案根目錄（CMakeLists.txt 所在目錄） |
| `CMAKE_BINARY_DIR` | 建置輸出目錄（通常是 `build/` 資料夾） |
| `PROJECT_SOURCE_DIR` | 同上，但對應 `project()` 所在的目錄 |
| `PROJECT_BINARY_DIR` | 對應 `project()` 所在的建置目錄 |
| `CMAKE_CURRENT_SOURCE_DIR` | 當前處理中的 CMakeLists.txt 所在目錄（可支援多層 add_subdirectory） |
| `CMAKE_CURRENT_BINARY_DIR` | 當前處理目錄的建置輸出目錄 |
| `CMAKE_INSTALL_PREFIX` | 預設安裝目的地（預設為 `/usr/local`，Windows 上可能是 `C:/Program Files/...`） |
| `CMAKE_RUNTIME_OUTPUT_DIRECTORY` | 可設定執行檔（.exe/.out）輸出路徑 |
| `CMAKE_LIBRARY_OUTPUT_DIRECTORY` | 可設定動態函式庫（.dll/.so）輸出路徑 |
| `CMAKE_ARCHIVE_OUTPUT_DIRECTORY` | 可設定靜態函式庫（.a/.lib）輸出路徑 |
| `CMAKE_BUILD_TYPE` | 指定建置型別，如 `Debug` / `Release`（適用於單一配置 Generator） |
| `CMAKE_CXX_COMPILER` | 使用的 C++ 編譯器路徑 |
| `CMAKE_C_COMPILER` | 使用的 C 編譯器路徑 |
| `CMAKE_CXX_FLAGS` | 全域的 C++ 編譯器參數 |
| `CMAKE_INSTALL_BINDIR` | `install(TARGETS)` 安裝可執行檔的子路徑（預設為 `bin`） |
| `CMAKE_INSTALL_LIBDIR` | 安裝函式庫的路徑（預設為 `lib` 或 `lib64`） |
| `CMAKE_CACHEFILE_DIR` | 快取檔 `CMakeCache.txt` 所在目錄 |