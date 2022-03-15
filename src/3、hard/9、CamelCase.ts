/*
 * @description 实现驼峰
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/114-hard-camelcase/README.md
 */

/* _____________ Your Code Here _____________ */

type IsSplitCode<S extends string> = Uppercase<S> extends Lowercase<S>
  ? true
  : false;
type CamelCaseHelper<S extends string> = S extends `${infer F}${infer R}`
  ? `${IsSplitCode<F> extends true ? "" : F}${CamelCaseHelper<
      IsSplitCode<F> extends true ? Capitalize<R> : R
    >}`
  : "";
type CamelCase<S extends string> = CamelCaseHelper<Lowercase<S>>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<CamelCase<"foobar">, "foobar">>,
  Expect<Equal<CamelCase<"FOOBAR">, "foobar">>,
  Expect<Equal<CamelCase<"foo_bar">, "fooBar">>,
  Expect<Equal<CamelCase<"foo_bar_hello_world">, "fooBarHelloWorld">>,
  Expect<Equal<CamelCase<"HELLO_WORLD_WITH_TYPES">, "helloWorldWithTypes">>,
  Expect<Equal<CamelCase<"">, "">>
];
