/*
 * @description 将元组转换为对象
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/11-easy-tuple-to-object/README.zh-CN.md
 */

// 传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

/* _____________ 你的代码 _____________ */
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P;
};

// T[number] 为 索引访问类型，通过number型索引可以查找属性上的值，作为索引的只能是类型
// 在下面的测试用例中 T 为["tesla", "model 3", 1, "model Y"]；T[number] 则为"tesla"| "model 3"| 1| "model Y"。
// 通过 in 遍历获取每一个值

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

const tuple = ["tesla", "model 3", 1, "model Y"] as const;

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: "tesla";
        "model 3": "model 3";
        1: 1;
        "model Y": "model Y";
      }
    >
  >
];

type error = TupleToObject<[[1, 2], {}]>;
