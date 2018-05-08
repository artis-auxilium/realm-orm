<a name="RealmQuery"></a>

## RealmQuery

* [RealmQuery](#RealmQuery)
    * [.beginsWith(fieldName, value, casing)](#RealmQuery+beginsWith) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.orBeginsWith(fieldName, value, casing)](#RealmQuery+orBeginsWith) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.between(fieldName, from, to)](#RealmQuery+between) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.orBetween(fieldName, from, to)](#RealmQuery+orBetween) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.contains(fieldName, value, casing)](#RealmQuery+contains) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.orContains(fieldName, value, casing)](#RealmQuery+orContains) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.count()](#RealmQuery+count) ⇒ <code>number</code>
    * [.distinct(fieldName)](#RealmQuery+distinct) ⇒ <code>Array.&lt;any&gt;</code>
    * [.endsWith(fieldName, value, casing)](#RealmQuery+endsWith) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.orEndsWith(fieldName, value, casing)](#RealmQuery+orEndsWith) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.equalTo(fieldName, value)](#RealmQuery+equalTo) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.orEqualTo(fieldName, value)](#RealmQuery+orEqualTo) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.findAll()](#RealmQuery+findAll) ⇒ <code>Realm.Results</code>
    * [.findFirst()](#RealmQuery+findFirst) ⇒ <code>Realm.Object</code>
    * [.greaterThan(fieldName, value)](#RealmQuery+greaterThan) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.orGreaterThan(fieldName, value)](#RealmQuery+orGreaterThan) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.greaterThanOrEqualTo(fieldName, value)](#RealmQuery+greaterThanOrEqualTo) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.orGreaterThanOrEqualTo(fieldName, value)](#RealmQuery+orGreaterThanOrEqualTo) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.in(fieldName, values)](#RealmQuery+in) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.orIn(fieldName, values)](#RealmQuery+orIn) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.notIn(fieldName, values)](#RealmQuery+notIn) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.orNotIn(fieldName, values)](#RealmQuery+orNotIn) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.isNotNull(fieldName)](#RealmQuery+isNotNull) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.isNull(fieldName)](#RealmQuery+isNull) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.lessThan(fieldName, value)](#RealmQuery+lessThan) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.orLessThan(fieldName, value)](#RealmQuery+orLessThan) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.lessThanOrEqualTo(fieldName, value)](#RealmQuery+lessThanOrEqualTo) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.orLessThanOrEqualTo(fieldName, value)](#RealmQuery+orLessThanOrEqualTo) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.not()](#RealmQuery+not) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.endNot()](#RealmQuery+endNot) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.notEqualTo(fieldName, value)](#RealmQuery+notEqualTo) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.orNotEqualTo(fieldName, value)](#RealmQuery+orNotEqualTo) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.beginGroup()](#RealmQuery+beginGroup) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.beginOrGroup()](#RealmQuery+beginOrGroup) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.endGroup()](#RealmQuery+endGroup) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.group(cb)](#RealmQuery+group) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.orGroup(cb)](#RealmQuery+orGroup) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.join(query)](#RealmQuery+join) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * [.orJoin(query)](#RealmQuery+orJoin) ⇒ [<code>RealmQuery</code>](#RealmQuery)


* * *

<a name="RealmQuery+beginsWith"></a>

### realmQuery.beginsWith(fieldName, value, casing) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Condition that the value of field begins with the specified string

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type | Description |
| --- | --- | --- |
| fieldName | <code>string</code> |  |
| value | <code>string</code> |  |
| casing | <code>boolean</code> | BEGINSWITH[c] or BEGINSWITH |


* * *

<a name="RealmQuery+orBeginsWith"></a>

### realmQuery.orBeginsWith(fieldName, value, casing) ⇒ [<code>RealmQuery</code>](#RealmQuery)
OR Condition that the value of field begins with the specified string

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type | Description |
| --- | --- | --- |
| fieldName | <code>string</code> |  |
| value | <code>string</code> |  |
| casing | <code>boolean</code> | BEGINSWITH[c] or BEGINSWITH |


* * *

<a name="RealmQuery+between"></a>

### realmQuery.between(fieldName, from, to) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Between condition

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| from | [<code>CompareValueType</code>](#CompareValueType) | 
| to | [<code>CompareValueType</code>](#CompareValueType) | 


* * *

<a name="RealmQuery+orBetween"></a>

### realmQuery.orBetween(fieldName, from, to) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Or between condition

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| from | [<code>CompareValueType</code>](#CompareValueType) | 
| to | [<code>CompareValueType</code>](#CompareValueType) | 


* * *

<a name="RealmQuery+contains"></a>

### realmQuery.contains(fieldName, value, casing) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Condition that value of field contains the specified substring

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type | Description |
| --- | --- | --- |
| fieldName | <code>string</code> |  |
| value | <code>string</code> |  |
| casing | <code>boolean</code> | CONTAINS[c] or CONTAINS |


* * *

<a name="RealmQuery+orContains"></a>

### realmQuery.orContains(fieldName, value, casing) ⇒ [<code>RealmQuery</code>](#RealmQuery)
OR Condition that value of field contains the specified substring

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type | Description |
| --- | --- | --- |
| fieldName | <code>string</code> |  |
| value | <code>string</code> |  |
| casing | <code>boolean</code> | CONTAINS[c] or CONTAINS |


* * *

<a name="RealmQuery+count"></a>

### realmQuery.count() ⇒ <code>number</code>
Counts the number of objects that fulfill the query conditions

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

* * *

<a name="RealmQuery+distinct"></a>

### realmQuery.distinct(fieldName) ⇒ <code>Array.&lt;any&gt;</code>
Returns a distinct set of objects of a specific class.

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 


* * *

<a name="RealmQuery+endsWith"></a>

### realmQuery.endsWith(fieldName, value, casing) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Condition that the value of field ends with the specified string

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type | Description |
| --- | --- | --- |
| fieldName | <code>string</code> |  |
| value | <code>string</code> |  |
| casing | <code>boolean</code> | ENDSWITH[c] or ENDSWITH |


* * *

<a name="RealmQuery+orEndsWith"></a>

### realmQuery.orEndsWith(fieldName, value, casing) ⇒ [<code>RealmQuery</code>](#RealmQuery)
OR Condition that the value of field ends with the specified string

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type | Description |
| --- | --- | --- |
| fieldName | <code>string</code> |  |
| value | <code>string</code> |  |
| casing | <code>boolean</code> | ENDSWITH[c] or ENDSWITH |


* * *

<a name="RealmQuery+equalTo"></a>

### realmQuery.equalTo(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Equal-to comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>EqualValueType</code>](#EqualValueType) | 


* * *

<a name="RealmQuery+orEqualTo"></a>

### realmQuery.orEqualTo(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Or equal-to comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>EqualValueType</code>](#EqualValueType) | 


* * *

<a name="RealmQuery+findAll"></a>

### realmQuery.findAll() ⇒ <code>Realm.Results</code>
Finds all objects that fulfill the query conditions

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

* * *

<a name="RealmQuery+findFirst"></a>

### realmQuery.findFirst() ⇒ <code>Realm.Object</code>
Finds the first object that fulfills the query conditions

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

* * *

<a name="RealmQuery+greaterThan"></a>

### realmQuery.greaterThan(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Greater-than comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>CompareValueType</code>](#CompareValueType) | 


* * *

<a name="RealmQuery+orGreaterThan"></a>

### realmQuery.orGreaterThan(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
OR Greater-than comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>CompareValueType</code>](#CompareValueType) | 


* * *

<a name="RealmQuery+greaterThanOrEqualTo"></a>

### realmQuery.greaterThanOrEqualTo(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
greater-than-or-equal-to comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>CompareValueType</code>](#CompareValueType) | 


* * *

<a name="RealmQuery+orGreaterThanOrEqualTo"></a>

### realmQuery.orGreaterThanOrEqualTo(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Or greater-than-or-equal-to comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>CompareValueType</code>](#CompareValueType) | 


* * *

<a name="RealmQuery+in"></a>

### realmQuery.in(fieldName, values) ⇒ [<code>RealmQuery</code>](#RealmQuery)
In comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| values | [<code>Array.&lt;EqualValueType&gt;</code>](#EqualValueType) | 


* * *

<a name="RealmQuery+orIn"></a>

### realmQuery.orIn(fieldName, values) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Or in comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| values | [<code>Array.&lt;EqualValueType&gt;</code>](#EqualValueType) | 


* * *

<a name="RealmQuery+notIn"></a>

### realmQuery.notIn(fieldName, values) ⇒ [<code>RealmQuery</code>](#RealmQuery)
not In comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| values | [<code>Array.&lt;EqualValueType&gt;</code>](#EqualValueType) | 


* * *

<a name="RealmQuery+orNotIn"></a>

### realmQuery.orNotIn(fieldName, values) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Or not in comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| values | [<code>Array.&lt;EqualValueType&gt;</code>](#EqualValueType) | 


* * *

<a name="RealmQuery+isNotNull"></a>

### realmQuery.isNotNull(fieldName) ⇒ [<code>RealmQuery</code>](#RealmQuery)
not null comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 


* * *

<a name="RealmQuery+isNull"></a>

### realmQuery.isNull(fieldName) ⇒ [<code>RealmQuery</code>](#RealmQuery)
null comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 


* * *

<a name="RealmQuery+lessThan"></a>

### realmQuery.lessThan(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Less-than comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>CompareValueType</code>](#CompareValueType) | 


* * *

<a name="RealmQuery+orLessThan"></a>

### realmQuery.orLessThan(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
or Less-than comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>CompareValueType</code>](#CompareValueType) | 


* * *

<a name="RealmQuery+lessThanOrEqualTo"></a>

### realmQuery.lessThanOrEqualTo(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Less-than-or-equal-to comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>CompareValueType</code>](#CompareValueType) | 


* * *

<a name="RealmQuery+orLessThanOrEqualTo"></a>

### realmQuery.orLessThanOrEqualTo(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
OR Less-than-or-equal-to comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>CompareValueType</code>](#CompareValueType) | 


* * *

<a name="RealmQuery+not"></a>

### realmQuery.not() ⇒ [<code>RealmQuery</code>](#RealmQuery)
start a NOT operator

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

* * *

<a name="RealmQuery+endNot"></a>

### realmQuery.endNot() ⇒ [<code>RealmQuery</code>](#RealmQuery)
end a NOT operator

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

* * *

<a name="RealmQuery+notEqualTo"></a>

### realmQuery.notEqualTo(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Not-equal-to comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>EqualValueType</code>](#EqualValueType) | 


* * *

<a name="RealmQuery+orNotEqualTo"></a>

### realmQuery.orNotEqualTo(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
or Not-equal-to comparaison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>EqualValueType</code>](#EqualValueType) | 


* * *

<a name="RealmQuery+beginGroup"></a>

### realmQuery.beginGroup() ⇒ [<code>RealmQuery</code>](#RealmQuery)
Begin AND grouping of conditions ("left parenthesis")

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

* * *

<a name="RealmQuery+beginOrGroup"></a>

### realmQuery.beginOrGroup() ⇒ [<code>RealmQuery</code>](#RealmQuery)
Begin OR grouping of conditions ("left parenthesis")

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

* * *

<a name="RealmQuery+endGroup"></a>

### realmQuery.endGroup() ⇒ [<code>RealmQuery</code>](#RealmQuery)
End grouping of conditions ("right parenthesis") which was opened by a call to beginGroup()

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

* * *

<a name="RealmQuery+group"></a>

### realmQuery.group(cb) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Group query in a callback

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| cb | [<code>groupCallback</code>](#groupCallback) | 

**Example**  
```js
query.group((groupQuery) => {
  return groupQuery
     .equalTo('field', 10)
     .orEqualTo('field2', 'value')
})
```

* * *

<a name="RealmQuery+orGroup"></a>

### realmQuery.orGroup(cb) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Group query in a callback with OR operator

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| cb | [<code>groupCallback</code>](#groupCallback) | 

**Example**  
```js
query.orGroup((groupQuery) => {
  return groupQuery
     .equalTo('field', 10)
     .orEqualTo('field2', 'value')
})
```

* * *

<a name="RealmQuery+join"></a>

### realmQuery.join(query) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Combine to another query

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| query | [<code>RealmQuery</code>](#RealmQuery) | 


* * *

<a name="RealmQuery+orJoin"></a>

### realmQuery.orJoin(query) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Combine to another query with OR operator

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| query | [<code>RealmQuery</code>](#RealmQuery) | 


* * *

<a name="CompareValueType"></a>

## CompareValueType

| Type |
| --- |
| <code>Date</code> \| <code>Number</code> | 


* * *

<a name="EqualValueType"></a>

## EqualValueType

| Type |
| --- |
| <code>string</code> \| <code>number</code> \| <code>boolean</code> \| <code>Date</code> | 


* * *

<a name="groupCallback"></a>

## groupCallback : <code>function</code>

| Type |
| --- |
| [<code>RealmQuery</code>](#RealmQuery) | 


* * *

