/*
 * @description 二进制数据转为数字
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/6141-hard-binary-to-decimal/README.md
 */

/* _____________ Your Code Here _____________ */

type ReplaceStartZero<T extends string> = T extends `${infer F}${infer R}`
  ? "" extends R
    ? F
    : "0" extends F
    ? ReplaceStartZero<R>
    : T
  : T;

type ReverseString<
  T extends string,
  P extends string = ""
> = T extends `${infer F}${infer R}` ? ReverseString<R, `${F}${P}`> : P;

type BinaryToDecimalHelper<
  S extends string,
  A extends unknown[] = [1], // 当前下标对应的2进制数
  R extends unknown[] = [] // 结果
> = S extends `${infer F}${infer Rest}`
  ? F extends "1"
    ? BinaryToDecimalHelper<Rest, [...A, ...A], [...R, ...A]>
    : BinaryToDecimalHelper<Rest, [...A, ...A], R>
  : R["length"];

type BinaryToDecimal<S extends string> = BinaryToDecimalHelper<
  ReverseString<ReplaceStartZero<S>>
>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<BinaryToDecimal<"10">, 2>>,
  Expect<Equal<BinaryToDecimal<"0">, 0>>,
  Expect<Equal<BinaryToDecimal<"0011">, 3>>,
  Expect<Equal<BinaryToDecimal<"00000000">, 0>>,
  Expect<Equal<BinaryToDecimal<"11111111">, 255>>,
  Expect<Equal<BinaryToDecimal<"10101010">, 170>>,

  Expect<Equal<ReplaceStartZero<"00000">, "0">>,
  Expect<Equal<ReplaceStartZero<"00001">, "1">>,
  Expect<Equal<ReplaceStartZero<"00101">, "101">>,
  Expect<Equal<ReplaceStartZero<"">, "">>,

  Expect<Equal<ReverseString<"01">, "10">>,
  Expect<Equal<ReverseString<"">, "">>,
  Expect<Equal<ReverseString<"0">, "0">>
];
