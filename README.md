# README

### 写在前面
这是一个对于 [类型体操](https://github.com/type-challenges/type-challenges) 的做题过程，记录学习TS的点滴。

PS：我在看的[中文文档](http://ts.yayujs.com/learn-typescript/handbook/MoreOnFunctions.html)

### 目录解构
```
learn_TS
└─src
├─1、easy-------------------简单
├─2、medium-----------------中等
├─3、hard-------------------困难
├─4、extreme----------------地狱
└─note----------------------笔记
```

### 如何运行单独ts文件
1. 用tsc 将ts文件编译成js文件，然后在使用node去运行ts文件
```
    npm i typescript -g
    tsc xxx.ts (在当前目录下生成同名文件的js文件，且默认会将你的代码转为ES3的代码) 
    node xxx.js
```
2. 使用ts-node直接运行ts文件
```
    npm i typescript ts-node -g
    ts-node xxx.ts
```
如果你不是全局安装的依赖(即npm安装未指定`-g`标识),则在命名前面加入`npx`
```
    npx tsc xxx.ts 
    npx ts-node xxx.ts
```













