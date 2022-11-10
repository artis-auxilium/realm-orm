
import Model, { ModelStatic } from '../../Model';


export class Holiday extends Model<Holiday> {
    id: number
    name: string
}

declare var holiday : ModelStatic<Holiday>
export default holiday;
