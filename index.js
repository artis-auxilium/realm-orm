import Realm from 'realm';
import './libs/extensions';

/**
 * @typedef OdlRealmConfiguration
 * @property {Function} migration
 * @property {function} shouldCompactOnLaunch
 */

class DB {
  /**
   *
   * @param {Realm.Configuration | OdlRealmConfiguration } options
   */
  constructor (options) {
    /* istanbul ignore next  */
    if (options.migration && !options.onMigration) {
      console.warn("Use of deprecated option migration, replace with onMigration")
      options.onMigration = options.migration;
    }
    /* istanbul ignore next  */
    if (options.shouldCompactOnLaunch && !options.shouldCompact) {
      console.warn("Use of deprecated option shouldCompactOnLaunch, use shouldCompact")
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
