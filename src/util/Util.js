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
  },

  isMac: /Mac/.test(navigator.platform),

  /**
   * 元素样式切换. 
   */
  toggleClass(el, className) {
    if (typeof el !== 'object') return;
    const isExist = el.classList.contains(className);
    if (isExist) {
      el.classList.remove(className);
    } else {
      el.classList.add(className);
    }
  },

  /**
   * 元素样式增加. 
   */
  addClass(el, className) {
    if (typeof el !== 'object') return;
    const isExist = el.classList.contains(className);
    if (!isExist) {
      el.classList.add(className);
    }
  },
  /**
   * 元素样式删除. 
   */
  removeClass(el, className) {
    if (typeof el !== 'object') return;
    const isExist = el.classList.contains(className);
    if (isExist) {
      el.classList.remove(className);
    }
  },

  /**
   * 对象转为数组.
   * 
   * @param {Object} obj 需要转换的对象. 
   */
  obj2Arr(obj) {
    if (typeof obj !== 'object') return;
    if (Array.isArray(obj)) return;

    const arr = [];
    const keyArr = Object.getOwnPropertyNames(obj);
    if (keyArr.length > 0) {
      let value;
      keyArr.forEach(item => {
        value = obj[item];
        arr.push(value);
      });
    }
    return arr;
  },

  /**
   * 判断是否为函数. 
   */
  isFunction(fn) {
    let result = false;
    if (typeof fn === 'function') {
      result = true;
    }
    return result;
  }
}

export default Util;