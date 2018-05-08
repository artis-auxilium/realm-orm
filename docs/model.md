<a name="Model"></a>

## Model

* [Model](#Model)
    * _instance_
        * [.update(data)](#Model+update)
        * [.delete()](#Model+delete)
    * _static_
        * *[.schema](#Model.schema) : <code>Realm.ObjectSchema</code>*
        * *[.stringFields](#Model.stringFields) : <code>Array.&lt;string&gt;</code>*
        * [.searchText(term, limit)](#Model.searchText) ⇒ <code>Realm.Results</code> \| <code>RealmQuery</code>
        * [.query()](#Model.query) ⇒ <code>RealmQuery</code>
        * [.find(id)](#Model.find) ⇒ [<code>Model</code>](#Model)
        * [.all()](#Model.all) ⇒ <code>Realm.Results</code>
        * [.ids()](#Model.ids) ⇒ <code>Array</code>
        * [.insert(data)](#Model.insert) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.update(object, data)](#Model.update)
        * [.delete(object)](#Model.delete)


* * *

<a name="Model+update"></a>

### model.update(data)
update model

**Kind**: instance method of [<code>Model</code>](#Model)  

| Param | Type |
| --- | --- |
| data | <code>any</code> | 


* * *

<a name="Model+delete"></a>

### model.delete()
delete model

**Kind**: instance method of [<code>Model</code>](#Model)  

* * *

<a name="Model.schema"></a>

### *Model.schema : <code>Realm.ObjectSchema</code>*
Model schema

**Kind**: static abstract property of [<code>Model</code>](#Model)  

* * *

<a name="Model.stringFields"></a>

### *Model.stringFields : <code>Array.&lt;string&gt;</code>*
Array of string used for search text

**Kind**: static abstract property of [<code>Model</code>](#Model)  

* * *

<a name="Model.searchText"></a>

### Model.searchText(term, limit) ⇒ <code>Realm.Results</code> \| <code>RealmQuery</code>
search object that contain text in stringFields

**Kind**: static method of [<code>Model</code>](#Model)  

| Param | Type | Description |
| --- | --- | --- |
| term | <code>string</code> |  |
| limit | <code>number</code> \| <code>boolean</code> | (if true return query) |


* * *

<a name="Model.query"></a>

### Model.query() ⇒ <code>RealmQuery</code>
get a query instance of Model

**Kind**: static method of [<code>Model</code>](#Model)  

* * *

<a name="Model.find"></a>

### Model.find(id) ⇒ [<code>Model</code>](#Model)
Find object by its primary key

**Kind**: static method of [<code>Model</code>](#Model)  

| Param | Type |
| --- | --- |
| id | <code>number</code> | 


* * *

<a name="Model.all"></a>

### Model.all() ⇒ <code>Realm.Results</code>
get all Object of model

**Kind**: static method of [<code>Model</code>](#Model)  

* * *

<a name="Model.ids"></a>

### Model.ids() ⇒ <code>Array</code>
Get all primaryKey of Model

**Kind**: static method of [<code>Model</code>](#Model)  

* * *

<a name="Model.insert"></a>

### Model.insert(data) ⇒ <code>Promise.&lt;void&gt;</code>
insert new object in database

**Kind**: static method of [<code>Model</code>](#Model)  

| Param | Type |
| --- | --- |
| data | <code>array</code> \| <code>any</code> | 


* * *

<a name="Model.update"></a>

### Model.update(object, data)
update object

**Kind**: static method of [<code>Model</code>](#Model)  

| Param | Type |
| --- | --- |
| object | <code>Realm.Object</code> | 
| data | <code>any</code> | 


* * *

<a name="Model.delete"></a>

### Model.delete(object)
delete results or object from database

**Kind**: static method of [<code>Model</code>](#Model)  

| Param | Type |
| --- | --- |
| object | <code>Realm.Results</code> \| <code>Realm.Object</code> | 


* * *

