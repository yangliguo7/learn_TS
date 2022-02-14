/*
 * @description 实现内置的 Parameters 类型
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/3312-easy-parameters/README.zh-CN.md
 */

/* _____________ 你的代码 _____________ */

type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

// 注意这里的infer写法
// ...args: infer P 和数组写法不一样

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

const foo = (arg1: string, arg2: number): void => {};
const bar = (arg1: boolean, arg2: { a: "A" }): void => {};
const baz = (): void => {};

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: "A" }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>
];
