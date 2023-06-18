import Realm from 'realm';
import RealmQuery from '../query';
import Person from '../../__test__/models/Person';
import Holiday from '../../__test__/models/Holiday';
import Model from "../../Model";
import * as fs from "fs";
import Place from "../../__test__/models/Place";
let realm;
beforeAll(() => {
  realm = new Realm({
    path: `${fs.mkdtempSync('/tmp/realm-orm-query')}/test.realm`,
    inMemory: true,
    schema: [Place, Holiday, Person ]
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
      createdAt: '2011-09-26 16:42:17'
    });
    realm.create('Person', { id: 3, name: 'norman', age: 28,holidays: [], createdAt: new Date('2015-06-14 20:57:46') });
    realm.create('Person', { id: 4, name: 'elias', age: 42,holidays: [], createdAt: new Date('2006-06-13 04:35:02') });
    realm.create('Person', { id: 5, name: 'martin', age: 18,holidays: [], createdAt: new Date('2003-01-14 14:12:50') });
  });
});
afterAll(() => {
  realm.close();
})

class NestedField extends Model<NestedField>{
  test: Date
  test2: number
}

class FakeObject extends Model<FakeObject> {
  id: number
  name: string
  age: number
  field1: string
  field2: string
  field3: string
  field4: string
  field5: string
  field6: string
  field7: string
  field8: string
  field9: string
  field10: string
  createdAt: Date
  isDeleted: string
  status: string
  nestedField: NestedField

}

describe('RealmQuery', function () {
  /**
   * @type {RealmQuery}
   */
  let query: RealmQuery<FakeObject>;
  beforeEach(function () {
    query = RealmQuery.query<any>();
  });

  describe('equalTo', function () {
    it('equalTo number', function () {
      query.equalTo('id', 1001);
      expect(query.debug()).toEqual('id == 1001');
      query.orEqualTo('id', 1200);
      expect(query.debug()).toEqual('id == 1001 OR id == 1200');
    });

    it('equalTo string', function () {
      query.equalTo('name', 'username');
      expect(query.debug()).toEqual('name == "username"');
    });

    it('equalTo date', function () {
      const now = new Date();
      query.equalTo('createdAt', now);
      expect(query.debug()).toEqual(`createdAt == ${ now.toString()}`);
    });

    it('equalTo boolean', function () {
      query.equalTo('isDeleted', true);
      expect(query.debug()).toEqual('isDeleted == true');
    });
    it('equalTo boolean collection', function () {
      query.equalTo('isDeleted', true, 'ALL');
      expect(query.debug()).toEqual('ALL isDeleted == true');
    });
    it('equalTo nested', function () {
      query.equalTo('nestedField.test2', 25)
      expect(query.debug()).toEqual('nestedField.test2 == 25')
    });
  });

  describe('notEqualTo', function () {

    it('notEqualTo number', function () {
      query.notEqualTo('id', 1001);
      expect(query.debug()).toEqual('id != 1001');
      query.orNotEqualTo('id', 1002);
      expect(query.debug()).toEqual('id != 1001 OR id != 1002');
    });

    it('notEqualTo string', function () {
      query.notEqualTo('name', 'username');
      expect(query.debug()).toEqual('name != "username"');
    });

    it('notEqualTo date', function () {
      const now = new Date();
      query.notEqualTo('createdAt', now);
      expect(query.debug()).toEqual(`createdAt != ${ now.toString()}`);
    });

    it('notEqualTo boolean', function () {
      query.notEqualTo('isDeleted', true);
      expect(query.debug()).toEqual('isDeleted != true');
    });
    it('notEqualTo boolean collection', function () {
      query.notEqualTo('isDeleted', true, 'ALL');
      expect(query.debug()).toEqual('ALL isDeleted != true');
    });
  });

  describe('beginsWith', function () {
    it('beginsWith not casing', function () {
      query.beginsWith('name', 'phu');
      expect(query.debug()).toEqual('name BEGINSWITH "phu"');
    });
    it('orBeginsWith not casing', function () {
      query.beginsWith('name', 'phu').orBeginsWith('name', 'pha');
      expect(query.debug()).toEqual('name BEGINSWITH "phu" OR name BEGINSWITH "pha"');
    });
    it('beginsWith casing', function () {
      query.beginsWith('name', 'phu', true);
      expect(query.debug()).toEqual('name BEGINSWITH[c] "phu"');
    });
  });

  describe('endsWith', function () {
    it('endsWith not casing', function () {
      query.endsWith('name', 'phu');
      expect(query.debug()).toEqual('name ENDSWITH "phu"');
      query.orEndsWith('name', 'pha');
      expect(query.debug()).toEqual('name ENDSWITH "phu" OR name ENDSWITH "pha"');
    });
    it('endsWith casing', function () {
      query.endsWith('name', 'phu', true);
      expect(query.debug()).toEqual('name ENDSWITH[c] "phu"');
    });
  });
  describe('like', function () {
    it('like', function () {
      query.like('name', '*phu?');
      expect(query.debug()).toEqual('name LIKE "*phu?"');
      query.orLike('name', '*pha*');
      expect(query.debug()).toEqual('name LIKE "*phu?" OR name LIKE "*pha*"');
    });
  });
  describe('contains', function () {
    it('contains not casing', function () {
      query.contains('name', 'phu');
      expect(query.debug()).toEqual('name CONTAINS "phu"');
    });
    it('or contains not casing', function () {
      query.contains('name', 'phu').orContains('name', 'pha');
      expect(query.debug()).toEqual('name CONTAINS "phu" OR name CONTAINS "pha"');
    });
    it('contains casing', function () {
      query.contains('name', 'phu', true);
      expect(query.debug()).toEqual('name CONTAINS[c] "phu"');
    });
  });

  describe('between', function () {
    it('between number to number', function () {
      query.between('age', 20, 30);
      expect(query.debug()).toEqual('age BETWEEN {20, 30}');
    });
    it('between number to number collection', function () {
      query.between('age', 20, 30, 'ALL');
      expect(query.debug()).toEqual('ALL age BETWEEN {20, 30}');
    });
    it('between date to date', function () {
      const start = new Date();
      const end = new Date();
      query.between('createdAt', start, end);
      expect(query.debug()).toEqual(`createdAt BETWEEN {${start}, ${end}}`);
    });

    it('should multiple between', () => {
      query.between('nestedField.test', 5, 10).between('nestedField.test2', 20, 50);
      expect(query.debug())
        .toEqual('nestedField.test BETWEEN {5, 10} AND nestedField.test2 BETWEEN {20, 50}');
      query = RealmQuery.query<any>().between('field.test', 5, 10).orBetween('field2.test', 20, 50);
      expect(query.debug())
        .toEqual('field.test BETWEEN {5, 10} OR field2.test BETWEEN {20, 50}');
    });

    it('should between collection', () => {
      query.between('nestedField.test', 5, 10, 'ALL').orBetween('nestedField.test2', 20, 50, 'NONE');
      expect(query.debug())
        .toEqual('ALL nestedField.test BETWEEN {5, 10} OR NONE nestedField.test2 BETWEEN {20, 50}');
    });

  });

  describe('Basic comparator', function () {

    it('greaterThan number', function () {
      query.greaterThan('age', 20);
      expect(query.debug()).toEqual('age > 20');
      query.orGreaterThan('age', 22);
      expect(query.debug()).toEqual('age > 20 OR age > 22');
    });

    it('greaterThan number collection', function () {
      query.greaterThan('age', 20, 'ALL');
      expect(query.debug()).toEqual('ALL age > 20');
      query.orGreaterThan('age', 22, 'ANY');
      expect(query.debug()).toEqual('ALL age > 20 OR ANY age > 22');
    });

    it('greaterThan a date', function () {
      const now = new Date();
      query.greaterThan('createdAt', now);
      expect(query.debug()).toEqual(`createdAt > ${ now.toString()}`);
    });

    it('greaterThanOrEqualTo number', function () {
      query.greaterThanOrEqualTo('age', 20);
      expect(query.debug()).toEqual('age >= 20');
      query.orGreaterThanOrEqualTo('age', 22);
      expect(query.debug()).toEqual('age >= 20 OR age >= 22');
    });
    it('greaterThanOrEqualTo a date', function () {
      const now = new Date();
      query.greaterThanOrEqualTo('createdAt', now);
      expect(query.debug()).toEqual(`createdAt >= ${ now.toString()}`);
    });

    it('greaterThanOrEqualTo a date collection', function () {
      const now = new Date();
      query.greaterThanOrEqualTo('createdAt', now, 'ANY');
      expect(query.debug()).toEqual(`ANY createdAt >= ${ now.toString()}`);
    });

    it('lessThan number', function () {
      query.lessThan('age', 20);
      expect(query.debug()).toEqual('age < 20');
      query.orLessThan('age', 22);
      expect(query.debug()).toEqual('age < 20 OR age < 22');
    });
    it('lessThan number collection', function () {
      query.lessThan('age', 20, 'ANY');
      expect(query.debug()).toEqual('ANY age < 20');
    });
    it('lessThan a date', function () {
      const now = new Date();
      query.lessThan('createdAt', now);
      expect(query.debug()).toEqual(`createdAt < ${ now.toString()}`);
    });

    it('lessThanOrEqualTo number', function () {
      query.lessThanOrEqualTo('age', 20);
      expect(query.debug()).toEqual('age <= 20');
      query.orLessThanOrEqualTo('age', 22);
      expect(query.debug()).toEqual('age <= 20 OR age <= 22');
    });
    it('lessThanOrEqualTo number collection', function () {
      query.lessThanOrEqualTo('age', 20, 'ANY');
      expect(query.debug()).toEqual('ANY age <= 20');
      query.orLessThanOrEqualTo('age', 22, 'SOME');
      expect(query.debug()).toEqual('ANY age <= 20 OR SOME age <= 22');
    });
    it('lessThanOrEqualTo a date', function () {
      const now = new Date();
      query.lessThanOrEqualTo('createdAt', now);
      expect(query.debug()).toEqual(`createdAt <= ${ now.toString()}`);
    });
    it('should is not null', function () {
        expect(query.isNotNull('nestedField').orIsNotNull('field2').debug())
            .toEqual("nestedField != nil OR field2 != nil")
    });
    it('should is not null collection', function () {
        expect(query.isNotNull('nestedField','SOME').orIsNotNull('field2', 'SOME').debug())
            .toEqual("SOME nestedField != nil OR SOME field2 != nil")
    });
    it('should is null', function () {
        expect(query.isNull('nestedField').orIsNull('field2').debug())
            .toEqual("nestedField == nil OR field2 == nil")
    });

    it('should is null collection', function () {
        expect(query.isNull('nestedField', 'ALL').orIsNull('field2', 'NONE').debug())
            .toEqual("ALL nestedField == nil OR NONE field2 == nil")
    });

    it('should is not empty', function () {
        expect(query.isNotEmpty('name').orIsNotEmpty('field2').debug())
            .toEqual("name != '' OR field2 != ''")
    });

    it('should is not empty collection', function () {
        expect(query.isNotEmpty('name', 'ALL').orIsNotEmpty('field2', 'ALL').debug())
            .toEqual("ALL name != '' OR ALL field2 != ''")
    });
    it('should is not empty collection', function () {
        expect(query.isNotEmpty('name', 'ALL').orIsNotEmpty('field2', 'NONE').debug())
            .toEqual("ALL name != '' OR NONE field2 != ''")
    });
    it('should is empty', function () {
        expect(query.isEmpty('name').orIsEmpty('field2').debug())
            .toEqual("name == '' OR field2 == ''")
    });

    it('should is empty', function () {
        expect(query.isEmpty('name', 'ALL').orIsEmpty('field2', 'NONE').debug())
            .toEqual("ALL name == '' OR NONE field2 == ''")
    });
  });
  describe('In', function () {
    it('In array of number', function () {
      query.in('id', [ 1, 2 ]);
      expect(query.debug()).toEqual('id in { 1, 2 }');
      query.orIn('age', [ 20, 23 ]);
      expect(query.debug()).toEqual('id in { 1, 2 } OR age in { 20, 23 }');
    });
    it('In array of number', function () {
      query.in('id', [ 1, 2 ], 'ANY');
      expect(query.debug()).toEqual('ANY id in { 1, 2 }');
      query.orIn('age', [ 20, 23 ], 'SOME');
      expect(query.debug()).toEqual('ANY id in { 1, 2 } OR SOME age in { 20, 23 }');
    });
    it('not In', function () {
      query.notIn('id', [ 1, 2 ]);
      expect(query.debug()).toEqual('id in NONE { 1, 2 }');
      query.orNotIn('age', [ 4, 5 ]);
      expect(query.debug()).toEqual('id in NONE { 1, 2 } OR age in NONE { 4, 5 }');
    });
    it('not In Collection', function () {
      query.notIn('id', [ 1, 2 ], 'NONE');
      expect(query.debug()).toEqual('NONE id in NONE { 1, 2 }');
      query.orNotIn('age', [ 4, 5 ], 'SOME');
      expect(query.debug()).toEqual('NONE id in NONE { 1, 2 } OR SOME age in NONE { 4, 5 }');
    });
    it('In array of string', function () {
      query.in('status', [ 'ACTIVE', 'DEACTIVE' ]);
      expect(query.debug()).toEqual('status in { "ACTIVE", "DEACTIVE" }');
    });
  });

  describe('Query with compound criteria', function () {
    it('complex query', function () {
      query
        .contains('name', 'phu', true)
        .beginGroup()
        .greaterThan('age', 25)
        .in('id', [ 1001, 1002 ]);

      let expected = 'name CONTAINS[c] "phu" AND (age > 25 AND id in { 1001, 1002 })';
      expect(query.debug()).toEqual(expected);
    });

    it('complex query with and', function () {
      query
        .contains('name', 'phu', true)
        .beginGroup()
        .greaterThan('age', 25)
        .in('id', [ 1001, 1002 ]);
      let expected = 'name CONTAINS[c] "phu" AND (age > 25 AND id in { 1001, 1002 })';
      expect(query.debug()).toEqual(expected);
    });
    it('complex query with not', function () {
      query
        .not().contains('name', 'phu', true)
        .beginGroup()
        .greaterThan('age', 25)
        .in('id', [ 1001, 1002 ]);

      let expected = 'NOT(name CONTAINS[c] "phu" AND (age > 25 AND id in { 1001, 1002 }))';
      expect(query.debug()).toEqual(expected);
    });

    it('combine complex query', function () {
      query = RealmQuery.query<any>().contains('name', 'phu', true);
      let query2 = RealmQuery.query<any>().in('id', [ 1001, 1002 ]);
      query.join(query2);
      expect(query.debug()).toEqual('name CONTAINS[c] "phu" AND id in { 1001, 1002 }');
    });
    it('combine complex query with or', function () {
      query = RealmQuery.query<any>().contains('name', 'phu', true);
      let query2 = RealmQuery.query<any>().in('id', [ 1001, 1002 ]);
      query.orJoin(query2);
      expect(query.debug()).toEqual('name CONTAINS[c] "phu" OR id in { 1001, 1002 }');
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
      expect(query.debug()).toEqual('field1 == "string" AND (field2 == 20 AND field3 == 40 OR (field4 BEGINSWITH "sdsds" AND ((field5 == 20 AND field6 == "sdsds") OR (group BETWEEN {20, 30}) AND field7 == "asasa")) AND (field8 == "20" AND field9 == 20)) AND field10 == 2');// eslint-disable-line
    });

    it('should or on exit group', () => {
      query
        .equalTo('field1', 20)
        .beginOrGroup()
        .contains('field2', 'dsdss')
        .not().contains('field3', 'dsdsds').equalTo('field4', 20).endNot()
        .endGroup().orEqualTo('field4', 87);
      let excepted = 'field1 == 20 OR (field2 CONTAINS "dsdss" AND NOT(field3 CONTAINS "dsdsds" AND field4 == 20)) OR field4 == 87';// eslint-disable-line
      expect(query.debug()).toEqual(excepted);
    });

  });
  it('should use raw value', function () {
      query.equalTo('field1', RealmQuery.raw('test'))
    expect(query.debug()).toEqual('field1 == test')
  });

  it('should use query raw', function () {
      query.raw('field == test')
    expect(query.debug()).toEqual('field == test')
  });

  it('should use query orRaw', function () {
      query.raw('field == test').orRaw('field2 == otherTest')
    expect(query.debug()).toEqual('field == test OR field2 == otherTest')
  });

  it('should distinct', function () {
    query.distinct('field1')
    expect(query.debug()).toEqual(' DISTINCT(field1)')
  });

  it('should multiple distinct', function () {
    query.distinct(['field1', 'field2'])
    expect(query.debug()).toEqual(' DISTINCT(field1, field2)')
  });

});

describe('Get objects with RealmQuery', function () {
  it('should group', () => {
    let results = RealmQuery
      .query<Person>(realm.objects(Person.schema.name))
      .in('id', [ 1, 5 ])
      .orBetween('age', 34, 42)
      .findAll();
    expect(results.length).toEqual(4);
  });
  it('should group with not', () => {
    let results = RealmQuery
      .query<Person>(realm.objects(Person.schema.name))
      .not().in('id', [ 1, 5 ]).endNot()
      .orBetween('age', 34, 42).findAll();
    expect(results.length).toEqual(3);
  });

  it('should find null', () => {
    let results = RealmQuery.query<Person>(realm.objects(Person.schema.name)).isNull('hobbies').findAll();
    expect(results).toHaveLength(3);
  });
  it('should find not null', () => {
    let results = RealmQuery.query<Person>(realm.objects(Person.schema.name)).isNotNull('hobbies').findAll();
    expect(results).toHaveLength(2);
  });

  it('should find not null on nested', () => {
    let results = RealmQuery
        .query<Person>(realm.objects(Person.schema.name))
        .between('age', 33, 35)
        .isNotNull('holidays.name').findAll();
    expect(results).toHaveLength(1);
  });

  it('Find all', function () {
    let query = RealmQuery.query(realm.objects('Person'));
    let results = query.findAll();
    expect(results.length).toEqual(5);
  });

  it('Find all with filtered', function () {
    let results = RealmQuery
      .query<Person>(realm.objects('Person'))
      .greaterThan('age', 30)
      .findAll();
    expect(results.length).toEqual(2);
  });

  it('should find between', () => {
    let query = RealmQuery
      .query<Person>(realm.objects('Person'))
      .between('age', 30, 50);
    let results = query.findAll();
    expect(results.length).toEqual(2);
  });

  it('should find like', () => {
    let query = RealmQuery
      .query<Person>(realm.objects('Person'))
      .like('name', '*ma*');
    let results = query.findAll();
    expect(results.length).toEqual(2);
  });

  it('Find first', function () {
    let query = RealmQuery.query<Person>(realm.objects('Person'));
    let result = query.findFirst();
    let expected = realm.objects('Person')[0];
    expect(result.id).toEqual(expected.id);
  });

  it('Find by Date', () => {
    let query = RealmQuery.query<Person>(realm.objects('Person'));
    query.equalTo('createdAt', new Date('2003-01-14 14:12:50'));
    let res = query.findAll();
    expect(res).toHaveLength(1);
  });

  it('Find first with filtered', function () {
    let result = RealmQuery
      .query<Person>(realm.objects('Person'))
      .greaterThan('age', 30)
      .findFirst();
    expect(result.id).toEqual(2);
  });

  it('Sort results', function () {
    let result = RealmQuery
      .query<Person>(realm.objects('Person'))
      .greaterThan('age', 0)
      .sort('age')
      .sort('name', 'DESC')
      .findAll();
    expect(result[0].name).toEqual('martin');
    expect(result[1].name).toEqual('clinton');
  });
  it('Sort results without filter', function () {
    let result = RealmQuery
      .query<Person>(realm.objects('Person'))
      .sort('age')
      .sort('name', 'ASC');
    expect(() => {
      result.findAll();
    }).toThrowError('Can\'t have sort or distinct without query filter');
  });



  it('Count', function () {
    let total = RealmQuery
      .query(realm.objects('Person'))
      .count();
    expect(total).toEqual(5);
  });
  it('Max', function () {
    let total = RealmQuery
      .query<Person>(realm.objects('Person'))
      .max('age');
    expect(total).toEqual(42);
  });
  it('min', function () {
    let total = RealmQuery
      .query<Person>(realm.objects('Person'))
      .min('age');
    expect(total).toEqual(18);
  });
  it('avg', function () {
    let total = RealmQuery
      .query<Person>(realm.objects('Person'))
      .avg('age');
    expect(total).toEqual(28);
  });
  it('sum', function () {
    let total = RealmQuery
      .query<Person>(realm.objects('Person'))
      .sum('age');
    expect(total).toEqual(140);
  });

  it('Count with filtered', function () {
    let total = RealmQuery
      .query<Person>(realm.objects('Person'))
      .greaterThan('age', 30)
      .count();
    expect(total).toEqual(2);
  });
  it('Distinct', function () {
    let results = RealmQuery
      .query<Person>(realm.objects('Person'))
      .greaterThan('age', 0)
      .distinct('age').findAll();
    expect(results.length).toEqual(4);
    expect(results).toBeInstanceOf(Realm.Results);
  });
  it('DISTINCT results without filter', function () {
    let results = RealmQuery
        .query<Person>(realm.objects('Person'))
        .distinct('age');
    expect(() => {
      results.findAll();
    }).toThrowError('Can\'t have sort or distinct without query filter');
  });


});
