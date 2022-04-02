/*
 * @description 解析queryString
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/151-extreme-query-string-parser/README.md
 */

// 只有key => key:true
// 一个key多个value => key:[v1,v2]
// 重复数据只展示一次

/* _____________ Your Code Here _____________ */

type Item = [string, (string | true)[]];

// 获取key。 k1=v1 => k1 ; k1 => k1
type GetKey<T extends string> = T extends `${infer F}=${infer R}` ? F : T;

// 获取value。 k1=v1 => v1 ; k1 => true
type GetValue<T extends string> = T extends `${infer F}=${infer R}` ? R : true;

// 合并数据
type Merge<S extends string, A extends Item[] = []> = A extends [
  infer F,
  ...infer R
]
  ? F extends Item
    ? F["length"] extends 2
      ? GetKey<S> extends F[0] // 找到了相同的数据
        ? GetValue<S> extends F[1][number] // 当传入的数据是重复数据
          ? R extends Item[]
            ? [F, ...Merge<S, R>]
            : any
          : R extends Item[]
          ? GetValue<S> extends true
            ? [F, ...Merge<S, R>]
            : [[F[0], [...F[1], GetValue<S>]], ...Merge<S, R>] // 如果这个数据是true则不进行传入
          : any
        : R extends Item[]
        ? [F, ...Merge<S, R>]
        : any
      : any
    : any
  : [];

// 解析字符串为[[key,[value]]]的数组
type ParseStringToArr<
  S extends string,
  A extends Item[] = []
> = S extends `${infer F}&${infer R}`
  ? GetKey<F> extends A[number][0] // 如果key已经出现
    ? Merge<F, A>
    : ParseStringToArr<R, [...A, [GetKey<F>, [GetValue<F>]]]>
  : GetKey<S> extends A[number][0]
  ? Merge<S, A>
  : S extends ""
  ? []
  : [...A, [GetKey<S>, [GetValue<S>]]];

// 将Item数组转为{key:[value]}的联合类型
type ParseArrToIntersection<A extends Item[]> = A extends [infer F, ...infer R]
  ? (F extends Item
      ? F["length"] extends 2
        ? Record<F[0] & string, F[1]>
        : {}
      : {}) &
      (R extends Item[] ? ParseArrToIntersection<R> : {})
  : {};

// 将联合类型{} & {} Pick成一个整个的对象
type Debug<T> = {
  [P in keyof T]: T[P] extends unknown[]
    ? T[P]["length"] extends 1
      ? T[P][0]
      : T[P]
    : never;
};

type ParseQueryString<S extends string> = Debug<
  ParseArrToIntersection<ParseStringToArr<S>>
>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";
//
type cases = [
  Expect<Equal<ParseQueryString<"">, {}>>,
  Expect<Equal<ParseQueryString<"k1">, { k1: true }>>,
  Expect<Equal<ParseQueryString<"k1&k1">, { k1: true }>>,
  Expect<Equal<ParseQueryString<"k1&k2">, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1">, { k1: "v1" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v2">, { k1: ["v1", "v2"] }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2=v2">, { k1: "v1"; k2: "v2" }>>,
  Expect<
    Equal<ParseQueryString<"k1=v1&k2=v2&k1=v2">, { k1: ["v1", "v2"]; k2: "v2" }>
  >,
  Expect<Equal<ParseQueryString<"k1=v1&k2">, { k1: "v1"; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v1">, { k1: "v1" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1">, { k1: "v1" }>>,

  Expect<Equal<ParseStringToArr<"k1=v1&k1">, [["k1", ["v1"]]]>>,
  Expect<Equal<ParseStringToArr<"k1=v1">, [["k1", ["v1"]]]>>,
  Expect<Equal<ParseStringToArr<"k1">, [["k1", [true]]]>>,
  Expect<Equal<ParseStringToArr<"k1=v1&k1=v2">, [["k1", ["v1", "v2"]]]>>,
  Expect<
    Equal<ParseStringToArr<"k1=v1&k2=v2">, [["k1", ["v1"]], ["k2", ["v2"]]]>
  >,
  Expect<Equal<ParseStringToArr<"k1=v1&k2">, [["k1", ["v1"]], ["k2", [true]]]>>
];
