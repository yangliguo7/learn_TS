/*
 * @description 比较大小
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/274-extreme-integers-comparator/README.md
 */

/* _____________ Your Code Here _____________ */

enum Comparison {
  Greater,
  Equal,
  Lower,
}

type GenerateArr<T extends string, A extends unknown[] = []> = `${A["length"] &
  number}` extends T
  ? A
  : GenerateArr<T, [...A, 1]>;

type ComparatorHelper<
  A extends string,
  B extends string
> = GenerateArr<A> extends [...GenerateArr<B>, ...infer F]
  ? Comparison.Greater
  : Comparison.Lower;

type Comparator<A extends number, B extends number> = `${A}` extends `${B}`
  ? Comparison.Equal
  : `${A}` extends `-${infer A1}`
  ? `${B}` extends `-${infer B1}`
    ? ComparatorHelper<B1, A1> // AB都为负数
    : Comparison.Lower // A为负数 B为正数
  : `${B}` extends `-${infer B2}`
  ? Comparison.Greater // A为正数 B为负数
  : ComparatorHelper<`${A & number}`, `${B & number}`>; // AB都为正数

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>
];
