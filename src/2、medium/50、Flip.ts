/*
 * @description Implement the type of just-flip-object
 */

/* _____________ Your Code Here _____________ */

type Flip<T extends { [k: string]: string | number | boolean }> = {
  [P in keyof T as `${T[P]}`]: P;
};

/* _____________ Test Cases _____________ */
import { Equal, Expect, NotEqual } from "@type-challenges/utils";

type cases = [
  Expect<Equal<{ a: "pi" }, Flip<{ pi: "a" }>>>,
  Expect<NotEqual<{ b: "pi" }, Flip<{ pi: "a" }>>>,
  Expect<Equal<{ 3.14: "pi"; true: "bool" }, Flip<{ pi: 3.14; bool: true }>>>,
  Expect<
    Equal<{ val2: "prop2"; val: "prop" }, Flip<{ prop: "val"; prop2: "val2" }>>
  >
];
