/// <reference types="realm" />
import {Collection, Results} from 'realm';
import Model from "../Model";

export declare type ILogicOperator = 'AND' | 'OR';
export declare type CollectionOperator = 'ALL' | 'NONE' | 'ANY' | 'SOME' | ''
export declare type EqualValueType = string | number | boolean | Date | RawQuery;
export declare type CompareValueType = number | Date | RawQuery;
type keyOfType<T, KT> = { [K in keyof T]: T[K] extends KT ? K : never }[keyof T];
type keyOfCompareValueType<T extends Model<T>> = NestedKeyOfType<T, CompareValueType, undefined>
type keyOfEqualValueType<T extends Model<T>> = NestedKeyOfType<T, EqualValueType, undefined>
type keyOfStringType<T extends Model<T>> = NestedKeyOfType<T, string, undefined>
type keyOfNumberType<T extends Model<T>> = NestedKeyOfType<T, number, undefined>;
type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof Partial<T>];
type NonFunctionProperties<T> = Pick<Partial<T>, NonFunctionPropertyNames<T>>;
declare type groupCallback = (cb: RealmQuery<any>) => RealmQuery<any>

export type NestedAverageOf<ObjectType> =
{[Key in keyof ObjectType & (string | number) as `@avg.${Key}` | `@max.${Key}`| `@min.${Key}`| `@sum.${Key}`]: ObjectType[Key] extends Function ? never : ObjectType[Key] extends number ? number : never
} & {'@count': number};

type Flatten<Type> = Type extends string ? never : Type extends Realm.Collection<infer Item> | Array<infer Item> ? Item & NestedAverageOf<Item> : never;

type NestedKeyOf<ObjectType extends Model<ObjectType>> =
{[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends Function? never : ObjectType[Key] extends Model<ObjectType[Key]>
? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
: `${Key}`
}[keyof ObjectType & (string | number)];
type NestedKeyOfType<ObjectType extends Model<ObjectType>, T, KeyFrom extends undefined | string | number> =
{[Key in keyof ObjectType & (string | number )]:
        ObjectType[Key] extends Function ?
            never :
            ObjectType[Key] extends T ?
                `${Key}` :
                ObjectType[Key] extends Model<ObjectType[Key]> ?
                    `${Key}.${NestedKeyOfType<ObjectType[Key], T, undefined>}` :
                    Flatten<ObjectType[Key]> extends Model<Flatten<ObjectType[Key]>> ?
                        KeyFrom extends undefined ?
                            `${Key}.${NestedKeyOfType<Flatten<ObjectType[Key]>, T, undefined>}` :
                            `${KeyFrom}.${Key}.${NestedKeyOfType<Flatten<ObjectType[Key]>, T, KeyFrom>}`
                        :never
}[keyof ObjectType & (string | number)];


declare class RawQuery {
    private raw
    toString(): string
}
declare class RealmQuery<M extends Model<M>> {
    private objects;
    private criteria;
    constructor(objects?: Results<M>);
    addCriteria(criteria: any): RealmQuery<M>;
    private getFilteredObjects(): Realm.Results<M>;

    /**
     * Get sql value with placeholder
     */
    toString(): string;

    /**
     * Get sql with value
     */
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
     * @param {CollectionOperator} collectionOperator
     * @return {RealmQuery}
     */
    between(fieldName: keyOfCompareValueType<M>, from: CompareValueType, to: CompareValueType, collectionOperator?: CollectionOperator): RealmQuery<M>;
    orBetween(fieldName: keyOfCompareValueType<M>, from: CompareValueType, to: CompareValueType, collectionOperator?: CollectionOperator): RealmQuery<M>;

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
     * @param {CollectionOperator} collectionOperator
     * @return {RealmQuery}
     */
    equalTo(fieldName: keyOfEqualValueType<M>, value: EqualValueType, collectionOperator?: CollectionOperator): RealmQuery<M>;
    /**
     * or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {EqualValueType}
     * @param {CollectionOperator} collectionOperator
     *
     * @return {RealmQuery}
     */
    orEqualTo(fieldName: keyOfEqualValueType<M>, value: EqualValueType, collectionOperator?: CollectionOperator): RealmQuery<M>;

    /**
     * Not-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {EqualValueType}
     * @param {CollectionOperator} collectionOperator
     *
     * @return {RealmQuery}
     */
    notEqualTo(fieldName: keyOfEqualValueType<M>, value: EqualValueType, collectionOperator?: CollectionOperator): RealmQuery<M>;

    /**
     * OR Equal-to comparison
     *
     * @param fieldName {string}
     * @param value {EqualValueType}
     * @param {CollectionOperator} collectionOperator
     *
     * @return {RealmQuery}
     */
    orNotEqualTo(fieldName: keyOfEqualValueType<M>, value: EqualValueType, collectionOperator?: CollectionOperator): RealmQuery<M>;


    /**
     * Greater-than comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @param {CollectionOperator} collectionOperator
     *
     * @return {RealmQuery}
     */
    greaterThan(fieldName: keyOfCompareValueType<M>, value: CompareValueType, collectionOperator?: CollectionOperator): RealmQuery<M>;
    /**
     * or Greater-than comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @param {CollectionOperator} collectionOperator
     *
     * @return {RealmQuery}
     */
    orGreaterThan(fieldName: keyOfCompareValueType<M>, value: CompareValueType, collectionOperator?: CollectionOperator): RealmQuery<M>;
    /**
     * greater-than-or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @param {CollectionOperator} collectionOperator
     *
     * @return {RealmQuery}
     */
    greaterThanOrEqualTo(fieldName: keyOfCompareValueType<M>, value: CompareValueType, collectionOperator?: CollectionOperator): RealmQuery<M>;
    /**
     * or greater-than-or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @param {CollectionOperator} collectionOperator
     *
     * @return {RealmQuery}
     */
    orGreaterThanOrEqualTo(fieldName: keyOfCompareValueType<M>, value: CompareValueType, collectionOperator?: CollectionOperator): RealmQuery<M>;
    /**
     * Less-than comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @param {CollectionOperator} collectionOperator
     *
     * @return {RealmQuery}
     */
    lessThan(fieldName: keyOfCompareValueType<M>, value: CompareValueType, collectionOperator?: CollectionOperator): RealmQuery<M>;
    /**
     * Or Less-than comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @param {CollectionOperator} collectionOperator
     *
     * @return {RealmQuery}
     */
    orLessThan(fieldName: keyOfCompareValueType<M>, value: CompareValueType, collectionOperator?: CollectionOperator): RealmQuery<M>;
    /**
     * Less-than-or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @param {CollectionOperator} collectionOperator
     *
     * @return {RealmQuery}
     */
    lessThanOrEqualTo(fieldName: keyOfCompareValueType<M>, value: CompareValueType, collectionOperator?: CollectionOperator): RealmQuery<M>;
    /**
     * OR Less-than-or-equal-to comparison
     *
     * @param fieldName {string}
     * @param value {CompareValueType}
     * @param {CollectionOperator} collectionOperator
     *
     * @return {RealmQuery}
     */
    orLessThanOrEqualTo(fieldName: keyOfCompareValueType<M>, value: CompareValueType, collectionOperator?: CollectionOperator): RealmQuery<M>;
    /**
     * In comparison
     *
     * @param fieldName {string}
     * @param values {EqualValueType[]}
     * @param {CollectionOperator} collectionOperator
     *
     * @return {RealmQuery}
     */
    in(fieldName: keyOfEqualValueType<M>, values: EqualValueType[], collectionOperator?: CollectionOperator): RealmQuery<M>;

    /**
     *
     * @param {string} fieldName
     * @param {EqualValueType[]} values
     * @param {CollectionOperator} collectionOperator
     */
    orIn(fieldName: keyOfEqualValueType<M>, values: EqualValueType[], collectionOperator?: CollectionOperator): RealmQuery<M>;
    notIn(fieldName: keyOfEqualValueType<M>, values: EqualValueType[], collectionOperator?: CollectionOperator): RealmQuery<M>;
    orNotIn(fieldName: keyOfEqualValueType<M>, values: EqualValueType[], collectionOperator?: CollectionOperator): RealmQuery<M>;
    isEmpty(fieldName: keyOfStringType<M>, collectionOperator?: CollectionOperator): RealmQuery<M>;
    isNotEmpty(fieldName: keyOfStringType<M>, collectionOperator?: CollectionOperator): RealmQuery<M>;
    orIsEmpty(fieldName: keyOfStringType<M>, collectionOperator?: CollectionOperator): RealmQuery<M>;
    orIsNotEmpty(fieldName: keyOfStringType<M>, collectionOperator?: CollectionOperator): RealmQuery<M>;
    isNotNull(fieldName: NestedKeyOf<M> | string, collectionOperator?: CollectionOperator): RealmQuery<M>;
    orIsNotNull(fieldName: NestedKeyOf<M> | string, collectionOperator?: CollectionOperator): RealmQuery<M>;
    isNull(fieldName: NestedKeyOf<M>| string, collectionOperator?: CollectionOperator): RealmQuery<M>;
    orIsNull(fieldName: NestedKeyOf<M>| string, collectionOperator?: CollectionOperator): RealmQuery<M>;

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
