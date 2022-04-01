/*
 * @description 获取readonly的联合类型
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/5-extreme-readonly-keys/README.md
 */

/* _____________ Your Code Here _____________ */

type GetReadonlyKeys<T extends Record<string, any>> = keyof {
  [P in keyof T as Equal<Pick<T, P>, Readonly<Pick<T, P>>> extends true
    ? P
    : never]: T[P];
};

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<"title", GetReadonlyKeys<Todo1>>>,
  Expect<Equal<"title" | "description", GetReadonlyKeys<Todo2>>>
];

interface Todo1 {
  readonly title: string;
  description: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  readonly description: string;
  completed?: boolean;
}
