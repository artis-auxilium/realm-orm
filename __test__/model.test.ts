import RealmQuery from '../libs/query';
import Person from './models/Person';
import TPerson from './models/TPerson';
import Holiday from './models/Holiday';
import CPerson from './models/CPerson';
import * as fs from "fs";
import DB from '../';
import Place from "./models/Place";
const PERSON_ID = 123;
let dbInstance: Realm;
describe('Model', () => {
  beforeAll(() => {
    let db = new DB({
      path: `${fs.mkdtempSync('/tmp/realm-orm-model')}/test.realm`,
      inMemory: true,
      schema: [
        Place,
        Holiday,
        Person,
        TPerson,
        CPerson,
      ]
    });

    db.open().then((db) => {
      dbInstance = db;
      db.write(() => {
        db.deleteAll();
      });
      Person.insert([{
        id: 123,
        name: 'first person',
        ref: 'ref',
        ref_ext: null,
        age: 34,
        hobbies: 'dev',
        createdAt: new Date('2011-09-26 16:42:17'),
        place: {
          name: 'Place',
          id: 1,
          nb_peoples: 15
        },
        holidays: [
          {
            id: 1,
            name: 'summer'
          },
        {
            id: 2,
            name: ''
          }
        ]
      },
      {
        id: 124,
        name: 'other person',
        ref: 'nobody',
        ref_ext: null,
        age: 34,
        hobbies: 'dev',
        createdAt: new Date('2011-09-26 16:42:17')
      },
      {
        id: 125,
        name: 'nobody person',
        ref: 'ref',
        ref_ext: 'ref',
        age: 35,
        hobbies: 'dev',
        createdAt: new Date('2011-09-26 16:42:17')
      }]);
    });
  });
  afterAll(() => {
    dbInstance.close();
  });
  it('should find primary', () => {
    let person = Person.find(PERSON_ID);
    expect(person.id).toEqual(PERSON_ID);
  });

  it('should have query', () => {
    expect(Person.query()).toBeInstanceOf(RealmQuery);
    expect(Person.all().query()).toBeInstanceOf(RealmQuery);
  });

  it('should update property', () => {
    let person = Person.find(PERSON_ID);
    person.update({ name: 'new value' });
    expect(person.name).toEqual('new value');
    person.update({ name: 'first person' });
    expect(person.name).toEqual('first person');
    expect(person.update({ name: null })).rejects.toMatchSnapshot();
  });

  // waiting fix https://github.com/realm/realm-js/issues/2816
  it('should delete model', () => {
    Person.insert([{
      id: 123655,
      name: 'second person',
      age: 16,
      createdAt: new Date(),
    }, {
      id: 123656,
      name: 'third person',
      age: 96,
      createdAt: new Date(),
    }]);
    let person = Person.find(123655);
    person.delete();
    person = Person.find(123655);
    expect(person).toBeFalsy();
    person = Person.find(123656);
    Person.delete(person);
    person = Person.find(123656);
    expect(person).toBeFalsy();
    expect(Person.delete({})).rejects.toMatchSnapshot();
  });

  it('should get ids', () => {
    expect(Person.ids()).toHaveLength(3);
  });

  it('should find person with in', function () {
    let persons = Person.query().in('age', [34,35,78]).findAll()
    expect(persons.length).toEqual(3)
  });

  it('should check empty nested', function () {
    let persons = Person.query().isNotNull('place.name').findAll();
    expect(persons.length).toEqual(1);
  });

  it('should find person with not in', function () {
    let persons = Person.query().notIn('age', [35,78]).findAll()
    expect(persons.length).toEqual(2)
  });

  it('Should create and return object created without primary key', () => {
    TPerson.create({
      id: 15478,
      name: 'third person',
      age: 96,
      createdAt: new Date(),
    }).then((object) =>{
      expect(object.name).toEqual('third person');
      expect(object).toBeDefined();
    });
  });
  it('Should create and return object created with primary key', () => {
    CPerson.create({
      name: 'third person',
      age: 96,
      createdAt: new Date(),
    }).then((object) =>{
      expect(object.name).toEqual('third person');
      expect(object).toBeDefined();
    });
  });

  it('Should create and return  array of object created without primary key', () => {
    CPerson.create([
      {
        name: 'third person',
        age: 96,
        createdAt: new Date(),
      },
      {
        name: 'other person',
        age: 97,
        createdAt: new Date(),
      }
    ]).then((objects) =>{
      expect(objects).toHaveLength(2);
      expect(objects.map(obj => obj.name).join(', ')).toEqual('third person, other person');
    });
  });

  it('should transform on insert', () => {
    TPerson.insert({
      id: 321654,
      name: 'third person',
      age: 96,
      createdAt: new Date(),
    });
    let person = TPerson.find(321654);
    expect(person.age).toEqual(355);
  });

  it('should search text', () => {
    expect(() => {
      TPerson.searchText('pers');
    }).toThrowError('stringFields not defined');
    let res  = Person.searchText('pers');
    expect(res.length).toEqual(3);
    res = Person.searchText('pers', 2);
    expect(res.length).toEqual(2);
    let resQuery : RealmQuery<Person> = Person.searchText('dev', {
      stringFields: ['hobbies', 'name'],
      casing: true,
      return: true
    });
    expect(resQuery.debug()).toEqual('((hobbies CONTAINS[c] "dev") OR (name CONTAINS[c] "dev"))');
    resQuery = Person.searchText('dev', {
      limit: 5,
      return: true,
      casing: true
    });
    expect(resQuery.debug())
        .toEqual('((name CONTAINS[c] "dev") OR (ref CONTAINS[c] "dev") OR (ref_ext CONTAINS[c] "dev"))');
    res = Person.searchText('dev', {
      stringFields: ['hobbies', 'name'],
    });
    expect(res.length).toEqual(3);
    expect(Person.searchText('pers', true)).toBeInstanceOf(RealmQuery);
  });

  it('should search text on multiple words', function () {
    let resQuery = Person.searchText('dev other', {
      limit: 5,
      return: true,
      casing: true
    });
    expect(resQuery.debug())
        .toEqual('(' +
            '(name CONTAINS[c] "dev" AND name CONTAINS[c] "other") ' +
            'OR (ref CONTAINS[c] "dev" AND ref CONTAINS[c] "other") ' +
            'OR (ref_ext CONTAINS[c] "dev" AND ref_ext CONTAINS[c] "other"))'
);
  });

  it('should Search test with other params', function () {
    let query: RealmQuery<Person> = Person.searchText('nobody', true);
    query.equalTo('age', 34);
    const res = query.findAll();
    expect(res.length).toEqual(1);
    expect(res[0].name).toEqual("other person")
  });
  it('should use raw query', function () {
    let persons = Person.query().raw('ref = ref_ext').findAll();
    expect(persons.length).toEqual(1)
  });

  it('should insert sub object', function () {
    let person = Person.find(PERSON_ID);
    expect(person.holidays.length).toEqual(2);
  });

  it('should update sub object', function () {
    let person = Person.find(PERSON_ID);
    let holidays = person.holidays.concat({ id: 2, name: 'winter' });
    person.update({ holidays });
    expect(person.holidays.length).toEqual(3);
    expect(person.holidays.map(holiday => holiday.name)).toEqual(['summer', 'winter', 'winter'])
  });



});
