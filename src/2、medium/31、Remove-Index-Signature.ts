/*
 * @description Implement RemoveIndexSignature<T> , exclude the index signature from object types.
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/1367-medium-remove-index-signature/README.md
 */

/* _____________ Your Code Here _____________ */

// type RemoveIndexSignature<T> = {
//   [K in keyof T as string extends K
//     ? never
//     : number extends K
//     ? never
//     : K]: T[K];
// };
// string|number extends string => false

type RemoveIndexSignature<T extends Record<string, any>> = {
    [
    K in keyof T as K extends `${infer S}` ? K : never
    ]: T[K]
}

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  [key: string]: any;
  foo(): void;
};

type Bar = {
  [key: number]: any;
  bar(): void;
};

type Baz = {
  bar(): void;
  baz: string;
};

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>
];
