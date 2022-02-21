/*
 * @description Implement a type ReplaceKeys, that replace keys in union types, if some type has not this key, just skip replacing, A type takes three arguments.
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/1130-medium-replacekeys/README.md
 */

/* _____________ Your Code Here _____________ */
// type ReplaceKeys<
//   U extends { [k: string]: any },
//   T extends string,
//   Y extends { [k: string]: any }
// > = U extends {
//   [k: string]: any;
// }
//   ? {
//       [P in keyof U]: P extends T ? (P extends keyof Y ? Y[P] : never) : U[P];
//     }
//   : any;

// 这里不需要 进行 extends 构建分配律
type ReplaceKeys<
  U extends { [k: string]: any },
  T extends string,
  Y extends { [k: string]: any }
> = {
  [P in keyof U]: P extends T ? (P extends keyof Y ? Y[P] : never) : U[P];
};

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type NodeA = {
  type: "A";
  name: string;
  flag: number;
};

type NodeB = {
  type: "B";
  id: number;
  flag: number;
};

type NodeC = {
  type: "C";
  name: string;
  flag: number;
};

type ReplacedNodeA = {
  type: "A";
  name: number;
  flag: string;
};

type ReplacedNodeB = {
  type: "B";
  id: number;
  flag: string;
};

type ReplacedNodeC = {
  type: "C";
  name: number;
  flag: string;
};

type NoNameNodeA = {
  type: "A";
  flag: number;
  name: never;
};

type NoNameNodeC = {
  type: "C";
  flag: number;
  name: never;
};

type Nodes = NodeA | NodeB | NodeC;
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC;
type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB;

type cases = [
  Expect<
    Equal<
      ReplaceKeys<Nodes, "name" | "flag", { name: number; flag: string }>,
      ReplacedNodes
    >
  >,
  Expect<
    Equal<
      ReplaceKeys<
        Nodes,
        "name" | "flag" | "id",
        { name: number; flag: string; id: string }
      >,
      | {
          type: "A";
          name: number;
          flag: string;
        }
      | {
          type: "B";
          id: string;
          flag: string;
        }
      | {
          type: "C";
          name: number;
          flag: string;
        }
    >
  >,
  Expect<Equal<ReplaceKeys<Nodes, "name", { aa: number }>, NodesNoName>>
];
