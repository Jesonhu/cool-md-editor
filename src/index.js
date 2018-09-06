
import domRender from './editor/editor-dom-render';
import CONFIG from './editor/config';

// 工具图标功能
import './style/index.scss';
import {
  toolbarBuiltInButtons,
  insertTexts,
  promptTexts,
  blockStyles,
  shortcuts,
  bindings,
} from './editor/editor-toolbar';

// 功能函数
import {
  extend
} from './plugins/Util';

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

domRender.init(document.getElementById('editor-wrap'))
.then(() => {
  Codemirror.fromTextArea(document.getElementById('area'), codemirror.config);
})


class MDEditor {
  constructor(options) {
    options = options || {};
    options.editor = this;

    this.createIconLink();

    // Find the element attr
    if (options.element) {
      this.element = options.element;
      this.textAreaElement = options.element.getElementsByTagName('textarea')[0];
    } else if (options.element === null) {
      console.log('MDEditor: Error. No element was found.');
      return;
    }

    // Handle toolbar
    if (options.toolbar === undefined) {
      options.toolbar = [];

      // Loop over the built in buttons, to get the preferred order
      for (let key in toolbarBuiltInButtons) {
        if (toolbarBuiltInButtons.hasOwnProperty(key)) {

          // 分隔符功能
          if (key.indexOf('separator-') != -1) {
            options.toolbar.push('|')
          }

          // 
          if (toolbarBuiltInButtons[key].default === true || 
             (options.showIcons && 
              options.showIcons.construtor === Array && 
              options.showIcons.indexOf(key) != -1)) {
            options.toolbar.push(key);    
          }
        }
      }
    }

    // Handle status bar
    if (!options.hasOwnProperty('status')) {
      options.status = ['autosave', 'lines', 'words', 'cursor'];
    }

    // Add default preview rendering function
    if (!options.previewRender) {
      options.previewRender = function(plainText) {
        return this.editor.markdown(plainText);
      }
    }

    // Set default options for parsing config
    options.parsingConfig = extend(
      { highlightFormatting: true },
      options.parsingConfig || {}
    );

    // Merging the insertTexts, with the given options
    options.insertTexts = extend({}, insertTexts, options.insertTexts || {});

    // Merging the promptTexts, with the given options.
    options.promptTexts = promptTexts;

    // Merging the blockStyles, with the given options.
    options.blockStyles = extend({}, blockStyles, options.blockStyles || {});

    // Mergint the shortcuts, with the given options.
    // 快捷键配置设置
    options.shortcuts = extend({}, shortcuts, options.shortcuts || {});

    // Update this options
    this.options = options;

    // Auto render
    this.render();

    // The codemirror commponent is only avaliable after rendered.
    // so setter for the initialValue can only run after
    // the element has ben renered
    if (options.initialValue && (!this.options.autosave || this.options.autosave.foundSaveValue !== true)) {
      this.value(options.initialValue);
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
    
  }

  markdown(text) {
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

      // Set options
      marked.setOptions(markedOptions);

      // Return
      return marked(text);
    }
  }

  /** 添加图标样式链接 */
  createIconLink() {
    const { iconLink } = CONFIG;
    const link = document.createElement('link');

    // 避免多次生成
    if (this.options.isCreatedIconLink) return;

    link.rel = 'stylesheet';
    link.href = iconLink;
    document.getElementsByTagName('head')[0].appendChild(link);
    this.options.isCreatedIconLink = true;
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

export default MDEditor;


