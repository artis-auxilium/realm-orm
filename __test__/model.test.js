import RealmQuery from '../libs/query';
import Person from './models/Person';
import TPerson from './models/TPerson';
import Holiday from './models/Holiday';
import CPerson from './models/CPerson';
import DB from '../';
const PERSON_ID = 123;
describe('Model', () => {
  beforeAll(() => {
    let db = new DB({
      path: '/tmp/realm.test',
      inMemory: true,
      schema: [
        Holiday,
        Person,
        TPerson,
        CPerson,
      ]
    });
    db.open().then((db) => {
      db.write(() => {
        db.deleteAll();
      });
      Person.insert([{
        id: 123,
        name: 'first person',
        age: 34,
        hobbies: 'dev',
        createdAt: new Date('2011-09-26 16:42:17').toISOString()
      },
      {
        id: 124,
        name: 'other person',
        age: 34,
        hobbies: 'dev',
        createdAt: new Date('2011-09-26 16:42:17').toISOString()
      },
      {
        id: 125,
        name: 'nobody person',
        age: 34,
        hobbies: 'dev',
        createdAt: new Date('2011-09-26 16:42:17').toISOString()
      }]);
    });
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

  it('should delete model', () => {
    Person.insert([{
      id: 123655,
      name: 'second person',
      age: 16,
      createdAt: new Date().toISOString(),
    }, {
      id: 123656,
      name: 'third person',
      age: 96,
      createdAt: new Date().toISOString(),
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

  it('Should create and return object created without primary key', () => {
    TPerson.create({
      id: 15478,
      name: 'third person',
      age: 96,
      createdAt: new Date().toISOString(),
    }).then((object) =>{
      expect(object.name).toEqual('third person');
      expect(object).toBeDefined();
    });
  });
  it('Should create and return object created with primary key', () => {
    CPerson.create({
      name: 'third person',
      age: 96,
      createdAt: new Date().toISOString(),
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
        createdAt: new Date().toISOString(),
      },
      {
        name: 'other person',
        age: 97,
        createdAt: new Date().toISOString(),
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
      createdAt: new Date().toISOString(),
    });
    let person = TPerson.find(321654);
    expect(person.age).toEqual(355);
  });

  it('should search text', () => {
    expect(() => {
      TPerson.searchText('pers');
    }).toThrowError('stringFields not defined');
    let res = Person.searchText('pers');
    expect(res.length).toEqual(3);
    res = Person.searchText('pers', 2);
    expect(res.length).toEqual(2);
    res = Person.searchText('dev', {
      stringFields: ['hobbies', 'name'],
      return: true
    });
    expect(res.toStringWithValues()).toEqual('((hobbies CONTAINS[c] "dev") OR (name CONTAINS[c] "dev"))');
    res = Person.searchText('dev', {
      limit: 5,
      return: true
    });
    expect(res.toStringWithValues()).toEqual('((name CONTAINS[c] "dev"))');
    res = Person.searchText('dev', {
      stringFields: ['hobbies', 'name'],
    });
    expect(res.length).toEqual(3);
    expect(Person.searchText('pers', true)).toBeInstanceOf(RealmQuery);
  });

});
