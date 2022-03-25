/*
 * @description 实现Pinia 类似vuex得
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/1290-hard-pinia/README.md
 */

/* _____________ Your Code Here _____________ */

type FunctionToString<G extends Record<string, any>> = {
  [P in keyof G]: ReturnType<G[P]>;
};

declare function defineStore<S, G, A>(store: {
  id: string;
  state: () => S;
  getters: G & ThisType<Readonly<S> & FunctionToString<G>>;
  actions: A & ThisType<S & A>;
}): S & FunctionToString<G> & A;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

const store = defineStore({
  id: "",
  state: () => ({
    num: 0,
    str: "",
  }),
  getters: {
    stringifiedNum() {
      // @ts-expect-error
      this.num += 1;

      return this.num.toString();
    },
    parsedNum() {
      return parseInt(this.stringifiedNum);
    },
  },
  actions: {
    init() {
      this.reset();
      this.increment();
    },
    increment(step = 1) {
      this.num += step;
    },
    reset() {
      this.num = 0;

      // @ts-expect-error
      this.parsedNum = 0;

      return true;
    },
    setNum(value: number) {
      this.num = value;
    },
  },
});

// @ts-expect-error
store.nopeStateProp;
// @ts-expect-error
store.nopeGetter;
// @ts-expect-error
store.stringifiedNum();
store.init();
// @ts-expect-error
store.init(0);
store.increment();
store.increment(2);
// @ts-expect-error
store.setNum();
// @ts-expect-error
store.setNum("3");
store.setNum(3);
const r = store.reset();

type _tests = [
  Expect<Equal<typeof store.num, number>>,
  Expect<Equal<typeof store.str, string>>,
  Expect<Equal<typeof store.stringifiedNum, string>>,
  Expect<Equal<typeof store.parsedNum, number>>,
  Expect<Equal<typeof r, true>>
];
