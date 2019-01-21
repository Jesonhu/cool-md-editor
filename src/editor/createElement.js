const domRender = {
  init(options) {
    const el = options.el;
    return new Promise((resolve, reject) => {
      this.renderTools(el)
      .then(() => {
        this.renderCode(el);
      })
      .then(() => {
        this.renderPriview(el);
      })
      .then(() => {
        this.renderStatus(el);
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
  renderTools(parent) {
    const slef = this;
    const toolsHandleHtmlStr = this.createToolsHandle();
    return new Promise((resolve, reject) => {

      parent.innerHTML += `
        <div class="editor-tools">${toolsHandleHtmlStr}</div>
      `;
      resolve();
    });
  },
  /**
   * 创建工具条 `编辑图标`. 
   */
  createToolsMain() {

  },
  /**
   * 创建工具条 `视图操作图标`. 
   */
  createToolsHandle(icons) {
    const _icons = [
      {
        name: 'edit',
        className: 'icon-pen',
        title: 'Toggle Edit',
        default: true
      },
      {
        name: 'compare',
        className: 'icon-columns',
        title: 'Toggle Compare',
        default: true
      },
      {
        name: 'preview',
        className: 'icon-eye',
        title: 'Toggle Preview',
        default: true
      },
      {
        name: 'fullscreen',
        className: 'icon-full-screen',
        title: 'Toggle Fullscreen',
        default: true
      }
    ];
    let htmlStr = '<div class="editor-tools-handle">';
    const self = this;

    // 循环生成 icons
    _icons.forEach((item, index) => {
      htmlStr += self.createToolsItem(item);
    });

    htmlStr += '</div>';

    return htmlStr;
  },
  createToolsItem(config) {
    return `<span class="${config.className}" title="${config.title}"></span>`;
  },
  renderCode(parent) {
    return new Promise((resolve, reject) => {
      parent.innerHTML += `
        <div class="editor-md">
        <form>
          <textArea id="area"></textArea>
        </form>
      </div>
      `;
      resolve();
    })
    
  },
  renderPriview(parent) {
    return new Promise((resolve, reject) => {
      parent.innerHTML += `
      <div class="editor-preview">
        <div class="preview-bd">
        </div>
      </div>
      `;
      resolve();
    });
  },
  renderStatus(parent) {
    return new Promise((resolve, reject) => {
      parent.innerHTML += `
      <div class="editor-status"></div>
      `;
      resolve();
    })
  }
}

export default domRender;