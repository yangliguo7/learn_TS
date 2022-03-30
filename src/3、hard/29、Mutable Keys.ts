/*
 * @description 取出所有不是readonly的数据
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/5181-hard-mutable-keys/README.md
 */

/* _____________ Your Code Here _____________ */

// 在不知道一个属性修饰符是否为readonly的情况下，移除掉 readonly 之后还与之前是等同的（Equals）, 那就说明其本来是带有 readonly 修饰符的

type MutableKeys<T extends Record<string, any>> = keyof {
  [P in keyof T as true extends Equal<Pick<T, P>, Readonly<Pick<T, P>>>
    ? never
    : P]: T[P];
};

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<MutableKeys<{ a: number; readonly b: string }>, "a">>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b: undefined }>, "a">>,
  Expect<
    Equal<
      MutableKeys<{ a: undefined; readonly b?: undefined; c: string; d: null }>,
      "a" | "c" | "d"
    >
  >,
  Expect<Equal<MutableKeys<{}>, never>>
];
