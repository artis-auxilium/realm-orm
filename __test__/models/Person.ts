// @ts-check
import Holiday from "./Holiday";
import Model from "../../Model";
import Place from "./Place";

export default class Person extends Model<Person> {
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
            place: 'Place?',
            age: 'int',
            ref: 'string?',
            ref_ext: 'string?',
            createdAt: 'date'
        }
    }
    static stringFields = ['name', 'ref', 'ref_ext']

    id: number
    name: string
    hobbies?: string
    holidays: Holiday[]
    place?: Place
    age: number
    createdAt: Date
}
