/*
 * @description 将字符串转为联合类型
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/531-medium-string-to-union/README.md
 */

/* _____________ Your Code Here _____________ */

type StringToUnion<T extends string> = T extends ""
  ? never
  : T extends `${infer F}${infer R}`
  ? F | StringToUnion<R>
  : T;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<StringToUnion<"">, never>>,
  Expect<Equal<StringToUnion<"t">, "t">>,
  Expect<Equal<StringToUnion<"hello">, "h" | "e" | "l" | "l" | "o">>,
  Expect<
    Equal<
      StringToUnion<"coronavirus">,
      "c" | "o" | "r" | "o" | "n" | "a" | "v" | "i" | "r" | "u" | "s"
    >
  >
];
