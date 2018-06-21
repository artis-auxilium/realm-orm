import deep from './diff';
export default (from, to) => {
  deep.observableDiff(to, from, (d) => {
    /* istanbul ignore if  */
    if (!d.path || d.kind === 'D') {
      return;
    }
    /* istanbul ignore else  */
    if (d.path.length) {
      deep.applyChange(to, from, d);
    }
  });
};
