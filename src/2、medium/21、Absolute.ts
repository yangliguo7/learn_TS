/*
 * @description 实现绝对值
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/529-medium-absolute/README.md
 */

/* _____________ Your Code Here _____________ */

type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}`
  ? R
  : `${T}`;
// `${T}` 会把T 变成字符串

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Absolute<0>, "0">>,
  Expect<Equal<Absolute<-0>, "0">>,
  Expect<Equal<Absolute<10>, "10">>,
  Expect<Equal<Absolute<-5>, "5">>,
  Expect<Equal<Absolute<"0">, "0">>,
  Expect<Equal<Absolute<"-0">, "0">>,
  Expect<Equal<Absolute<"10">, "10">>,
  Expect<Equal<Absolute<"-5">, "5">>,
  Expect<Equal<Absolute<-1_000_000n>, "1000000">>,
  Expect<Equal<Absolute<9_999n>, "9999">>
];
