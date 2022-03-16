/*
 * @description 根据key 获取value
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/270-hard-typed-get/README.md
 */

/* _____________ Your Code Here _____________ */

type Get<T, K extends string> = K extends `${infer F}.${infer R}`
  ? F extends keyof T
    ? Get<T[F], R>
    : never
  : K extends keyof T
  ? T[K]
  : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Get<Data, "hello">, "world">>,
  Expect<Equal<Get<Data, "foo.bar.count">, 6>>,
  Expect<Equal<Get<Data, "foo.bar">, { value: "foobar"; count: 6 }>>,
  Expect<Equal<Get<Data, "no.existed">, never>>
];

type Data = {
  foo: {
    bar: {
      value: "foobar";
      count: 6;
    };
    included: true;
  };
  hello: "world";
};
