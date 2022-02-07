### 接口继承与交叉类型的区别

#### 1、TS 中接口可以 extends 进行扩展功能
```
// 例：
interface Animal {
    name: string;
}

interface Cat extends Animal {
    eat: Function;
}

const cat: Cat = {
    name: "猫",
    eat: () => {},
};
// 这里的cat则具有两种属性
```

#### 2、使用交叉类型`&`实现上面的功能
```
// 例：
interface Animal {
    name: string;
}

type Cat = {  // 注意这里是 type
    eat: Function;
} & Animal;

const cat: Cat = {
    name: "猫",
    eat: () => {},
};
```

#### 3、接口继承也可以使用`,`连接,表示继承多个
```
// 例：
interface Animal {
    name: string;
}

interface Cat {
    eat: Function;
}

interface Both extends Animal, Cat {}

const cat: Both = {
    name: "猫",
    eat: () => {},
};
```

**上面三种方法都可以表示用来扩展功能，但是实际上是有很大区别的。原则性的不同则在于对冲突如何进行处理**

如果我们有两个接口有相同的字段但是类型却不一致时

```
// 例：
interface Animal {
    name: string | number;
}
// 使用 extends
interface Cat extends Animal { 
    name: boolean; // 与 Animal 具有相同属性(name)但是类型并不一致
}
```
上面的写法会导致类型异常，因为extends会导致编译异常

上面的Cat则是string类型,Animal的name(string | number)与Cat的name(boolean)的交集为never

但是如果你使用交叉类型`&`则不会异常,对于交叉类型则更像是`Object.assgin`,虽然不会异常，但是字段类型会取两种类型的交集
```
interface Animal {
    name: string | number;
}
interface cat {
    name:boolean
}
type both = Animal & cat // 这里并不会异常
both.name 则为never类型，Animal的name(string | number)与Cat的name(boolean)的交集为never
```

对于上面的extends写法,如果你写成这样则也不会异常
```
// 例：
interface Animal {
    name: string | number;
}
// 使用 extends
interface Cat extends Animal { 
    name: string; // 与 Animal 具有相同属性(name)但是类型并不一致
}
```
