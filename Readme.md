# Realm-orm
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/95a92109f4aa428ca891e2a9fab1219f)](https://app.codacy.com/gh/artis-auxilium/realm-orm/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_coverage)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/95a92109f4aa428ca891e2a9fab1219f)](https://app.codacy.com/gh/artis-auxilium/realm-orm/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

Simple orm for realm-js with query builder

## Installation

npm

```sh
npm install realm-orm realm --save
```

yarn

```sh
yarn add realm-orm realm
```

## Usage example

create your models

```js
import Model from 'realm-orm/Model'

export default class Person extends Model {
  // realm schema
  static schema = {
    name: 'Person',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      hobbies: {
        type: 'string',
        optional: true
      },
      age: 'int',
      createdAt: 'date'
    }
  }
  // for model.searchText()
  static stringFields = ['name']
}
```

create a new db instance with realm option
(path, schema, migration, etc...) and open it

```js
import DB from 'realm-orm'
import Person from './models/Person'
realm = new DB({
  schema: [
    Person
  ]
});
realm.open().then(() => {
  // realm is ready
})
```

insert data in database (data can be array or object).
If you insert object with same primary key realm
update existing object

```js
    Person.insert([{
      id: 1,
      name: 'second person',
      age: 16,
      createdAt: new Date(),
    }, {
      id: 2,
      name: 'third person',
      age: 96,
      createdAt: new Date(),
    }]);

```

get a record

```js
person = Person.find(1)
```
update person
```js
person.update({ age: 10 })
```
delete person
```js
person.delete()
// or
Person.delete(person)
```

query model

```js
let oldPeople = Person.query()
                  .greaterThan('age', 90)
                  .findAll();
// results can use query
oldPeople.query()
```

_For more examples and usage, please refer to the doc._

  * [model api](./docs/model.md)
  * [query api](./docs/query.md)

## Typescript
see [person](https://github.com/artis-auxilium/realm-orm/blob/master/__test__/models/Person.d.ts) definition in test file


## Stuff used to make this

  * [Realm-query](https://github.com/mrphu3074/realm-query): starting point of query builder
  * [diff](https://github.com/flitbit/diff): used to update model

## Release History

  * 1.0.0
    * initial version

## Meta

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/artis-auxilium/realm-orm](https://github.com/artis-auxilium/realm-orm)

## Contributing
  * Fork it (<https://github.com/artis-auxilium/realm-orm/fork>)
  * Create your feature branch (`git checkout -b feature/fooBar`)
  * Commit your changes (`git commit -am 'Add some fooBar'`)
  * Push to the branch (`git push origin feature/fooBar`)
  * Create a new Pull Request
