/*
 * @description 合并两个类型，后面的类型会覆盖前面的类型
 */

/* _____________ Your Code Here _____________ */

type Merge2<F, S> = Pick<F, Exclude<keyof F, keyof S>> & S;
// 在功能上Merge2 也是一样的功能

// type Merge<F, S> = {
//   [P in Exclude<keyof F, keyof S> | keyof S]: P extends Exclude<
//     keyof F,
//     keyof S
//   >
//     ? F[P]
//     : P extends keyof S
//     ? S[P]
//     : never;
// };
// 上面这个虽然可以实现功能，但是却需要Exclude，然而并不需要这样
// 首先key 我们需要的的就是FS的key的联合类型
// 直接 keyof F | keyOf S 即可。两边实现的功能 Exclude<keyof F, keyof S> | keyof S 是一样的
// 其次 我们在value上，我们先Exclude<keyof F,keyof S> 就是为了获取不在S上的值。
// 然而我们可以先获取S 在获取F 。
// 最后我们需要对FS 进行限制，因为FS需要是一个对象
type Merge<F extends { [k: string]: any }, S extends { [k: string]: any }> = {
  [P in keyof F | keyof S]: P extends keyof S
    ? S[P]
    : P extends keyof F
    ? F[P]
    : never;
};

const a: Merge<Foo, Bar> = {
  a: 1,
  b: 1,
  c: false,
};

const b: Merge2<Foo, Bar> = {
  a: 1,
  b: 1,
  c: false,
};

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type Foo = { a: number; b: string };
type Bar = {
  b: number;
  c: boolean;
};

type cases = [
  Expect<
    Equal<
      Merge<Foo, Bar>,
      {
        a: number;
        b: number;
        c: boolean;
      }
    >
  >
];
