/*
 * @description mplement a type DeepPick, that extends Utility types Pick. A type takes two arguments.
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/956-hard-deeppick/README.md
 */

/* _____________ Your Code Here _____________ */
// 这里的P 就是纯字符串
type DeepPickHelper<
  T extends unknown,
  P extends string
> = P extends `${infer F}.${infer R}`
  ? F extends keyof T
    ? Record<F, DeepPickHelper<T[F], R>>
    : unknown
  : P extends keyof T
  ? Record<P, T[P]>
  : unknown;

// 联合类型转交叉类型
type UnionToIntersection<T extends unknown> = (
  T extends unknown ? (a: T) => unknown : unknown
) extends (a: infer F) => unknown
  ? F
  : unknown;
// P 可能是联合类型也有可能是纯字符串
type DeepPick<
  T extends Record<string, unknown>,
  P extends string
> = UnionToIntersection<P extends unknown ? DeepPickHelper<T, P> : unknown>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type Obj = {
  a: number;
  b: string;
  c: boolean;
  obj: {
    d: number;
    e: string;
    f: boolean;
    obj2: {
      g: number;
      h: string;
      i: boolean;
    };
  };
  obj3: {
    j: number;
    k: string;
    l: boolean;
  };
};

type cases = [
  Expect<Equal<DeepPick<Obj, "">, unknown>>,
  Expect<Equal<DeepPick<Obj, "a">, { a: number }>>,
  Expect<
    Equal<DeepPick<Obj, "a" | "obj.e">, { a: number } & { obj: { e: string } }>
  >,
  Expect<
    Equal<
      DeepPick<Obj, "a" | "obj.e" | "obj.obj2.i">,
      { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }
    >
  >
];
