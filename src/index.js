// 封装
import domRender from './editor/createElement';
import CONFIG from './editor/config';
import codemirorTools from './editor/codemirror';
const { getState } = codemirorTools;

import { debounce } from 'lodash-es';
const INPUT_EVENT_DEBOUNCE_WAIT = 300;

// 工具图标功能
import './style/index.less';

import $tools from './editor/toolbarHandle';

/** 工具集合对象.  */
import UTIL from './util/Util';

// ==================== 编辑器语言 ====================
import langEn from './editor/lang/en';
import langZh from './editor/lang/zh';

const langMap = {
  'en': langEn,
  'zh': langZh
}

// ==================== codemirror ====================
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

// ==================== marked ====================
import marked from 'marked';

// ==================== highlight.js ====================
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

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

// ==================== 七牛上传 ====================
import QiniuUplaod from './editor/qiniu-sdk-upload';
let qiniuUpload = null;


class CMdEditor {

  constructor(options = {}) {
    options.editor = this;
    this.init(options);
  }

  /**
   * 初始化. 
   */
  init(options) {
    this.initData(options)
      .then(() => {
        this.initView(this._options);
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
      this.initQiniu(this._options.qiniu);
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
        self.initDefaultContent();
        self.lifecycleMounted();
      });
  }

  /**
   * 初始化`编辑器`事件处理. 
   */
  initEvent() {
    this.initStatusEvent();
    this.initToolsEvent();
  }

  initOption(options) {
    // Todo: 参数拷贝和覆盖功能需要优化.
    const defaultOptions = {
      // ========== 快捷键 ==========
      shortcuts: {
        isOpen: true,
      },
      // ========== 语言 ==========
      lang: 'zh',
      // ========== 七牛 ==========
      qiniu: {
        tokenApiUrl: 'http://127.0.0.1:3001/api/qiniu/test/get_token',
        region: 'z1',
        config: {},
        putExtra: {}
      }
    }
    // Object.assign(defaultOptions, options);
    // this._options = defaultOptions;
    this._options = UTIL.extend({}, defaultOptions, options);
    this._options.$tools = $tools;
    const _options = this._options;
    console.log(this._options);

    // 默认语言处理.
    if (typeof _options.lang === 'string') {
      const langKey = _options.lang;
      this._options.lang = langMap[langKey] || CONFIG.editor.language;
    } else {
      // 自己配置语言.
      this._options.lang = Object.assign({}, CONFIG.editor.language, options.lang);
    }
  }

  //  ==================== 编辑器生命周期 ====================
  /** 编辑器所有都准备好了 */
  lifecycleMounted() {
    this.addEditContainerPaseImg();
  }

  // ==================== 创建编辑器元素 ====================
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
  

  // ==================== 编辑器 `Tools` 相关 ====================
  /**
   * 图标添加点击事件监听. 
   */
  initToolsEvent() {
    const self = this;
    const toolsObj = this._options.$tools;
    const editorEl = this._options.el;
    const { toolbarBuiltInButtons } = toolsObj;
    const toolsArr = UTIL.obj2Arr(toolbarBuiltInButtons);

    if (toolsArr.length > 0) {
      toolsArr.forEach(item => {
        // clasName 有多个类名时取第一个.
        if (item['className'].indexOf(' ') > 0) {
          item['className'] = item['className'].split(' ')[0];
        }

        const className = '.' + item['className'];
        const callBack = item['action'];
        const isFunction = UTIL.isFunction(callBack);

        if (className !== '' && isFunction) {
          const toolEl = editorEl.querySelector('.editor-tools').querySelector(className);
          if (toolEl) {
            // 默认显示 compare 布局
            self.$status
            toolEl.$editor = self;
            // @see https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
            toolEl.addEventListener('click', callBack, false);
          }
        }
      });
    }
  }

  // ==================== 编辑器 `CodeMirror` 相关 ====================
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
    
    // codemirror 添加访问编辑器快捷方式
    this.$codemirror.$editor = this;

    this.initCodeMirrorEvent();
  }

  initCodeMirrorEvent() {
    this.add_CM_change_eventHandle();
    this.add_CM_cursorActivity_eventHandle();
    this.addScrollSync();
  }

  /**
   * `CodeMirror` 内容变化事件监听.
   */
  add_CM_change_eventHandle() {
    this.$codemirror.on('changes', debounce(this.onCodeMirrorChange, INPUT_EVENT_DEBOUNCE_WAIT));
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
    editor.setHtmlValue(content);
    editor.updateStatusBar(editor);
  }
  

  // ==================== 编辑器 `markdown` 相关 ====================
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
   * Markdown 内容显示设置.
   */
  initDefaultContent() {
    const defaultCon = this._options.defaultCon;
    if (defaultCon) {
      const cm = this.$codemirror;
      cm.setValue(defaultCon);
      this.commonCodeMirrorEventHandle(cm);
    }
  }

  /** 
   * 获取 `CodeMirror` 的值.
   */
  getMDValue() {
    const cm = this.$codemirror;
    return cm.getValue();
  }

  /**
   * 设置 `CodeMirror` 的值. 
   */
  setHtmlValue(mdValue) {
    const htmlStr = this.$marked(mdValue);
    const htmlElement = this._options.el.querySelector('.editor-preview').querySelector('.preview-bd');
    htmlElement.innerHTML = htmlStr;
  }

  // ==================== 编辑器 `preview` 容器相关 ====================

  // ==================== 编辑器 `滚动条` ====================
  /**
   * 滚动内容同步. 
   */
  addScrollSync() {
    const cm = this.$codemirror;
    const preview = this._options.el.querySelector('.editor-preview');

    let cScroll = false;
    let pScroll = false;
    // Syncs scroll  editor -> preview
    cm.on("scroll", function(v) {
      if(cScroll) {
        cScroll = false;
        return;
      }
      pScroll = true;
      var height = v.getScrollInfo().height - v.getScrollInfo().clientHeight;
      var ratio = parseFloat(v.getScrollInfo().top) / height;
      var move = (preview.scrollHeight - preview.clientHeight) * ratio;
      preview.scrollTop = move;
    });

    // Syncs scroll  preview -> editor
    preview.addEventListener('scroll', function() {
      if(pScroll) {
        pScroll = false;
        return;
      }
      cScroll = true;
      var height = preview.scrollHeight - preview.clientHeight;
      var ratio = parseFloat(preview.scrollTop) / height;
      var move = (cm.getScrollInfo().height - cm.getScrollInfo().clientHeight) * ratio;
      cm.scrollTo(0, move);
    });
  }

  // ==================== 编辑器 `status` 相关 ====================
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
  
  initEditorStatus(options) {
    // 主题设置.
    this.$status = {};
    this.$status['isThemeLight'] = true;
    this.$status['isFullscreen'] = false;
    /** 默认显示编辑布局 */
    this.$status['isShowAll'] = true;
    this.$status['isOnlyPreview'] = false;
    this.$status['isOnlyEdit'] = false;
  }

  // ==================== 编辑器事件处理 ====================
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

  // ==================== 编辑器扩展功能 ====================
  // 粘贴图片，并上传至七牛云
  // =======================================================
  initQiniu(options = {}) {
    qiniuUpload = new QiniuUplaod(options)
  }

  /** 编辑器内容，粘贴图片处理功能 */
  addEditContainerPaseImg() {
    const oEl = this._options.el.querySelector('.editor-md');
    const cm = this.$codemirror;

    oEl.addEventListener('paste', function(event) {
      if (event.clipboardData || event.originalEvent) {
        var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
        if(clipboardData.items){
            var  blob;
            for (var i = 0; i < clipboardData.items.length; i++) {
                if (clipboardData.items[i].type.indexOf("image") !== -1) {
                    blob = clipboardData.items[i].getAsFile();
                }
            }
            // 只处理粘贴的类型为图片.
            if (!blob) return;

            var render = new FileReader();
            render.onload = function (evt) {
                handleImageUpload(evt.target);
            }
            render.readAsDataURL(blob);
        }

      }
    });

    /** 图片上传处理 */
    const handleImageUpload = (target) => {
      // 编辑器中插入内容
      const insertTexts = ["![](", "#url#)"];
      const stat = getState(cm);
      // base64编码
      const imgUrl = target.result;
      // console.log('粘贴图片处理', target);
      qiniuUpload.putb64(imgUrl)
        .then(res => {
          const url = res.domain + '/' + res.hash;
          _replaceSelection(cm, stat.image, insertTexts, url);
        })
        .catch(err => {
          console.log(err);
        });
    }

    const _replaceSelection = (cm, active, startEnd, url) => {
      var text;
      var start = startEnd[0];
      var end = startEnd[1];
      var startPoint = cm.getCursor("start");
      var endPoint = cm.getCursor("end");
      // if(url) {
      //   end = end.replace("#url#", url);
      // }
      end = end.replace("#url#", url);
      if(active) {
        text = cm.getLine(startPoint.line);
        start = text.slice(0, startPoint.ch);
        end = text.slice(startPoint.ch);
        cm.replaceRange(start + end, {
          line: startPoint.line,
          ch: 0
        });
      } else {
        text = cm.getSelection();
        cm.replaceSelection(start + text + end);
    
        startPoint.ch += start.length;
        if(startPoint !== endPoint) {
          endPoint.ch += start.length;
        }
      }
      cm.setSelection(startPoint, endPoint);
      cm.focus();
    }
  }
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
}


// ==================== umd 模块导出 ====================
if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
  // AMD. Register as an anonymous module.
  define(function() {
    return CMdEditor;
  });
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = CMdEditor;
} else {
  window.CMdEditor = CMdEditor;
}


