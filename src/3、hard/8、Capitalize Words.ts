/*
 * @description 每一个单词首字母大写
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/112-hard-capitalizewords/README.md
 */

/* _____________ Your Code Here _____________ */
// 方法1 枚举字母 有点傻瓜 但很高校
// type Code<
//   T extends string =
//     | "a"
//     | "b"
//     | "c"
//     | "d"
//     | "e"
//     | "f"
//     | "g"
//     | "h"
//     | "i"
//     | "j"
//     | "k"
//     | "l"
//     | "m"
//     | "n"
//     | "o"
//     | "p"
//     | "r"
//     | "s"
//     | "t"
//     | "u"
//     | "v"
//     | "w"
//     | "x"
//     | "y"
//     | "z"
// > = T | Uppercase<T>; // 注意 这Uppercase 也可以传联合类型
// type CapitalizeWordsHelper<S extends string> = S extends `${infer F}${infer R}`
//   ? F extends Code
//     ? `${F}${CapitalizeWordsHelper<R>}`
//     : `${F}${CapitalizeWordsHelper<Capitalize<R>>}`
//   : "";
// type CapitalizeWords<S extends string> = CapitalizeWordsHelper<Capitalize<S>>;

// 方法2
// 像分割字符、: . ; 什么的 他们大小写是一样的
// 所以
type CapitalizeWordsHelper<S extends string> = S extends `${infer F}${infer R}`
  ? `${F}${CapitalizeWordsHelper<
      Uppercase<F> extends Lowercase<F> ? Capitalize<R> : R
    >}`
  : "";
type CapitalizeWords<S extends string> = CapitalizeWordsHelper<Capitalize<S>>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<CapitalizeWords<"foobar">, "Foobar">>,
  Expect<Equal<CapitalizeWords<"FOOBAR">, "FOOBAR">>,
  Expect<Equal<CapitalizeWords<"foo bar">, "Foo Bar">>,
  Expect<Equal<CapitalizeWords<"foo bar hello world">, "Foo Bar Hello World">>,
  Expect<Equal<CapitalizeWords<"foo bar.hello,world">, "Foo Bar.Hello,World">>,
  Expect<Equal<CapitalizeWords<"">, "">>
];
