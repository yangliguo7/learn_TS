/*
 * @description 实现一个返回class所有public key
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/2828-hard-classpublickeys/README.md
 */

/* _____________ Your Code Here _____________ */

type ClassPublicKeys<T> = keyof T;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from "@type-challenges/utils";

class A {
  public str: string;
  protected num: number;
  private bool: boolean;
  constructor() {
    this.str = "naive";
    this.num = 19260917;
    this.bool = true;
  }
  getNum() {
    return Math.random();
  }
}

type cases = [Expect<Equal<ClassPublicKeys<A>, "str" | "getNum">>];
