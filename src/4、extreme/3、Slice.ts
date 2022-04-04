/*
 * @description 实现array的Slice
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/216-extreme-slice/README.md
 */

/* _____________ Your Code Here _____________ */

type Minus<
  A extends unknown[],
  B extends unknown[],
  T extends unknown[] = []
> = A extends [infer F, ...infer R]
  ? T["length"] extends B["length"]
    ? [1, ...R]["length"]
    : Minus<R, B, [...T, 1]>
  : A["length"];

type GetRealIndex<
  A extends number,
  T extends unknown[],
  R extends unknown[] = []
> = `${A & number}` extends `-${infer F}`
  ? R["length"] extends T["length"]
    ? T["length"]
    : `-${R["length"] & number}` extends `${A}`
    ? Minus<T, R>
    : GetRealIndex<A, T, [...R, 1]>
  : A;

type GenerateArr<
  T extends number,
  A extends unknown[] = []
> = A["length"] extends T ? A : GenerateArr<T, [...A, 1]>;

// Start的长度 大于 End 长度
type Than<
  Start extends number,
  End extends number
> = GenerateArr<Start> extends [...GenerateArr<End>, ...infer R] ? true : false;

type SliceHelper<
  Arr extends unknown[],
  Start extends number = 0,
  End extends number = Arr["length"],
  RESULT extends unknown[] = [],
  FLAG extends boolean = false, // 标识是否进入目标区域,
  T extends unknown[] = []
> = Than<Start, End> extends true
  ? []
  : Arr extends [infer F, ...infer R]
  ? FLAG extends true
    ? End extends T["length"]
      ? RESULT
      : SliceHelper<R, Start, End, [...RESULT, F], true, [...T, F]>
    : Start extends T["length"]
    ? SliceHelper<R, Start, End, [F], true, [...T, F]>
    : SliceHelper<R, Start, End, RESULT, false, [...T, F]>
  : RESULT;

type Slice<
  Arr extends unknown[],
  Start extends number = 0,
  End extends number = Arr["length"]
> = SliceHelper<Arr, GetRealIndex<Start, Arr>, GetRealIndex<End, Arr>>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type Arr = [1, 2, 3, 4, 5];

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,

  Expect<Equal<Minus<[], []>, 0>>,
  Expect<Equal<Minus<[1], []>, 1>>,
  Expect<Equal<Minus<[1, 1], [1]>, 1>>,

  Expect<Equal<GetRealIndex<-1, [1]>, 1>>,
  Expect<Equal<GetRealIndex<-2, [1]>, 1>>,
  Expect<Equal<GetRealIndex<-1, [1, 2, 3, 4]>, 3>>,
  Expect<Equal<GetRealIndex<1, [1]>, 1>>,
  Expect<Equal<GetRealIndex<2, [1]>, 2>>
];
