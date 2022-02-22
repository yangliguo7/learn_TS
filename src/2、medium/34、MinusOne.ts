/*
 * @description 数字（always positive）减1
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/2257-medium-minusone/README.md
 */

/* _____________ Your Code Here _____________ */
// type MinusOne<T extends number> = GenerateArr<T> extends [1, ...infer R]
//   ? R["length"]
//   : T;
// // 构建数组减去1位
// type GenerateArr<T extends number, A extends any[] = []> = A["length"] extends T
//   ? A
//   : GenerateArr<T, [...A, 1]>;
// 上面这个只适用于小数量减法，因为当大数字时需要进行循环多次(执行 GenerateArr 多次)，ts会认为这个循环次数太多次报错

// 要解决这个问题，就是减少GenerateArr次数，不可以传入89就执行89次，传入 89 应该执行 8+9 次 (80=8*10)
type GenerateArr<
  T extends string,
  A extends any[] = []
> = `${A["length"]}` extends T ? A : GenerateArr<T, [...A, 1]>;
type CreateArr<
  S extends string,
  A extends any[] = []
> = S extends `${infer F}${infer L}`
  ? F extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
    ? CreateArr<
        L,
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
          ...GenerateArr<F>
        ]
      >
    : never
  : A;
type MinusOne<T extends number> = CreateArr<`${T}`> extends [
  infer F,
  ...infer R
]
  ? R["length"]
  : T;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>
];
