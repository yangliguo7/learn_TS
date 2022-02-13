/*
 * @description 创建一个通用的Length，接受一个readonly的数组，返回这个数组的长度。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/18-easy-tuple-length/README.zh-CN.md
 */

/* _____________ 你的代码 _____________ */

type Length<T extends readonly any[]> = T["length"];

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

const tesla = ["tesla", "model 3", "model X", "model Y"] as const;
const spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT",
] as const;

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<"hello world">
];
