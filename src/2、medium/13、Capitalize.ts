/*
 * @description 首字母大写
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/110-medium-capitalize/README.md
 */

/* _____________ Your Code Here _____________ */

type MyCapitalize<S extends string> = S extends `${infer F}${infer R}`
  ? `${Capitalize<F>}${R}`
  : S;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<MyCapitalize<" ">, Capitalize<" ">>>,
  Expect<Equal<MyCapitalize<"foobar">, Capitalize<"foobar">>>,
  Expect<Equal<MyCapitalize<"FOOBAR">, "FOOBAR">>,
  Expect<Equal<MyCapitalize<"foo bar">, "Foo bar">>,
  Expect<Equal<MyCapitalize<"">, "">>,
  Expect<Equal<MyCapitalize<"a">, "A">>,
  Expect<Equal<MyCapitalize<"b">, "B">>,
  Expect<Equal<MyCapitalize<"c">, "C">>,
  Expect<Equal<MyCapitalize<"d">, "D">>,
  Expect<Equal<MyCapitalize<"e">, "E">>,
  Expect<Equal<MyCapitalize<"f">, "F">>,
  Expect<Equal<MyCapitalize<"g">, "G">>,
  Expect<Equal<MyCapitalize<"h">, "H">>,
  Expect<Equal<MyCapitalize<"i">, "I">>,
  Expect<Equal<MyCapitalize<"j">, "J">>,
  Expect<Equal<MyCapitalize<"k">, "K">>,
  Expect<Equal<MyCapitalize<"l">, "L">>,
  Expect<Equal<MyCapitalize<"m">, "M">>,
  Expect<Equal<MyCapitalize<"n">, "N">>,
  Expect<Equal<MyCapitalize<"o">, "O">>,
  Expect<Equal<MyCapitalize<"p">, "P">>,
  Expect<Equal<MyCapitalize<"q">, "Q">>,
  Expect<Equal<MyCapitalize<"r">, "R">>,
  Expect<Equal<MyCapitalize<"s">, "S">>,
  Expect<Equal<MyCapitalize<"t">, "T">>,
  Expect<Equal<MyCapitalize<"u">, "U">>,
  Expect<Equal<MyCapitalize<"v">, "V">>,
  Expect<Equal<MyCapitalize<"w">, "W">>,
  Expect<Equal<MyCapitalize<"x">, "X">>,
  Expect<Equal<MyCapitalize<"y">, "Y">>,
  Expect<Equal<MyCapitalize<"z">, "Z">>
];
