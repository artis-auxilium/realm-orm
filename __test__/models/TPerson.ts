import Model from "../../Model";

export default class TPerson extends Model<TPerson> {
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

  id: number
  name: string
  hobbies?: string
  age: number
  createdAt: Date

  static transform (data) {
    data.age = 355;
    return data;
  }
}
