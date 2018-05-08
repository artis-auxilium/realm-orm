// @ts-check
import Model from '../../Model';

export default class First extends Model {
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
      age: 'int',
      createdAt: 'date'
    }
  }
  static stringFields = ['name']
}