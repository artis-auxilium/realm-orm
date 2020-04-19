import * as Realm from 'realm'
import Model, { ModelStatic } from './Model'

export default class DB {
  constructor(option: Realm.Configuration)
  static models: ModelStatic<any>[]
  static db: Realm
  open(): Promise<Realm>
}

export const model: Model<any>
