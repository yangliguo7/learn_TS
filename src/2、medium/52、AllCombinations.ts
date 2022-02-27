/*
 * @desc：
 * @time：2022/2/27
 * @autor：yangliguo
 */
/*
 * @description Implement type AllCombinations<S> that return all combinations of strings which use characters from S at most once.
 * @link https://github.com/type-challenges/type-challenges/blob/master/questions/4260-medium-nomiwase/README.md
 */

/* _____________ Your Code Here _____________ */

type GetUnionFromStr<S extends string> = S extends `${infer F}${infer R}`
  ? `${F}` | GetUnionFromStr<R>
  : "";
// type AllCombinations<
//   S extends string,
//   P extends string = GetUnionFromStr<S>,
//   U extends string = never  // 这是记录之前的数据
// > = Exclude<GetUnionFromStr<S>, U> extends never // 这是为了结束递归数据,判断是否每一个选项都加载了一边
//   ? ""
//   : P extends GetUnionFromStr<S> // 这是为了泛型的分配律
//   ? P extends ""
//     ? ""
//     : `${P}${AllCombinations<S, Exclude<GetUnionFromStr<S>, U | P>, U | P>}`
//   : "";

// 方法二
// 方法一略繁琐，因为我们需要传入之前的数据进行过滤
// 但是，我们如果可以传入过滤后的数据则不再需要多传入一次参数
// type GetNewStr< // 这是将 abc 去除 U => ab的串
//   S extends string,
//   U extends string
//   > = S extends `${infer F}${infer R}`
//   ? `${F extends U ? "" : F}${GetNewStr<R, U>}`
//   : "";
// type AllCombinations<
//   S extends string,
//   P extends string = GetUnionFromStr<S>
//   > = P extends "" ? ""  : `${P}${AllCombinations<GetNewStr<S, P>>}`;

// 方法三
// 这是直接对联合类型操作,每次去除一个类型
type AllCombinationsHelper<S extends string, U extends string = S> =
  [U] extends [never] //  这是防止当U 是never时 直接返回never,这是解除nerve的这一个特性
  ? ""
  : U extends ""
  ? ""
  : U extends S
  ? `${U}${AllCombinationsHelper<Exclude<S, U>>}`
  : "";

type AllCombinations<S extends string> = AllCombinationsHelper<
  GetUnionFromStr<S>
>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<AllCombinations<"">, "">>,
  Expect<Equal<AllCombinations<"A">, "" | "A">>,
  Expect<Equal<AllCombinations<"AB">, "" | "A" | "B" | "AB" | "BA">>,
  Expect<
    Equal<
      AllCombinations<"ABC">,
      | ""
      | "A"
      | "B"
      | "C"
      | "AB"
      | "AC"
      | "BA"
      | "BC"
      | "CA"
      | "CB"
      | "ABC"
      | "ACB"
      | "BAC"
      | "BCA"
      | "CAB"
      | "CBA"
    >
  >,
  Expect<
    Equal<
      AllCombinations<"ABCD">,
      | ""
      | "A"
      | "B"
      | "C"
      | "D"
      | "AB"
      | "AC"
      | "AD"
      | "BA"
      | "BC"
      | "BD"
      | "CA"
      | "CB"
      | "CD"
      | "DA"
      | "DB"
      | "DC"
      | "ABC"
      | "ABD"
      | "ACB"
      | "ACD"
      | "ADB"
      | "ADC"
      | "BAC"
      | "BAD"
      | "BCA"
      | "BCD"
      | "BDA"
      | "BDC"
      | "CAB"
      | "CAD"
      | "CBA"
      | "CBD"
      | "CDA"
      | "CDB"
      | "DAB"
      | "DAC"
      | "DBA"
      | "DBC"
      | "DCA"
      | "DCB"
      | "ABCD"
      | "ABDC"
      | "ACBD"
      | "ACDB"
      | "ADBC"
      | "ADCB"
      | "BACD"
      | "BADC"
      | "BCAD"
      | "BCDA"
      | "BDAC"
      | "BDCA"
      | "CABD"
      | "CADB"
      | "CBAD"
      | "CBDA"
      | "CDAB"
      | "CDBA"
      | "DABC"
      | "DACB"
      | "DBAC"
      | "DBCA"
      | "DCAB"
      | "DCBA"
    >
  >
];
