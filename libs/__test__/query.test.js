import Realm from 'realm';
import RealmQuery from '../query';
import Person from '../../__test__/models/Person';
import Holiday from '../../__test__/models/Holiday';

describe('RealmQuery', function () {
  /**
   * @type {RealmQuery}
   */
  let query;
  beforeEach(function () {
    query = RealmQuery.query();
  });

  describe('equalTo', function () {
    it('equalTo number', function () {
      query.equalTo('id', 1001);
      expect(query.toStringWithValues()).toEqual('id == 1001');
      query.orEqualTo('id', 1200);
      expect(query.toStringWithValues()).toEqual('id == 1001 OR id == 1200');
    });

    it('equalTo string', function () {
      query.equalTo('name', 'username');
      expect(query.toStringWithValues()).toEqual('name == "username"');
    });

    it('equalTo date', function () {
      const now = new Date();
      query.equalTo('createdAt', now);
      expect(query.toStringWithValues()).toEqual(`createdAt == ${ now.toString()}`);
    });

    it('equalTo boolean', function () {
      query.equalTo('isDeleted', true);
      expect(query.toStringWithValues()).toEqual('isDeleted == true');
    });
  });

  describe('notEqualTo', function () {

    it('notEqualTo number', function () {
      query.notEqualTo('id', 1001);
      expect(query.toStringWithValues()).toEqual('id != 1001');
      query.orNotEqualTo('id', 1002);
      expect(query.toStringWithValues()).toEqual('id != 1001 OR id != 1002');
    });

    it('notEqualTo string', function () {
      query.notEqualTo('name', 'username');
      expect(query.toStringWithValues()).toEqual('name != "username"');
    });

    it('notEqualTo date', function () {
      const now = new Date();
      query.notEqualTo('createdAt', now);
      expect(query.toStringWithValues()).toEqual(`createdAt != ${ now.toString()}`);
    });

    it('notEqualTo boolean', function () {
      query.notEqualTo('isDeleted', true);
      expect(query.toStringWithValues()).toEqual('isDeleted != true');
    });
  });

  describe('beginsWith', function () {
    it('beginsWith not casing', function () {
      query.beginsWith('name', 'phu');
      expect(query.toStringWithValues()).toEqual('name BEGINSWITH "phu"');
    });
    it('orBeginsWith not casing', function () {
      query.beginsWith('name', 'phu').orBeginsWith('name', 'pha');
      expect(query.toStringWithValues()).toEqual('name BEGINSWITH "phu" OR name BEGINSWITH "pha"');
    });
    it('beginsWith casing', function () {
      query.beginsWith('name', 'phu', true);
      expect(query.toStringWithValues()).toEqual('name BEGINSWITH[c] "phu"');
    });
  });

  describe('endsWith', function () {
    it('endsWith not casing', function () {
      query.endsWith('name', 'phu');
      expect(query.toStringWithValues()).toEqual('name ENDSWITH "phu"');
      query.orEndsWith('name', 'pha');
      expect(query.toStringWithValues()).toEqual('name ENDSWITH "phu" OR name ENDSWITH "pha"');
    });
    it('endsWith casing', function () {
      query.endsWith('name', 'phu', true);
      expect(query.toStringWithValues()).toEqual('name ENDSWITH[c] "phu"');
    });
  });
  describe('like', function () {
    it('like', function () {
      query.like('name', '*phu?');
      expect(query.toStringWithValues()).toEqual('name LIKE "*phu?"');
      query.orLike('name', '*pha*');
      expect(query.toStringWithValues()).toEqual('name LIKE "*phu?" OR name LIKE "*pha*"');
    });
  });
  describe('contains', function () {
    it('contains not casing', function () {
      query.contains('name', 'phu');
      expect(query.toStringWithValues()).toEqual('name CONTAINS "phu"');
    });
    it('or contains not casing', function () {
      query.contains('name', 'phu').orContains('name', 'pha');
      expect(query.toStringWithValues()).toEqual('name CONTAINS "phu" OR name CONTAINS "pha"');
    });
    it('contains casing', function () {
      query.contains('name', 'phu', true);
      expect(query.toStringWithValues()).toEqual('name CONTAINS[c] "phu"');
    });
  });

  describe('between', function () {
    it('between number to number', function () {
      query.between('age', 20, 30);
      expect(query.toStringWithValues()).toEqual('(age >= 20 AND age <= 30)');
    });
    it('between date to date', function () {
      const start = new Date();
      const end = new Date();
      query.between('createdAt', start, end);
      expect(query.toStringWithValues()).toEqual(`(createdAt >= ${start} AND createdAt <= ${end})`);
    });

    it('should multiple between', () => {
      query.between('field.test', 5, 10).between('field2.test', 20, 50);
      expect(query.toStringWithValues())
        .toEqual('(field.test >= 5 AND field.test <= 10) AND (field2.test >= 20 AND field2.test <= 50)');
      query = RealmQuery.query().between('field.test', 5, 10).orBetween('field2.test', 20, 50);
      expect(query.toStringWithValues())
        .toEqual('(field.test >= 5 AND field.test <= 10) OR (field2.test >= 20 AND field2.test <= 50)');
    });

  });

  describe('Basic comparation', function () {

    it('greaterThan number', function () {
      query.greaterThan('age', 20);
      expect(query.toStringWithValues()).toEqual('age > 20');
      query.orGreaterThan('age', 22);
      expect(query.toStringWithValues()).toEqual('age > 20 OR age > 22');
    });

    it('greaterThan a date', function () {
      const now = new Date();
      query.greaterThan('createdAt', now);
      expect(query.toStringWithValues()).toEqual(`createdAt > ${ now.toString()}`);
    });

    it('greaterThanOrEqualTo number', function () {
      query.greaterThanOrEqualTo('age', 20);
      expect(query.toStringWithValues()).toEqual('age >= 20');
      query.orGreaterThanOrEqualTo('age', 22);
      expect(query.toStringWithValues()).toEqual('age >= 20 OR age >= 22');
    });
    it('greaterThanOrEqualTo a date', function () {
      const now = new Date();
      query.greaterThanOrEqualTo('createdAt', now);
      expect(query.toStringWithValues()).toEqual(`createdAt >= ${ now.toString()}`);
    });

    it('lessThan number', function () {
      query.lessThan('age', 20);
      expect(query.toStringWithValues()).toEqual('age < 20');
      query.orLessThan('age', 22);
      expect(query.toStringWithValues()).toEqual('age < 20 OR age < 22');
    });
    it('lessThan a date', function () {
      const now = new Date();
      query.lessThan('createdAt', now);
      expect(query.toStringWithValues()).toEqual(`createdAt < ${ now.toString()}`);
    });

    it('lessThanOrEqualTo number', function () {
      query.lessThanOrEqualTo('age', 20);
      expect(query.toStringWithValues()).toEqual('age <= 20');
      query.orLessThanOrEqualTo('age', 22);
      expect(query.toStringWithValues()).toEqual('age <= 20 OR age <= 22');
    });
    it('lessThanOrEqualTo a date', function () {
      const now = new Date();
      query.lessThanOrEqualTo('createdAt', now);
      expect(query.toStringWithValues()).toEqual(`createdAt <= ${ now.toString()}`);
    });
  });
  describe('In', function () {
    it('In array of number', function () {
      query.in('id', [ 1, 2 ]);
      expect(query.toStringWithValues()).toEqual('(id == 1 OR id == 2)');
      query.orIn('age', [ 20, 23 ]);
      expect(query.toStringWithValues()).toEqual('(id == 1 OR id == 2) OR (age == 20 OR age == 23)');
    });
    it('not In', function () {
      query.notIn('id', [ 1, 2 ]);
      expect(query.toStringWithValues()).toEqual('(id != 1 AND id != 2)');
      query.orNotIn('age', [ 1, 2 ]);
      expect(query.toStringWithValues()).toEqual('(id != 1 AND id != 2) OR (age != 1 AND age != 2)');
    });
    it('In array of string', function () {
      query.in('status', [ 'ACTIVE', 'DEACTIVE' ]);
      expect(query.toStringWithValues()).toEqual('(status == "ACTIVE" OR status == "DEACTIVE")');
    });
    it('In array of mix values', function () {
      query.in('id', [ 1001, 'abcd' ]);
      expect(query.toStringWithValues()).toEqual('(id == 1001 OR id == "abcd")');
    });
  });

  describe('Query with compound criterias', function () {
    it('complex query', function () {
      query
        .contains('name', 'phu', true)
        .beginGroup()
        .greaterThan('age', 25)
        .in('id', [ 1001, 1002 ]);

      let expected = 'name CONTAINS[c] "phu" AND (age > 25 AND (id == 1001 OR id == 1002))';
      expect(query.toStringWithValues()).toEqual(expected);
    });

    it('complex query with and', function () {
      query
        .contains('name', 'phu', true)
        .beginGroup()
        .greaterThan('age', 25)
        .in('id', [ 1001, 1002 ]);
      let expected = 'name CONTAINS[c] "phu" AND (age > 25 AND (id == 1001 OR id == 1002))';
      expect(query.toStringWithValues()).toEqual(expected);
    });
    it('complex query with not', function () {
      query
        .not().contains('name', 'phu', true)
        .beginGroup()
        .greaterThan('age', 25)
        .in('id', [ 1001, 1002 ]);

      let expected = 'NOT(name CONTAINS[c] "phu" AND (age > 25 AND (id == 1001 OR id == 1002)))';
      expect(query.toStringWithValues()).toEqual(expected);
    });

    it('combine complex query', function () {
      query = RealmQuery.query().contains('name', 'phu', true);
      let query2 = RealmQuery.query().in('id', [ 1001, 1002 ]);
      query.join(query2);
      expect(query.toStringWithValues()).toEqual('name CONTAINS[c] "phu" AND (id == 1001 OR id == 1002)');
    });
    it('combine complex query with or', function () {
      query = RealmQuery.query().contains('name', 'phu', true);
      let query2 = RealmQuery.query().in('id', [ 1001, 1002 ]);
      query.orJoin(query2);
      expect(query.toStringWithValues()).toEqual('name CONTAINS[c] "phu" OR (id == 1001 OR id == 1002)');
    });

    it('multiple group', () => {
      query
        .equalTo('field1', 'string')
        .beginGroup()
        .equalTo('field2', 20)
        .equalTo('field3', 40)

        .beginOrGroup()
        .beginsWith('field4', 'sdsds')
        .beginGroup()
        .beginGroup()
        .orEqualTo('field5', 20)
        .equalTo('field6', 'sdsds')
        .endGroup()
        .orGroup((query) => {
          return query.between('group', 20, 30);
        })
        .equalTo('field7', 'asasa')
        .endGroup()
        .endGroup()
        .group((query) => {
          return query .orEqualTo('field8', '20')
            .equalTo('field9', 20);
        })
        .endGroup()
        .equalTo('field10', 2);
      expect(query.toStringWithValues()).toEqual('field1 == "string" AND (field2 == 20 AND field3 == 40 OR (field4 BEGINSWITH "sdsds" AND ((field5 == 20 AND field6 == "sdsds") OR ((group >= 20 AND group <= 30)) AND field7 == "asasa")) AND (field8 == "20" AND field9 == 20)) AND field10 == 2');// eslint-disable-line
    });

    it('should or on exit group', () => {
      query
        .equalTo('field', 20)
        .beginOrGroup()
        .contains('dsdsd', 'dsdss')
        .not().contains('dssdds', 'dsdsds').equalTo('asjhjsa', 20).endNot()
        .endGroup().orEqualTo('sdsd', 87);
      let excepted = 'field == 20 OR (dsdsd CONTAINS "dsdss" AND NOT(dssdds CONTAINS "dsdsds" AND asjhjsa == 20)) OR sdsd == 87';// eslint-disable-line
      expect(query.toStringWithValues()).toEqual(excepted);
    });

  });

});

describe('Get objects with RealmQuery', function () {
  let realm = new Realm({
    path: '/tmp/io.izlab.realmquery.test',
    inMemory: true,
    schema: [ Holiday, Person ]
  });
  realm.write(() => {
    realm.deleteAll();
    realm.create('Person', {
      id: 1,
      name: 'clinton',
      age: 18,
      hobbies: 'surf',
      holidays: [],
      createdAt: new Date('2004-12-06 03:34:06')
    });
    realm.create('Person', {
      id: 2,
      name: 'necati',
      age: 34,
      hobbies: 'dev',
      holidays: [
        {
          id: 1,
          name: 'Paris'
        }
      ],
      createdAt: new Date('2011-09-26 16:42:17')
    });
    realm.create('Person', { id: 3, name: 'norman', age: 28,holidays: [], createdAt: new Date('2015-06-14 20:57:46') });
    realm.create('Person', { id: 4, name: 'elias', age: 42,holidays: [], createdAt: new Date('2006-06-13 04:35:02') });
    realm.create('Person', { id: 5, name: 'martin', age: 18,holidays: [], createdAt: new Date('2003-01-14 14:12:50') });
  });

  it('should group', () => {
    let results = RealmQuery
      .query(realm.objects(Person.schema.name))
      .in('id', [ 1, 5 ])
      .orBetween('age', 34, 42)
      .findAll();
    expect(results.length).toEqual(4);
  });
  it('should group with not', () => {
    let results = RealmQuery
      .query(realm.objects(Person.schema.name))
      .not().in('id', [ 1, 5 ]).endNot()
      .orBetween('age', 34, 42).findAll();
    expect(results.length).toEqual(3);
  });

  it('should find null', () => {
    let results = RealmQuery.query(realm.objects(Person.schema.name)).isNull('hobbies').findAll();
    expect(results).toHaveLength(3);
  });
  it('should find not null', () => {
    let results = RealmQuery.query(realm.objects(Person.schema.name)).isNotNull('hobbies').findAll();
    expect(results).toHaveLength(2);
  });  

  it('should find not null on nested', () => {
    let results = RealmQuery.query(realm.objects(Person.schema.name)).between('age', 33, 35).isNotNull('holidays.name').findAll();
    expect(results).toHaveLength(1);
  });

  it('Find all', function () {
    let query = RealmQuery.query(realm.objects('Person'));
    let results = query.findAll();
    expect(results.length).toEqual(5);
  });

  it('Find all with filtered', function () {
    let results = RealmQuery
      .query(realm.objects('Person'))
      .greaterThan('age', 30)
      .findAll();
    expect(results.length).toEqual(2);
  });

  it('should find between', () => {
    let query = RealmQuery
      .query(realm.objects('Person'))
      .between('age', 30, 50);
    let results = query.findAll();
    expect(results.length).toEqual(2);
  });

  it('should find like', () => {
    let query = RealmQuery
      .query(realm.objects('Person'))
      .like('name', '*ma*');
    let results = query.findAll();
    expect(results.length).toEqual(2);
  });

  it('Find first', function () {
    let query = RealmQuery.query(realm.objects('Person'));
    let result = query.findFirst();
    let expected = realm.objects('Person')[0];
    expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
  });

  it('Find by Date', () => {
    let query = RealmQuery.query(realm.objects('Person'));
    query.equalTo('createdAt', new Date('2003-01-14 14:12:50'));
    let res = query.findAll();
    expect(res).toHaveLength(1);
  });

  it('Find first with filtered', function () {
    let result = RealmQuery
      .query(realm.objects('Person'))
      .greaterThan('age', 30)
      .findFirst();
    expect(result.id).toEqual(2);
  });

  it('Count', function () {
    let total = RealmQuery
      .query(realm.objects('Person'))
      .count();
    expect(total).toEqual(5);
  });

  it('Count with filtered', function () {
    let total = RealmQuery
      .query(realm.objects('Person'))
      .greaterThan('age', 30)
      .count();
    expect(total).toEqual(2);
  });
  it('Distinct', function () {
    let results = RealmQuery
      .query(realm.objects('Person'))
      .distinct('age');
    expect(results.length).toEqual(4);
  });

});
