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
  path = '';

  /**
   * @private
   * @param {any} critera
   * @param {any} condition
   * @returns {RealmQuery}
   * @memberof RealmQuery
   */
  addCriteria (critera, condition) {
    let group = this.criteria;
    if (this.path !== '') {
      group = this.path.split('.').reduce(reducePath, this.criteria);
    }
    if (group.length >= 1 && group[group.length - 1] !== 'NOT') {
      group.push(condition);
    }
    group.push(critera);
    return this;
  }

  addValue (value) {
    this.values.push(value);
    return this.values.length -1;
  }
  /**
   * @private
   * get filtered object
   * @returns {Results}
   */
  getFilteredObjects () {
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
      return typeof value === 'string' ? `"${value}"` : value;
    });
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
    return this.criteria.map(toString).join(' ');
  }

  /**
   * Condition that the value of field begins with the specified string
   *
   * @param {string} fieldName
   * @param {string} value
   * @param {?boolean} casing  BEGINSWITH[c] or BEGINSWITH
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
   * Between condition
   *
   * @param {string} fieldName
   * @param {CompareValueType} from
   * @param {CompareValueType} to
   * @return {RealmQuery}
   */
  between (fieldName, from, to) {
    let posFrom = this.addValue(from);
    let posTo = this.addValue(to);
    return this.addCriteria(`(${fieldName} >= $${posFrom} AND ${fieldName} <= $${posTo})`, 'AND');
  }

  /**
   * Or between condition
   *
   * @param {string} fieldName
   * @param {CompareValueType} from
   * @param {CompareValueType} to
   * @return {RealmQuery}
   */
  orBetween (fieldName, from, to) {
    let posFrom = this.addValue(from);
    let posTo = this.addValue(to);
    return this.addCriteria(`(${fieldName} >= $${posFrom} AND ${fieldName} <= $${posTo})`, 'OR');
  }
  /**
   * Condition that value of field contains the specified substring
   *
   * @param {string} fieldName
   * @param {string} value
   * @param {?boolean} casing  CONTAINS[c] or CONTAINS
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
   * Counts the number of objects that fulfill the query conditions
   *
   * @return {number}
   */
  count () {
    let results = this.getFilteredObjects();
    return results.length;
  }
  /**
   * Returns a distinct set of objects of a specific class.
   *
   * @param {string} fieldName
   * @return {any[]}
   */
  distinct (fieldName) {
    let results = this.getFilteredObjects();
    return results.map((obj) => obj[fieldName]).filter((value, index, res) => res.indexOf(value) === index);
  }

  /**
   * Condition that the value of field ends with the specified string
   *
   * @param {string} fieldName
   * @param {string} value
   * @param {boolean?} casing  ENDSWITH[c] or ENDSWITH
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
   * @return {RealmQuery}
   */
  equalTo (fieldName, value, condition = 'AND') {
    let pos = this.addValue(value);
    return this.addCriteria(`${fieldName} == $${pos}`, condition);
  }

  /**
   * Or equal-to comparaison
   *
   * @param {string} fieldName
   * @param {EqualValueType} value
   * @return {RealmQuery}
   */
  orEqualTo (fieldName, value) {
    return this.equalTo(fieldName, value, 'OR');
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
   * Greater-than comparaison
   *
   * @param {string} fieldName
   * @param {CompareValueType} value
   * @return {RealmQuery}
   */
  greaterThan (fieldName, value, condition = 'AND') {
    let pos = this.addValue(value);
    return this.addCriteria(`${fieldName} > $${pos}`, condition);
  }

  /**
   * OR Greater-than comparaison
   *
   * @param {string} fieldName
   * @param {CompareValueType} value
   * @return {RealmQuery}
   */
  orGreaterThan (fieldName, value) {
    return this.greaterThan (fieldName, value, 'OR');
  }
  /**
   * greater-than-or-equal-to comparaison
   *
   * @param  {string} fieldName
   * @param {CompareValueType} value
   * @return {RealmQuery}
   */
  greaterThanOrEqualTo (fieldName, value, condition = 'AND') {
    let pos = this.addValue(value);
    return this.addCriteria(`${fieldName} >= $${pos}`, condition);
  }

  /**
   * Or greater-than-or-equal-to comparaison
   *
   * @param  {string} fieldName
   * @param {CompareValueType} value
   * @return {RealmQuery}
   */
  orGreaterThanOrEqualTo (fieldName, value) {
    return this.greaterThanOrEqualTo (fieldName, value, 'OR');
  }
  /**
   * In comparaison
   *
   * @param {string} fieldName
   * @param {EqualValueType[]} values
   * @return {RealmQuery}
   */
  in (fieldName, values, condition = 'AND') {
    const criteria = [];
    let cb = (value) => {
      let pos = this.addValue(value);
      criteria.push(`${fieldName} == $${pos}`);
    };
    values.forEach(cb);
    return this.addCriteria(`(${ criteria.join(' OR ') })`, condition);
  }

  /**
   * Or in comparaison
   *
   * @param {string} fieldName
   * @param {EqualValueType[]} values
   * @return {RealmQuery}
   */
  orIn (fieldName, values) {
    return this.in(fieldName, values, 'OR');
  }

  /**
   * not In comparaison
   *
   * @param {string} fieldName
   * @param {EqualValueType[]} values
   * @return {RealmQuery}
   */
  notIn (fieldName, values, condition = 'AND') {
    const criteria = [];
    let cb = (value) => {
      let pos = this.addValue(value);
      criteria.push(`${fieldName} != $${pos}`);
    };
    values.forEach(cb);
    return this.addCriteria(`(${ criteria.join(' AND ') })`, condition);
  }
  
  /**
   * Or not in comparaison
   *
   * @param {string} fieldName
   * @param {EqualValueType[]} values
   * @return {RealmQuery}
   */
  orNotIn (fieldName, values) {
    return this.notIn(fieldName, values, 'OR');
  }

  /**
   * not null comparaison
   * @param {string} fieldName 
   * @returns {RealmQuery}
   */
  isNotNull (fieldName) {
    return this.addCriteria(`${fieldName} != null`);
  }
  /**
   * null comparaison
   * @param {string} fieldName 
   * @returns {RealmQuery}
   */
  isNull (fieldName) {
    return this.addCriteria(`${fieldName} == null`);
  }
  /**
   * Less-than comparaison
   *
   * @param {string} fieldName
   * @param {CompareValueType} value
   * @return {RealmQuery}
   */
  lessThan (fieldName, value, condition = 'AND') {
    let pos = this.addValue(value);
    return this.addCriteria(`${fieldName} < $${pos}`, condition);
  }
  /**
   * or Less-than comparaison
   *
   * @param {string} fieldName
   * @param {CompareValueType} value
   * @return {RealmQuery}
   */
  orLessThan (fieldName, value) {
    return this.lessThan(fieldName, value, 'OR');
  }
  /**
   * Less-than-or-equal-to comparaison
   *
   * @param {string} fieldName
   * @param {CompareValueType} value
   * @return {RealmQuery}
   */
  lessThanOrEqualTo (fieldName, value, condition = 'AND') {
    let pos = this.addValue(value);
    return this.addCriteria(`${fieldName} <= $${pos}`, condition);
  }
  /**
   * OR Less-than-or-equal-to comparaison
   *
   * @param {string} fieldName
   * @param {CompareValueType} value
   * @return {RealmQuery}
   */
  orLessThanOrEqualTo (fieldName, value) {
    return this.lessThanOrEqualTo(fieldName, value, 'OR');
  }
  /**
   * Like operator
   * @private
   * @param fieldName
   * @param value
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
   * Not-equal-to comparaison
   *
   * @param fieldName {string}
   * @param value {EqualValueType}
   * @return {RealmQuery}
   */
  notEqualTo (fieldName, value, condition = 'AND') {
    let pos = this.addValue(value);
    return this.addCriteria(`${fieldName} != $${pos}`, condition);
  }

  /**
   * or Not-equal-to comparaison
   *
   * @param fieldName {string}
   * @param value {EqualValueType}
   * @return {RealmQuery}
   */
  orNotEqualTo (fieldName, value) {
    return this.notEqualTo(fieldName, value, 'OR');
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
  /**
   * @private
   * Create new query
   * @param {Realm.Collection} objects
   */
  static query (objects) {
    return new RealmQuery(objects);
  }
}

export default RealmQuery;
