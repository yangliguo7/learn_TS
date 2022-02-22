/*
 * @description Implement the generic Mutable<T> which makes all properties in T mutable (not readonly).
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/2793-medium-mutable/README.md
 */

/* _____________ Your Code Here _____________ */
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}

type cases = [Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>];
