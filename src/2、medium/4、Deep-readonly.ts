/*
 * @description 实现一个通用的DeepReadonly<T>，它将对象的每个参数及其子对象递归地设为只读。
 * 您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/9-medium-deep-readonly/README.zh-CN.md
 */

/* _____________ 你的代码 _____________ */
// 错误示例：
// type DeepReadonly<T> = {
//   readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
// };
// 因为 函数的keyof 是个never

// 正确示例：
// 1、keyof T[P] extends never 可以用来判断是否是个对象
// type DeepReadonly<T> = {
//   readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>;
// };
// 但是这个方法不太好，因为对于纯number类型或者string类型而言，例如 1/'1' 等，他的keyOf并不于never类型，而是包含静态方法的联合类型。
// 这导致了还要在走一遍递归

// 2、优化写法
type DeepReadonly<T> = {
  readonly [P in keyof T]: keyof T[P] extends object ? T[P] : DeepReadonly<T[P]>;
};

// 3、明确不需要递归的数据
// type Primitive = boolean | number | string | undefined | bigint | Function;
// type DeepReadonly<T> = {
//   readonly [key in keyof T]: T[key] extends Primitive
//       ? T[key]
//       : DeepReadonly<T[key]>;
// };

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [Expect<Equal<DeepReadonly<X>, Expected>>];

type X = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
    };
  };
};

type Expected = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "string";
        };
        readonly k: "hello";
      };
    };
  };
};
