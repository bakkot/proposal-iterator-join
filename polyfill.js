'use strict';

// this polyfill is spec-accurate, but not something you should actually use

let join = {
  join(separator) {
    if (!this || typeof this !== 'object' && typeof this !== 'function') {
      throw new TypeError('expected receiver to be an object');
    }
    let sep;
    if (separator === undefined) {
      sep = ',';
    } else {
      try {
        sep = `${separator}`;
      } catch (e) {
        try {
          this.return();
        } catch { /* ignored */ }
        throw e;
      }
    }
    let next = this.next;
    let R = '';
    let first = true;
    while (true) {
      let { done, value } = next.call(this);
      if (done) {
        return R;
      }
      if (first) {
        first = false;
      } else {
        R = R + sep;
      }
      if (value !== undefined && value !== null) {
        let S;
        try {
          S = `${value}`;
        } catch (e) {
          try {
            this.return();
          } catch { /* ignored */ }
          throw e;
        }
        R = R + S;
      }
    }
  }
}.join;

Object.defineProperty(Iterator.prototype, 'join', {
  configurable: true,
  writable: true,
  enumerable: false,
  value: join,
});
