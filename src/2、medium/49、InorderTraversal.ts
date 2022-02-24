/*
 * @description 实现一个二叉树前序遍历
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/3376-medium-inordertraversal/README.md
 */

/* _____________ Your Code Here _____________ */

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
type InorderTraversal<
  T extends TreeNode | null,
  A extends any[] = []
> = T extends null
  ? []
  : [...InorderTraversal<T["left"]>, T["val"], ...InorderTraversal<T["right"]>];

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const;

const tree2 = {
  val: 1,
  left: null,
  right: null,
} as const;

const tree3 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: null,
} as const;

const tree4 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: null,
    right: null,
  },
} as const;

type cases = [
  Expect<Equal<InorderTraversal<null>, []>>,
  Expect<Equal<InorderTraversal<typeof tree1>, [1, 3, 2]>>,
  Expect<Equal<InorderTraversal<typeof tree2>, [1]>>,
  Expect<Equal<InorderTraversal<typeof tree3>, [2, 1]>>,
  Expect<Equal<InorderTraversal<typeof tree4>, [1, 2]>>
];
