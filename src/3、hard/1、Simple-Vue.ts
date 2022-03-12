/*
 * @description 实现vue
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/2-medium-return-type/README.zh-CN.md
 */

/* _____________ Your Code Here _____________ */
type GetFunReturnType<T> = {  // 这里是将A():string 转换为 A:string
  [P in keyof T]: T[P] extends () => {} ? ReturnType<T[P]> : any;
};

declare function SimpleVue<R, C, M>(options: {
  data: (this: {}) => R; // 这里限制了this是{} 所以在data中无法使用this
  computed: C & ThisType<R & C>; // 这里的C 是一个函数需要做returnType
  methods: M & ThisType<R & GetFunReturnType<C> & M>;
}): any;


// 这里使用到了ThisType
// 通过 ThisType 我们可以在对象字面量中键入 this，并提供通过上下文类型控制 this 类型的便捷方式。它只有在 --noImplicitThis 的选项下才有效（见tsconfig.json）。

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname;
    // @ts-expect-error
    this.getRandom();
    // @ts-expect-error
    this.data();

    return {
      firstname: "Type",
      lastname: "Challenges",
      amount: 10,
    };
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`;
    },
  },
  methods: {
    getRandom() {
      return Math.random();
    },
    hi() {
      alert(this.amount);
      alert(this.fullname.toLowerCase());
      alert(this.getRandom());
    },
    test() {
      const fullname = this.fullname;
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any;
    },
  },
});
