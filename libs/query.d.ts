/// <reference types="realm" />
import { Results } from 'realm';
import Model from "../Model";
import Person from "../__test__/models/Person";
import Holiday from "../__test__/models/Holiday";
export declare type ILogicOperator = 'AND' | 'OR';
export declare type EqualValueType = string | number | boolean | Date | RawQuery;
export declare type CompareValueType = number | Date | RawQuery;
type keyOfType<T, KT> = { [K in keyof T]: T[K] extends KT ? K : never }[keyof T];
type keyOfCompareValueType<T extends Model<T>> = NestedKeyOfType<T, CompareValueType>
type keyOfEqualValueType<T extends Model<T>> = NestedKeyOfType<T, EqualValueType>
type keyOfStringType<T extends Model<T>> = NestedKeyOfType<T, string>
type keyOfNumberType<T extends Model<T>> = NestedKeyOfType<T, number>;
type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof Partial<T>];
type NonFunctionProperties<T> = Pick<Partial<T>, NonFunctionPropertyNames<T>>;
declare type groupCallback = (cb: RealmQuery<any>) => RealmQuery<any>
// add `& (string | number)` to the keyof ObjectType
type NestedKeyOf<ObjectType extends Model<ObjectType>> =
{[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends Function? never : ObjectType[Key] extends Model<ObjectType[Key]>
? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
: `${Key}`
}[keyof ObjectType & (string | number)];
type NestedKeyOfType<ObjectType extends Model<ObjectType>, T> =
{[Key in keyof ObjectType & (string | number )]:
        ObjectType[Key] extends Function ? never :
            ObjectType[Key] extends T ? `${Key}` :
                ObjectType[Key] extends Model<ObjectType[Key]>? `${Key}.${NestedKeyOfType<ObjectType[Key], T>}`
                    : never
}[keyof ObjectType & (string | number)];


declare class RawQuery {
    private raw
    toString(): string
}
declare class RealmQuery<M extends Model<M>> {
    private objects;
    private criteria;
    constructor(objects?: Results<M>);
    addCriteria(critera: any): RealmQuery<M>;
    private getFilteredObjects(): Realm.Results<M>;
    toString(): string;
    debug(): string;

    /**
     * get compiled query with values
     */
    debug(): string;
    /**
     * Returns the average of a given field
     * @param fieldName {string}
     * @return {number}
     */
    avg (fieldName: keyOfNumberType<M>): number;
    /**
   * select distinct element
   *
   * @param {string|string[]} fieldName
   * @return {RealmQuery}
   */
    distinct (fieldName: NonFunctionPropertyNames<M>| Array<NonFunctionPropertyNames<M>>): RealmQuery<M>
    /**
     * Set sorted into realm.objects
     *
     * @param fieldName {string}
     * @param order {boolean} true => desc, false => asc
     * @return {RealmQuery}
     */
    sort(fieldName: keyof M, order?: 'ASC' | 'DESC'): RealmQuery<M>;

    /**
     * Finds all objects that fulfill the query conditions
     * @return {Results}
     */
    findAll(): Results<M & Realm.Object>;


    /**
     * Finds the first object that fulfills the query conditions
     */
    findFirst(): M & Realm.Object;

    /**
    * Returns the maximum value of the values in the collection or of the given property
    * among all the objects in the collection, or undefined if the collection is empty.
    * Only supported for int, float, double and date properties.
    * null values are ignored entirely by this method and will not be returned.
    */
    max<T extends keyOfType<M, CompareValueType>>(fieldName: T): M[T];

    /**
    * Returns the minimum value of the values in the collection or of the given property
    * among all the objects in the collection, or undefined if the collection is empty.
    * Only supported for int, float, double and date properties.
    * null values are ignored entirely by this method and will not be returned
    */
    min<T extends keyOfType<M, CompareValueType>>(fieldName: T): M[T];

    /**
     * Calculates the sum of a given field
     */
    sum(fieldName: keyOfNumberType<M>): number;

    /**
     * Calculates the average of a given field
     */
    avg(fieldName: keyOfNumberType<M>): number;

    /**
     * Counts the number of objects that fulfill the query conditions
     *
     * @return {number}
     */
    count(): number;

    /**
     * Between condition
     *
     * @param fieldName {string}
     * @param from {CompareValueType}
     * @param to {CompareValueType}
     * @return {RealmQuery}
     */
    between(fieldName: keyOfCompareValueType<M>, from: CompareValueType, to: CompareValueType): RealmQuery<M>;
    orBetween(fieldName: keyof M, from: CompareValueType, to: CompareValueType): RealmQuery<M>;

    /**
     * Condition that the value of field begins with the specified string
     *
     * @param fieldName {string}
     * @param value {string}
     * @param casing {boolean, optional} BEGINSWITH[c] or BEGINSWITH
     */
    beginsWith(fieldName: keyOfStringType<M>, value: string, casing?: boolean): RealmQuery<M>;
    orBeginsWith(fieldName: keyOfStringType<M>, value: string, casing?: boolean): RealmQuery<M>;

    /**
     * Condition that value of field contains the specified substring
     *
     * @param fieldName {string}
     * @param value {string}
     * @param casing {boolean, optional} CONTAINS[c] or CONTAINS
     */
    contains(fieldName: keyOfStringType<M>, value: string, casing?: boolean): RealmQuery<M>;
    /**
     * or Condition that value of field contains the specified substring
     *
     * @param fieldName {string}
     * @param value {string}
     * @param casing {boolean, optional} CONTAINS[c] or CONTAINS
     */
    orContains(fieldName: keyOfStringType<M>, value: string, casing?: boolean): RealmQuery<M>;

    /**
     * Condition that the value of field ends with the specified string
     *
     * @param fieldName {string}
     * @param value {string}
     * @param casing {boolean, optional} ENDSWITH[c] or ENDSWITH
     * @return {RealmQuery}
     */
    endsWith(fieldName: keyOfStringType<M>, value: string, casing?: boolean): RealmQuery<M>;
    /**
     * OR Condition that the value of field ends with the specified string
     *
     * @param fieldName {string}
     * @param value {string}
     * @param casing {boolean, optional} ENDSWITH[c] or ENDSWITH
     * @return {RealmQuery}
     */
    orEndsWith(fieldName: keyOfStringType<M>, value: string, casing?: boolean): RealmQuery<M>;
    /**
     * Equal-to comparison
     *
     * @param fieldName {string}
     * @param value {EqualValueType}
     * @return {RealmQuery}
     */
    equalTo(fieldName: keyOfEqualValueType<M>, value: EqualValueType): RealmQuery<M>;
    /**
     * or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {EqualValueType}
     * @return {RealmQuery}
     */
    orEqualTo(fieldName: keyOfEqualValueType<M>, value: EqualValueType): RealmQuery<M>;

    /**
     * Not-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {EqualValueType}
     * @return {RealmQuery}
     */
    notEqualTo(fieldName: keyOfEqualValueType<M>, value: EqualValueType): RealmQuery<M>;

    /**
     * OR Equal-to comparison
     *
     * @param fieldName {string}
     * @param value {EqualValueType}
     * @return {RealmQuery}
     */
    orNotEqualTo(fieldName: keyOfEqualValueType<M>, value: EqualValueType): RealmQuery<M>;


    /**
     * Greater-than comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    greaterThan(fieldName: keyOfCompareValueType<M>, value: CompareValueType): RealmQuery<M>;
    /**
     * or Greater-than comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    orGreaterThan(fieldName: keyOfCompareValueType<M>, value: CompareValueType): RealmQuery<M>;
    /**
     * greater-than-or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    greaterThanOrEqualTo(fieldName: keyOfCompareValueType<M>, value: CompareValueType): RealmQuery<M>;
    /**
     * or greater-than-or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    orGreaterThanOrEqualTo(fieldName: keyOfCompareValueType<M>, value: CompareValueType): RealmQuery<M>;
    /**
     * Less-than comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    lessThan(fieldName: keyOfCompareValueType<M>, value: CompareValueType): RealmQuery<M>;
    /**
     * Or Less-than comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    orLessThan(fieldName: keyOfCompareValueType<M>, value: CompareValueType): RealmQuery<M>;
    /**
     * Less-than-or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    lessThanOrEqualTo(fieldName: keyOfCompareValueType<M>, value: CompareValueType): RealmQuery<M>;
    /**
     * OR Less-than-or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @return {RealmQuery}
     */
    orLessThanOrEqualTo(fieldName: keyOfCompareValueType<M>, value: CompareValueType): RealmQuery<M>;
    /**
     * In comparison
     *
     * @param fieldName {string}
     * @param values {EqualValueType[]}
     * @return {RealmQuery}
     */
    in(fieldName: keyOfEqualValueType<M>, values: EqualValueType[]): RealmQuery<M>;
    orIn(fieldName: keyOfEqualValueType<M>, values: EqualValueType[]): RealmQuery<M>;
    notIn(fieldName: keyOfEqualValueType<M>, values: EqualValueType[]): RealmQuery<M>;
    orNotIn(fieldName: keyOfEqualValueType<M>, values: EqualValueType[]): RealmQuery<M>;
    isEmpty(fieldName: keyOfStringType<M>): RealmQuery<M>;
    isNotEmpty(fieldName: keyOfStringType<M>): RealmQuery<M>;
    orIsEmpty(fieldName: keyOfStringType<M>): RealmQuery<M>;
    orIsNotEmpty(fieldName: keyOfStringType<M>): RealmQuery<M>;
    isNotNull(fieldName: NestedKeyOf<M> | string): RealmQuery<M>;
    orIsNotNull(fieldName: NestedKeyOf<M> | string): RealmQuery<M>;
    isNull(fieldName: NestedKeyOf<M>| string): RealmQuery<M>;
    orIsNull(fieldName: NestedKeyOf<M>| string): RealmQuery<M>;

    /**
     *
     * @param fieldName
     * @param value
     */
    like(fieldName: keyOfStringType<M>, value: string): RealmQuery<M>;
    /**
     *
     * @param fieldName
     * @param value
     */
    orLike(fieldName: keyOfStringType<M>, value: string): RealmQuery<M>;

    not(): RealmQuery<M>;
    endNot(): RealmQuery<M>;

    /**
     * Begin grouping of conditions ("left parenthesis")
     */
    beginGroup(): RealmQuery<M>;
    beginOrGroup(): RealmQuery<M>
    /**
     * End grouping of conditions ("right parenthesis") which was opened by a call to beginGroup()
     * @return {RealmQuery}
     */
    endGroup(): RealmQuery<M>;

    group(cb: groupCallback ): RealmQuery<M>
    orGroup(cb: groupCallback ): RealmQuery<M>

    /**
     * Combine to another query
     */
    join(query: any): RealmQuery<M>;
    orJoin(query: any): RealmQuery<M>;

    raw(query: string): RealmQuery<M>
    orRaw(query: string): RealmQuery<M>
    static raw(query: string): RawQuery
    /**
     * Create new query
     * @param objects {Realm.Collection}
     */
    static query<M extends Model<M>>(objects?: Results<M>): RealmQuery<M>;
}
export default RealmQuery;
