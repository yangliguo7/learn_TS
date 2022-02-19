/*
 * @description 完成一个类似String#length的迭代器
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/298-medium-length-of-string/README.md
 */

/* _____________ Your Code Here _____________ */

// type LengthOfString<
//   S extends string,
//   A extends any[] = []
// > = S extends `${infer F}${infer R}`
//   ? LengthOfString<R, [...A, F]>
//   : A["length"];

// 上面这个解法 需要一个A默认参数 不太友好
// 可以修改成
type StringToArr<S extends string> = S extends `${infer F}${infer R}`
  ? [F, ...StringToArr<R>]
  : [];
type LengthOfString<S extends string> = StringToArr<S>["length"];

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>
];
