/*
 * @description 找到Required 的key
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/89-hard-required-keys/README.md
 */

/* _____________ Your Code Here _____________ */

type RequiredKeys<T> = keyof {
  [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P];
};

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<RequiredKeys<{ a: number; b?: string }>, "a">>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined }>, "a">>,
  Expect<
    Equal<
      RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>,
      "a" | "c" | "d"
    >
  >,
  Expect<Equal<RequiredKeys<{}>, never>>
];
