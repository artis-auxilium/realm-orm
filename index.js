import Realm from 'realm';
import Query from './libs/query';

Realm.Results.prototype.query = function () {
  return Query.query(this);
};

class DB {
  constructor (options) {
    this.realmOptions = options;
  }
  /**
   * @static
   * @type {Realm}
   */
  static db;

  open () {
    return new Promise((resolve, reject) => {
      try {
        let db = new Realm(this.realmOptions);
        DB.db = db;
        resolve(db);
      } catch (error) {
        /* istanbul ignore next  */
        reject(error);
      }
    });
  }
}
export default DB;