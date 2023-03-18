import RealmQuery from "./libs/query";
import Model from "./Model";

export {}

declare module "realm" {
    interface Results<T> {
        query(): RealmQuery<T>
    }

}
