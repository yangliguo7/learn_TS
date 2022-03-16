/*
 * @description
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/213-hard-vue-basic-props/README.md
 */

// 需要先实现simple vue

/* _____________ Your Code Here _____________ */
type GetComputed<D> = {
  [P in keyof D]: D[P] extends () => any ? ReturnType<D[P]> : D[P];
};

type ConvertPropObjectHelper<T> = {} extends T
  ? any
  : T extends {
      // 识别type
      type: infer R;
    }
  ? ConvertPropHelper<R>
  : T extends (...args: any[]) => infer P // 识别 String | Number |Regexp....
  ? P
  : T extends new (...args: any[]) => infer P // 识别自定义的class
  ? P
  : any;

type ConvertPropArrayHelper<T extends unknown[]> = ConvertPropObjectHelper<
  // 注意 这里的arr指的是 number|string [] 不是 [number,string]
  T[number]
>;

type ConvertPropHelper<T> = T extends unknown[]
  ? ConvertPropArrayHelper<T>
  : ConvertPropObjectHelper<T>;

type ConvertProp<
  P extends {
    [k: string]: any;
  }
> = {
  [K in keyof P]: ConvertPropHelper<P[K]>;
};

declare function VueBasicProps<P, D, C, M>(options: {
  props: P;
  data: (this: ConvertProp<P>) => D;
  computed: C & ThisType<D & C>;
  methods: M & ThisType<D & GetComputed<C> & M & ConvertProp<P>>;
}): any;

/* _____________ Test Cases _____________ */
import { Equal, Expect, IsAny, Debug } from "@type-challenges/utils";

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
    propJ: { type: [ClassA, Number] },
    propH: String,
    propI: [String, Number, ClassA],
  },
  data(this) {
    type PropsType = Debug<typeof this>;
    type cases = [
      Expect<IsAny<PropsType["propA"]>>,
      Expect<Equal<PropsType["propB"], string>>,
      Expect<Equal<PropsType["propC"], boolean>>,
      Expect<Equal<PropsType["propD"], ClassA>>,
      Expect<Equal<PropsType["propE"], string | number>>,
      Expect<Equal<PropsType["propF"], RegExp>>,
      Expect<Equal<PropsType["propJ"], ClassA | number>>,
      Expect<Equal<PropsType["propH"], string>>,
      Expect<Equal<PropsType["propI"], string | number | ClassA>>
    ];
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
      alert(this.fullname.toLowerCase());
      alert(this.getRandom());
    },
    test() {
      const fullname = this.fullname;
      const propE = this.propE;
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>
      ];
    },
  },
});
