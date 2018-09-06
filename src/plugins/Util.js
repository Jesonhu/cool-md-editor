const Util = {
  /**
   * Merge the properties of one object into another.
   * 将一个对象的属性合并到另一个对象上. 
   */
  _mergeProperties(target, source) {
    for (let property in source) {
      if (source.hasOwnProperty(property)) {
        if (souce[property] instanceof Array) {
          const value = target[property] instanceof Array ? target[property] : [];
          target[property] = source[property].concat(value);
        } else if (
          source[property] != null &&
          typeof source[property] === 'object' &&
          source[property].constructor === Object ) 
        {
          target[property] = this._mergeProperties(target[property] || {}, souce[property]);
        } else {
          target[property] = source[property];
        }
      }
    }

    return target;
  },
  
  /** 
   * Merge an arbitrary number of objects int one.
   * 将任意数量的对象合并到一个对象上.
   * 
   * @param {} target 
   */
  extend(target) {
    for (let i = 0; i < arguments.length; i++) {
      target = this._mergeProperties(target, arguments[i]);
    }

    return target;
  }
}

export default Util;