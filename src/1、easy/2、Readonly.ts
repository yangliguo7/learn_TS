/*
 * @description 实现Readonly
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/7-easy-readonly/README.zh-CN.md
 */

// ReadOnly是将type上的属性变为readonly

/* _____________ 你的代码 _____________ */
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

// keyof T 获取传入类型的属性的联合类型，in进行遍历联合类型，然后赋值为P
// 前面加上readonly 则使得属性变成readonly，对于P上默认的属性并没有改动。

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}
