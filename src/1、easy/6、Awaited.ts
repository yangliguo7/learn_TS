/*
 * @description 假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 Promise 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/189-easy-awaited/README.zh-CN.md
 */

/* _____________ 你的代码 _____________ */

type MyAwaited<T extends Promise<any>> = T extends Promise<infer P>
  ? P extends Promise<infer E>
    ? MyAwaited<P>
    : P
  : never;

// 使用到了infer和递归
// 1、仅在条件类型的“extends”子句中允许使用“infer”声明。
// 因此 type MyAwaited2<T extends Promise<infer a>>  这种推断a的类型是错误的
// 2、利用了递归

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>
];

// @ts-expect-error
type error = MyAwaited<number>;
