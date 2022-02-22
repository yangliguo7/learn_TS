/*
 * @description 实现required
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/2759-medium-requiredbykeys/README.md
 */

/* _____________ Your Code Here _____________ */
type Copy<T extends { [k: string]: any }> = {
  [P in keyof T]: T[P];
};

type RequiredByKeys<T extends { [k: string]: any }, K = unknown> = Copy<
  Partial<T> & {
    [P in Extract<keyof T, K>]: T[P];
  }
>;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

interface User {
  name?: string;
  age?: number;
  address?: string;
}

interface UserRequiredName {
  name: string;
  age?: number;
  address?: string;
}

interface UserRequiredNameAndAge {
  name: string;
  age: number;
  address?: string;
}

type cases = [
  Expect<Equal<RequiredByKeys<User, "name">, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, "name" | "unknown">, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, "name" | "age">, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>
];
