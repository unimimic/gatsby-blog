---
title:       "py檔轉成pyd檔"
description: "展示如何將.py轉換到.pyd"
date:         2022-10-13
tags:        ["教學", "Python"]
categories:  ["技術筆記" ]
keywords:
- 教學
- Python
- py
- pyd
draft: false
---


### 1.安裝套件

安裝轉換`pyd`的必要套件`cython`

```bash
pip install cython
```

### 2.實作模組

準備要轉換的`.py`檔，單檔或多檔(需要其他設定)都可以，以下以單檔為範例。

```python
# first.py
def hellow ():
	print(“hellow world!”)
```

### 3.撰寫`setup.py`

建立轉換前的設定檔

```python
# setup.py
from distutils.core import setup
from Cython.Build import cythonize

setup(
	ext_modules=cythonize(["first.py"])
)
```

### 4.生成pyd

輸入以下指令，路徑底下會產生`first.cp38-win_amd64.pyd` ，此為轉換後的`pyd`檔。

```bash
python setup.py build_ext --inplace
```

### 5.使用pyd模組

直接用原檔名稱進行引用即可。

```python
from first import hellow
hellow()
```