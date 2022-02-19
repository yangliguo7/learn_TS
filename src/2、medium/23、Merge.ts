/*
 * @description 合并两个类型，后面的类型会覆盖前面的类型
 */

/* _____________ Your Code Here _____________ */

// type Merge<F, S> = Pick<F, Exclude<keyof F, keyof S>> & S;

type Merge<F, S> = {
  [P in Exclude<keyof F, keyof S> | keyof S]: P extends Exclude<
    keyof F,
    keyof S
  >
    ? F[P]
    : P extends keyof S
    ? S[P]
    : never;
};

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type Foo = { a: number; b: string };
type Bar = {
  b: number;
  c: boolean;
};

type cases = [
  Expect<
    Equal<
      Merge<Foo, Bar>,
      {
        a: number;
        b: number;
        c: boolean;
      }
    >
  >
];
