const config = {
  /** 阿里图标连接 */
  iconLink: '//at.alicdn.com/t/font_823030_zr2neg3akxh.css',
  editor: {
    /** 添加给`编辑器`顶级容器的样式类名 */
    className: {
      /** 黑色主题 */
      themeDark: 'editor-theme-dark',
      /** 亮色主题 */
      themeLight: 'editor-theme-light',
      /** 全屏 */
      fullscreen: 'editor-status_fullscreen',
      /** 对比预览 */
      compare: 'editor-status_show-all',
      /** 仅编辑 */
      edit: 'editor-status_only-edit',
      /** 仅看预览 */
      preview: 'editor-status_only-preview',
    },
    theme: {
      dark: {
        className: 'editor-theme-dark',
        mode: 'base16-dark'
      },
      light: {
        className: 'editor-theme-light',
        mode: 'base16-light'
      }
    }
  }
}

export default config;