/*
* @description   Implement `Format<T extends string>` generic.
* @link https://github.com/type-challenges/type-challenges/blob/master/questions/545-hard-printf/README.md
*/


// %d=>number %s=>string
/* _____________ Your Code Here _____________ */

type Code = 'd' | 's'

type Format<T extends string> = T extends `${infer F}%${infer C}${infer R}` ? C extends Code ? (
    param: C extends 'd' ? number : string
) => Format<R> : string : string

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<Format<'abc'>, string>>,
    Expect<Equal<Format<'a%sbc'>, (d1: string) => string>>,
    Expect<Equal<Format<'a%aaabc'>, string>>,
    Expect<Equal<Format<'a%s%aaabc'>, (d1: string) => string>>,
    Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
    Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>,
    Expect<Equal<Format<'abc%s%d'>, (d1: string) => (s1: number) => string>>,
]