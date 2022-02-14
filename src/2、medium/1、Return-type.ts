/*
 * @description 不使用 ReturnType 实现 TypeScript 的 ReturnType<T> 泛型。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/2-medium-return-type/README.zh-CN.md
 */

/* _____________ 你的代码 _____________ */

type MyReturnType<T extends (...args) => any> = T extends (...args) => infer P
  ? P
  : never;

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type ComplexObject = {
  a: [12, "foo"];
  bar: "hello";
  prev(): number;
};

const fn = (v: boolean) => (v ? 1 : 2);
const fn1 = (v: boolean, w: any) => (v ? 1 : 2);

type cases = [
  Expect<Equal<string, MyReturnType<() => string>>>,
  Expect<Equal<123, MyReturnType<() => 123>>>,
  Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
  Expect<Equal<() => "foo", MyReturnType<() => () => "foo">>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>
];
