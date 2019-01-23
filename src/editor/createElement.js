const domRender = {
  init(options) {
    this.initData(options);
    return new Promise((resolve, reject) => {
      this.renderTools(options)
      .then(() => {
        this.renderCode(options);
      })
      .then(() => {
        this.renderPriview(options);
      })
      .then(() => {
        this.renderStatus(options);
      })
      .then(() => {
        resolve();
      })
      .catch(error => error);
    });

    // better way but must think browser support
    // await this.renderTools(parent);
    // await this.renderCode(parent);
    // await this.renderPriview(parent);
    // await this.renderStatus(parent);
  },
  initData(options) {
    this.lang = options.lang;
  },
  // 创建 Edit Tools start =========================
  renderTools(options) {
    const el = options.el;
    const { toolbarBuiltInButtons } = options.$tools;
    const toolsMainHtmlStr = this.createToolsMain(toolbarBuiltInButtons);
    const toolsHandleHtmlStr = this.createToolsHandle(toolbarBuiltInButtons);
    return new Promise((resolve, reject) => {
      el.innerHTML += `
        <div class="editor-tools">${toolsMainHtmlStr}${toolsHandleHtmlStr}</div>
      `;
      resolve();
    });
  },
  /**
   * 创建工具条 `编辑工具图标`. 
   */
  createToolsMain(icons) {
    const self = this;
    const toolsEdit = this.getToolsEdit(icons);
    console.log('toolsEdit', toolsEdit);
    let htmlStr = '<div class="editor-tools-main">';

    // 循环创建图标
    if (toolsEdit.length > 0) {
      /* 是否是3的倍数 */
      let isThree;

      const toolsEditLen = toolsEdit.length;
      toolsEdit.forEach((item, index) => {
        isThree = index > 0 && ((index + 1) % 3 === 0);
        if (isThree) {
          if (index !== (toolsEditLen - 1)) {
            htmlStr = htmlStr + self.createToolsItem(item) + '<span class="editor-tools-division">|</span>';
          } else {
            htmlStr += self.createToolsItem(item);
          }
        } else {
          htmlStr += self.createToolsItem(item);
        }
      });
    }
    

    htmlStr += '</div>';

    return htmlStr;
  },
  /**
   * 获取 `工具条：编辑图标`. 
   * 
   * @desc 工具条图标按照编辑功能分为：`编辑图标`、`视图图标` 通过 `isEditTools`是否为 `true` 标记
   */
  getToolsEdit(iconsOption) {
    if (typeof iconsOption !== 'object') return;

    const resultObj = {};
    let _options = JSON.parse(JSON.stringify(iconsOption));
    for (let key in _options) {
      if (_options[key]['isEditTools']) {
        resultObj[key] = _options[key];
      }
    }
    const sortEditToolsArr = this.sortToolsIcon(resultObj, 'index');

    return sortEditToolsArr;
  },
  /**
   * 创建工具条 `视图操作图标`. 
   */
  createToolsHandle(icons) {
    const _icons = this.getToolsHandle(icons);
    let htmlStr = '<div class="editor-tools-handle">';
    const self = this;

    // 循环生成 icons
    _icons.forEach((item, index) => {
      htmlStr += self.createToolsItem(item);
    });

    htmlStr += '</div>';

    return htmlStr;
  },
  /**
   * 获取 `工具条：视图图标`. 
   * 
   * @desc 工具条图标按照编辑功能分为：`编辑图标`、`视图图标` 通过 `isEditTools`是否为 `true` 标记
   */
  getToolsHandle(iconsOption) {
    if (typeof iconsOption !== 'object') return;

    const resultObj = {};
    let _options = JSON.parse(JSON.stringify(iconsOption));
    for (let key in _options) {
      if (!(_options[key]['isEditTools'])) {
        resultObj[key] = _options[key];
      }
    }
    const sortEditToolsArr = this.sortToolsIcon(resultObj, 'index');

    return sortEditToolsArr;
  },
  /**
   * 图标排序. 
   * 
   * @param {Object} obj 需要排序的对象.
   * @param {string} attr 排序参照属性.
   */
  sortToolsIcon(obj, attr) {
    if (typeof obj !== 'object') return;

    let arr = [];
    let sortArr = [];
    for (let key in obj) {
      arr.push(obj[key])
    }

    sortArr = arr.sort((obj1, obj2) => {
      return obj1['index'] - obj2['index'];
    });

    return sortArr;
  },
  createToolsItem(config) {
    return `<span class="${config.className}" title="${config.title}"></span>`;
  },
  // 创建 Edit Tools end =========================

  // 创建 Edit 编辑容器 start =========================
  renderCode(options) {
    const el = options.el;
    return new Promise((resolve, reject) => {
      el.innerHTML += `
        <div class="editor-md">
        <form>
          <textArea id="area"></textArea>
        </form>
      </div>
      `;
      resolve();
    })
    
  },
  // 创建 Edit 编辑容器 end =========================

  // 创建 Edit 预览(html)容器 start =========================
  renderPriview(options) {
    const el = options.el;
    return new Promise((resolve, reject) => {
      el.innerHTML += `
      <div class="editor-preview">
        <div class="preview-bd">
        </div>
      </div>
      `;
      resolve();
    });
  },
  // 创建 Edit 预览(html)容器 end =========================

  // 创建 Edit Status start =========================
  renderStatus(options) {
    const el = options.el;

    const positonHtmlStr = this.createStatusPosition(options);
    const lengthHtmlStr = this.createStatusLens();
    return new Promise((resolve, reject) => {
      el.innerHTML += `
      <div class="editor-status">${positonHtmlStr}${lengthHtmlStr}</div>`;
      resolve();
    })
  },
  createStatusPosition(options) {
    const toggleThemeHtmlStr = this.createStatusToggleTheme();
    const language = this.lang;
    const { line,  columns } = language.statusBar;
    let htmlStr = `<div class="editor-status-positon"><span>${line} ,${columns}  一  ${line}</span>${toggleThemeHtmlStr}</div>`;

    return htmlStr;
  },
  createStatusToggleTheme() {
    let htmlStr = '<span class="icon-theme"></span>';

    return htmlStr;
  },
  createStatusLens() {
    const language = this.lang;
    const { length } = language.statusBar;
    let htmlStr = `<div class="editor-status-length">${length}</div>`;

    return htmlStr;
  }
  // 创建 Edit Status end =========================
}

export default domRender;