/*
 * @description for-bar-baz -> forBarBaz
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/610-medium-camelcase/README.md
 */

/* _____________ Your Code Here _____________ */

type CamelCase<S extends string> = S extends `${infer F}-${infer R}`
  ? `${F}${R extends Capitalize<R> ? "-" : ""}${CamelCase<Capitalize<R>>}`
  : S;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<CamelCase<"foo-bar-baz">, "fooBarBaz">>,
  Expect<Equal<CamelCase<"foo-Bar-Baz">, "foo-Bar-Baz">>,
  Expect<Equal<CamelCase<"foo-Bar-baz">, "foo-BarBaz">>,
  Expect<Equal<CamelCase<"foo-bar">, "fooBar">>,
  Expect<Equal<CamelCase<"foo_bar">, "foo_bar">>,
  Expect<Equal<CamelCase<"foo--bar----baz">, "foo-Bar---Baz">>,
  Expect<Equal<CamelCase<"a-b-c">, "aBC">>,
  Expect<Equal<CamelCase<"a-b-c-">, "aBC-">>,
  Expect<Equal<CamelCase<"ABC">, "ABC">>,
  Expect<Equal<CamelCase<"-">, "-">>,
  Expect<Equal<CamelCase<"">, "">>,
  Expect<Equal<CamelCase<"😎">, "😎">>
];
