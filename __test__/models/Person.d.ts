
import Model, { ModelStatic } from '../../Model';
import Holiday from './Holiday';

export class Person extends Model<Person> {

  id: number
  name: string
  hobbies?: string
  holidays: Holiday[]
  age: number
  createdAt: Date
}

declare var person : ModelStatic<Person>
export default person;
