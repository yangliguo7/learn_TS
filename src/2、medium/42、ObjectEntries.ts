/*
 * @description Implement the type version of Object.entries
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/2946-medium-objectentries/README.md
 */

/* _____________ Your Code Here _____________ */
type ObjectEntries<
  T extends {
    [k: string]: any;
  },
  K = keyof T
> = K extends keyof T ? [K, T[K]] : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
  locations2?: string[] | null;
}

type ModelEntries =
  | ["name", string]
  | ["age", number]
  | ["locations", string[] | null]
  | ["locations2", string[] | null];

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>
];
