/*
 * @description 实现一个类型 将给定的数据转换类型
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/5821-medium-maptypes/README.md
 */

/* _____________ Your Code Here _____________ */

// 先看些这个类型
type Exapmle<
  R extends {
    mapFrom: any;
    mapTo: any;
  }
> = R["mapFrom"];
type A = Exapmle<
  { mapFrom: string; mapTo: Date } | { mapFrom: Date; mapTo: null }
>; // A ==> string | Date 这里是获得联合类型

// type MapTypes< 很容易写成这样，但是这样并没有考虑到T中不是mapFrom的参数,所以我们需要使用到上面的思想
//   T,
//   R extends { mapFrom: any; mapTo: any },
//   U extends { mapFrom: any; mapTo: any } = R // 这里是构建泛型 进行分配率运算
// > = {
//   [P in keyof T]: U extends R
//     ? T[P] extends U["mapFrom"]
//       ? U["mapTo"]
//       : never
//     : never;
// };

type MapTypes<
  T,
  R extends { mapFrom: any; mapTo: any },
  U extends { mapFrom: any; mapTo: any } = R
> = {
  [P in keyof T]: T[P] extends R["mapFrom"] // 判断是否有不是mapFrom里的字段属性
    ? U extends R // extends 的分配率
      ? T[P] extends U["mapFrom"]
        ? U["mapTo"]
        : never // 这里是去除不需要的字段
      : never
    : T[P];
};

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<
    Equal<
      MapTypes<
        { name: string; date: Date },
        { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }
      >,
      { name: boolean; date: string }
    >
  >,
  Expect<
    Equal<
      MapTypes<{ stringToArray: string }, { mapFrom: string; mapTo: [] }>,
      { stringToArray: [] }
    >
  >,
  Expect<
    Equal<
      MapTypes<{ stringToNumber: string }, { mapFrom: string; mapTo: number }>,
      { stringToNumber: number }
    >
  >,
  Expect<
    Equal<
      MapTypes<
        { stringToNumber: string; skipParsingMe: boolean },
        { mapFrom: string; mapTo: number }
      >,
      { stringToNumber: number; skipParsingMe: boolean }
    >
  >,
  Expect<
    Equal<
      MapTypes<
        { date: string },
        { mapFrom: string; mapTo: Date } | { mapFrom: string; mapTo: null }
      >,
      { date: null | Date }
    >
  >,
  Expect<
    Equal<
      MapTypes<{ date: string }, { mapFrom: string; mapTo: Date | null }>,
      { date: null | Date }
    >
  >,
  Expect<
    Equal<
      MapTypes<
        { fields: Record<string, boolean> },
        { mapFrom: Record<string, boolean>; mapTo: string[] }
      >,
      { fields: string[] }
    >
  >,
  Expect<
    Equal<
      MapTypes<{ name: string }, { mapFrom: boolean; mapTo: never }>,
      { name: string }
    >
  >
];
