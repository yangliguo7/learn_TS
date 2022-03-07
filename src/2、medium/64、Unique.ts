/*
 * @description 去重
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/5360-medium-unique/README.md
 */

/* _____________ Your Code Here _____________ */

type Unique<T extends unknown[], RESULT extends unknown[] = []> = T extends [
  infer F,
  ...infer R
]
  ? Unique<R, F extends RESULT[number] ? Unique<R, RESULT> : [...RESULT, F]>
  : RESULT;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, "a", 2, "b", 2, "a"]>, [1, "a", 2, "b"]>>
];
