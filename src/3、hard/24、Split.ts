/*
 * @description split : string => arr
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/2822-hard-split/README.md
 */

/* _____________ Your Code Here _____________ */
type Split<
  S extends string,
  SEP extends string,
  A extends unknown[] = []
> = string extends S
  ? string[]
  : S extends `${infer F}${SEP}${infer R}`
  ? Split<R, SEP, [...A, F]>
  : SEP extends ""
  ? A
  : [...A, S];

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Split<"Hi! How are you?", "z">, ["Hi! How are you?"]>>,
  Expect<Equal<Split<"Hi! How are you?", " ">, ["Hi!", "How", "are", "you?"]>>,
  Expect<Equal<Split<"Hi! How are you?", "ow">, ["Hi! H", " are you?"]>>,
  Expect<
    Equal<
      Split<"Hi! How are you?", "">,
      [
        "H",
        "i",
        "!",
        " ",
        "H",
        "o",
        "w",
        " ",
        "a",
        "r",
        "e",
        " ",
        "y",
        "o",
        "u",
        "?"
      ]
    >
  >,
  Expect<Equal<Split<"", "">, []>>,
  Expect<Equal<Split<"", "z">, [""]>>,
  Expect<Equal<Split<string, "whatever">, string[]>>
];
