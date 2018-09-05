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
const bindings = {
  'toggleBold': toggleBold,
  'italic': toggleItalic,
  'edit': openEdit,
  'compare': openCompare,
  'preview': openPreview,
  'fullscreen': openFullScreen
}

// 按钮定义
const toolbarBuiltInButtons = {
  'bold': {
    name: 'bold',
    action: toggleBold,
    className: 'icon icon-bold',
    title: 'Bold',
    default: true
  },
  'italic': {
    name: 'italic',
    action: toggleItalic,
    className: 'icon icon-italic',
    title: 'Italic',
    default: true
  },
  'heading': {
    name: 'heading',
    action: toggleHeading,
    className: 'icon icon-heading',
    title: 'Heading',
    default: true
  },
  'quote': {
    name: 'quote',
    action: toggleBlockquote,
    className: 'icon quotation-marks',
    title: 'Quote',
    default: true
  },
  'code': {
    name: 'code',
    action: toggleCodeBlock,
    className: 'icon icon-code',
    title: 'Code',
    default: true
  },
  'unordered-list': {
    name: 'unordered-list',
    clasName: 'icon icon-Listofissues',
    action: toggleUnorderedList,
    title: 'Generic List',
    default: true
  },
  'ordered-list': {
    name: 'ordered-list',
    className: 'icon icon-list',
    action: toggleOrderedList,
    title: 'Number List',
    default: true
  },
  'link': {
    name: 'link',
    clasName: 'icon icon-link',
    action: drawLink,
    title: 'Insert Link',
    default: true
  },
  'image': {
    name: 'image',
    className: 'icon icon-img',
    action: drawImage,
    title: 'Insert Image',
    default: true
  },
  'edit': {
    name: 'edit',
    className: 'icon icon-pen',
    action: openEdit,
    title: 'Toggle Edit',
    default: true
  },
  'compare': {
    name: 'compare',
    className: 'icon icon-columns',
    action: openCompare,
    title: 'Toggle Compare',
    default: true
  },
  'preview': {
    name: 'preview',
    className: 'icon icon-eye',
    action: openPreview,
    title: 'Toggle Preview',
    default: true
  },
  'fullscreen': {
    name: 'fullscreen',
    className: 'icon icon-full-screen',
    action: openFullScreen,
    title: 'Toggle Fullscreen',
    default: true
  }

}

export default {
  bindings,

  toolbarBuiltInButtons,

  toggleBold,
  toggleItalic,
  openEdit,
  openCompare,
  openPreview,
  openFullScreen

}