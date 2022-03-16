/*
 * @description Convert a string literal to a number, which behaves like Number.parseInt.
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/300-hard-string-to-number/README.md
 */

/* _____________ Your Code Here _____________ */

// type ToNumber< // 不适合大数字运算
//   S extends string,
//   A extends unknown[] = []
// > = `${A["length"]}` extends S ? A["length"] : ToNumber<S, [...A, 1]>;

// 可以看这题
// src/2、medium/34、MinusOne.ts 减少递归次数

// 创建数组
type GenerateArrHelper<
  T extends string,
  A extends unknown[] = []
> = `${A["length"]}` extends T ? A : GenerateArrHelper<T, [...A, 1]>;
// 给定一个数字进行构建数组 89  = 8*10+9
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

type ToNumber<T extends string> = GenerateArr<T>["length"];

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<ToNumber<"0">, 0>>,
  Expect<Equal<ToNumber<"5">, 5>>,
  Expect<Equal<ToNumber<"12">, 12>>,
  Expect<Equal<ToNumber<"27">, 27>>,
  Expect<Equal<ToNumber<"1101">, 1101>>,
];
