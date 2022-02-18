/*
 * @description 实现 Replace<S, From, To> 将字符串 S 中的第一个子字符串 From 替换为 To 。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/116-medium-replace/README.md
 */

/* _____________ Your Code Here _____________ */

// 初始版本
type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer F}${From}${infer R}`
  ? `${F}${To}${R}`
  : S;

// 递归版本
// type Replace<
//   S extends string,
//   From extends string,
//   To extends string
// > = From extends ""
//   ? S
//   : S extends `${infer F}${From}${infer R}`
//   ? `${F}${To}${R}` extends `${infer F}${From}${infer R}`
//     ? Replace<`${F}${To}${R}`, From, To>
//     : `${F}${To}${R}`
//   : S;
// 这个递归是不对的
// 当Replace<"foobarfoobar", "ob", "b"> 这样的时候，则会出现异常
// 替换的时候并不是一致性替换而是分次替换 ob=>b fob=>fb

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Replace<"foobarbar", "bar", "foo">, "foofoobar">>,
  Expect<Equal<Replace<"foobar", "bar", "foo">, "foofoo">>,
  Expect<Equal<Replace<"foobarbar", "", "foo">, "foobarbar">>,
  Expect<Equal<Replace<"foo barbar", " ", "foo">, "foofoobarbar">>,
  Expect<Equal<Replace<" foo barbar", " ", "foo">, "foofoo barbar">>,
  Expect<Equal<Replace<"foobarbar", "bra", "foo">, "foobarbar">>,
  Expect<Equal<Replace<"", "", "">, "">>
];
