// @ts-check
import Model from '../../Model';

export default class CPerson extends Model {
  static schema = {
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