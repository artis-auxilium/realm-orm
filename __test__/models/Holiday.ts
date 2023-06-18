import Model from "../../Model";
import Place from "./Place";

export default class Holiday extends Model<Holiday> {
    id: number
    name: string
    places: Place[]
    static schema = {
        name: 'Holiday',
        primaryKey: 'id',
        properties: {
            id: 'int',
            name: 'string',
            places: 'Place[]'
        }
    }
    static stringFields = ['name']
}
