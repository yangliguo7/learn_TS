/*
 * @description 取数字整数部分
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/5140-medium-trunc/README.md
 */

/* _____________ Your Code Here _____________ */

type Trunc<T extends number | string> = `${T}` extends `${infer F}.${infer R}`
  ? F
  : `${T}`;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Trunc<0.1>, "0">>,
  Expect<Equal<Trunc<1.234>, "1">>,
  Expect<Equal<Trunc<12.345>, "12">>,
  Expect<Equal<Trunc<-5.1>, "-5">>,
  Expect<Equal<Trunc<"1.234">, "1">>,
  Expect<Equal<Trunc<"-10.234">, "-10">>,
  Expect<Equal<Trunc<10>, "10">>
];
