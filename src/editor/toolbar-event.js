import {
  isMac
} from '../util/Util';
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
 * 打开仅编辑部分
 */
const openEdit = (editor) => {

}

/**
 * 打开编辑和预览.
 */
const openCompare = (editor) => {

}

/**
 * 打开仅预览部分. 
 */
const openPreview = (editor) => {

}

/**
 * 打开全屏效果 
 */
const openFullScreen = (editor) => {

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
  'edit': {
    name: 'edit',
    className: 'icon-pen',
    action: openEdit,
    title: 'Toggle Edit',
    default: true,
    index: 0,
    isEditTools: false
  },
  'compare': {
    name: 'compare',
    className: 'icon-columns',
    action: openCompare,
    title: 'Toggle Compare',
    default: true,
    index: 1,
    isEditTools: false
  },
  'preview': {
    name: 'preview',
    className: 'icon-eye',
    action: openPreview,
    title: 'Toggle Preview',
    default: true,
    index: 2,
    isEditTools: false
  },
  'fullscreen': {
    name: 'fullscreen',
    className: 'icon-full-screen',
    action: openFullScreen,
    title: 'Toggle Fullscreen',
    default: true,
    index: 3,
    isEditTools: false
  }

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
  if (isMac) {
    name = name.replace('Ctrl', 'Cmd');
  } else {
    name = name.replace('Cmd', 'Ctrl');
  }
  return name;
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