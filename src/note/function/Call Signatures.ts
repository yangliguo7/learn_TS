/*
 * @description 函数调用签名
 * 在JavaScript中，函数除了可以被调用，自己也是可以有属性值的。如果我们想描述一个带有属性的函数，我们可以在一个对象类型中写一个调用签名（call signature）。
 */

// 正常函数
type typeFn = (param: string) => string;
const testFn: typeFn = (name) => {
  return name.toLowerCase();
};
const test = (fn: typeFn) => {
  return fn("1");
};
test(testFn);
test((a) => {
  return "";
});

// 给函数增加属性
type typeFn2 = {
  desc: string;
  (name: string): string; // 注意这里的写法，是:而不是=>!!!!!!!
};
const testFn1 = (name) => name.toLowerCase();
testFn1.desc = "1231";
const test2 = (fn: typeFn2) => {
  return `${fn.desc}` + fn("1");
};
test2(testFn1);

// 这里就会抛出错误，因为testFn上并没有desc
// test2(testFn)
