/*
 * @description 实现柯里化
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/17-hard-currying-1/README.md
 */

/* _____________ Your Code Here _____________ */

type Curry<A> = A extends (...args: infer P) => infer R
  ? P extends [infer F, ...infer REST]
    ? (a:F) => Curry<(...args:REST) => R>
    : R
  : any;

declare function Currying<A>(fn: A): Curry<A>; //  注意 这里递归不能递归Currying 因为Currying 是一个函数

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

const curried1 = Currying((a: string, b: number, c: boolean) => true);
const curried2 = Currying(
  (
    a: string,
    b: number,
    c: boolean,
    d: boolean,
    e: boolean,
    f: string,
    g: boolean
  ) => true
);

type cases = [
  Expect<
    Equal<typeof curried1, (a: string) => (b: number) => (c: boolean) => true>
  >,
  Expect<
    Equal<
      typeof curried2,
      (
        a: string
      ) => (
        b: number
      ) => (
        c: boolean
      ) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
    >
  >
];
