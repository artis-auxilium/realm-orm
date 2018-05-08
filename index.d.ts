import Realm from 'realm'
import model from './utils/Model'

export default class DB {
  static models = {

  }
  static db: Realm
  open(): Promise<Realm>
}

export const Model: model
