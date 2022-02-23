/*
 * @description Implement the type version of lodash's _.flip.
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/3196-medium-flip-arguments/README.md
 */

/* _____________ Your Code Here _____________ */
type ReverseArray<T extends any[]> = T extends [infer F, ...infer R]
  ? [...ReverseArray<R>, F]
  : [];

type FlipArguments<T extends (...arg: any[]) => any> = T extends (
  ...args: infer P
) => infer R
  ? (...args: ReverseArray<P>) => R
  : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<
    Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>
  >,
  Expect<
    Equal<
      FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>,
      (arg0: boolean, arg1: number, arg2: string) => void
    >
  >
];
