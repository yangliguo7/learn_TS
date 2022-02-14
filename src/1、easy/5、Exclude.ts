/*
 * @description 实现内置的Exclude <T，U>类型，但不能直接使用它本身。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/43-easy-exclude/README.zh-CN.md
 */

// Exclude<T, U>
// Exclude 是联合类型T中去除U 返回一个新的类型

/* _____________ 你的代码 _____________ */

type MyExclude<T, U> = T extends U ? never : T;
// // 这里extends 分配律特点(如果用在extends 前是泛型且T是联合类型时，会将联合类型每一个进行判断，然后将符合条件的联合在一起)。
//
// type T = MyExclude<"a" | "b" | "c", "a">;
// T => "a" | "b" | "c"
// 1、"a" extends "a" ? never : T
// 2、"b" extends "a" ? never : T
// 3、"c" extends "a" ? never : T
// 将符合条件的组成一个新的联合类型

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<MyExclude<"a" | "b" | "c", "a">, Exclude<"a" | "b" | "c", "a">>>,
  Expect<
    Equal<
      MyExclude<"a" | "b" | "c", "a" | "b">,
      Exclude<"a" | "b" | "c", "a" | "b">
    >
  >,
  Expect<
    Equal<
      MyExclude<string | number | (() => void), Function>,
      Exclude<string | number | (() => void), Function>
    >
  >
];
