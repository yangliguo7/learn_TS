/*
 * @description 不使用 Omit 实现 TypeScript 的 Omit<T, K> 范型。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/3-medium-omit/README.zh-CN.md
 */

// omit与pick相反，与exclude类似。exclude 用于联合类型

/* _____________ 你的代码 _____________ */

type MyOmit<T, K> = {
  [P in Exclude<keyof T, K>]: T[P];
};

// keyof T 获取键名的联合类型。
// Exclude<keyof T, K> 去除键名联合类型中包含K的新的联合类型
// 然后遍历 取值
// type MyExclude<U, K> = U extends K ? never : U;

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}
