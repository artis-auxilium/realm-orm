import Model from "../../Model";


export default class Place extends Model<Place> {
    static schema: Realm.ObjectSchema = {
        name: 'Place',
        primaryKey: 'id',
        properties: {
            id: 'int',
            name: 'string',
            nb_peoples: 'int'
        }
    }
    id: number
    name: string
    nb_peoples: number
}
