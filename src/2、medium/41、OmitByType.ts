/*
 * @description From T, pick a set of properties whose type are not assignable to U.
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/2852-medium-omitbytype/README.md
 */

/* _____________ Your Code Here _____________ */

type OmitByType<T extends { [k: string]: any }, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P];
};

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

interface Model {
  name: string;
  count: number;
  isReadonly: boolean;
  isEnable: boolean;
}

type cases = [
  Expect<Equal<OmitByType<Model, boolean>, { name: string; count: number }>>,
  Expect<
    Equal<
      OmitByType<Model, string>,
      { count: number; isReadonly: boolean; isEnable: boolean }
    >
  >,
  Expect<
    Equal<
      OmitByType<Model, number>,
      { name: string; isReadonly: boolean; isEnable: boolean }
    >
  >,
  Expect<Equal<OmitByType<Model, bigint>, Model>>
];
