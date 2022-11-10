// @ts-check
import Realm from 'realm';

export default class Holiday extends Realm.Object {
  static schema = {
    name: 'Holiday',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
    }
  }
  static stringFields = ['name']
}
