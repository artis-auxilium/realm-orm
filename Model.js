import RealmQuery from './libs/query';
import Realm from 'realm'; // eslint-disable-line
import DB from './';
import merge from './libs/merge';

const isNode = () => typeof process === 'object' && process + '' === '[object process]';

/* istanbul ignore next  */
class FakeRealmObject {
  isValid () {
    console.warn('isValid not available in node');
  }

  objectSchema () {
    console.warn('objectSchema not available in node');
  }

  linkingObjects () {
    console.warn('linkingObjects not available in node');
  }
}

const RealmObject = isNode() ? FakeRealmObject : /* istanbul ignore next  */ Realm.Object;

/**
 *
 * @class Model
 */
export default class Model extends RealmObject {

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
          const all = data.map(row => {
            return this.doInsert(row);
          })
          resolve(Promise.all(all));
          return;
        }
        resolve(this.doInsert(data));
      });
    });
  }

  /**
   * @private
   * @param {any} data
   */
  static doInsert(data) {
    return new Promise((resolve) => {
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
      if (!data[this.schema.primaryKey]) {
        const currentId = this.query().max(this.schema.primaryKey) || 0;
        data[this.schema.primaryKey] = currentId + 1;
      }
      DB.db.create(this.schema.name, data, this.hasPrimary(data));
      const all = this.all();
      resolve(all[all.length - 1]);
    });
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
          resolve(object);
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * force update object when realm doesn't detect changes
   * @static
   * @param {Realm.Object} object
   * @memberof Model
   * @returns {Promise<void>}
   */
  static forceUpdate(object) {
    return new Promise((resolve, reject) => {
      try {
        DB.db.write(() => {
          DB.db.create(this.schema.name, object, this.hasPrimary(object));
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
   * @returns {boolean}
   * @memberof Model
   */
  static hasPrimary (data) {
    return !!this.schema.primaryKey && !!data[this.schema.primaryKey];
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
