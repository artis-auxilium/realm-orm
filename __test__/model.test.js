import RealmQuery from '../libs/query';
import Person from './models/Person';
import TPerson from './models/TPerson';
import DB from '../';

describe('Model', () => {
  beforeAll(() => {
    let db = new DB({
      path: '/tmp/realm.test',
      inMemory: true,
      schema: [
        Person,
        TPerson
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
        createdAt: new Date('2011-09-26 16:42:17')
      },
      {
        id: 124,
        name: 'other person',
        age: 34,
        hobbies: 'dev',
        createdAt: new Date('2011-09-26 16:42:17')
      },
      {
        id: 125,
        name: 'nobody person',
        age: 34,
        hobbies: 'dev',
        createdAt: new Date('2011-09-26 16:42:17')
      }]);
    });
  });
  let person;
  it('should find primary', () => {
    person = Person.find(123);
    expect(person.id).toEqual(123);
  });

  it('should have query', () => {
    expect(Person.query()).toBeInstanceOf(RealmQuery);
    expect(Person.all().query()).toBeInstanceOf(RealmQuery);
  });

  it('should update property', () => {
    person.update({ label: 'new value' });
    expect(person.label).toEqual('new value');
  });

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

  });

  it('should get ids', () => {
    expect(Person.ids()).toHaveLength(3);
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
    let res = Person.searchText('pers');
    expect(res.length).toEqual(3);
    res = Person.searchText('pers', 2);
    expect(res.length).toEqual(2);
    expect(Person.searchText('pers', true)).toBeInstanceOf(RealmQuery);
  });

});
