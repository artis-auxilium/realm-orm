import Model from "../../Model";


export default class Place extends Model<Place> {
    static schema = {
        name: 'Place',
        primaryKey: 'id',
        properties: {
            id: 'int',
            name: 'string',
        }
    }
    id: number
    name: string
}
