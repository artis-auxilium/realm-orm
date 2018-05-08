import RealmQuery from './query'

export interface ModelItem {
  delete(): void
  update(): void
}

export default class Model<ModelItem> {
  static abstract schema: Realm.ObjectSchema
  static all() : Realm.Results<any>
  static searchText (term: string, limit: number): Realm.Results<any>
  static searchText (term: string, limit: boolean): RealmQuery<any>
  static find (id: number): any
  static query() : RealmQuery<any>
  static insert(object: any | any[])
  static ids(): number[]
  static delete(object: Realm.Results<any>| any ): void
}
