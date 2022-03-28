/*
 * @description 从一个字符中去除指定的字符
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/2059-hard-drop-string/README.md
 */

/* _____________ Your Code Here _____________ */

type StringToUnion<S extends string> = S extends `${infer F}${infer R}`
  ? F | StringToUnion<R>
  : never;

type DropString<
  S extends string,
  R extends string
> = S extends `${infer F}${infer A}`
  ? `${F extends StringToUnion<R> ? "" : F}${DropString<A, R>}`
  : "";

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<DropString<"butter fly!", "">, "butter fly!">>,
  Expect<Equal<DropString<"butter fly!", " ">, "butterfly!">>,
  Expect<Equal<DropString<"butter fly!", "but">, "er fly!">>,
  Expect<
    Equal<DropString<" b u t t e r f l y ! ", "but">, "     e r f l y ! ">
  >,
  Expect<Equal<DropString<"    butter fly!        ", " ">, "butterfly!">>,
  Expect<Equal<DropString<" b u t t e r f l y ! ", " ">, "butterfly!">>,
  Expect<
    Equal<DropString<" b u t t e r f l y ! ", "but">, "     e r f l y ! ">
  >,
  Expect<
    Equal<DropString<" b u t t e r f l y ! ", "tub">, "     e r f l y ! ">
  >,
  Expect<
    Equal<DropString<" b u t t e r f l y ! ", "b">, "  u t t e r f l y ! ">
  >,
  Expect<Equal<DropString<" b u t t e r f l y ! ", "t">, " b u   e r f l y ! ">>
];
