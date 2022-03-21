/*
* @description Implement a type FilterOut<T, F> that filters out items of the given type F from the tuple T.
* @link https://github.com/type-challenges/type-challenges/blob/master/questions/399-hard-tuple-filter/README.md
*/

/* _____________ Your Code Here _____________ */

type FilterOut<T extends any[], C, A extends unknown[] = []> = T extends [infer F, ...infer R] ?
    [F] extends [C] ? FilterOut<R, C, A> : FilterOut<R, C, [...A, F]> : A
/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<FilterOut<[], never>, []>>,
    Expect<Equal<FilterOut<[never], never>, []>>,
    Expect<Equal<FilterOut<['a', never], never>, ['a']>>,
    Expect<Equal<FilterOut<[1, never, 'a'], never>, [1, 'a']>>,
    Expect<Equal<FilterOut<[never, 1, 'a', undefined, false, null], never | null | undefined>, [1, 'a', false]>>,
    Expect<Equal<FilterOut<[number | null | undefined, never], never | null | undefined>, [number | null | undefined]>>
]
