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

## 题库速览

### easy

[1、Pick](https://github.com/YangLG-7/learn_TS/blob/master/./src/1%E3%80%81easy/1%E3%80%81Pick.ts)

[2、Readonly](https://github.com/YangLG-7/learn_TS/blob/master/./src/1%E3%80%81easy/2%E3%80%81Readonly.ts)

[3、Tuple to Object](https://github.com/YangLG-7/learn_TS/blob/master/./src/1%E3%80%81easy/3%E3%80%81Tuple%20to%20Object.ts)

[4、First of Array](https://github.com/YangLG-7/learn_TS/blob/master/./src/1%E3%80%81easy/4%E3%80%81First%20of%20Array.ts)

[5、Exclude](https://github.com/YangLG-7/learn_TS/blob/master/./src/1%E3%80%81easy/5%E3%80%81Exclude.ts)

[5、Length of Tuple](https://github.com/YangLG-7/learn_TS/blob/master/./src/1%E3%80%81easy/5%E3%80%81Length%20of%20Tuple.ts)

[6、Awaited](https://github.com/YangLG-7/learn_TS/blob/master/./src/1%E3%80%81easy/6%E3%80%81Awaited.ts)

[7、If](https://github.com/YangLG-7/learn_TS/blob/master/./src/1%E3%80%81easy/7%E3%80%81If.ts)

[8、Concat](https://github.com/YangLG-7/learn_TS/blob/master/./src/1%E3%80%81easy/8%E3%80%81Concat.ts)

[9、Includes](https://github.com/YangLG-7/learn_TS/blob/master/./src/1%E3%80%81easy/9%E3%80%81Includes.ts)

[10、Push](https://github.com/YangLG-7/learn_TS/blob/master/./src/1%E3%80%81easy/10%E3%80%81Push.ts)

[11、Unshift](https://github.com/YangLG-7/learn_TS/blob/master/./src/1%E3%80%81easy/11%E3%80%81Unshift.ts)

[12、Parameters](https://github.com/YangLG-7/learn_TS/blob/master/./src/1%E3%80%81easy/12%E3%80%81Parameters.ts)

### medium

[1、Return-type](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/1%E3%80%81Return-type.ts)

[2、Omit](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/2%E3%80%81Omit.ts)

[3、Readonly](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/3%E3%80%81Readonly.ts)

[4、Deep-readonly](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/4%E3%80%81Deep-readonly.ts)

[5、Tuple-to-union](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/5%E3%80%81Tuple-to-union.ts)

[6、Chainable-options](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/6%E3%80%81Chainable-options.ts)

[7、Last](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/7%E3%80%81Last.ts)

[8、Pop](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/8%E3%80%81Pop.ts)

[9、Promise-All](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/9%E3%80%81Promise-All.ts)

[10、Type-lookup](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/10%E3%80%81Type-lookup.ts)

[11、Trim-Left](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/11%E3%80%81Trim-Left.ts)

[12、Trim](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/12%E3%80%81Trim.ts)

[13、Capitalize](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/13%E3%80%81Capitalize.ts)

[14、Replace](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/14%E3%80%81Replace.ts)

[15、ReplaceAll](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/15%E3%80%81ReplaceAll.ts)

[16、Append-Argument](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/16%E3%80%81Append-Argument.ts)

[17、Permutation](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/17%E3%80%81Permutation.ts)

[18、Length-of-String](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/18%E3%80%81Length-of-String.ts)

[19、Flatten](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/19%E3%80%81Flatten.ts)

[20、Append-to-object](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/20%E3%80%81Append-to-object.ts)

[21、Absolute](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/21%E3%80%81Absolute.ts)

[22、String-to-Union](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/22%E3%80%81String-to-Union.ts)

[23、Merge](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/23%E3%80%81Merge.ts)

[24、CamelCase](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/24%E3%80%81CamelCase.ts)

[25、KebabCase](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/25%E3%80%81KebabCase.ts)

[26、Diff](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/26%E3%80%81Diff.ts)

[27、AnyOf](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/27%E3%80%81AnyOf.ts)

[28、isNever](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/28%E3%80%81isNever.ts)

[29、isUnion](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/29%E3%80%81isUnion.ts)

[30、ReplaceKeys](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/30%E3%80%81ReplaceKeys.ts)

[31、Remove-Index-Signature](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/31%E3%80%81Remove-Index-Signature.ts)

[32、Percentage-parser](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/32%E3%80%81Percentage-parser.ts)

[33、Drop-char](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/33%E3%80%81Drop-char.ts)

[34、MinusOne](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/34%E3%80%81MinusOne.ts)

[35、PickByType](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/35%E3%80%81PickByType.ts)

[36、StartsWith](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/36%E3%80%81StartsWith.ts)

[37、EndsWith](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/37%E3%80%81EndsWith.ts)

[38、PartialByKeys](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/38%E3%80%81PartialByKeys.ts)

[39、RequiredByKeys](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/39%E3%80%81RequiredByKeys.ts)

[40、Mutable](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/40%E3%80%81Mutable.ts)

[41、OmitByType](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/41%E3%80%81OmitByType.ts)

[42、ObjectEntries](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/42%E3%80%81ObjectEntries.ts)

[43、Shift](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/43%E3%80%81Shift.ts)

[44、Tuple-to-Nested-Object](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/44%E3%80%81Tuple-to-Nested-Object.ts)

[45、Reverse](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/45%E3%80%81Reverse.ts)

[46、Flip-arguments](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/46%E3%80%81Flip-arguments.ts)

[47、FlattenDepth](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/47%E3%80%81FlattenDepth.ts)

[48、BEM-style-string](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/48%E3%80%81BEM-style-string.ts)

[49、InorderTraversal](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/49%E3%80%81InorderTraversal.ts)

[50、Flip](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/50%E3%80%81Flip.ts)

[51、Fibonacci-sequence](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/51%E3%80%81Fibonacci-sequence.ts)

[52、AllCombinations](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/52%E3%80%81AllCombinations.ts)

[53、Greater-Than](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/53%E3%80%81Greater-Than.ts)

[54、Zip](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/54%E3%80%81Zip.ts)

[55、IsTuple](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/55%E3%80%81IsTuple.ts)

[56、Chunk](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/56%E3%80%81Chunk.ts)

[57、Fill](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/57%E3%80%81Fill.ts)

[58、TrimRight](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/58%E3%80%81TrimRight.ts)

[59、Without](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/59%E3%80%81Without.ts)

[60、Trunc](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/60%E3%80%81Trunc.ts)

[61、IndexOf](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/61%E3%80%81IndexOf.ts)

[62、Join](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/62%E3%80%81Join.ts)

[63、LastIndexOf](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/63%E3%80%81LastIndexOf.ts)

[64、Unique](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/64%E3%80%81Unique.ts)

[65、MapTypes](https://github.com/YangLG-7/learn_TS/blob/master/./src/2%E3%80%81medium/65%E3%80%81MapTypes.ts)

### hard

[1、Simple-Vue](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/1%E3%80%81Simple-Vue.ts)

[2、Currying](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/2%E3%80%81Currying.ts)

[3、Union-To-Intersection](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/3%E3%80%81Union-To-Intersection.ts)

[4、Get Required](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/4%E3%80%81Get%20Required.ts)

[5、Get-Optional](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/5%E3%80%81Get-Optional.ts)

[6、Required Keys](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/6%E3%80%81Required%20Keys.ts)

[7、Optional Keys](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/7%E3%80%81Optional%20Keys.ts)

[8、Capitalize Words](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/8%E3%80%81Capitalize%20Words.ts)

[9、CamelCase](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/9%E3%80%81CamelCase.ts)

[10、C-printf Parser](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/10%E3%80%81C-printf%20Parser.ts)

[11、Vue Basic Props](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/11%E3%80%81Vue%20Basic%20Props.ts)

[12、isAny](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/12%E3%80%81isAny.ts)

[13、Typed Get](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/13%E3%80%81Typed%20Get.ts)

[14、String to Number](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/14%E3%80%81String%20to%20Number.ts)

[15、Tuple Filter](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/15%E3%80%81Tuple%20Filter.ts)

[16、Tuple to Enum Object](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/16%E3%80%81Tuple%20to%20Enum%20Object.ts)

[17、Printf](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/17%E3%80%81Printf.ts)

[18、Deep object to unique](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/18%E3%80%81Deep%20object%20to%20unique.ts)

[19、String Join](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/19%E3%80%81String%20Join.ts)

[20、DeepPick](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/20%E3%80%81DeepPick.ts)

[21、Pinia](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/21%E3%80%81Pinia.ts)

[22、Camelize](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/22%E3%80%81Camelize.ts)

[23、Drop String](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/23%E3%80%81Drop%20String.ts)

[24、Split](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/24%E3%80%81Split.ts)

[25、ClassPublicKeys](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/25%E3%80%81ClassPublicKeys.ts)

[26、IsRequiredKey](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/26%E3%80%81IsRequiredKey.ts)

[27、ObjectFromEntries](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/27%E3%80%81ObjectFromEntries.ts)

[28、IsPalindrome](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/28%E3%80%81IsPalindrome.ts)

[29、Mutable Keys](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/29%E3%80%81Mutable%20Keys.ts)

[30、Intersection](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/30%E3%80%81Intersection.ts)

[31、Binary to Decimal](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/31%E3%80%81Binary%20to%20Decimal.ts)

[32、Object Key Paths](https://github.com/YangLG-7/learn_TS/blob/master/./src/3%E3%80%81hard/32%E3%80%81Object%20Key%20Paths.ts)














