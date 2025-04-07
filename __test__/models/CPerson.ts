// @ts-check
import Model from '../../Model';
import Realm from "realm";

export default class CPerson extends Model<CPerson> {
  static schema: Realm.ObjectSchema = {
    name: 'CPerson',
    properties: {
      name: 'string',
      hobbies: {
        type: 'string',
        optional: true
      },
      age: 'int',
      createdAt: 'date'
    }
  }
  static stringFields = ['name']
}
