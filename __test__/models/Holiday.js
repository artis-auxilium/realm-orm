// @ts-check
import Model from '../../Model';

export default class Holiday extends Model {
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