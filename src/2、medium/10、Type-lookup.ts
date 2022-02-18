/*
 * @description 有时，您可能希望根据其属性在并集中查找类型。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/62-medium-type-lookup/README.zh-CN.md
 */

/* _____________ 你的代码 _____________ */
// type LookUp<U extends { type: string }, T extends U["type"]> = U extends {
//   type: string;
// }
//   ? U["type"] extends T
//     ? U
//     : never
//   : never;
// U extends { type: string }, T extends U["type"] 这里限制了T 必须是U的type里的类型
// type A = LookUp<Animal, "cat2">;
// 运用到泛型的分配律法则，这里的U 其实是遍历下的 U

// 2、
// type LookUp<U, T> = U extends { type: infer I }
//   ? I extends T
//     ? U
//     : never
//   : never;

// 3、使用Extract
type LookUp<U, T> = Extract<U, {type: T}>

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type Animal = Cat | Dog;

// type A = LookUp<Animal, "cat2">;

type cases = [
  Expect<Equal<LookUp<Animal, "dog">, Dog>>,
  Expect<Equal<LookUp<Animal, "cat">, Cat>>
];
