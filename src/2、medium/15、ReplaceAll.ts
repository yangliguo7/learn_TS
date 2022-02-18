/*
 * @description 实现 ReplaceAll<S, From, To> 将一个字符串 S 中的所有子字符串 From 替换为 To。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/119-medium-replaceall/README.zh-CN.md
 */

/* _____________ 你的代码 _____________ */

// type Replace<
//   S extends string,
//   From extends string,
//   To extends string
// > = From extends ""
//   ? S
//   : S extends `${infer F}${From}${infer R}`
//   ? `${F}${To}${R}`
//   : S;
//
// type ReplaceAll<
//   S extends string,
//   From extends string,
//   To extends string
// > = From extends ""
//   ? S
//   : S extends `${infer F}${From}${infer R}`
//   ? R extends `${infer F2}${From}${infer R2}`
//     ? `${F}${To}${ReplaceAll<R, From, To>}`
//     : Replace<S, From, To>
//   : S;

// 简化写法
// 因为ReplaceAll<S, From, To> 不满足条件 返回的就是S
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer F}${From}${infer R}`
  ? `${F}${To}${ReplaceAll<R, From, To>}`
  : S;

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<ReplaceAll<"foobar", "bar", "foo">, "foofoo">>,
  Expect<Equal<ReplaceAll<"foobar", "bag", "foo">, "foobar">>,
  Expect<Equal<ReplaceAll<"foobarbar", "bar", "foo">, "foofoofoo">>,
  Expect<Equal<ReplaceAll<"t y p e s", " ", "">, "types">>,
  Expect<Equal<ReplaceAll<"foobarbar", "", "foo">, "foobarbar">>,
  Expect<Equal<ReplaceAll<"barfoo", "bar", "foo">, "foofoo">>,
  Expect<Equal<ReplaceAll<"foobarfoobar", "ob", "b">, "fobarfobar">>,
  Expect<Equal<ReplaceAll<"foboorfoboar", "bo", "b">, "foborfobar">>,
  Expect<Equal<ReplaceAll<"", "", "">, "">>,
  Expect<Equal<ReplaceAll<"AAAA", "", "B">, "AAAA">>
];
