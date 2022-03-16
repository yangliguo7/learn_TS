/*
 * @description 实现isAny
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/223-hard-isany/README.md
 */

/* _____________ Your Code Here _____________ */

// 方法1
// type IsAny<Y> = (<T>() => T extends any ? 1 : 2) extends <T>() => T extends Y // 这是是Equal方法的变更
//   ? 1
//   : 2
//   ? true
//   : false;

// 方法2
// type IsAny<T> = ((a: [any]) => [any]) extends (a: T) => T ? true : false;

// 方法3
// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
type IsAny<T> = 1 extends 0 & T ? true : false;
// 0 & T => any ; any是 number等基本类型的父类型 ;
// 0 & unknown => 0
// 0 & never => never
// 0 & string => never

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<IsAny<any>, true>>,
  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>
];
