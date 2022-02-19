/*
 * @description 将联合类型转换为包含联合类型的数组
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/296-medium-permutation/README.md
 */

/* _____________ Your Code Here _____________ */

// type Permutation<T> = T extends never ? [] : [T];
// 上面的如果传入never并不会进入判断条件、因为这里 T 需要是联合类型。如果你是never|'1'
// 为了解决never问题，可以构造数组从而取消分配律
// type Permutation<T> = [T] extends [never] ? [] : T;
// 这时候传入never则为[]，传入 1|2 则是 1|2
// 这是依旧是联合类型，但是为了满足分配律我们依旧需要使用extends
// type Permutation<T> = [T] extends [never] ? [] : T extends string ? [T] : never;
// 这是传入1|2 则是 [1] | [2]
// 但是我们需要构建一个全数组,我们这里可以构建一个临时参数R,
// Exclude<R, T> 去除T的 获取剩下的联合类型
type Permutation<T, R = T> = [T] extends [never]
  ? []
  : T extends string
  ? [T, ...Permutation<Exclude<R, T>>]
  : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Permutation<"A">, ["A"]>>,
  Expect<
    Equal<
      Permutation<"A" | "B" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<
    Equal<
      Permutation<"B" | "A" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<Equal<Permutation<never>, []>>
];
