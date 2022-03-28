/*
 * @description 判断是不是必选项
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/2857-hard-isrequiredkey/README.md
 */

/* _____________ Your Code Here _____________ */

type IsRequiredKey<T, K extends keyof T> = Pick<T, K> extends Pick<
  Required<T>,
  K
>
  ? true
  : false;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "a">, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "b">, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, "b" | "a">, false>>
];
