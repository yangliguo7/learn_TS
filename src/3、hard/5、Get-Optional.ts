/*
 * @description 获取optional类型
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/59-hard-get-optional/README.md
 */

/* _____________ Your Code Here _____________ */
// 方法1
// type GetOptional<T> = {
//   [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P];
// };

// 方法2
// 利用Pick
type A = {
  a: string;
  b?: number;
};
type aaa = {} extends Pick<A, "a"> ? 1 : 2; // 2
type bbb = {} extends Pick<A, "b"> ? 1 : 2; // 1
// // 所以
// type GetOptional<T> = {
//   [P in keyof T as {} extends Pick<T, P> ? P : never]: T[P];
// };

// 方法3
type aaa2 = Omit<A, "a"> extends A ? 1 : 2; // 2
type bbb2 = Omit<A, "b"> extends A ? 1 : 2; // 1
// // 所以
type GetOptional<T> = {
  [P in keyof T as Omit<T, P> extends T ? P : never]: T[P];
};

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<
    Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>
  >
];
