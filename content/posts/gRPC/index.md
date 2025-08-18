---
title:  "Python實作gRPC"
description: "展示如何Python實作gRPC"
date: 2023-11-15
draft: false
categories:
- 技術筆記
tags: 
- 教學
- gRPC
- Python
keywords:
- 教學
- gRPC
- Python
---




## 說明

- RPC (Remote Procedure Call) 是一種通信協議，允許一個應用程式在不同的電腦上執行程式並獲取結果，有點像是調用函式的感覺。 通常用於分散式系統中。
- gRPC 是一個跨平台的開源遠程調用框架，是由 Google 開發，奠基在 HTTP/2 上提供低延遲 (low latency)，支援串流，更容易做到權限驗證 (authentication)。

## 實作

### 定義 protobuf

```protobuf
// protocal.proto
syntax = "proto3"; // 語法版本

// 定義服務
service greet{
    rpc hello (req) returns (res) {} // 定義函式
    rpc echo  (req) returns (res) {} // 定義函式
}

// 定義引數格式
message req {
    string data = 1;
}

// 定義引數格式
message res {
    string data = 1;
}
```

### 實作 python

1. 安裝需要的套件
    
    ```bash
    pip install grpcio grpcio-tools
    ```
    
2. 轉換 proto ，此範例轉換完後會得到`protocal_pb2_grpc.py` 和 `protocal_pb2.py`兩個檔案。
    
    ```bash
    python -m grpc_tools.protoc -I=./ --python_out=./ --grpc_python_out=./ ./<protocal_filename>.proto
    ```
    
3. 實作Sever端
    
    ```python
    # server.py
    import grpc
    import protocal_pb2
    import protocal_pb2_grpc
    from concurrent import futures
    
    class TestService(protocal_pb2_grpc.greetServicer):
        def hello(self, request, context):
            return protocal_pb2.res(data="hellow")
    
        def echo(self, request, context):
            return protocal_pb2.res(data=request.data)
    
    if __name__ == '__main__':
        server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
        protocal_pb2_grpc.add_greetServicer_to_server(
            TestService(), server)
        server.add_insecure_port('[::]:50051')
        server.start()
        server.wait_for_termination()
        print("Listen to", "[::]:50051")
    ```
    
4. 實作Client端
    
    ```python
    # client.py
    import grpc
    import protocal_pb2
    import protocal_pb2_grpc
    
    if __name__ == "__main__":
        with grpc.insecure_channel("localhost:50051") as channel:
            stub = protocal_pb2_grpc.greetStub(channel)
            req = protocal_pb2.req(data="value")
            print(stub.hello(req).data)
            print(stub.echo(req).data)
    ```
    
5. 啟動服務`server.py`，執行`client.py`程式。回傳hellow以及value。