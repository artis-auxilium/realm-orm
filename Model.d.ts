import RealmQuery from './libs/query'
import * as Realm from 'realm'

interface SearchOption {
    stringFields?: string[]
    limit?: number,
    casing?: boolean
}

interface SearchOptionQuery extends SearchOption{
    return: true
}

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof Partial<T>];
type NonFunctionProperties<T> = Pick<Partial<T>, NonFunctionPropertyNames<T>>;


export default abstract class Model<M> extends Realm.Object<M> {
    static schema: Realm.ObjectSchema

    // @ts-ignore
    static all<T extends M>(): Realm.Results<T>

    // @ts-ignore
    static searchText<T extends M>(term: string, limit?: number): Realm.Results<T>
    // @ts-ignore
    static searchText<T extends M>(term: string, limit?: boolean): RealmQuery<T>
    // @ts-ignore
    static searchText<T extends M>(term: string, options: SearchOptionQuery): RealmQuery<T>
    // @ts-ignore
    static searchText<T extends M>(term: string, options: SearchOption): Realm.Results<T>

    // @ts-ignore
    static find<T extends M>(id: number | string): T

    // @ts-ignore
    static query<T extends M>(): RealmQuery<T>

    // @ts-ignore
    static insert<T extends M>(object: NonFunctionProperties<T> | NonFunctionProperties<T>[]): Promise<void>

    // @ts-ignore
    static create<T extends M>(object: NonFunctionProperties<T> | NonFunctionProperties<T>[]): Promise<T>

    static ids(): number[]

    // @ts-ignore
    static delete<T extends M>(object: Realm.Results<T> | T): Promise<void>

    // @ts-ignore
    static transform<T extends Partial<M>>(data: T): T

    // @ts-ignore
    static syncObject<T extends Partial<M>>(data: T): T

    delete(): Promise<void>

    update(object: NonFunctionProperties<M>): Promise<void>
}
