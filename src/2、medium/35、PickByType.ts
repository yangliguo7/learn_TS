/*
 * @description From T, pick a set of properties whose type are assignable to U
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/2595-medium-pickbytype/README.md
 */

/* _____________ Your Code Here _____________ */

type PickByType<T extends { [k: string]: any }, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

interface Model {
  name: string;
  count: number;
  isReadonly: boolean;
  isEnable: boolean;
}

type cases = [
  Expect<
    Equal<
      PickByType<Model, boolean>,
      { isReadonly: boolean; isEnable: boolean }
    >
  >,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>
];
