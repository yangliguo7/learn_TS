### keyof 类型操作符

对一个**对象类型**使用`keyof`操作符，会返回该对象**属性名**组成的一个字符串或者数字字面量的联合

注意这里的对象类型并不是一个对象的值，像`{x:1,y:1}`,这种是value并不是一个type,准备的说，keyof是获取类型对象的属性名，
返回字符串或者数字字面量

返回字符串
错误使用：
```
例：
    const x = {
       name : "名称"
    }
    
    cosnt a :x = { // 'x' refers to a value, but is being used as a type here. Did you mean 'typeof x'?
       name : "名称"
    }
    
    type T = keyof x // 'x' refers to a value, but is being used as a type here. Did you mean 'typeof x'?
    
    x为一个数值value并不是表示一个对象类型。
```

正常使用：
```
例：
    type X = {
        name : string
        age : number
        other : bigint
    }   
    
    const a :X = {  // x为一个对象类型
       name : "名称",
       age : 1,
       other : BigInt(1)
    } 
     
    type T = keyof X  // t 为 "name" | "age" | "other"  
    
    let params:T = "name"; params = "age" ; params = "other" 这样都是OK的
    
    let error_example:T = "error"  // Type '"error"' is not assignable to type 'keyof X'.
```

返回数字字面量联合类型
```
例：
    type X = {
        1 : string
        2 : number
        3 : bigint
    } 
    
    type T = keyof X  // T 为 "1" | "2" | "3"  
```

对接口、class这种对象类型使用

```
接口：
    interface I {
        name: string;
        name2: "string"; // 这就是字符串
    }
    
    const i:I = {
        name: "",
        name2: "string";
    }
    
    type T = keyof I // "name" | "name2"
     
类：
    class C {
        age: number;
        [1]: 1;
        "12": string;
        constructor(a, b) {
            const c = a + b;
        }
    }

    type T = keyof C //  "age" | "1" | "12"

```

例子
```
1、

function useKey<T, K extends keyof T>(o: T, k: K) {
    var name: string = k;
    // Type 'string | number | symbol' is not assignable to type 'string'.
}

Q：这里为什么会出现异常呢?
A：首先对象的key只可能为string,number,symbol类型!!!,
   TS会进尽可能枚举出所有的可能型，并将其转为联合类型，因此keyof T,返回的是string,number,symbol
   K extends keyof T，则 K 为string,number,symbol中的一个。参数k应该为联合类型
   这里把name直接定义成string类型因此类型检测不通过。
   
想要解决他的话
    var name: string | number | symbol = k;
    或者
    K extends Extract<keyof T, string>
    Extract是从keyof T 取 string ,见 https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union

2、通过ts类型检测来识别对象上是否有对应的key

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // 正常
getProperty(x, "m"); // 错误

Q：为什么这里会检测出异常
A：x为object类型,即泛型Type为传入的x。(这里的x并不是对象而是把他当作对象类型) 对x进行keyof回获取到x上的key
   即 a | b | c | d ,即类型Key则为a | b | c | d 联合类型。
   type Key = "a" | "b" | "c" | "d"。
   传入"m" 类似于 const param:Key = "m" 。此时TS类型检测会识别m并不是类型上的数据
```



