import Realm from 'realm';
import Query from './query';
import Model from "../Model";
import merge from './merge';
import DB from '../';

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
Realm.Object.searchText = function (term, limit) {
    let returnQuery = limit && typeof limit === 'boolean';
    let stringFields = this.stringFields || [];
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

Realm.Results.prototype.query = function () {
    return Query.query(this);
};
/**
 * get a query instance of Model
 * @static
 * @returns {RealmQuery}
 * @memberof Model
 */
Realm.Object.query = function () {
    return Query.query(this.all());
};

/**
 * Find object by its primary key
 * @static
 * @param {number} id
 * @returns {Model}
 * @memberof Model
 */
Realm.Object.find = function (id) {
    return DB.db.objectForPrimaryKey(this.schema.name, id);
}


/**
 * get all Object of model
 *
 * @static
 * @returns {Realm.Results}
 * @memberof Model
 */
Realm.Object.all = function () {
    return DB.db.objects(this.schema.name);
}

/**
 * Get all primaryKey of Model
 * @static
 * @returns {Array}
 * @memberof Model
 */
Realm.Object.ids = function () {
    return this.all().map((obj) => obj[this.schema.primaryKey]);
}

const doCreate = Symbol('realmOrmDoCreate')
/**
 * insert new object in database and return object
 * @static
 * @param {array|any} data
 *
 * @returns {Promise<Model|Model[]>}
 * @memberof Model
 */
Realm.Object.create = function (data) {
    return new Promise((resolve) => {
        if (Array.isArray(data)) {
            DB.db.write(() => {
                resolve(data.map(this[doCreate].bind(this)));
            });
            return;
        }
        DB.db.write(() => {
            resolve(this[doCreate](data));
        });
    });
}


/**
 * @private
 * @param {any} data
 */
Realm.Object[doCreate] = function (data) {
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
Realm.Object.update = function (object, data) {
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
Realm.Object.delete = function (object) {
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
const doInsert = Symbol('RealmOrmDoInsert');

Realm.Object.insert = function (data) {
    return new Promise((resolve) => {
        DB.db.write(() => {
            if (Array.isArray(data)) {
                data.forEach(this[doInsert].bind(this));
                resolve();
                return;
            }
            this[doInsert](data);
            resolve();
        });
    });
}

Realm.Object[doInsert] = function (data) {
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

Realm.Object.hasPrimary = function (data) {
    return !!data && !!this.schema.primaryKey && !!data[this.schema.primaryKey] ? Realm.UpdateMode.Modified : Realm.UpdateMode.All;
}

Realm.Object.prototype.update = function (data) {
    return Model.update(this, data);
}

Realm.Object.prototype.delete = function () {
    return Model.delete(this);
}
