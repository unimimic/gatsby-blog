---

title:  "NPN型近接開關接線方式與 Arduino 的應用"

description: "展示NPN型近接開關接線與 Arduino 的應用"

date: 2023-05-15

draft: false

categories:

- 技術筆記

tags:

- 教學
- Arduino
- 近接感測器
- NPN

keywords:

- 教學
- Arduino
- 近接感測器
- NPN

---

## 簡單說明

- 這邊使用的近接感測器是 fotek SU Series U Type Photo Sensor (SU-02X)。接線方式：咖啡色是正，藍色是負，黑色是訊號線。

## BOM表

- Arduino Uno
- 麵包板
- 端子台 (方便轉近接感測器)
- 近接感測器 (fotek SU-02X)
- LM7805CV 穩壓模組
- 12V 直流電源
- 7條杜邦線

## 接線實作


## 程式實作

```cpp
int readpin = 8;
int status = 0;

void setup() {
  Serial.begin(9600);
  pinMode(readpin, INPUT);
}

void loop() {
  if(digitalRead(readpin)==LOW){
    if (status==1){
      Serial.println("low"); // 回應訊息給電腦
    }
    status = 0;
  }else{
    if (status==0){
      Serial.println("high"); // 回應訊息給電腦
    }
    status = 1;
  }
  delay(10);
}
```