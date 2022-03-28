/*
 * @description prop的 key 从 snake_case => Camelize
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/1383-hard-camelize/README.md
 */

/* _____________ Your Code Here _____________ */

type SnakeToCamelize<T extends string> = T extends `${infer F}_${infer R}`
  ? `${F}${SnakeToCamelize<Capitalize<R>>}`
  : T;

type CamelizeArrHelper<
  T extends unknown[],
  A extends unknown[] = []
> = T extends [infer F, ...infer R]
  ? CamelizeArrHelper<R, [...A, Camelize<F>]>
  : A;

type Camelize<T extends Record<string, any>> = {
  [P in keyof T as SnakeToCamelize<P & string>]: T[P] extends unknown[]
    ? CamelizeArrHelper<T[P]>
    : T[P] extends Record<string, any>
    ? Camelize<T[P]>
    : T[P];
};

// 注意 [] extends Record<string, any>?1:2 => 1
//

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<
    Equal<
      Camelize<{
        some_prop: string;
      }>,
      {
        someProp: string;
      }
    >
  >,
  Expect<
    Equal<
      Camelize<{
        some_prop: string;
        prop: { another_prop: string };
        array: [{ snake_case: string }];
      }>,
      {
        someProp: string;
        prop: { anotherProp: string };
        array: [{ snakeCase: string }];
      }
    >
  >,
  Expect<
    Equal<
      Camelize<{
        some_prop_aaa: string;
        prop: { another_prop_aa_a: string };
        array: [{ snake_case_aa_a: string }];
      }>,
      {
        somePropAaa: string;
        prop: { anotherPropAaA: string };
        array: [{ snakeCaseAaA: string }];
      }
    >
  >,
  Expect<
    Equal<
      Camelize<{
        some_prop: {};
        prop: [];
        array: null;
      }>,
      {
        someProp: {};
        prop: [];
        array: null;
      }
    >
  >
];
