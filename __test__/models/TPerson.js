import model from '../../Model';

export default class First extends model {
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