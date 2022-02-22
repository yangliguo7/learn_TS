/*
 * @description
 */

/* _____________ Your Code Here _____________ */
type parseHelper<A extends string> = A extends `${infer F}%`
  ? [F, "%"]
  : [A, ""];
type PercentageParser<A extends string> = A extends ""
  ? ["", "", ""]
  : A extends `${infer F}${infer R}`
  ? F extends "+" | "-"
    ? [F, ...parseHelper<R>]
    : ["", ...parseHelper<A>]
  : never;
// 分成三步
// 1、推断前面部分
// 2、推断后面部分
// 3、结合数组


/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type Case1 = ["", "", ""];
type Case2 = ["+", "", ""];
type Case3 = ["+", "1", ""];
type Case4 = ["+", "100", "%"];
type Case5 = ["", "10", "%"];
type Case6 = ["-", "99", "%"];

type cases = [
  Expect<Equal<PercentageParser<"">, Case1>>,
  Expect<Equal<PercentageParser<"+">, Case2>>,
  Expect<Equal<PercentageParser<"+1">, Case3>>,
  Expect<Equal<PercentageParser<"+100%">, Case4>>,
  Expect<Equal<PercentageParser<"10%">, Case5>>,
  Expect<Equal<PercentageParser<"-99%">, Case6>>
];
