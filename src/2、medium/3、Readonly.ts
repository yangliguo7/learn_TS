/*
 * @description 实现一个通用MyReadonly2<T, K>，它带有两种类型的参数T和K。K指定应设置为Readonly的T的属性集。如果未提供K，则应使所有属性都变为只读，就像普通的Readonly<T>一样。
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/8-medium-readonly-2/README.zh-CN.md
 */

/* _____________ 你的代码 _____________ */
// 下面写法在某些情况下是不对的
// type MyReadonly2<T, K extends keyof T = keyof T> = T & {
//   readonly [P in K]: T[P];
// };
// 在4.4中 如果 T 没有readonly、则新的type会加上readonly。4.5中则不会保留readonly
// 因此：
// type A =  MyReadonly2<Todo1, "title" | "description">
// 4.5 版本 A 是 { title: string; description?: string; completed: boolean; }
// 4.4 版本 A 是 { readonly title: string; readonly description?: string; readonly completed: boolean; }

// 新写法
// 1、T的部分readonly 不是T的部分取出来
type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> & {
  readonly [P in K]: T[P];
};
// 使用Omit 忽略K

// 2、同上 使用 Exclude 忽略K
// type MyReadonly2<T, K extends keyof T = keyof T> = {
//   [P in Exclude<keyof T, K>]: T[P];
// } & {
//   readonly [P in K]: T[P];
// };

// fixme 如何做到 不限制K 为 T的类型下还可以做到这样

/* _____________ 测试用例 _____________ */
import { Alike, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>
];

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}
