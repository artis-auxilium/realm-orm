import Realm from 'realm';

export default class First extends Realm.Object {
  static schema = {
    name: 'TPerson',
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

  static transform (data) {
    data.age = 355;
  }
}
