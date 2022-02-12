/*
 * @description 实现 Pick
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/4-easy-pick/README.zh-CN.md
 */

/* _____________ 你的代码 _____________ */
// 从T中取出K
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// K extends keyof T 限制了K 必须是keyof T (获取T的属性的联合类型) 的子集。使得不允许传入非key的属性值。
// in 则可以遍历枚举类型
// 总计就是 用in遍历联合类型K(参数限制了K必须为T的属性名称的联合类型的子集)，赋值为P作为type的Key，对应的数值为T[P](源数据类型)。

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, "title">>>,
  Expect<Equal<Expected2, MyPick<Todo, "title" | "completed">>>,
  // @ts-expect-error
  MyPick<Todo, "title" | "completed" | "invalid">
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}
