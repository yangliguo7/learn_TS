/*
 * @description 实现sum
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/476-extreme-sum/README.md
 */

/* _____________ Your Code Here _____________ */
// 不适合大数运算
// type GenerateArrHelper<
//   T extends string,
//   A extends unknown[] = []
// > = `${A["length"]}` extends T ? A : GenerateArrHelper<T, [...A, 1]>;
// // 给定一个数字进行构建数组 89  = 8*10+9
// type GenerateArr<
//   T extends string,
//   A extends unknown[] = []
// > = T extends `${infer F}${infer R}`
//   ? GenerateArr<
//       R,
//       [
//         ...A,
//         ...A,
//         ...A,
//         ...A,
//         ...A,
//         ...A,
//         ...A,
//         ...A,
//         ...A,
//         ...A,
//         ...GenerateArrHelper<F>
//       ]
//     >
//   : A;
// type SumHelper<A extends string, B extends string> = `${[
//   ...GenerateArr<A>,
//   ...GenerateArr<B>
// ]["length"] &
//   number}`;
// type GetString<A extends string | number | bigint> = A extends string
//   ? A
//   : A extends number
//   ? `${A & number}`
//   : A extends bigint
//   ? `${A & bigint}`
//   : "0";
// type Sum<
//   A extends string | number | bigint,
//   B extends string | number | bigint
// > = SumHelper<GetString<A>, GetString<B>>;
// type a  = GenerateArr<"39532">

// ------------------------------------------------------------------------------------
type ReverseString<S extends string> = S extends `${infer F}${infer R}`
  ? `${ReverseString<R>}${F}`
  : "";

type GetString<A extends string | number | bigint> = A extends string
  ? A
  : A extends number
  ? `${A & number}`
  : A extends bigint
  ? `${A & bigint}`
  : "0";

type GenerateArrHelper<
  T extends string,
  A extends unknown[] = []
> = `${A["length"]}` extends T ? A : GenerateArrHelper<T, [...A, 1]>;

type GenerateArr<
  T extends string,
  A extends unknown[] = []
> = T extends `${infer F}${infer R}`
  ? GenerateArr<
      R,
      [
        ...A,
        ...A,
        ...A,
        ...A,
        ...A,
        ...A,
        ...A,
        ...A,
        ...A,
        ...A,
        ...GenerateArrHelper<F>
      ]
    >
  : A;

type SumCore<A extends string, B extends string, T extends string = "0"> = [
  ...GenerateArr<A>,
  ...GenerateArr<B>,
  ...GenerateArr<T>
] extends [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ...infer F]
  ? {
      flag: true;
      num: `${F["length"] & number}`;
    }
  : {
      flag: false;
      num: `${[
        ...GenerateArr<A>,
        ...GenerateArr<B>,
        ...GenerateArr<T>
      ]["length"] &
        number}`;
    };

type RestString<B extends string> = B extends `${infer BF}${infer BR}`
  ? {
      F: BF;
      R: BR;
    }
  : {
      F: "0";
      R: "";
    };

type SumCoreHelper<
  AF extends string,
  AR extends string,
  B extends string,
  T extends string
> = `${SumCore<AF, RestString<B>["F"], T>["num"]}${SumHelper<
  AR,
  RestString<B>["R"],
  `${SumCore<AF, RestString<B>["F"], T>["flag"] extends true ? "1" : "0"}`
>}`;

type SumHelper<
  A extends string,
  B extends string,
  T extends string = "0"
> = A extends `${infer AF}${infer AR}`
  ? SumCoreHelper<AF, AR, B, T>
  : B extends `${infer BF}${infer BR}`
  ? SumCoreHelper<BF, BR, A, T>
  : T extends "1"
  ? "1"
  : "";

type Sum<
  A extends string | number | bigint,
  B extends string | number | bigint
> = ReverseString<
  SumHelper<ReverseString<GetString<A>>, ReverseString<GetString<B>>>
>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Sum<2, 3>, "5">>,
  Expect<Equal<Sum<"13", "21">, "34">>,
  Expect<Equal<Sum<"15", "15">, "30">>,
  Expect<Equal<Sum<"328", 7>, "335">>,
  Expect<Equal<Sum<1_000_000_000_000n, "123">, "1000000000123">>,
  Expect<Equal<Sum<9999, 1>, "10000">>,
  Expect<Equal<Sum<4325234, "39532">, "4364766">>,
  Expect<Equal<Sum<728, 0>, "728">>,
  Expect<Equal<Sum<"0", 213>, "213">>,
  Expect<Equal<Sum<0, "0">, "0">>,

  Expect<Equal<GetString<0>, "0">>,
  Expect<Equal<GetString<"0">, "0">>,
  Expect<Equal<GetString<1_000_000_000_000n>, "1000000000000">>,

  Expect<Equal<ReverseString<"">, "">>,
  Expect<Equal<ReverseString<"123">, "321">>,
  Expect<Equal<ReverseString<"0">, "0">>,

  Expect<
    Equal<
      SumCore<"1", "1">,
      {
        flag: false;
        num: "2";
      }
    >
  >,
  Expect<
    Equal<
      SumCore<"1", "0">,
      {
        flag: false;
        num: "1";
      }
    >
  >,
  Expect<
    Equal<
      SumCore<"9", "1">,
      {
        flag: true;
        num: "0";
      }
    >
  >,
  Expect<
    Equal<
      SumCore<"8", "8">,
      {
        flag: true;
        num: "6";
      }
    >
  >
];
