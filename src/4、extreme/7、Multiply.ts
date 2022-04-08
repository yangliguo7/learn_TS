/*
 * @description 实现乘法
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/517-extreme-multiply/README.md
 */

/* _____________ Your Code Here _____________ */
import { Sum, ReverseString, GetString } from "./6、Sum";

// L 代表的 当前的位数 如果是十分位则需要末尾补1个0 以此类推
type MultiplySingle<
  A extends string,
  B extends string,
  L extends number,
  T extends unknown[] = [], // 计数器 记录相加的次数,
  R extends string = "0"
> = A extends "0"
  ? "0"
  : B extends "0"
  ? "0"
  : `${T["length"] & number}` extends A
  ? `${R}`
  : MultiplySingle<A, B, L, [...T, 1], Sum<R, B>>;

type MultiplyHelper<
  A extends string,
  B extends string,
  R extends string[] = []
> = A extends "0"
  ? "0"
  : B extends "0"
  ? "0"
  : A extends `${infer AF}${infer AR}`
  ? MultiplyHelper<AR, B, [...R, MultiplySingle<AF, B, R["length"]>]>
  : R;

type GetValueFromStringArr<
  A extends unknown[],
  I extends number[] = [],
  Result extends string = "0",
  Z extends string = ""
> = A extends [infer F, ...infer R]
  ? GetValueFromStringArr<
      R,
      [...I, 1],
      Sum<Result, `${F & string}${Z}`>,
      `${Z}0`
    >
  : Result;

type Multiply<
  A extends string | number | bigint,
  B extends string | number | bigint
> = GetValueFromStringArr<
  MultiplyHelper<ReverseString<GetString<A>>, GetString<B>>
>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Multiply<2, 3>, "6">>,
  Expect<Equal<Multiply<3, "5">, "15">>,
  Expect<Equal<Multiply<"4", 10>, "40">>,
  Expect<Equal<Multiply<0, 16>, "0">>,
  Expect<Equal<Multiply<"13", "21">, "273">>,
  Expect<Equal<Multiply<"43423", 321543n>, "13962361689">>,
  Expect<Equal<Multiply<9999, 1>, "9999">>,
  Expect<Equal<Multiply<4325234, "39532">, "170985150488">>,
  Expect<Equal<Multiply<100_000n, "1">, "100000">>,
  Expect<Equal<Multiply<259, 9125385>, "2363474715">>,
  Expect<Equal<Multiply<9, 99>, "891">>,
  Expect<Equal<Multiply<315, "100">, "31500">>,
  Expect<Equal<Multiply<11n, 13n>, "143">>,
  Expect<Equal<Multiply<728, 0>, "0">>,
  Expect<Equal<Multiply<"0", 213>, "0">>,
  Expect<Equal<Multiply<0, "0">, "0">>,

  Expect<Equal<MultiplyHelper<"1", "11">, ["11"]>>,
  Expect<Equal<MultiplyHelper<"12", "11">, ["11", "22"]>>
];
