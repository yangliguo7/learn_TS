/*
 * @description 判断回文串
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/4037-hard-ispalindrome/README.md
 */

/* _____________ Your Code Here _____________ */
// type IsPalindromeHelper<
//   T extends string,
//   A extends string = ""
// > = T extends `${infer F}${infer R}` ? IsPalindromeHelper<R, `${F}${A}`> : A;
type ToString<T> = T extends number
  ? `${T & number}`
  : T extends string
  ? T
  : never;
// type IsPalindrome<T> = ToString<T> extends IsPalindromeHelper<ToString<T>>
//   ? true
//   : false;

// 方法2
type IsPalindrome<T> = ToString<T> extends `${infer F}${infer C}${infer R}`
  ? F extends R
    ? IsPalindrome<C>
    : false
  : true;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<IsPalindrome<"abc">, false>>,
  Expect<Equal<IsPalindrome<"b">, true>>,
  Expect<Equal<IsPalindrome<"">, true>>,
  Expect<Equal<IsPalindrome<"ab">, false>>,
  Expect<Equal<IsPalindrome<"abca">, false>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>
];
