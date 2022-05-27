import RealmQuery from './libs/query';
import Realm from 'realm'; // eslint-disable-line
import DB from './';
import merge from './libs/merge';
/**
 *
 * @class Model
 */
export default class Model extends Realm.Object {

  /**
   * Model schema
   * @type {Realm.ObjectSchema}
   * @static
   * @abstract
   * @memberof Model
   */
  static schema

  /**
   * Array of string used for search text
   * @type {string[]}
   * @static
   * @abstract
   * @memberof Model
   */
  static stringFields = []

  /**
   * @typedef searchTextOption
   * @param {Array} stringFields array of string fields to search term
   * @param {boolean} return return query when true (limit has no effect if true)
   * @param {number} limit
   */

  /**
   * search object that contain text in stringFields
   *
   * @static
   * @param {string} term
   * @param {number|boolean|searchTextOption} limit (if true return query)
   * @returns {Realm.Results|RealmQuery}
   * @memberof Model
   * @example
   * // return Realm.Results
   * Model.searchText('pers', 10)
   *
   * // return query instead of Realm.Results
   * Model.searchText('pers', true)
   * // more configurable search
   * Model.searchText('dev', {
   *   stringFields: ['hobbies', 'name'],
   *   return: true
   * });
   */
  static searchText (term, limit) {
    let returnQuery = limit && typeof limit === 'boolean';
    let stringFields = this.stringFields;
    if (typeof limit === 'object') {
      stringFields = limit.stringFields || stringFields;
      returnQuery = limit.return;
      limit = limit.limit;
    }
    if (stringFields.length === 0) {
      throw new Error('stringFields not defined');
    }
    let terms = term.trim().split(' ');
    let query = this.query().beginGroup();
    let createQuery = (field) => {
      let queryField = (splittedTerm) => {
        query.contains(field, splittedTerm, true);
      };
      query.beginOrGroup();
      terms.forEach(queryField);
      query.endGroup();
    };
    stringFields.forEach(createQuery);
    query.endGroup();
    if (returnQuery) {
      return query;
    }
    let res = query.findAll();
    if (limit) {
      res = res.slice(0, limit);
    }
    return res;
  }
  /**
  * get a query instance of Model
  * @static
  * @returns {RealmQuery}
  * @memberof Model
  */
  static query () {
    return RealmQuery.query(this.all());
  }

  /**
   * Find object by its primary key
   * @static
   * @param {number} id
   * @returns {Model}
   * @memberof Model
   */
  static find (id) {
    return DB.db.objectForPrimaryKey(this.schema.name, id);
  }

  /**
   * get all Object of model
   *
   * @static
   * @returns {Realm.Results}
   * @memberof Model
   */
  static all () {
    return DB.db.objects(this.schema.name);
  }
  /**
   * Get all primaryKey of Model
   * @static
   * @returns {Array}
   * @memberof Model
   */
  static ids () {
    return this.all().map((obj) => obj[this.schema.primaryKey]);
  }
  /**
   * insert new object in database
   * @static
   * @param {(array|any)} data
   *
   * @returns {Promise<void>}
   * @memberof Model
   */
  static insert (data) {
    return new Promise((resolve) => {
      DB.db.write(() => {
        if (Array.isArray(data)) {
          data.forEach(this.doInsert.bind(this));
          resolve();
          return ;
        }
        this.doInsert(data);
        resolve();
      });
    });
  }
  /**
 * @private
 * @param {any} data
 */
  static doInsert (data) {
    /* istanbul ignore next  */
    if (!data) {
      return;
    }
    if (typeof this.transform === 'function') {
      this.transform(data);
    }
    /* istanbul ignore next  */
    if (typeof this.syncObject === 'function') {
      this.syncObject(data);
    }
    DB.db.create(this.schema.name, data, this.hasPrimary(data));
  }

  /**
   * insert new object in database and return object
   * @static
   * @param {array|any} data
   *
   * @returns {Promise<Model|Model[]>}
   * @memberof Model
   */
  static create (data) {
    return new Promise((resolve) => {
      if (Array.isArray(data)) {
        DB.db.write(() => {
          resolve(data.map(this.doCreate.bind(this)));
        });
        return;
      }
      DB.db.write(() => {
        resolve(this.doCreate(data));
      });
    });
  }

  /**
   * @private
   * @param {any} data
   */
  static doCreate(data) {
    /* istanbul ignore next  */
    if (!data) {
      return;
    }
    if (typeof this.transform === 'function') {
      this.transform(data);
    }
    /* istanbul ignore next  */
    if (typeof this.syncObject === 'function') {
      this.syncObject(data);
    }
    return DB.db.create(this.schema.name, data, this.hasPrimary(data));
  }


  /**
   * update object
   * @static
   * @param {Realm.Object} object
   * @param {any} data
   * @memberof Model
   * @returns {Promise<void>}
   */
  static update (object, data) {
    return new Promise((resolve, reject) => {
      try {
        DB.db.write(() => {
          merge(data, object);
          resolve();
        });

      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * delete results or object from database
   * @param {Realm.Results|Realm.Object} object
   * @memberof Model
   * @returns {Promise<void>}
   */
  static delete (object) {
    return new Promise((resolve, reject) => {
      try {
        DB.db.write(() => {
          DB.db.delete(object);
          resolve();
        });

      } catch (error) {
        reject(error);
      }
    });

  }
  /**
   *
   * @private
   * @static
   * @param {any} data
   * @returns {Realm.UpdateMode.Modified|Realm.UpdateMode.All | string}
   * @memberof Model
   */
  static hasPrimary (data) {
    return !!data && !!this.schema.primaryKey && !!data[this.schema.primaryKey] ? Realm.UpdateMode.Modified : Realm.UpdateMode.All;
  }

  /**
   * update model
   *
   * @param {any} data
   * @instance
   * @memberof Model
   * @returns {Promise<void>}
   * @example
   * Model.update({ field: 'value'})
   */
  update (data) {
    return Model.update(this, data);
  }

  /**
   * delete model
   * @instance
   * @returns {Promise<void>}
   * @memberof Model
   */
  delete () {
    return Model.delete(this);
  }
}
