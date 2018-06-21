// from https://github.com/flitbit/diff

var validKinds = ['N', 'E', 'A', 'D'];

class Diff {
  constructor(kind, path) {
    this.kind = kind;
    if (path && path.length) {
      this.path = path
    }
  }
}

class DiffEdit extends Diff {
  constructor(path, origin, value) {
    super('E', path);
    this.lhs = origin;
    this.rhs = value;
  }
}

class DiffNew extends Diff {
  constructor(path, value) {
    super('N', path);
    this.rhs = value;
  }
}
class DiffDeleted extends Diff {
  constructor(path, value) {
    super('D', path);
    this.lhs = value;
  }
}

class DiffArray extends Diff {
  constructor(path, index, item) {
    super('A', path);
    this.index = index;
    this.item = item
  }
}

function arrayRemove(arr, from, to) {
  var rest = arr.slice((to || from) + 1 || arr.length);
  arr.length = from < 0 ? arr.length + from : from;
  arr.push.apply(arr, rest);
  return arr;
}

function realTypeOf(subject) {
  var type = typeof subject;
  if (type !== 'object') {
    return type;
  }

  if (subject === Math) {
    return 'math';
  } else if (subject === null) {
    return 'null';
  } else if (Array.isArray(subject)) {
    return 'array';
  } else if (Object.prototype.toString.call(subject) === '[object Date]') {
    return 'date';
  } else if (typeof subject.toString === 'function' && /^\/.*\//.test(subject.toString())) {
    return 'regexp';
  }
  return 'object';
}

function deepDiff(lhs, rhs, changes, prefilter, path, key, stack) {
  changes = changes || [];
  path = path || [];
  stack = stack || [];
  var currentPath = path.slice(0);
  if (typeof key !== 'undefined' && key !== null) {
    if (prefilter) {
      if (typeof(prefilter) === 'function' && prefilter(currentPath, key)) {
        return;
      } else if (typeof(prefilter) === 'object') {
        if (prefilter.prefilter && prefilter.prefilter(currentPath, key)) {
          return;
        }
        if (prefilter.normalize) {
          var alt = prefilter.normalize(currentPath, key, lhs, rhs);
          if (alt) {
            lhs = alt[0];
            rhs = alt[1];
          }
        }
      }
    }
    currentPath.push(key);
  }

  // Use string comparison for regexes
  if (realTypeOf(lhs) === 'regexp' && realTypeOf(rhs) === 'regexp') {
    lhs = lhs.toString();
    rhs = rhs.toString();
  }

  var ltype = typeof lhs;
  var rtype = typeof rhs;
  var i, j, k, other;

  var ldefined = ltype !== 'undefined' ||
    (stack && (stack.length > 0) && stack[stack.length - 1].lhs &&
      Object.getOwnPropertyDescriptor(stack[stack.length - 1].lhs, key));
  var rdefined = rtype !== 'undefined' ||
    (stack && (stack.length > 0) && stack[stack.length - 1].rhs &&
      Object.getOwnPropertyDescriptor(stack[stack.length - 1].rhs, key));

  if (!ldefined && rdefined) {
    changes.push(new DiffNew(currentPath, rhs));
  } else if (!rdefined && ldefined) {
    changes.push(new DiffDeleted(currentPath, lhs));
  } else if (realTypeOf(lhs) !== realTypeOf(rhs)) {
    changes.push(new DiffEdit(currentPath, lhs, rhs));
  } else if (realTypeOf(lhs) === 'date' && (lhs - rhs) !== 0) {
    changes.push(new DiffEdit(currentPath, lhs, rhs));
  } else if (ltype === 'object' && lhs !== null && rhs !== null) {
    for (i = stack.length - 1; i > -1; --i) {
      if (stack[i].lhs === lhs) {
        other = true;
        break;
      }
    }
    if (!other) {
      stack.push({ lhs: lhs, rhs: rhs });
      if (Array.isArray(lhs)) {
        // If order doesn't matter, we need to sort our arrays
        i = rhs.length - 1;
        j = lhs.length - 1;
        while (i > j) {
          changes.push(new DiffArray(currentPath, i, new DiffNew(undefined, rhs[i--])));
        }
        while (j > i) {
          changes.push(new DiffArray(currentPath, j, new DiffDeleted(undefined, lhs[j--])));
        }
        for (; i >= 0; --i) {
          deepDiff(lhs[i], rhs[i], changes, prefilter, currentPath, i, stack);
        }
      } else {
        var akeys = Object.keys(lhs);
        var pkeys = Object.keys(rhs);
        for (i = 0; i < akeys.length; ++i) {
          k = akeys[i];
          other = pkeys.indexOf(k);
          if (other >= 0) {
            deepDiff(lhs[k], rhs[k], changes, prefilter, currentPath, k, stack);
            pkeys[other] = null;
          } else {
            deepDiff(lhs[k], undefined, changes, prefilter, currentPath, k, stack);
          }
        }
        for (i = 0; i < pkeys.length; ++i) {
          k = pkeys[i];
          if (k) {
            deepDiff(undefined, rhs[k], changes, prefilter, currentPath, k, stack);
          }
        }
      }
      stack.length = stack.length - 1;
    } else if (lhs !== rhs) {
      // lhs is contains a cycle at this element and it differs from rhs
      changes.push(new DiffEdit(currentPath, lhs, rhs));
    }
  } else if (lhs !== rhs) {
    if (!(ltype === 'number' && isNaN(lhs) && isNaN(rhs))) {
      changes.push(new DiffEdit(currentPath, lhs, rhs));
    }
  }
}

function observableDiff(lhs, rhs, observer, prefilter) {
  var changes = [];
  deepDiff(lhs, rhs, changes, prefilter);
  if (observer) {
    for (var i = 0; i < changes.length; ++i) {
      observer(changes[i]);
    }
  }
  return changes;
}

function accumulateDiff(lhs, rhs, prefilter, accum) {
  var observer = (accum) ?
    function(difference) {
      if (difference) {
        accum.push(difference);
      }
    } : undefined;
  var changes = observableDiff(lhs, rhs, observer, prefilter);
  return (accum) ? accum : (changes.length) ? changes : undefined;
}

function applyArrayChange(arr, index, change) {
  if (change.path && change.path.length) {
    var it = arr[index],
      i, u = change.path.length - 1;
    for (i = 0; i < u; i++) {
      it = it[change.path[i]];
    }
    switch (change.kind) {
      case 'A':
        applyArrayChange(it[change.path[i]], change.index, change.item);
        break;
      case 'D':
        delete it[change.path[i]];
        break;
      case 'E':
      case 'N':
        it[change.path[i]] = change.rhs;
        break;
    }
  } else {
    switch (change.kind) {
      case 'A':
        applyArrayChange(arr[index], change.index, change.item);
        break;
      case 'D':
        arr = arrayRemove(arr, index);
        break;
      case 'E':
      case 'N':
        arr[index] = change.rhs;
        break;
    }
  }
  return arr;
}

function applyChange(target, source, change) {
  if (typeof change === 'undefined' && source && ~validKinds.indexOf(source.kind)) {
    change = source;
  }
  if (target && change && change.kind) {
    var it = target,
      i = -1,
      last = change.path ? change.path.length - 1 : 0;
    while (++i < last) {
      if (typeof it[change.path[i]] === 'undefined') {
        it[change.path[i]] = (typeof change.path[i + 1] !== 'undefined' && typeof change.path[i + 1] === 'number') ? [] : {};
      }
      it = it[change.path[i]];
    }
    switch (change.kind) {
      case 'A':
        if (change.path && typeof it[change.path[i]] === 'undefined') {
          it[change.path[i]] = [];
        }
        applyArrayChange(change.path ? it[change.path[i]] : it, change.index, change.item);
        break;
      case 'D':
        delete it[change.path[i]];
        break;
      case 'E':
      case 'N':
        it[change.path[i]] = change.rhs;
        break;
    }
  }
}

function applyDiff(target, source, filter) {
  if (target && source) {
    var onChange = function(change) {
      if (!filter || filter(target, source, change)) {
        applyChange(target, source, change);
      }
    };
    observableDiff(target, source, onChange);
  }
}

Object.defineProperties(accumulateDiff, {

  diff: {
    value: accumulateDiff,
    enumerable: true
  },
  observableDiff: {
    value: observableDiff,
    enumerable: true
  },
  applyDiff: {
    value: applyDiff,
    enumerable: true
  },
  applyChange: {
    value: applyChange,
    enumerable: true
  }
});

export default accumulateDiff;
