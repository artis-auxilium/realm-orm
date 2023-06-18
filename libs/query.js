// noinspection JSUnusedGlobalSymbols

let reducePath = (obj, index) => obj[index];

/**
 * @typedef CompareValueType
 * @param {Date| Number}
 */

/**
  * @typedef EqualValueType
  * @param { string | number | boolean | Date}
  */

/**
 * @typedef Condition
 * @param {'AND'|'OR'}
 */

class rawQuery {
  constructor (raw) {
    this.raw = raw;
  }
  toString() {
    return this.raw;
  }
}

/**
 *
 *
 * @class RealmQuery
 */
class RealmQuery {

  constructor (objects) {
    this.objects = objects;
  }

  /**
   * @private
   * @type {Realm.Collection}
   *
   * @memberof RealmQuery
   */
  objects;
  criteria = [];
  values = [];
  sorted = [];
  distincts = [];
  path = '';

  /**
   * @private
   * @param {any} criteria
   * @param {Condition?} condition
   * @returns {RealmQuery}
   * @memberof RealmQuery
   */
  addCriteria (criteria, condition) {
    let group = this.criteria;
    if (this.path !== '') {
      group = this.path.split('.').reduce(reducePath, this.criteria);
    }
    if (group.length >= 1 && group[group.length - 1] !== 'NOT') {
      group.push(condition);
    }
    group.push(criteria);
    return this;
  }

  addValue (value) {
    let index;
    if ((index = this.values.indexOf(value)) > -1) {
      return index;
    }
    this.values.push(value);
    return this.values.length -1;
  }
  /**
   * @private
   * get filtered object
   * @returns {Realm.Results|Realm.Collection}
   */
  getFilteredObjects () {
    if ((this.sorted.length > 0 || this.distincts.length > 0) && this.criteria.length === 0) {
      throw new Error('Can\'t have sort or distinct without query filter');
    }
    const query = this.toString();
    let results = this.objects;
    if (query) {
      results = results.filtered(query, ...this.values);
    }
    return results;
  }

  toStringWithValues () {
    let query = this.toString();
    return query.replace(/(\$\d+)/g, (part) => {
      let key = parseInt(part.replace('$', ''), 10);
      let value = this.values[key];
      if (Array.isArray(value)) {
        return `{ ${value.map(val => typeof val === 'string' ? `"${val}"` : val).join(', ')} }`
      }
      return typeof value === 'string' ? `"${value}"` : value;
    });
  }

  debug () {
    return this.toStringWithValues();
  }

  toString () {
    const toString = (criteria) => {
      if (criteria.indexOf('NOT') > -1) {
        criteria.shift();
        return `NOT(${criteria.map(toString).join(' ')})`;
      }
      if (Array.isArray(criteria)) {
        return `(${criteria.map(toString).join(' ')})`;
      }
      return criteria;
    };
    let query = this.criteria.map(toString).join(' ');
    if (this.sorted.length > 0) {
      query = `${query} SORT(${this.sorted.join(', ')}) `;
    }
    if (this.distincts.length > 0) {
      query = `${query} DISTINCT(${this.distincts.join(', ')})`;
    }

    return query;
  }

  /**
   * select distinct element
   *
   * @param {string|string[]} fieldName
   * @return {RealmQuery}
   */
  distinct (fieldName) {
    if (Array.isArray(fieldName)) {
      this.distincts = this.distincts.concat(fieldName);
      return this;
    }
    this.distincts.push(fieldName);
    return this;
  }

  /**
  * Sort result
  * @param {string} fieldName
  * @param {'ASC'|'DESC'} order
  */
  sort (fieldName, order = 'ASC') {
    /* istanbul ignore if */
    if (typeof order ==='boolean') {
      console.warn('RealmQuery: use of old sort, should use "ASC" or "DESC');
      order = order ? 'DESC' : 'ASC';
    }
    this.sorted.push(`${fieldName} ${order}`);
    return this;
  }

  /**
   * Finds all objects that fulfill the query conditions
   * @return {Realm.Results}
   */
  findAll () {
    return this.getFilteredObjects();
  }
  /**
   * Finds the first object that fulfills the query conditions
   * @return {Realm.Object}
   */
  findFirst () {
    let results = this.getFilteredObjects();
    return results.length ? results[0] : /* istanbul ignore next  */ undefined;
  }

  /**
   * Returns the maximum value of the values in the collection or of the given property
   * among all the objects in the collection, or undefined if the collection is empty.
   * Only supported for int, float, double and date properties.
   * null values are ignored entirely by this method and will not be returned.
   *
   * @param {string} fieldName
   * @returns {number}
   */
  max (fieldName) {
    return this.getFilteredObjects().max(fieldName);
  }

  /**
   * Returns the minimum value of the values in the collection or of the given property
   * among all the objects in the collection, or undefined if the collection is empty.
   * Only supported for int, float, double and date properties.
   * null values are ignored entirely by this method and will not be returned
   *
   * @param {string} fieldName
   */
  min (fieldName) {
    return this.getFilteredObjects().min(fieldName);
  }
  /**
   *
   * @param {string} fieldName
   */
  sum (fieldName) {
    return this.getFilteredObjects().sum(fieldName);
  }
  /**
   *
   * @param {string} fieldName
   */
  avg (fieldName) {
    return this.getFilteredObjects().avg(fieldName);
  }

  /**
   * Counts the number of objects that fulfill the query conditions
   *
   * @return {number}
   */
  count () {
    let results = this.getFilteredObjects();
    return results.length;
  }

  /**
   * Between condition
   *
   * @param {string} fieldName
   * @param {CompareValueType|CompareValueType[]} from
   * @param {CompareValueType} to
   * @param {CollectionOperator} collectionOperator
   * @return {RealmQuery}
   */
  between (fieldName, from, to, collectionOperator = '') {
    let posFrom = this.addValue(from);
    let posTo = this.addValue(to);
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
    return this.addCriteria(`${fieldName} BETWEEN {$${posFrom}, $${posTo}}`, 'AND');
  }

  /**
   * Or between condition
   *
   * @param {string} fieldName
   * @param {CompareValueType} from
   * @param {CompareValueType} to
   * @param {CollectionOperator} collectionOperator
   *
   * @return {RealmQuery}
   */
  orBetween (fieldName, from, to, collectionOperator = '') {
    let posFrom = this.addValue(from);
    let posTo = this.addValue(to);
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
    return this.addCriteria(`${fieldName} BETWEEN {$${posFrom}, $${posTo}}`, 'OR');
  }

  /**
   * Condition that the value of field begins with the specified string
   *
   * @param {string} fieldName
   * @param {string} value
   * @param {?boolean} casing  BEGINSWITH[c] or BEGINSWITH
   * @param {Condition} condition
   * @return {RealmQuery}
   */
  beginsWith (fieldName, value, casing, condition = 'AND') {
    const op = casing ? 'BEGINSWITH[c]' : 'BEGINSWITH';
    let pos = this.addValue(value);
    return this.addCriteria(`${fieldName} ${op} $${pos}`, condition);
  }
  /**
   * OR Condition that the value of field begins with the specified string
   *
   * @param {string} fieldName
   * @param {string} value
   * @param {?boolean} casing  BEGINSWITH[c] or BEGINSWITH
   * @return {RealmQuery}
   */
  orBeginsWith (fieldName, value, casing) {
    return this.beginsWith(fieldName, value, casing, 'OR');
  }
  /**
   * Condition that value of field contains the specified substring
   *
   * @param {string} fieldName
   * @param {string} value
   * @param {?boolean} casing  CONTAINS[c] or CONTAINS
   * @param {Condition} condition
   * @return {RealmQuery}
   */
  contains (fieldName, value, casing, condition = 'AND') {
    const op = casing ? 'CONTAINS[c]' : 'CONTAINS';
    let pos = this.addValue(value);
    return this.addCriteria(`${fieldName} ${op} $${pos}`, condition);
  }
  /**
   * OR Condition that value of field contains the specified substring
   *
   * @param {string} fieldName
   * @param {string} value
   * @param {?boolean} casing  CONTAINS[c] or CONTAINS
   * @return {RealmQuery}
   */
  orContains (fieldName, value, casing) {
    return this.contains(fieldName, value, casing, 'OR');
  }


  /**
   * Condition that the value of field ends with the specified string
   *
   * @param {string} fieldName
   * @param {string} value
   * @param {boolean?} casing  ENDSWITH[c] or ENDSWITH
   * @param {Condition} condition
   * @return {RealmQuery}
   */
  endsWith (fieldName, value, casing, condition = 'AND') {
    const op = casing ? 'ENDSWITH[c]' : 'ENDSWITH';
    let pos = this.addValue(value);
    return this.addCriteria(`${fieldName} ${op} $${pos}`, condition);
  }

  /**
   * OR Condition that the value of field ends with the specified string
   *
   * @param {string} fieldName
   * @param {string} value
   * @param {boolean?} casing  ENDSWITH[c] or ENDSWITH
   * @return {RealmQuery}
   */
  orEndsWith (fieldName, value, casing) {
    return this.endsWith(fieldName, value, casing, 'OR');
  }
  /**
   * Equal-to comparaison
   *
   * @param {string} fieldName
   * @param {EqualValueType} value
   * @param {CollectionOperator} collectionOperator
   * @param {Condition} condition
   *
   * @return {RealmQuery}
   */
  equalTo (fieldName, value, collectionOperator = '', condition = 'AND') {
    let pos = this.addValue(value);
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
    return this.addCriteria(`${fieldName} == $${pos}`, condition);
  }

  /**
   * Or equal-to comparaison
   *
   * @param {string} fieldName
   * @param {EqualValueType} value
   * @param {CollectionOperator} collectionOperator
   *
   * @return {RealmQuery}
   */
  orEqualTo (fieldName, value, collectionOperator) {
    return this.equalTo(fieldName, value,collectionOperator, 'OR');
  }

  /**
   * Not-equal-to comparaison
   *
   * @param fieldName {string}
   * @param value {EqualValueType}
   * @param {CollectionOperator} collectionOperator
   * @param {Condition} condition
   *
   * @return {RealmQuery}
   */
  notEqualTo (fieldName, value, collectionOperator = '', condition = 'AND') {
    let pos = this.addValue(value);
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
    return this.addCriteria(`${fieldName} != $${pos}`, condition);
  }

  /**
   * or Not-equal-to comparaison
   *
   * @param fieldName {string}
   * @param value {EqualValueType}
   * @param {CollectionOperator} collectionOperator
   *
   * @return {RealmQuery}
   */
  orNotEqualTo (fieldName, value, collectionOperator = '') {
    return this.notEqualTo(fieldName, value, collectionOperator, 'OR');
  }

  /**
   * Greater-than comparaison
   *
   * @param {string} fieldName
   * @param {CompareValueType} value
   * @param {CollectionOperator} collectionOperator
   * @param {Condition} condition
   *
   * @return {RealmQuery}
   */
  greaterThan (fieldName, value, collectionOperator = '', condition = 'AND') {
    let pos = this.addValue(value);
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
    return this.addCriteria(`${fieldName} > $${pos}`, condition);
  }

  /**
   * OR Greater-than comparaison
   *
   * @param {string} fieldName
   * @param {CompareValueType} value
   * @param {CollectionOperator} collectionOperator
   *
   * @return {RealmQuery}
   */
  orGreaterThan (fieldName, value, collectionOperator = '') {
    return this.greaterThan (fieldName, value,collectionOperator,  'OR');
  }
  /**
   * greater-than-or-equal-to comparaison
   *
   * @param  {string} fieldName
   * @param {CompareValueType} value
   * @param {CollectionOperator} collectionOperator
   * @param {Condition} condition
   *
   * @return {RealmQuery}
   */
  greaterThanOrEqualTo (fieldName, value, collectionOperator = '', condition = 'AND') {
    let pos = this.addValue(value);
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
    return this.addCriteria(`${fieldName} >= $${pos}`, condition);
  }

  /**
   * Or greater-than-or-equal-to comparaison
   *
   * @param  {string} fieldName
   * @param {CompareValueType} value
   * @param {CollectionOperator} collectionOperator
   *
   * @return {RealmQuery}
   */
  orGreaterThanOrEqualTo (fieldName, value, collectionOperator = '') {
    return this.greaterThanOrEqualTo (fieldName, value, collectionOperator, 'OR');
  }

  /**
   * Less-than comparaison
   *
   * @param {string} fieldName
   * @param {CompareValueType} value
   * @param {CollectionOperator} collectionOperator
   * @param {Condition} condition
   *
   * @return {RealmQuery}
   */
  lessThan (fieldName, value,collectionOperator = '', condition = 'AND') {
    let pos = this.addValue(value);
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
    return this.addCriteria(`${fieldName} < $${pos}`, condition);
  }
  /**
   * or Less-than comparaison
   *
   * @param {string} fieldName
   * @param {CompareValueType} value
   * @param {CollectionOperator} collectionOperator
   *
   * @return {RealmQuery}
   */
  orLessThan (fieldName, value, collectionOperator = '') {
    return this.lessThan(fieldName, value,collectionOperator , 'OR');
  }
  /**
   * Less-than-or-equal-to comparaison
   *
   * @param {string} fieldName
   * @param {CompareValueType} value
   * @param {CollectionOperator} collectionOperator
   * @param {Condition} condition
   *
   * @return {RealmQuery}
   */
  lessThanOrEqualTo (fieldName, value, collectionOperator = '', condition = 'AND') {
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
    let pos = this.addValue(value);
    return this.addCriteria(`${fieldName} <= $${pos}`, condition);
  }
  /**
   * OR Less-than-or-equal-to comparaison
   *
   * @param {string} fieldName
   * @param {CompareValueType} value
   * @param {CollectionOperator} collectionOperator
   * @return {RealmQuery}
   */
  orLessThanOrEqualTo (fieldName, value, collectionOperator = '') {
    return this.lessThanOrEqualTo(fieldName, value, collectionOperator, 'OR');
  }
  /**
   * In comparaison
   *
   * @param {string} fieldName
   * @param {EqualValueType[]} values
   * @param {CollectionOperator} collectionOperator
   * @param {Condition} condition
   * @return {RealmQuery}
   */
  in (fieldName, values, collectionOperator = '', condition = 'AND') {
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
      let pos = this.addValue(values);
      return this.addCriteria(`${fieldName} in $${pos}`, condition);
  }

  /**
   * Or in comparaison
   *
   * @param {string} fieldName
   * @param {EqualValueType[]} values
   * @param {CollectionOperator} collectionOperator
   * @return {RealmQuery}
   */
  orIn (fieldName, values, collectionOperator = '') {
    return this.in(fieldName, values,collectionOperator, 'OR');
  }

  /**
   * not In comparaison
   *
   * @param {string} fieldName
   * @param {EqualValueType[]} values
   * @param {CollectionOperator} collectionOperator
   * @param {Condition} condition
   * @return {RealmQuery}
   */
  notIn (fieldName, values, collectionOperator = '', condition = 'AND') {
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
    let pos = this.addValue(values);
    return this.addCriteria(`${fieldName} in NONE $${pos}`, condition);
  }

  /**
   * Or not in comparaison
   *
   * @param {string} fieldName
   * @param {EqualValueType[]} values
   * @param {CollectionOperator} collectionOperator
   * @return {RealmQuery}
   */
  orNotIn (fieldName, values, collectionOperator = '') {
    return this.notIn(fieldName, values, collectionOperator, 'OR');
  }

  /**
   * not null comparaison
   * @param {string} fieldName
   * @param {CollectionOperator} collectionOperator
   *
   * @returns {RealmQuery}
   */
  isNotNull (fieldName, collectionOperator = '') {
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
    return this.addCriteria(`${fieldName} != nil`, 'AND');
  }
  /**
   * null comparaison
   * @param {string} fieldName
   * @param {CollectionOperator} collectionOperator
   *
   * @returns {RealmQuery}
   */
  isNull (fieldName, collectionOperator = '') {
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
    return this.addCriteria(`${fieldName} == nil`, 'AND');
  }  /**
   * not null comparaison
   * @param {string} fieldName
   * @param {CollectionOperator} collectionOperator
   *
   * @returns {RealmQuery}
   */
  orIsNotNull (fieldName, collectionOperator = '') {
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
    return this.addCriteria(`${fieldName} != nil`, 'OR');
  }
  /**
   * null comparaison
   * @param {string} fieldName
   * @param {CollectionOperator} collectionOperator
   *
   * @returns {RealmQuery}
   */
  orIsNull (fieldName, collectionOperator = '') {
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
    return this.addCriteria(`${fieldName} == nil`, 'OR');
  }

  /**
   *
   * @param fieldName
   * @param {CollectionOperator} collectionOperator
   * @return {RealmQuery}
   */
  isEmpty (fieldName, collectionOperator = '') {
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
    return this.addCriteria(`${fieldName} == ''`, 'AND');
  }

  /**
   *
   * @param fieldName
   * @param {CollectionOperator} collectionOperator
   * @return {RealmQuery}
   */
  isNotEmpty (fieldName, collectionOperator = '') {
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
    return this.addCriteria(`${fieldName} != ''`, 'AND');
  }

  /**
   *
   * @param fieldName
   * @param {CollectionOperator} collectionOperator
   * @return {RealmQuery}
   */
  orIsEmpty (fieldName, collectionOperator = '') {
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
    return this.addCriteria(`${fieldName} == ''`, 'OR');
  }

  /**
   *
   * @param fieldName
   * @param {CollectionOperator} collectionOperator
   * @return {RealmQuery}
   */
  orIsNotEmpty (fieldName, collectionOperator = '') {
    if (collectionOperator.length > 0) {
      fieldName = `${collectionOperator} ${fieldName}`;
    }
    return this.addCriteria(`${fieldName} != ''`, 'OR');
  }

  /**
   * Like operator
   * @private
   * @param {string} fieldName
   * @param {string} value
   * @param {Condition} condition
   */
  like (fieldName, value, condition = 'AND') {
    let pos = this.addValue(value);
    return this.addCriteria(`${fieldName} LIKE $${pos}`, condition);
  }
  /**
   * Like operator
   * @private
   * @param fieldName
   * @param value
   */
  orLike (fieldName, value) {
    return this.like(fieldName, value, 'OR');
  }
  /**
   * start a NOT operator
   * @returns {RealmQuery}
   */
  not () {
    this.beginGroup();
    return this.addCriteria('NOT');
  }
  /**
   * end a NOT operator
   * @returns {RealmQuery}
   */
  endNot () {
    return this.endGroup();
  }


  /**
   * Begin AND grouping of conditions ("left parenthesis")
   *
   * @return {RealmQuery}
   */
  beginGroup (condition = 'AND') {
    let oldGroup = this.path === '' ? this.criteria : this.path.split('.').reduce(reducePath, this.criteria);
    if (oldGroup.length >= 1) {
      oldGroup.push(condition);
    }
    let key = oldGroup.length;
    oldGroup.push([]);
    this.path = this.path === ''? `${key}` : `${this.path}.${key}`;
    return this;
  }

  /**
   * Begin OR grouping of conditions ("left parenthesis")
   *
   * @return {RealmQuery}
   */

  beginOrGroup () {
    return this.beginGroup('OR');
  }

  /**
   * End grouping of conditions ("right parenthesis") which was opened by a call to beginGroup()
   * @return {RealmQuery}
   */
  endGroup () {
    this.path = this.path.split('.').slice(0, -1).join('.');
    return this;
  }
  /**
   * @callback groupCallback
   * @param {RealmQuery}
   */


  /**
  * Group query in a callback
  * @param {groupCallback} cb
  * @return {RealmQuery}
  * @example
  * query.group((groupQuery) => {
  *   return groupQuery
  *      .equalTo('field', 10)
  *      .orEqualTo('field2', 'value')
  * })
  */
  group (cb) {
    let query = cb(new RealmQuery());
    this.beginGroup().join(query).endGroup();
    return this;
  }

  /**
  * Group query in a callback with OR operator
  * @param {groupCallback} cb
  * @return {RealmQuery}
  * @example
  * query.orGroup((groupQuery) => {
  *   return groupQuery
  *      .equalTo('field', 10)
  *      .orEqualTo('field2', 'value')
  * })
  */
  orGroup (cb) {
    let query = cb(new RealmQuery());
    this.beginOrGroup().join(query).endGroup();
    return this;
  }

  /**
   * Combine to another query
   * @param {RealmQuery} query
   * @returns {RealmQuery}
   */
  join (query) {
    return this.addJoin(query, 'AND');
  }

  /**
   * Combine to another query with OR operator
   * @param {RealmQuery} query
   * @returns {RealmQuery}
   */
  orJoin (query) {
    return this.addJoin(query, 'OR');
  }
  /**
   * @private
   * @param {RealmQuery} query
   * @param {Condition} condition
   * @returns {RealmQuery}
   * @memberof RealmQuery
   */
  addJoin (query, condition) {
    let newQuery = query.toString();
    query.values.forEach((value, index) => { // eslint-disable-line
      let pos = this.addValue(value);
      newQuery = newQuery.replace(`$${index}`, `$__joinPos__${pos}`);
    });
    return this.addCriteria(newQuery.replace(/__joinPos__/g, ''), condition);
  }

  raw(raw) {
    return this.addCriteria(raw, 'AND')
  }

  orRaw(raw) {
    return this.addCriteria(raw, 'OR')
  }
  /**
   * @private
   * Create new query
   * @param {Realm.Collection} objects
   */
  static query (objects) {
    return new RealmQuery(objects);
  }
  static raw = (query) => new rawQuery(query);
}

export default RealmQuery;
