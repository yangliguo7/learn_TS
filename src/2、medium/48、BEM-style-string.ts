/*
 * @description 实现css的BEM风格
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/3326-medium-bem-style-string/README.md
 */

/* _____________ Your Code Here _____________ */
// 解法一：
// E 对应的__
// type BEHelper<B extends string, E extends unknown[]> = E extends [
//   infer F,
//   ...infer R
// ]
//   ? `${B}__${F & string}` | (R["length"] extends 0 ? never : BEHelper<B, R>)
//   : B;
// // M对应的--
// type BEMHelper<B extends string, M extends unknown[], P = B> = M extends [
//   infer F,
//   ...infer R
// ]
//   ? `${B}--${F & string}` | (R["length"] extends 0 ? never : BEMHelper<B, R>)
//   : B;
// type BEM<B extends string, E extends string[], M extends string[]> = BEMHelper<
//   BEHelper<B, E>,
//   M
// >;

// 上面的解法虽然可以，但是过于繁琐，因为我们其实是遍历每一个数据，从而获取的一个联合类型
// BEHelper 完成可以换成
// type BEMHelper<B extends string, E extends string[]> = E["length"] extends 0
//   ? `${B}`
//   : `${B}__${E[number]}`;
// 注意 当E 为 [] 时, E[number] 为 never

// 我们可以把两个函数合并成本一个，E 对应的__ M对应的-- 只有 分割符号不一样
type BEMHelper<A extends string[], S extends string> = A["length"] extends 0
  ? ""
  : `${S}${A[number]}`;

// 最后简化为
type BEM<
  B extends string,
  E extends string[],
  M extends string[]
> = `${B}${BEMHelper<E, "__">}${BEMHelper<M, "--">}`;

// 注意这个为什么是一个联合类型，是因为 BEMHelper<E, "__">/BEMHelper<M, "--"> 是一个联合类型

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<BEM<"btn", ["price"], []>, "btn__price">>,
  Expect<Equal<BEM<"btn", [], []>, "btn">>,
  Expect<Equal<BEM<"btn", ["price", "name"], []>, "btn__price" | "btn__name">>,
  Expect<
    Equal<
      BEM<"btn", ["price", "name"], ["warning", "success"]>,
      | "btn__price--warning"
      | "btn__name--warning"
      | "btn__price--success"
      | "btn__name--success"
    >
  >,
  Expect<
    Equal<
      BEM<"btn", ["price"], ["warning", "success"]>,
      "btn__price--warning" | "btn__price--success"
    >
  >,
  Expect<
    Equal<
      BEM<"btn", [], ["small", "medium", "large"]>,
      "btn--small" | "btn--medium" | "btn--large"
    >
  >
];
