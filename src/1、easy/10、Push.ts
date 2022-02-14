/*
 * @description 在类型系统里实现通用的 Array.push
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/3057-easy-push/README.zh-CN.md
 */

/* _____________ 你的代码 _____________ */

type Push<T extends any[], U> = [...T, U];

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], "3">, [1, 2, "3"]>>,
  Expect<Equal<Push<["1", 2, "3"], boolean>, ["1", 2, "3", boolean]>>
];
