import Realm from 'realm';
import './libs/extensions';

class DB {
  /**
   *
   * @param {Realm.Configuration} options
   */
  constructor (options) {
    if (options.migration && !options.onMigration) {
      options.onMigration = options.migration;
    }
    if (options.shouldCompactOnLaunch && !options.shouldCompact) {
      options.shouldCompact = options.shouldCompactOnLaunch;
    }
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
