---
title: "評估模型指標"
description: "紀錄評估模型指標"
date: 2023-05-15
draft: false
categories:
  - 技術筆記
tags:
  - 教學
  - 模型評估
keywords:
  - 模型評估
  - 教學
---

## 簡單說明

這是一個用於測試的簡單描述。

## 名詞定義

---

### IoU (intersection over union)

定義：$(A∩B)/(A∪B)$

---

### 混淆矩陣 (Confusion matrix)

| Total population= P + N | Positive (PP) (predicted) | Negative (PN) (predicted) |
| --- | --- | --- |
| Positive (P) | True positive (TP) | False negative (FN) |
| Negative (N) | False positive (FP) | True negative (TN) |

TP，True Positives，其中 True 表示預測正確，Positives 表示此為正樣本。

TN，True Negatives，其中 True 表示預測正確，Negatives 表示此為負樣本。

FP，False Positives，其中 False 表示預測錯誤，Positives 表示此為正樣本。

FN，False Negatives，其中 False 表示預測錯誤，Negatives 表示此為負樣本。

## 一般常見指標

---

### Accuracy

- 模型預測正確數量所佔整體的比例。

$$
Accuracy=\dfrac{TP+TN}{TP+TN+FP+FN}
$$

---

### Precision

- 被預測為 Positive 的資料中，有多少是真的 Positive。

$$
Precision=\dfrac{TP}{TP+FP}
$$

---

### Recall

- 在原本 Positive 的資料中，有多少被預測出為 Positive。

$$
Recall=\dfrac{TP}{TP+FN}
$$

---

### F-score

- Precision 與 Recall 調和平均數。一般來說beta值會等於一。

$$
F-score=\frac{(\;1+\beta^{2}\;)\;precision\;\times\;recall}{\beta^{2}\;precision\;+\;recall}
$$

## 其他常見指標

---

### ROC-AUC

- ROC-AUC：Receiver operator characteristic - Area Under the Curve
- 作法：以 `FPR` 為 X 軸，`TPR` 為 Y 軸，根據不同的閾值畫出`ROC curve`。再計算曲線下面積，得出`ROC-AUC`。
    
    $$
    TPR=True\;Positive\;Rate(Recall)=\dfrac{TP}{TP+FN}
    $$
    
    $$
    FPR=False\;Positive\;Rate=\dfrac{FP}{FP+TN}
    $$
    

---

### PR-AUC

- PR -AUC：Precision Recall - Area Under the Curve
- 作法：以 `Recall` 為 X 軸，`Pecision` 為 Y 軸，根據不同的閾值畫出PR curve。再計算曲線下面積，得出`PR-AUC`。

---

### AUC說明

- `AUC = 1` → 完美的模型。
- `0.5 < AUC < 1` → 可以找出表現最好的閥值。
- `AUC  < 0.5` → 表現差。