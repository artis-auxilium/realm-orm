## Classes

<dl>
<dt><a href="#RealmQuery">RealmQuery</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#CompareValueType">CompareValueType</a></dt>
<dd></dd>
<dt><a href="#EqualValueType">EqualValueType</a></dt>
<dd></dd>
<dt><a href="#groupCallback">groupCallback</a> : <code>function</code></dt>
<dd></dd>
</dl>

<a name="RealmQuery"></a>

## RealmQuery
**Kind**: global class  

* [RealmQuery](#RealmQuery)
    * _instance_
        * [.beginsWith(fieldName, value, casing)](#RealmQuery+beginsWith) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.between(fieldName, from, to)](#RealmQuery+between) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.contains(fieldName, value, casing)](#RealmQuery+contains) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.orContains(fieldName, value, casing)](#RealmQuery+orContains) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.count()](#RealmQuery+count) ⇒ <code>number</code>
        * [.distinct(fieldName)](#RealmQuery+distinct) ⇒ <code>Array.&lt;any&gt;</code>
        * [.endsWith(fieldName, value, casing)](#RealmQuery+endsWith) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.equalTo(fieldName, value)](#RealmQuery+equalTo) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.findAll()](#RealmQuery+findAll) ⇒ <code>Results</code>
        * [.findFirst()](#RealmQuery+findFirst)
        * [.greaterThan(fieldName, value)](#RealmQuery+greaterThan) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.greaterThanOrEqualTo(fieldName, value)](#RealmQuery+greaterThanOrEqualTo) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.in(fieldName, values)](#RealmQuery+in) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.notIn(fieldName, values)](#RealmQuery+notIn) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.lessThan(fieldName, value)](#RealmQuery+lessThan) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.lessThanOrEqualTo(fieldName, value)](#RealmQuery+lessThanOrEqualTo) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.orLessThanOrEqualTo(fieldName, value)](#RealmQuery+orLessThanOrEqualTo) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.notEqualTo(fieldName, value)](#RealmQuery+notEqualTo) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.orNotEqualTo(fieldName, value)](#RealmQuery+orNotEqualTo) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.beginGroup()](#RealmQuery+beginGroup) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.beginOrGroup()](#RealmQuery+beginOrGroup) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.endGroup()](#RealmQuery+endGroup) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.group(cb)](#RealmQuery+group) ⇒ [<code>RealmQuery</code>](#RealmQuery)
        * [.join(query)](#RealmQuery+join)
        * [.addJoin(query)](#RealmQuery+addJoin) ⇒ [<code>RealmQuery</code>](#RealmQuery)
    * _static_
        * [.query(objects)](#RealmQuery.query)


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

<a name="RealmQuery+equalTo"></a>

### realmQuery.equalTo(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Equal-to comparison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>EqualValueType</code>](#EqualValueType) | 


* * *

<a name="RealmQuery+findAll"></a>

### realmQuery.findAll() ⇒ <code>Results</code>
Finds all objects that fulfill the query conditions

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

* * *

<a name="RealmQuery+findFirst"></a>

### realmQuery.findFirst()
Finds the first object that fulfills the query conditions

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

* * *

<a name="RealmQuery+greaterThan"></a>

### realmQuery.greaterThan(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Greater-than comparison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>CompareValueType</code>](#CompareValueType) | 


* * *

<a name="RealmQuery+greaterThanOrEqualTo"></a>

### realmQuery.greaterThanOrEqualTo(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
greater-than-or-equal-to comparison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>CompareValueType</code>](#CompareValueType) | 


* * *

<a name="RealmQuery+in"></a>

### realmQuery.in(fieldName, values) ⇒ [<code>RealmQuery</code>](#RealmQuery)
In comparison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| values | [<code>Array.&lt;EqualValueType&gt;</code>](#EqualValueType) | 


* * *

<a name="RealmQuery+notIn"></a>

### realmQuery.notIn(fieldName, values) ⇒ [<code>RealmQuery</code>](#RealmQuery)
not In comparison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| values | [<code>Array.&lt;EqualValueType&gt;</code>](#EqualValueType) | 


* * *

<a name="RealmQuery+lessThan"></a>

### realmQuery.lessThan(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Less-than comparison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>CompareValueType</code>](#CompareValueType) | 


* * *

<a name="RealmQuery+lessThanOrEqualTo"></a>

### realmQuery.lessThanOrEqualTo(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Less-than-or-equal-to comparison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>CompareValueType</code>](#CompareValueType) | 


* * *

<a name="RealmQuery+orLessThanOrEqualTo"></a>

### realmQuery.orLessThanOrEqualTo(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
OR Less-than-or-equal-to comparison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>CompareValueType</code>](#CompareValueType) | 


* * *

<a name="RealmQuery+notEqualTo"></a>

### realmQuery.notEqualTo(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
Not-equal-to comparison

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| fieldName | <code>string</code> | 
| value | [<code>EqualValueType</code>](#EqualValueType) | 


* * *

<a name="RealmQuery+orNotEqualTo"></a>

### realmQuery.orNotEqualTo(fieldName, value) ⇒ [<code>RealmQuery</code>](#RealmQuery)
or Not-equal-to comparison

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

<a name="RealmQuery+join"></a>

### realmQuery.join(query)
Combine to another query

**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| query | [<code>RealmQuery</code>](#RealmQuery) | 


* * *

<a name="RealmQuery+addJoin"></a>

### realmQuery.addJoin(query) ⇒ [<code>RealmQuery</code>](#RealmQuery)
**Kind**: instance method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| query | [<code>RealmQuery</code>](#RealmQuery) | 


* * *

<a name="RealmQuery.query"></a>

### RealmQuery.query(objects)
Create new query

**Kind**: static method of [<code>RealmQuery</code>](#RealmQuery)  

| Param | Type |
| --- | --- |
| objects | <code>Realm.Collection</code> | 


* * *

<a name="CompareValueType"></a>

## CompareValueType
**Kind**: global typedef  

| Type |
| --- |
| <code>Date</code> \| <code>Number</code> | 


* * *

<a name="EqualValueType"></a>

## EqualValueType
**Kind**: global typedef  

| Type |
| --- |
| <code>string</code> \| <code>number</code> \| <code>boolean</code> \| <code>Date</code> | 


* * *

<a name="groupCallback"></a>

## groupCallback : <code>function</code>
**Kind**: global typedef  

| Type |
| --- |
| [<code>RealmQuery</code>](#RealmQuery) | 


* * *

