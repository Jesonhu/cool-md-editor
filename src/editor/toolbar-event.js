import UTIL from '../util/Util';
import CONFIG from './config';

const { toggleClass, addClass, removeClass } = UTIL;
const { gitGubUrl } = CONFIG;

let EDITOR = null;
/**
 * 工具栏功能
 */

 /** 
  * Action for toggle bold.
  * 切换是否`加粗`处理
  */
const toggleBold = (editor) => {

}

/** 
 * Action fro toggle Italic.
 * 切换是否`斜体`功能.
 */
const toggleItalic = (editor) => {

}

/**
 * Action for toggle Heading 
 */
const toggleHeading = (editor) => {

}

/**
 * Action for toggle Blockquote
 */
const toggleBlockquote = (editor) => {

}

/**
 * Action for toggle code 
 */
const toggleCodeBlock = (editor) => {

}

/**
 * Action for toggle UnorderedList
 */
const toggleUnorderedList = (editor) => {

}

/**
 * Action for toggleOrderedList
 */
const toggleOrderedList = (editor) => {

}

/**
 * Action for drawImage 
 */
const drawImage = (editor) => {

}

/**
 * Action for drawLink 
 */
const drawLink = (editor) => {

}

/**
 * 仅显示编辑部分
 */
const openEdit = (e) => {
  e = e || window.event;
  const self = e.currentTarget;
  const editor = self.$editor;

  if (!EDITOR) EDITOR = editor;
  const isOnlyEdit = EDITOR.$status['isOnlyEdit'];

  // 当前只显示编辑效果
  if (isOnlyEdit) return;

  EDITOR.$status['isOnlyEdit'] = true;
  EDITOR.$status['isOnlyPreview'] = !EDITOR.$status['isOnlyEdit'];
  EDITOR.$status['isShowAll'] = !EDITOR.$status['isOnlyEdit'];

  toggleClass(self, 'active');

  // 隐藏 `预览容器`，显示 `内容编辑容器`.
  const editorEl = EDITOR._options.el;
  const previewEl = editorEl.querySelector('.editor-preview');
  const mdEl = editorEl.querySelector('.editor-md');
  if (mdEl) removeClass(mdEl, 'hide');
  if (previewEl) addClass(previewEl, 'hide');

  // `只显示预览图标` 去掉激活状态.
  const toolPreviewEl = editorEl.querySelector('.editor-tools').querySelector('.icon-eye');
  const toolShowAllEl = editorEl.querySelector('.editor-tools').querySelector('.icon-columns');
  if (toolPreviewEl) removeClass(toolPreviewEl, 'active');
  if (toolShowAllEl) removeClass(toolShowAllEl, 'active');
}

/**
 * 显示编辑和预览.
 */
const openCompare = (e) => {
  e = e || window.event;
  const self = e.currentTarget;
  const editor = self.$editor;

  if (!EDITOR) EDITOR = editor;
  const isShowAll = EDITOR.$status['isShowAll'];

  // 当前只显示编辑效果
  if (isShowAll) return;

  EDITOR.$status['isShowAll'] = true;
  EDITOR.$status['isOnlyPreview'] = !EDITOR.$status['isShowAll'];
  EDITOR.$status['isOnlyEdit'] = !EDITOR.$status['isShowAll'];

  toggleClass(self, 'active');

  // 显示 `预览容器`，显示 `内容编辑容器`.
  const editorEl = EDITOR._options.el;
  const previewEl = editorEl.querySelector('.editor-preview');
  const mdEl = editorEl.querySelector('.editor-md');
  if (mdEl) removeClass(mdEl, 'hide');
  if (previewEl) removeClass(previewEl, 'hide');

  // 去掉 `编辑` `预览` 激活效果.
  const toolEditEl = editorEl.querySelector('.editor-tools').querySelector('.icon-pen');
  const toolPreviewEl = editorEl.querySelector('.editor-tools').querySelector('.icon-eye');
  if (toolEditEl) removeClass(toolEditEl, 'active');
  if (toolPreviewEl) removeClass(toolPreviewEl, 'active');
}

/**
 * 仅显示预览部分. 
 */
const openPreview = (e) => {
  e = e || window.event;
  const self = e.currentTarget;
  const editor = self.$editor;

  if (!EDITOR) EDITOR = editor;
  const isOnlyPreview = EDITOR.$status['isOnlyPreview'];

  // 当前只显示预览视图.
  if (isOnlyPreview) return;

  EDITOR.$status['isOnlyPreview'] = true;
  EDITOR.$status['isOnlyEdit'] = !EDITOR.$status['isOnlyPreview'];
  EDITOR.$status['isShowAll'] = !EDITOR.$status['isOnlyPreview'];

  toggleClass(self, 'active');

  // 显示： `预览容器`，隐藏：`内容编辑容器`.
  const editorEl = EDITOR._options.el;
  const mdEl = editorEl.querySelector('.editor-md');
  const previewEl = editorEl.querySelector('.editor-preview');
  if (mdEl) addClass(mdEl, 'hide');
  if (previewEl) removeClass(previewEl, 'hide');

  // `只显示编辑图标` 去掉激活状态
  const toolEditEl = editorEl.querySelector('.editor-tools').querySelector('.icon-pen');
  const toolShowAllEl = editorEl.querySelector('.editor-tools').querySelector('.icon-columns');
  if (toolEditEl) removeClass(toolEditEl, 'active');
  if (toolShowAllEl) removeClass(toolShowAllEl, 'active');
}

/**
 * 全屏按钮点击处理回调. 
 */
const openFullScreen = (e) => {
  commoFnHanlde(e);

  const editorEl = EDITOR._options.el;

  toggleClass(editorEl, 'fullscreen');
}

/**
 * `关于` 点击处理回调.
 */
const aboutEditor = () => {
  window.open(gitGubUrl);
}

/**
 * Tools 图标点击回调处理函数中相同的处理部分. 
 * 
 * @param {Object} e 触发图标对应回调的事件对象.
 * @return {Object} editor 编辑器实例对象.
 */
function commoFnHanlde (e) {
  e = e || window.event;
  const self = e.currentTarget;
  const editor = self.$editor;

  toggleClass(self, 'active');

  if (!EDITOR) EDITOR = editor;

  return editor;
}



// Mapping of actions that can be bound to keyboard shortcuts or toolbar buttons
// 绑定函数名
const bindings = {
  'toggleBold': toggleBold,
  'toggleItalic': toggleItalic,
  'toggleHeading': toggleHeading,
  'toggleBlockquote': toggleBlockquote,
  'toggleCodeBlock': toggleCodeBlock,
  'toggleUnorderedList': toggleUnorderedList,
  'toggleOrderedList': toggleOrderedList,
  'drawImage': drawImage,
  'drawLink': drawLink,
  'aboutEditor': aboutEditor,
  'openEdit': openEdit,
  'openCompare': openCompare,
  'openPreview': openPreview,
  'openFullScreen': openFullScreen
}

// 按钮定义
const toolbarBuiltInButtons = {
  'bold': {
    name: 'bold',
    action: toggleBold,
    className: 'icon-bold',
    title: 'Bold',
    default: true,
    index: 0,
    isEditTools: true
  },
  'italic': {
    name: 'italic',
    action: toggleItalic,
    className: 'icon-italic',
    title: 'Italic',
    default: true,
    index: 1,
    isEditTools: true
  },
  'heading': {
    name: 'heading',
    action: toggleHeading,
    className: 'icon-heading',
    title: 'Heading',
    default: true,
    index: 2,
    isEditTools: true
  },
  'quote': {
    name: 'quote',
    action: toggleBlockquote,
    className: 'icon-quotation-marks',
    title: 'Quote',
    default: true,
    index: 3,
    isEditTools: true
  },
  'code': {
    name: 'code',
    action: toggleCodeBlock,
    className: 'icon-code',
    title: 'Code',
    default: true,
    index: 4,
    isEditTools: true
  },
  'unordered-list': {
    name: 'unordered-list',
    className: 'icon-Listofissues',
    action: toggleUnorderedList,
    title: 'Generic List',
    default: true,
    index: 5,
    isEditTools: true
  },
  'ordered-list': {
    name: 'ordered-list',
    className: 'icon-list',
    action: toggleOrderedList,
    title: 'Number List',
    default: true,
    index: 6,
    isEditTools: true
  },
  'link': {
    name: 'link',
    className: 'icon-link',
    action: drawLink,
    title: 'Insert Link',
    default: true,
    index: 7,
    isEditTools: true
  },
  'image': {
    name: 'image',
    className: 'icon-img',
    action: drawImage,
    title: 'Insert Image',
    default: true,
    index: 8,
    isEditTools: true
  },
  'about': {
    name: 'about',
    className: 'icon-question',
    action: aboutEditor,
    title: 'About Editor',
    default: true,
    index: 0,
    isEditTools: false
  },
  'edit': {
    name: 'edit',
    className: 'icon-pen',
    action: openEdit,
    title: 'Toggle Edit',
    default: true,
    index: 1,
    isEditTools: false
  },
  'compare': {
    name: 'compare',
    className: 'icon-columns',
    action: openCompare,
    title: 'Toggle Compare',
    default: true,
    index: 2,
    isEditTools: false
  },
  'preview': {
    name: 'preview',
    className: 'icon-eye',
    action: openPreview,
    title: 'Toggle Preview',
    default: true,
    index: 3,
    isEditTools: false
  },
  'fullscreen': {
    name: 'fullscreen',
    className: 'icon-full-screen',
    action: openFullScreen,
    title: 'Toggle Fullscreen',
    default: true,
    index: 4,
    isEditTools: false
  },

}

/** 格式 */
const insertTexts = {
  link: ["[", "](#url#)"],
	image: ["![](", "#url#)"],
	table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n"],
	horizontalRule: ["", "\n\n-----\n\n"]
}

const promptTexts = {
	link: "URL for the link:",
	image: "URL of the image:"
}

const blockStyles = {
  "bold": "**",
	"code": "```",
	"italic": "*"
}

/** 快捷键 */
const shortcuts = {
  "toggleBold": "Cmd-B",
	"toggleItalic": "Cmd-I",
	"drawLink": "Cmd-K",
	"toggleHeadingSmaller": "Cmd-H",
	"toggleHeadingBigger": "Shift-Cmd-H",
	"cleanBlock": "Cmd-E",
	"drawImage": "Cmd-Alt-I",
	"toggleBlockquote": "Cmd-'",
	"toggleOrderedList": "Cmd-Alt-L",
	"toggleUnorderedList": "Cmd-L",
	"toggleCodeBlock": "Cmd-Alt-C",
	"togglePreview": "Cmd-P",
	"toggleSideBySide": "F9",
	"toggleFullScreen": "F11"
}

/**
 * 快捷键针对不同系统做兼容处理.
 * @param {objet} name 
 * @desc win: Ctrl; mac: Cmd
 */
const fixShortcut = (name) => {
  // if (isMac) {
  //   name = name.replace('Ctrl', 'Cmd');
  // } else {
  //   name = name.replace('Cmd', 'Ctrl');
  // }
  // return name;
}

export default {
  bindings,

  toolbarBuiltInButtons,

  insertTexts,

  promptTexts,

  blockStyles,

  shortcuts,

  fixShortcut,
  toggleBold,
  toggleItalic,
  openEdit,
  openCompare,
  openPreview,
  openFullScreen

}