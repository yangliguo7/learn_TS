/*
 * @description 数组中任何一个元素是true则是true。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/949-medium-anyof/README.md
 */

/* _____________ Your Code Here _____________ */

// AnyOf
type AnyOf<T extends readonly any[]> = T[number] extends
  | 0
  | ""
  | false
  | []
  | { [index: string]: never }
  ? false
  : true;

// 注意 这里空对象是 { [index: string]: never } 不是 {}
// 因为 字符、number、数组 extends {} 为true

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<
    Equal<AnyOf<[1, "test", true, [1], { name: "test" }, { 1: "test" }]>, true>
  >,
  Expect<Equal<AnyOf<[1, "", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "test", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { name: "test" }]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { 1: "test" }]>, true>>,
  Expect<
    Equal<AnyOf<[0, "", false, [], { name: "test" }, { 1: "test" }]>, true>
  >,
  Expect<Equal<AnyOf<[0, "", false, [], {
    a:never
  }]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>
];
