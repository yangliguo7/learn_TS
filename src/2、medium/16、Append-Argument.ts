/*
 * @description 追加参数
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/191-medium-append-argument/README.md
 */

/* _____________ Your Code Here _____________ */

type AppendArgument<Fn, A> = Fn extends (...args: infer P) => infer R
  ? (...args: [...P, A]) => R
  : never;
// 注意这里的参数类型

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>;
type Result1 = (a: number, b: string, x: boolean) => number;

type Case2 = AppendArgument<() => void, undefined>;
type Result2 = (x: undefined) => void;

type cases = [Expect<Equal<Case1, Result1>>, Expect<Equal<Case2, Result2>>];
