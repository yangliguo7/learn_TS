/*
 * @description 实现类型版本的 Array.unshift。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/3060-easy-unshift/README.zh-CN.md
 */

/* _____________ 你的代码 _____________ */

type Unshift<T extends any[], U> = [U, ...T];

/* _____________ 测试用例 _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<["1", 2, "3"], boolean>, [boolean, "1", 2, "3"]>>
];
