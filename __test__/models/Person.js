// @ts-check
import Realm from 'realm';

export default class First extends Realm.Object {
  static schema = {
    name: 'Person',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      hobbies: {
        type: 'string',
        optional: true
      },
      holidays: 'Holiday[]',
      age: 'int',
      ref: 'string?',
      ref_ext: 'string?',
      createdAt: 'date'
    }
  }
  static stringFields = ['name', 'ref', 'ref_ext']
}
