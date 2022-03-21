/*
* @description 元组转枚举
* @link https://github.com/type-challenges/type-challenges/blob/master/questions/472-hard-tuple-to-enum-object/README.md
*/

type FindIndex<T extends readonly unknown[], P extends T[number], A extends unknown[] = []> = T extends readonly [infer F, ...infer R] ?
    [F] extends [P] ? A["length"] : FindIndex<R, P, [...A, 1]> : []

/* _____________ Your Code Here _____________ */
type Enum<T extends readonly string[], N extends boolean = false> =
    {
        readonly [P in T[number]as Capitalize<P>]: N extends true ? FindIndex<T, P> : P
    }

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

const OperatingSystem = ['macOS', 'Windows', 'Linux'] as const  // 这里会变成 readonly ['macOS', 'Windows', 'Linux']。则无法进行循环操作，需要加readonly
const Command = ['echo', 'grep', 'sed', 'awk', 'cut', 'uniq', 'head', 'tail', 'xargs', 'shift'] as const

type cases = [
    Expect<Equal<Enum<[]>, {}>>,
    Expect<Equal<
        Enum<typeof OperatingSystem>,
        {
            readonly MacOS: 'macOS'
            readonly Windows: 'Windows'
            readonly Linux: 'Linux'
        }
    >>,
    Expect<Equal<
        Enum<typeof OperatingSystem, true>,
        {
            readonly MacOS: 0
            readonly Windows: 1
            readonly Linux: 2
        }
    >>,
    Expect<Equal<
        Enum<typeof Command>,
        {
            readonly Echo: 'echo'
            readonly Grep: 'grep'
            readonly Sed: 'sed'
            readonly Awk: 'awk'
            readonly Cut: 'cut'
            readonly Uniq: 'uniq'
            readonly Head: 'head'
            readonly Tail: 'tail'
            readonly Xargs: 'xargs'
            readonly Shift: 'shift'
        }
    >>,
    Expect<Equal<
        Enum<typeof Command, true>,
        {
            readonly Echo: 0
            readonly Grep: 1
            readonly Sed: 2
            readonly Awk: 3
            readonly Cut: 4
            readonly Uniq: 5
            readonly Head: 6
            readonly Tail: 7
            readonly Xargs: 8
            readonly Shift: 9
        }
    >>
]