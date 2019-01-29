/// <reference types="realm" />
import { Results } from 'realm';
export declare type ILogicOperator = 'AND' | 'OR';
export declare type EqualValueType = string | number | boolean | Date;
export declare type CompareValueType = number | Date;
declare type groupCallack = (cb: RealmQuery<any>) => RealmQuery<any>
declare class RealmQuery<M> {
    private objects;
    private criteria;
    constructor(objects?: Results<M>);
    addCriteria(critera: any): RealmQuery<M>;
    private getFilteredObjects();
    toString(): string;
    /**
     * Returns the average of a given field
     * @param fieldName {string}
     * @return {number}
     */
    average(fieldName: string): number;
    /**
     * Begin grouping of conditions ("left parenthesis")
     *
     * @return {RealmQuery}
     */
    beginGroup(): RealmQuery<M>;

    group(cb: groupCallack ): RealmQuery<M>
    /**
     * Condition that the value of field begins with the specified string
     *
     * @param fieldName {string}
     * @param value {string}
     * @param casing {boolean, optional} BEGINSWITH[c] or BEGINSWITH
     */
    beginsWith(fieldName: string, value: string, casing?: boolean): RealmQuery<M>;
    orBeginsWith(fieldName: string, value: string, casing?: boolean): RealmQuery<M>;
    /**
     * Between condition
     *
     * @param fieldName {string}
     * @param from {CompareValueType}
     * @param to {CompareValueType}
     * @return {RealmQuery}
     */
    between(fieldName: string, from: CompareValueType, to: CompareValueType): RealmQuery<M>;
    orBetween(fieldName: string, from: CompareValueType, to: CompareValueType): RealmQuery<M>;
    /**
     * Condition that value of field contains the specified substring
     *
     * @param fieldName {string}
     * @param value {string}
     * @param casing {boolean, optional} CONTAINS[c] or CONTAINS
     */
    contains(fieldName: string, value: string, casing?: boolean): RealmQuery<M>;
    /**
     * or Condition that value of field contains the specified substring
     *
     * @param fieldName {string}
     * @param value {string}
     * @param casing {boolean, optional} CONTAINS[c] or CONTAINS
     */
    orContains(fieldName: string, value: string, casing?: boolean): RealmQuery<M>;
    /**
     * Counts the number of objects that fulfill the query conditions
     *
     * @return {number}
     */
    count(): number;
    /**
     * Returns a distinct set of objects of a specific class.
     *
     * @param fieldName {string}
     * @return {any[]}
     */
    distinct(fieldName: string): Array<any>;
    /**
     * End grouping of conditions ("right parenthesis") which was opened by a call to beginGroup()
     * @return {RealmQuery}
     */
    endGroup(): RealmQuery<M>;
    /**
     * Condition that the value of field ends with the specified string
     *
     * @param fieldName {string}
     * @param value {string}
     * @param casing {boolean, optional} ENDSWITH[c] or ENDSWITH
     * @return {RealmQuery}
     */
    endsWith(fieldName: string, value: string, casing?: boolean): RealmQuery<M>;
    /**
     * OR Condition that the value of field ends with the specified string
     *
     * @param fieldName {string}
     * @param value {string}
     * @param casing {boolean, optional} ENDSWITH[c] or ENDSWITH
     * @return {RealmQuery}
     */
    orEndsWith(fieldName: string, value: string, casing?: boolean): RealmQuery<M>;
    /**
     * Equal-to comparison
     *
     * @param fieldName {string}
     * @param value {EqualValueType}
     * @return {RealmQuery}
     */
    equalTo(fieldName: string, value: EqualValueType): RealmQuery<M>;
    /**
     * OR Equal-to comparison
     *
     * @param fieldName {string}
     * @param value {EqualValueType}
     * @return {RealmQuery}
     */
    orNotEqualTo(fieldName: string, value: EqualValueType): RealmQuery<M>;
    /**
     * or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {EqualValueType}
     * @return {RealmQuery}
     */
    orEqualTo(fieldName: string, value: EqualValueType): RealmQuery<M>;
    /**
     * Finds all objects that fulfill the query conditions
     * @return {Results}
     */
    findAll(): Results<M>;
    /**
     * Finds the first object that fulfills the query conditions
     */
    findFirst(): M;
    /**
     * Greater-than comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    greaterThan(fieldName: string, value: CompareValueType): RealmQuery<M>;
    /**
     * or Greater-than comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    orGreaterThan(fieldName: string, value: CompareValueType): RealmQuery<M>;
    /**
     * greater-than-or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    greaterThanOrEqualTo(fieldName: string, value: CompareValueType): RealmQuery<M>;
    /**
     * or greater-than-or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    orGreaterThanOrEqualTo(fieldName: string, value: CompareValueType): RealmQuery<M>;
    /**
     * In comparison
     *
     * @param fieldName {string}
     * @param values {EqualValueType[]}
     * @return {RealmQuery}
     */
    in(fieldName: string, values: EqualValueType[]): RealmQuery<M>;
    orIn(fieldName: string, values: EqualValueType[]): RealmQuery<M>;
    notIn(fieldName: string, values: EqualValueType[]): RealmQuery<M>;
    orNotIn(fieldName: string, values: EqualValueType[]): RealmQuery<M>;
    isEmpty(fieldName: string): RealmQuery<M>;
    isNotEmpty(fieldName: string): RealmQuery<M>;
    isNotNull(fieldName: string): RealmQuery<M>;
    isNull(fieldName: string): RealmQuery<M>;
    /**
     * Less-than comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    lessThan(fieldName: string, value: CompareValueType): RealmQuery<M>;
    /**
     * Or Less-than comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    orLessThan(fieldName: string, value: CompareValueType): RealmQuery<M>;
    /**
     * Less-than-or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    lessThanOrEqualTo(fieldName: string, value: CompareValueType): RealmQuery<M>;
    /**
     * OR Less-than-or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    orLessThanOrEqualTo(fieldName: string, value: CompareValueType): RealmQuery<M>;
    /**
     *
     * @param fieldName
     * @param value
     */
    like(fieldName: string, value: string): RealmQuery<M>;
    /**
     *
     * @param fieldName
     * @param value
     */
    orLike(fieldName: string, value: string): RealmQuery<M>;
    /**
     * Finds the maximum value of a field
     *
     * @param fieldName {string}
     * @return {any}
     */
    max(fieldName: string): any;
    /**
     * Finds the miniimum value of a field
     *
     * @param fieldName {string}
     * @return {any}
     */
    min(fieldName: string): any;
    not(): RealmQuery<M>;
    endNot(): RealmQuery<M>;
    /**
     * Not-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {EqualValueType}
     * @return {RealmQuery}
     */
    notEqualTo(fieldName: string, value: EqualValueType): RealmQuery<M>;
    /**
     * AND logic operator. Use in group
     *
     * @return {RealmQuery}
     */
    and(): RealmQuery<M>;
    /**
     * OR logic operator. Use in group
     *
     * @return {RealmQuery}
     */
    or(): RealmQuery<M>;
    /**
     * Calculates the sum of a given field
     *
     * @param fieldName {string}
     * @return {number}
     */
    sum(fieldName: string): number;
    /**
     * Set sorted into realm.objects
     *
     * @param fieldName {string}
     * @param order {boolean} true => desc, false => asc
     * @return {RealmQuery}
     */
    sort(fieldName: string, order?: 'ASC' | 'DESC'): RealmQuery<M>;
    /**
     * Combine to another query
     */
    join(query: any): RealmQuery<M>;
    /**
     * Create new query
     * @param objects {Realm.Collection}
     */
    static query(objects: Results<M>): RealmQuery<M>;
}
export default RealmQuery;
