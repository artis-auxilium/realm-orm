
import Model, { ModelStatic } from '../../Model';


export class Person extends Model<Person> {
    id: number
    name: string
}

declare var person : ModelStatic<Person>
export default person;
