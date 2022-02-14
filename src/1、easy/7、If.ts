/*
 * @description 实现一个 IF 类型，它接收一个条件类型 C ，一个判断为真时的返回类型 T ，以及一个判断为假时的返回类型 F。 C 只能是 true 或者 false， T 和 F 可以是任意类型。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/268-easy-if/README.zh-CN.md
 */

/* _____________ 你的代码 _____________ */

type If<C extends boolean, T, F> = C extends true ? T : F;

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<If<true, "a", "b">, "a">>,
  Expect<Equal<If<false, "a", 2>, 2>>
];

type error = If<null, 'a', 'b'>
