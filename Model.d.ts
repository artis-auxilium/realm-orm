import RealmQuery from './libs/query'

export default class Model<M> {
  delete(): void
  update(): void
  static schema: Realm.ObjectSchema
  static all<M>() : Realm.Results<M>
  static searchText<M>(term: string, limit: number): Realm.Results<M>
  static searchText<M>(term: string, limit: boolean): RealmQuery<M>
  static find<M>(id: number): M
  static query<M>() : RealmQuery<M>
  static insert<M>(object: any | any[])
  static ids(): number[]
  static delete<M>(object: Realm.Results<M>| any ): void
}
