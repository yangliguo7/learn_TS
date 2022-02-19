/*
 * @description 拍平数组
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/459-medium-flatten/README.md
 */

/* _____________ Your Code Here _____________ */

type Flatten<A extends any[]> = A["length"] extends 0
  ? []
  : A extends [infer F, ...infer B]
  ? F extends any[]
    ? [...Flatten<F>, ...Flatten<B>]
    : [F, ...Flatten<B>]
  : A;



/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<
    Equal<
      Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>,
      [{ foo: "bar"; 2: 10 }, "foobar"]
    >
  >
];
