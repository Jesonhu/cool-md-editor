
import domRender from './editor/createElement';
import CONFIG from './editor/config';

// 工具图标功能
import './style/index.scss';
// import {
//   toolbarBuiltInButtons,
//   insertTexts,
//   promptTexts,
//   blockStyles,
//   shortcuts,
//   bindings,
//   fixShortcut,
//   toggleFullScreen
// } from './editor/toolbar-event';
import $tools from './editor/toolbar-event';

// 功能函数
import {
  extend
} from './util/Util';

/** 工具集合对象.  */
import UTIL from './util/Util';

// codemirror =========================
import Codemirror from 'codemirror';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/javascript/javascript';

import 'codemirror/addon/mode/overlay';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/continuelist';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/selection/mark-selection';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/markdown-fold';


import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/base16-light.css'
import 'codemirror/addon/fold/foldgutter.css';
// codemirror =========================

// marked =========================
import marked from 'marked';
// marked =========================

// highlight.js =========================
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
// highlight.js =========================

// @see [config-see])[https://github.com/hackmdio/codimd/blob/master/public/js/lib/editor/index.js]

const codemirror = {
  /** Codemirror 设置. */
  config: {
    mode: {
      name: 'gfm',
      tokenTypeOverrides: {
        emoji: 'emoji'
      }
    },
    /** 显示行号 */
    lineNumbers: true,
    // 自动验证错误
    matchBrackets: true,
    // 缩进
    indentUnit: 4,
    // 是否换行
    lineWrapping: false,
    // 点击高亮正行
    styleActiveLine: true,
    // 配色(主题)
    theme: 'base16-dark',
    // 自动补全括号
    autoCloseBrackets: true,
    // 自动闭合标签
    autoCloseTags: true,
    // 展开折叠
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'authorship-gutters', 'CodeMirror-foldgutter'],
    placeholder: "← Start by entering a title here\n===\nVisit /features if you don't know what to do.\nHappy hacking :)"
  }
}


class CoolMDEditor {
  constructor(options = {}) {

    options.editor = this;

    this.init(options);

    // Auto render
    // this.render();
  }

  /**
   * 初始化. 
   */
  init(options) {
    this.initData(options)
      .then(() => {
        this.initView(options);
      });
  }
  // 设置 config
  set options(option) {
    // 同值对象值覆盖
  }
  get options() {
    return this._options;
  }
  /**
   * 初始化编辑器数据. 
   */
  // initData(options) {
  //   // Find the element attr
  //   if (options.element) {
  //     this.element = options.element;
  //     this.textAreaElement = options.element.getElementsByTagName('textarea')[0];
  //   } else if (options.element === null) {
  //     console.log('MDEditor: Error. No element was found.');
  //     return;
  //   }

  //   // Handle toolbar
  //   if (options.toolbar === undefined) {
  //     options.toolbar = [];

  //     // Loop over the built in buttons, to get the preferred order
  //     for (let key in toolbarBuiltInButtons) {
  //       if (toolbarBuiltInButtons.hasOwnProperty(key)) {

  //         // 分隔符功能
  //         if (key.indexOf('separator-') != -1) {
  //           options.toolbar.push('|')
  //         }

  //         // 
  //         if (toolbarBuiltInButtons[key].default === true || 
  //            (options.showIcons && 
  //             options.showIcons.construtor === Array && 
  //             options.showIcons.indexOf(key) != -1)) {
  //           options.toolbar.push(key);    
  //         }
  //       }
  //     }
  //   }

  //   // Handle status bar
  //   if (!options.hasOwnProperty('status')) {
  //     options.status = ['autosave', 'lines', 'words', 'cursor'];
  //   }

  //   // Add default preview rendering function
  //   if (!options.previewRender) {
  //     options.previewRender = function(plainText) {
  //       return this.editor.markdown(plainText);
  //     }
  //   }

  //   // Set default options for parsing config
  //   options.parsingConfig = extend(
  //     { highlightFormatting: true },
  //     options.parsingConfig || {}
  //   );

  //   // Merging the insertTexts, with the given options
  //   options.insertTexts = extend({}, insertTexts, options.insertTexts || {});

  //   // Merging the promptTexts, with the given options.
  //   options.promptTexts = promptTexts;

  //   // Merging the blockStyles, with the given options.
  //   options.blockStyles = extend({}, blockStyles, options.blockStyles || {});

  //   // Mergint the shortcuts, with the given options.
  //   // 快捷键配置设置
  //   options.shortcuts = extend({}, shortcuts, options.shortcuts || {});

  //   // Update this options
  //   this.options = options;

  //   // The codemirror commponent is only avaliable after rendered.
  //   // so setter for the initialValue can only run after
  //   // the element has ben renered
  //   if (options.initialValue && (!this.options.autosave || this.options.autosave.foundSaveValue !== true)) {
  //     this.value(options.initialValue);
  //   }
  // }
  initData(options) {
    return new Promise((resolve, reject) => {
      this.initOption(options);
      this.initEditorStatus();
      resolve();
    }); 
  }
  /**
   * 初始编辑器化视图显示. 
   */
  initView(options) {
    const self = this;
    this.createIconLink();
    this.createElement(options)
      .then(() => {
        self.initEvent();
        self.initCodeMirrorData();
        self.initMarkdownData();
      });
  }

  /**
   * 初始化`编辑器`事件处理. 
   */
  initEvent() {
    this.initStatusEvent();
  }
  initOption(options) {
    this._options = options;
    this._options.$tools = $tools;
    this._options.lang= CONFIG.editor.language;
  }
  // 创建编辑器元素 start ====================================
  /**
   * 编辑器 `图标css链接` 元素创建.
   */
  createIconLink() {
    const isCreatedIconLink = this.isCreatedIconLink();
    if (isCreatedIconLink) return;

    // @see http://www.runoob.com/jsref/met-document-createelement.html
    const olink = document.createElement('link');
    olink.setAttribute('data-editor', true);
    olink.rel = "stylesheet";
    olink.href = CONFIG.iconLink;
    document.getElementsByTagName("head")[0].appendChild(olink);
  }
  /**
   * 检测是否已经创建了编辑器图标样式链接. 
   */
  isCreatedIconLink() {
    const oLink = document.querySelector("link[data-editor]");
    const result = oLink ? true : false;
    return result;
  }
  /**
   * 创建编辑器 `显示容器`. 
   */
  createElement(options) {
    return new Promise((resolve, reject) => {
      domRender.init(options).then(() => {
        resolve();
      });
    });
  }
  // 创建编辑器元素 end ====================================

  // 编辑器 `CodeMirror` 相关 start ====================================
  /**
   * 创建 Codemirror 容器. 
   */
  createCodeMirrorElement(el, config) {
    return Codemirror.fromTextArea(el, config);
  }
  initCodeMirrorData() {
    const options = this._options;
    let mode;
    let backdrop;
    let textAreaElement = this._options.el.querySelector('#area');
    
    // if (options.spellCheckder !== false) {
    //   mode = 'spell-checker';
    //   backdrop = options.parsingConfig;
    //   backdrop.name = 'gfm';
    //   backdrop.gitHubSpice = false;
    // } else {
    //   mode = options.parsingConfig;
    //   mode.name = 'gfm';
    //   mode.gitHubSpice = false;
    // }

    // CodeMirror 自定义设置
    const cmDiyConfig = {
      mode: {
        name: "gfm",
        tokenTypeOverrides: {
          emoji: "emoji"
        }
      },
      /** 显示行号 */
      lineNumbers: true,
      // 自动验证错误
      matchBrackets: true,
      // 缩进
      indentUnit: 4,
      // 是否换行
      lineWrapping: true,
      // 点击高亮正行
      styleActiveLine: true,
      // 配色(主题)
      theme: "base16-dark",
      // 自动补全括号
      autoCloseBrackets: true,
      // 自动闭合标签
      autoCloseTags: true,
      // 展开折叠
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    }

    // 编辑器默认设置
    // 实例化编辑器时默认的传参
    // const editorDefaultConfig = {
    //   mode: mode,
    //   backdrop: backdrop,
    //   theme: "paper",
    //   tabSize: (options.tabSize != undefined) ? options.tabSize : 2,
    //   indentUnit: (options.tabSize != undefined) ? options.tabSize : 2,
    //   indentWithTabs: (options.indentWithTabs === false) ? false : true,
    //   lineNumbers: false,
    //   autofocus: (options.autofocus === true) ? true : false,
    //   extraKeys: keyMaps,
    //   lineWrapping: (options.lineWrapping === false) ? false : true,
    //   allowDropFileTypes: ["text/plain"],
    //   placeholder: options.placeholder || textAreaElement.getAttribute("placeholder") || "",
    //   styleSelectedText: (options.styleSelectedText != undefined) ? options.styleSelectedText : true
    // }

    // 参数混合
    // Object.assign({}, cmDiyConfig);
    // this.$codemirror = Codemirror.fromTextArea(textAreaElement, cmDiyConfig);
    this.$codemirror = this.createCodeMirrorElement(textAreaElement, cmDiyConfig);
    
    // 没有使用箭头函数，通过这种方式获取 `编辑器对象`
    this.$codemirror.$editor = this;

    this.initCodeMirrorEvent();
  }
  initCodeMirrorEvent() {
    this.add_CM_change_eventHandle();
    this.add_CM_cursorActivity_eventHandle();
  }
  /**
   * `CodeMirror` 内容变化事件监听.
   */
  add_CM_change_eventHandle() {
    this.$codemirror.on('changes', this.onCodeMirrorChange);
  }
  onCodeMirrorChange(cm) {
    // 编辑器实例.
    const editor = cm.$editor;
    editor.commonCodeMirrorEventHandle(cm);
  }
  /**
   * `CodeMirror` 光标移动事件监听.
   */
  add_CM_cursorActivity_eventHandle() {
    this.$codemirror.on('cursorActivity', this.onCodeMirrorCursorActivity);
  }
  onCodeMirrorCursorActivity(cm) {
    // 编辑器实例.
    const editor = cm.$editor;
    editor.commonCodeMirrorEventHandle(cm);
  }
  /**
   * `CodeMirror` 事件回调中都需要处理的内容. 
   * 
   * @param {CodeMirror} cm CodeMirror 对象.
   */
  commonCodeMirrorEventHandle(cm) {
    const content = cm.getValue();
    const editor = cm.$editor;
    editor.setMDValue(content);
    editor.updateStatusBar(editor);
  }
  // 编辑器 `CodeMirror` 相关 end ====================================

  // 编辑器 `markdown` 相关 start ====================================
  initMarkdownData(text) {
    if (marked) {
      const markedOptions = {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function(code) {
          return hljs.highlightAuto(code).value;
        }
      }
      this.$marked = marked;
      // Set options
      this.$marked.setOptions(markedOptions);
    }
  }
  initMarkdownEvent() {
  }
  /** 
   * 获取 `CodeMirror` 的值.
   */
  getMDValue() {

  }
  /**
   * 设置 `CodeMirror` 的值. 
   */
  setMDValue(mdValue) {
    const htmlStr = this.$marked(mdValue);
    const htmlElement = this._options.el.querySelector('.editor-preview').querySelector('.preview-bd');
    htmlElement.innerHTML = htmlStr;
  }
  // 编辑器 `markdown` 相关 end ====================================

  // 编辑器 `preview` 容器相关 start ====================================
  // 编辑器 `preview` 容器相关 end ====================================

  // 编辑器 `status` 容器相关 end ====================================
  updateStatusBar() {
    const cm = this.$codemirror;

    const conLen = cm.getValue().length;
    this.renderEditorContentPosition();
    this.renderEditContentLength(conLen);
  }
  /**
   * 显示输入内容总长度.
   * 
   * @param {Number|String} len 长度
   */
  renderEditContentLength(len) {
    const editorEl = this._options.el;
    const lenElement = editorEl.querySelector('.editor-status').querySelector('.editor-status-length');
    const language = this._options.lang;
    const { length } = language.statusBar;

    lenElement.innerHTML = `${length} ${len}`;
  }
  /**
   * 显示当前光标所在的 `行数`、`列数`. `总列数`、`总长度`.
   */
  renderEditorContentPosition() {
    const cm = this.$codemirror;
    // @see [codemirror-api](https://codemirror.net/doc/manual.html#api)
    // @see [获取光标所在的位置]https://github.com/hackmdio/codimd/blob/db69983a622693962a0fd42b2f091b3f3b6f6906/public/js/lib/editor/index.js
    const lineCount = cm.lineCount();
    const cmCursor = cm.getCursor();
    const currCol = cmCursor.ch + 1;
    const currLine = cmCursor.line + 1;
    const language = this._options.lang;
    const { line, columns } = language.statusBar;

    const editorEl = this._options.el;
    const statusBarEl = editorEl.querySelector('.editor-status').querySelector('.editor-status-positon').querySelector('span');
    statusBarEl.innerHTML = `${line} ${currLine},${columns} ${currCol} 一 ${lineCount} ${line}`;
  }
  // 编辑器 `status` 容器相关 end ====================================

  // 编辑器初始状态设置 start ====================================
  initEditorStatus(options) {
    // 主题设置.
    this.$status = {};
    this.$status['isThemeLight'] = true;
    this.$status['isFullscreen'] = false;
  }
  // 编辑器初始状态设置 end ====================================

  // 编辑器事件处理 start ====================================
  /**
   * 状态条，换皮肤. 
   */
  initStatusEvent() {
    this.initEventToggleTheme();
  }
  /**
   * 换肤功能添加. 
   */
  initEventToggleTheme(options, className = '.icon-theme') {
    const self = this;
    const oThemeEl = this._options.el.querySelector('.editor-status').querySelector(className);
    const el = this._options.el;
    const { addClass, removeClass } = UTIL;

    if (oThemeEl) {
      let isThemeLight;
      oThemeEl.addEventListener('click', () => {
        isThemeLight = self.$status['isThemeLight'];
        // 当前 `圣光样式` ==> 切换到 `暗黑样式`
        if (isThemeLight) {
          addClass(el, 'editor-theme-dark');
          removeClass(el, 'editor-theme-light');
        } else {
          addClass(el, 'editor-theme-light');
          removeClass(el, 'editor-theme-dark');
        }
        self.$status['isThemeLight'] = !self.$status['isThemeLight'];
      });
    }
  }
  initEventToggleFullscreen(options) {
  }
  // 编辑器事件处理 end ====================================

  /**
   * Render editor to the given element.
   * @param {Element} el 
   */
  render(el) {
    if (!el) {
      el = this.textAreaElement || this.element.getElementsByTagName('textarea')[0];
    }

    const options = this.options;
    const editor = this;
    const keyMaps = {};

    for (let key in options.shortcuts) {
      if (options.shortcuts[key] !== null && bindings[key] !== null) {
        (function(key) {
          keyMaps[fixShortcut(options.shortcuts[key])] = () => {
            bindings[key](editor);
          }
        })(key);
      }
    }

    // 增加操作快捷键
    keyMaps['Enter'] = 'newlineAndIndentContinueMarkdownList';
    keyMaps['Tab'] = 'tabAndIndentMarkdownList';
    keyMaps['Esc'] = (cm) => {
      if (cm.getOptions('fullScreen')) toggleFullScreen(editor);
    }

    document.addEventListener('keydown', (e) => {
      e = e || window.event;

      if (e.keyCode == 27) {
        if (editor.codemirror.getOptions('fullScreen')) toggleFullScreen(editor);
      }
    }, false);

  }

  /** 
   * Get or set the text content.
   */
  value(value) {
    if (value === undefined) {
      return this.codemirror.getValue();
    } else {
      this.codemirror.getDoc().setValue(value);
      return this;
    }
  }
}

export default CoolMDEditor;

// 使用
const coolMDEditor = new CoolMDEditor({
  el: document.getElementById('editor-wrap')
});

console.log('编辑器', coolMDEditor);


