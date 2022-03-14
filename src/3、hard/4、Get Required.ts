/*
 * @description 获取required类型
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/57-hard-get-required/README.md
 */

/* _____________ Your Code Here _____________ */
// 方法1
type GetRequired<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P];
};

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<
    Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>
  >
];
