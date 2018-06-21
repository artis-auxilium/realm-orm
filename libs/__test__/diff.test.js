  import deep from '../diff';

  describe('deep-diff', () => {
    var empty = {};

    describe('A target that has no properties', () => {

      it('shows no differences when compared to another empty object', () => {
        expect(deep.diff(empty, {})).toBeUndefined();
      });

      describe('when compared to a different type of keyless object', () => {
        var comparandTuples = [
          ['an array', {
            key: []
          }],
          ['an object', {
            key: {}
          }],
          ['a date', {
            key: new Date()
          }],
          ['a null', {
            key: null
          }],
          ['a regexp literal', {
            key: /a/
          }],
          ['Math', {
            key: Math
          }]
        ];

        comparandTuples.forEach((lhsTuple) => {
          comparandTuples.forEach((rhsTuple) => {
            if (lhsTuple[0] === rhsTuple[0]) {
              return;
            }
            it('shows differences when comparing ' + lhsTuple[0] + ' to ' + rhsTuple[0], () => {
              var diff = deep.diff(lhsTuple[1], rhsTuple[1]);
              expect(diff).toBeTruthy();
              expect(diff.length).toBe(1);
              expect(diff[0]).toHaveProperty('kind');
              expect(diff[0].kind).toBe('E');
            });
          });
        });
      });

      describe('when compared with an object having other properties', () => {
        var comparand = {
          other: 'property',
          another: 13.13
        };
        var diff = deep.diff(empty, comparand);

        it('the differences are reported', () => {
          expect(diff).toBeTruthy();
          expect(diff.length).toBe(2);

          expect(diff[0]).toHaveProperty('kind');
          expect(diff[0].kind).toBe('N');
          expect(diff[0]).toHaveProperty('path');
          expect(diff[0].path).toBeInstanceOf(Array);
          expect(diff[0].path[0]).toEqual('other');
          expect(diff[0]).toHaveProperty('rhs');
          expect(diff[0].rhs).toBe('property');

          expect(diff[1]).toHaveProperty('kind');
          expect(diff[1].kind).toBe('N');
          expect(diff[1]).toHaveProperty('path');
          expect(diff[1].path).toBeInstanceOf(Array);
          expect(diff[1].path[0]).toEqual('another');
          expect(diff[1]).toHaveProperty('rhs');
          expect(diff[1].rhs).toBe(13.13);
        });

      });

    });

    describe('A target that has one property', () => {
      var lhs = {
        one: 'property'
      };

      it('shows no differences when compared to itself', () => {
        expect(deep.diff(lhs, lhs)).toBeUndefined();
      });

      it('shows the property as removed when compared to an empty object', () => {
        var diff = deep.diff(lhs, empty);
        expect(diff).toBeTruthy();
        expect(diff.length).toBe(1);
        expect(diff[0]).toHaveProperty('kind');
        expect(diff[0].kind).toBe('D');
      });

      it('shows the property as edited when compared to an object with null', () => {
        var diff = deep.diff(lhs, {
          one: null
        });
        expect(diff).toBeTruthy();
        expect(diff.length).toBe(1);
        expect(diff[0]).toHaveProperty('kind');
        expect(diff[0].kind).toBe('E');
      });

      it('shows the property as edited when compared to an array', () => {
        var diff = deep.diff(lhs, ['one']);
        expect(diff).toBeTruthy();
        expect(diff.length).toBe(1);
        expect(diff[0]).toHaveProperty('kind');
        expect(diff[0].kind).toBe('E');
      });

    });

    describe('A target that has null value', () => {
      var lhs = {
        key: null
      };

      it('shows no differences when compared to itself', () => {
        expect(deep.diff(lhs, lhs)).toBeUndefined();
      });

      it('shows the property as removed when compared to an empty object', () => {
        var diff = deep.diff(lhs, empty);
        expect(diff).toBeTruthy();
        expect(diff.length).toBe(1);
        expect(diff[0]).toHaveProperty('kind');
        expect(diff[0].kind).toBe('D');
      });

      it('shows the property is changed when compared to an object that has value', () => {
        var diff = deep.diff(lhs, {
          key: 'value'
        });
        expect(diff).toBeTruthy();
        expect(diff.length).toBe(1);
        expect(diff[0]).toHaveProperty('kind');
        expect(diff[0].kind).toBe('E');
      });

      it('shows that an object property is changed when it is set to null', () => {
        lhs.key = {
          nested: 'value'
        };
        var diff = deep.diff(lhs, {
          key: null
        });
        expect(diff).toBeTruthy();
        expect(diff.length).toBe(1);
        expect(diff[0]).toHaveProperty('kind');
        expect(diff[0].kind).toBe('E');
      });

    });


    describe('A target that has a date value', () => {
      var lhs = {
        key: new Date(555555555555)
      };

      it('shows the property is changed with a new date value', () => {
        var diff = deep.diff(lhs, {
          key: new Date(777777777777)
        });
        expect(diff).toBeTruthy();
        expect(diff.length).toBe(1);
        expect(diff[0]).toHaveProperty('kind');
        expect(diff[0].kind).toBe('E');
      });

    });


    describe('A target that has a NaN', () => {
      var lhs = {
        key: NaN
      };

      it('shows the property is changed when compared to another number', () => {
        var diff = deep.diff(lhs, {
          key: 0
        });
        expect(diff).toBeTruthy();
        expect(diff.length).toBe(1);
        expect(diff[0]).toHaveProperty('kind');
        expect(diff[0].kind).toBe('E');
      });

      it('shows no differences when compared to another NaN', () => {
        var diff = deep.diff(lhs, {
          key: NaN
        });
        expect(diff).toBeUndefined();
      });

    });


    describe('When filtering keys', () => {
      var lhs = {
        enhancement: 'Filter/Ignore Keys?',
        numero: 11,
        submittedBy: 'ericclemmons',
        supportedBy: ['ericclemmons'],
        status: 'open'
      };
      var rhs = {
        enhancement: 'Filter/Ignore Keys?',
        numero: 11,
        submittedBy: 'ericclemmons',
        supportedBy: [
          'ericclemmons',
          'TylerGarlick',
          'flitbit',
          'ergdev'
        ],
        status: 'closed',
        fixedBy: 'flitbit'
      };

      describe('if the filtered property is an array', () => {

        it('changes to the array do not appear as a difference', () => {
          var preFilter = function(path, key) {
            return key === 'supportedBy';
          };
          var diff = deep(lhs, rhs, preFilter);
          expect(diff).toBeTruthy();
          expect(diff.length).toBe(2);
          expect(diff[0]).toHaveProperty('kind');
          expect(diff[0].kind).toBe('E');
          expect(diff[1]).toHaveProperty('kind');
          expect(diff[1].kind).toBe('N');
        });
        it('changes to the array do not appear as a difference with prefilter as on object', () => {
          var preFilter = {
            prefilter: function(path, key) {
              return key === 'supportedBy';
            },
            normalize: function(currentPath, key, lhs, rhs) {
              if (key === 'supportedBy') {
                return;
              }
              return [lhs, rhs]
            }
          };
          var diff = deep(lhs, rhs, preFilter);
          expect(diff).toBeTruthy();
          expect(diff.length).toBe(2);
          expect(diff[0]).toHaveProperty('kind');
          expect(diff[0].kind).toBe('E');
          expect(diff[1]).toHaveProperty('kind');
          expect(diff[1].kind).toBe('N');
        });

      });

      describe('if the filtered property is not an array', () => {

        it('changes do not appear as a difference', () => {
          var prefilter = function(path, key) {
            return key === 'fixedBy';
          };
          var diff = deep(lhs, rhs, prefilter);
          expect(diff).toBeTruthy();
          expect(diff.length).toBe(4);
          expect(diff[0]).toHaveProperty('kind');
          expect(diff[0].kind).toBe('A');
          expect(diff[1]).toHaveProperty('kind');
          expect(diff[1].kind).toBe('A');
          expect(diff[2]).toHaveProperty('kind');
          expect(diff[2].kind).toBe('A');
          expect(diff[3]).toHaveProperty('kind');
          expect(diff[3].kind).toBe('E');
        });

      });
    });

    describe('A target that has nested values', () => {
      var nestedOne = {
        noChange: 'same',
        levelOne: {
          levelTwo: 'value'
        },
        arrayOne: [{
          objValue: 'value'
        }]
      };
      var nestedTwo = {
        noChange: 'same',
        levelOne: {
          levelTwo: 'another value'
        },
        arrayOne: [{
          objValue: 'new value'
        }, {
          objValue: 'more value'
        }]
      };

      it('shows no differences when compared to itself', () => {
        expect(deep.diff(nestedOne, nestedOne)).toBeUndefined();
      });

      it('shows the property as removed when compared to an empty object', () => {
        var diff = deep(nestedOne, empty);
        expect(diff).toBeTruthy();
        expect(diff.length).toBe(3);
        expect(diff[0]).toHaveProperty('kind');
        expect(diff[0].kind).toBe('D');
        expect(diff[1]).toHaveProperty('kind');
        expect(diff[1].kind).toBe('D');
      });

      it('shows the property is changed when compared to an object that has value', () => {
        var diff = deep.diff(nestedOne, nestedTwo);
        expect(diff).toBeTruthy();
        expect(diff.length).toBe(3);
        deep.applyChange(nestedOne, nestedTwo, diff);
      });

      it('shows the property as added when compared to an empty object on left', () => {
        var diff = deep.diff(empty, nestedOne);
        expect(diff).toBeTruthy();
        expect(diff.length).toBe(3);
        expect(diff[0]).toHaveProperty('kind');
        expect(diff[0].kind).toBe('N');
      });

      describe('when diff is applied to a different empty object', () => {
        var diff = deep.diff(nestedOne, nestedTwo);

        it('has result with nested values', () => {
          var result = {};

          deep.applyChange(result, nestedTwo, diff[0]);
          expect(result.levelOne).toBeTruthy();
          expect(result.levelOne).toBeInstanceOf(Object);
          expect(result.levelOne.levelTwo).toBeTruthy();
          expect(result.levelOne.levelTwo).toEqual('another value');
        });

        it('has result with array object values', () => {
          var result = {};

          deep.applyChange(result, nestedTwo, diff[2]);
          expect(result.arrayOne).toBeTruthy();
          expect(result.arrayOne).toBeInstanceOf(Array);
          expect(result.arrayOne[0]).toBeTruthy();
          expect(result.arrayOne[0].objValue).toBeTruthy();
          expect(result.arrayOne[0].objValue).toEqual('new value');
        });

        it('has result with added array objects', () => {
          var result = {};

          deep.applyChange(result, nestedTwo, diff[1]);
          expect(result.arrayOne).toBeTruthy();
          expect(result.arrayOne).toBeInstanceOf(Array);
          expect(result.arrayOne[1]).toBeTruthy();
          expect(result.arrayOne[1].objValue).toBeTruthy();
          expect(result.arrayOne[1].objValue).toEqual('more value');
        });
      });
    });

    describe('regression test for bug #10, ', () => {
      var lhs = {
        id: 'Release',
        phases: [{
          id: 'Phase1',
          tasks: [{
            id: 'Task1'
          }, {
            id: 'Task2'
          }]
        }, {
          id: 'Phase2',
          tasks: [{
            id: 'Task3'
          }]
        }]
      };
      var rhs = {
        id: 'Release',
        phases: [{
          // E: Phase1 -> Phase2
          id: 'Phase2',
          tasks: [{
            id: 'Task3'
          }]
        }, {
          id: 'Phase1',
          tasks: [{
            id: 'Task1'
          }, {
            id: 'Task2'
          }]
        }]
      };

      describe('differences in nested arrays are detected', () => {
        var diff = deep.diff(lhs, rhs);

        // there should be differences
        expect(diff).toBeTruthy();
        expect(diff.length).toBe(6);

          it('differences can be applied', () => {
            deep.applyDiff(lhs, rhs);
            expect(lhs).toEqual(rhs);
         });
      });

    });

    describe('regression test for bug #35', () => {
      var lhs = ['a', 'a', 'a'];
      var rhs = ['a'];

      it('can apply diffs between two top level arrays', () => {
        var differences = deep.diff(lhs, rhs);

        differences.forEach((it) => {
          deep.applyChange(lhs, true, it);
        });

        expect(lhs).toEqual(['a']);
      });
    });

    describe('Objects from different frames', () => {
      if (typeof globalConflict === 'undefined') { return; }

      // eslint-disable-next-line no-undef
      var frame = document.createElement('iframe');
      // eslint-disable-next-line no-undef
      document.body.appendChild(frame);

      var lhs = new frame.contentWindow.Date(2010, 1, 1);
      var rhs = new frame.contentWindow.Date(2010, 1, 1);

      it('can compare date instances from a different frame', () => {
        var differences = deep.diff(lhs, rhs);

        expect(differences).toBe(undefined);
      });
    });

    describe('Comparing regexes should work', () => {
      var lhs = /foo/;
      var rhs = /foo/i;

      it('can compare regex instances', () => {
        var diff = deep.diff(lhs, rhs);

        expect(diff.length).toBe(1);

        expect(diff[0].kind).toBe('E');
        expect(diff[0].path).toBeFalsy();
        expect(diff[0].lhs).toBe('/foo/');
        expect(diff[0].rhs).toBe('/foo/i');
      });
    });

    describe('subject.toString is not a function', () => {
      var lhs = {
        left: 'yes',
        right: 'no',
      };
      var rhs = {
        left: {
          toString: true,
        },
        right: 'no',
      };

      it('should not throw a TypeError', () => {
        var diff = deep.diff(lhs, rhs);

        expect(diff.length).toBe(1);
      });
    });

    describe('regression test for issue #83', () => {
      var lhs = {
        date: null
      };
      var rhs = {
        date: null
      };

      it('should not detect a difference', () => {
        expect(deep.diff(lhs, rhs)).toBe(undefined);
      });
    });

    describe('regression test for issue #70', () => {

      it('should detect a difference with undefined property on lhs', () => {
        var diff = deep.diff({ foo: undefined }, {});

        expect(diff).toBeInstanceOf(Array);
        expect(diff.length).toBe(1);

        expect(diff[0].kind).toBe('D');
        expect(diff[0].path).toBeInstanceOf(Array);
        expect(diff[0].path).toHaveLength(1);
        expect(diff[0].path[0]).toBe('foo');
        expect(diff[0].lhs).toBe(undefined);

      });

      it('should detect a difference with undefined property on rhs', () => {
        var diff = deep.diff({}, { foo: undefined });

        expect(diff).toBeInstanceOf(Array);
        expect(diff.length).toBe(1);

        expect(diff[0].kind).toBe('N');
        expect(diff[0].path).toBeInstanceOf(Array);
        expect(diff[0].path).toHaveLength(1);
        expect(diff[0].path[0]).toBe('foo');
        expect(diff[0].rhs).toBe(undefined);

      });
    });

    describe('regression test for issue #98', () => {
      var lhs = { foo: undefined };
      var rhs = { foo: undefined };

      it('should not detect a difference with two undefined property values', () => {
        var diff = deep.diff(lhs, rhs);

        expect(diff).toBe(undefined);

      });
    });

    describe('regression tests for issue #102', () => {
      it('should not throw a TypeError', () => {

        var diff = deep.diff(null, undefined);

        expect(diff).toBeInstanceOf(Array);
        expect(diff.length).toBe(1);

        expect(diff[0].kind).toBe('D');
        expect(diff[0].lhs).toBe(null);

      });

      it('should not throw a TypeError', () => {

        var diff = deep.diff(Object.create(null), { foo: undefined });

        expect(diff).toBeInstanceOf(Array);
        expect(diff.length).toBe(1);

        expect(diff[0].kind).toBe('N');
        expect(diff[0].rhs).toBe(undefined);
      });
    });

  });
