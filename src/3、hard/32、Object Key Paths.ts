/*
 * @description 实现一个lodash.get中可以获取的key;即获取对象中 所有可能的key
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/7258-hard-object-key-paths/README.md
 */

/* _____________ Your Code Here _____________ */

type GetIndexKey<T extends string> = T | `[${T}]`;

type GetIndex<T extends unknown[], A extends unknown[]> = T extends [
  infer F,
  ...infer R,
  ...A
]
  ? R["length"]
  : T["length"];

type MergeArray<
  S extends string,
  C extends unknown[],
  R extends unknown[],
  Char extends string = ""
> = `${S}${GetIndexKey<`${GetIndex<C, R>}`>}${Char}`;

type ObjectKeyPathsArrayHelper<
  T extends unknown[],
  S extends string,
  C extends unknown[] = T
> = T extends [infer F, ...infer R]
  ?
      | MergeArray<S, C, R>
      | (F extends string | number | symbol
          ? ObjectKeyPathsArrayHelper<R, S, T>
          : F extends Record<string, unknown>
          ? ObjectKeyPaths<F, MergeArray<S, C, R, ".">>
          : ObjectKeyPathsArrayHelper<R, MergeArray<S, C, R>, T>)
  : never;

type Merge<S extends string, K, I extends string = ""> = `${S}${K &
  string}${I}`;

type ObjectKeyPaths<
  T extends object,
  S extends string = "",
  K extends keyof T = keyof T
> = K extends unknown
  ? T[K] extends string | number | symbol
    ? Merge<S, K>
    : T[K] extends Record<string, unknown>
    ? Merge<S, K> | ObjectKeyPaths<T[K], Merge<S, K, ".">>
    : T[K] extends unknown[]
    ? Merge<S, K> | ObjectKeyPathsArrayHelper<T[K], Merge<S, K, ".">>
    : never
  : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectExtends } from "@type-challenges/utils";

const ref = {
  count: 1,
  person: {
    name: "cattchen",
    age: 22,
    books: ["book1", "book2"],
    pets: [
      {
        type: "cat",
      },
    ],
  },
};

type cases = [
  Expect<Equal<ObjectKeyPaths<{ name: string; age: number }>, "name" | "age">>,
  Expect<
    Equal<
      ObjectKeyPaths<{
        refCount: number;
        person: { name: string; age: number };
      }>,
      "refCount" | "person" | "person.name" | "person.age"
    >
  >,
  Expect<
    Equal<
      ObjectKeyPaths<{
        refCount: [];
        person: [
          "1",
          {
            a: 1;
          }
        ];
      }>,
      | "refCount"
      | "person"
      | "person.0"
      | "person.1"
      | "person.[0]"
      | "person.[1]"
      | "person.[1].a"
      | "person.1.a"
    >
  >,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "count">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.name">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.age">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.books">>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, "person.pets">>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, "notExist">, false>>
];
