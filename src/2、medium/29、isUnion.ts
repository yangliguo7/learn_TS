/*
 * @description Implement a type IsUnion, which takes an input type T and returns whether T resolves to a union type.
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/1097-medium-isunion/README.md
 */

/* _____________ Your Code Here _____________ */

// type Not<T extends boolean> = T extends true ? false : true;
// type IsUnion<T, U = T> = T extends U ? Not<Equal<T, U>> : false;
// 如果T 是联合类型则T是单一的数据
// 因为T 是联合类型，联合类型在extends会满足分配律，而U 则是联合类型

type IsUnion<T, U = T> = T extends T
  ? [Exclude<U, T>] extends never[]
    ? false
    : true
  : false;
// Exclude<string, string>  => never
// 这里需要是数组的原因是因为

// never 不会走 extends。因为 never 在左侧直接返回never

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<"a" | "b" | "c" | "d">, true>>,
  Expect<Equal<IsUnion<undefined | null | void | "">, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | "a">, false>>
];
