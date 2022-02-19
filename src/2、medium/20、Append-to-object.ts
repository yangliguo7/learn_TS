/*
 * @description 实现向接口添加新字段的类型。类型接受三个参数。输出应该是具有新字段的对象
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/527-medium-append-to-object/README.md
 */

/* _____________ Your Code Here _____________ */

type AppendToObject<T, U extends string, V> = {
  [P in keyof T | U]: P extends keyof T ? T[P] : V;
};
// 注意这里的 U 不能直接当作key。

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type test1 = {
  key: "cat";
  value: "green";
};

type testExpect1 = {
  key: "cat";
  value: "green";
  home: boolean;
};

type test2 = {
  key: "dog" | undefined;
  value: "white";
  sun: true;
};

type testExpect2 = {
  key: "dog" | undefined;
  value: "white";
  sun: true;
  home: 1;
};

type test3 = {
  key: "cow";
  value: "yellow";
  sun: false;
};

type testExpect3 = {
  key: "cow";
  value: "yellow";
  sun: false;
  isMotherRussia: false | undefined;
};

type cases = [
  Expect<Equal<AppendToObject<test1, "home", boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, "home", 1>, testExpect2>>,
  Expect<
    Equal<
      AppendToObject<test3, "isMotherRussia", false | undefined>,
      testExpect3
    >
  >
];
