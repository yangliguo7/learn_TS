/*
 * @description 构造签名
 * 在js中函数是可以通过new来使用来产生一个新对象，我们也可以通过在调用签名之前添加 new 来表示一个可以new的签名函数 (Construct Signatures)
 */

declare function fn(x: boolean): boolean

// ps:箭头函数是不能new的
class ConstructFn {
  private name: string; // 私有属性
  private age: number;
  constructor({ name, age }: { name: string; age: number }) {
    this.name = name;
    this.age = age;
  }
  static test() {
    console.log("可以直接使用");
    return "1";
  }
}
class ConstructFn2 extends ConstructFn {
  constructor({ name, age }: { name: string; age: number }) {
    super({ name, age });
  }
}

console.log(
  new ConstructFn({
    name: "name",
    age: 1,
  })
);

// 如果需要表示类型为构造函数，则需要使用new关键字
type SomeConstructor = {
  new ({ name, age }: { name: string; age: number }): ConstructFn; // 这里的 new ({ name, age }: { name: string; age: number }) 则为构造签名
};
// 上面的表示 一个构造函数(new ({ name, age }: { name: string; age: number }))返回的是ConstructFn

// 例：
const testFn = (cons: SomeConstructor) => {
  const x = new cons({
    name: "名称",
    age: 1,
  });
};
testFn(ConstructFn);
testFn(ConstructFn2);


