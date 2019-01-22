# 使用 codemirror marked hightlight.js webpack 构建的编辑器

### 期望功能

### 命令
```bash
# development: 开启 devServer 带有热更新的开发环境
npm run devServer
```

### [结构梳理](https://www.processon.com/view/link/5b88dc49e4b0534c9bc51b33)

### 说明

#### 编辑器实例对象属性

|属性|类型|说明|默认值|可选值|
|--|--|--|--|:--:|:--:|
|`$codemirror`| `CodeMirror` 实例对象 | `CodeMirror` 实例对象 | - | - |
| `$marked`| `marked` 实例对象 | `marked` 实例对象 | - | - |
| `$status` | Object | 编辑器当前的状态 | - | - |
| `_options` | Object | Cool-MD-Editor 编辑器配置 | - | - |


#### `$codemirror` 属性

|属性|类型|说明|默认值|可选值|
|--|--|--|--|:--:|:--:|
| `$editor` | Object | 编辑器实例对象 | - | - |
| 其他属性 | any | `CodeMirror` 实例对象支持的属性和方法，参见[文档](https://codemirror.net/doc/manual.html) | - | - |

#### `$marked` 属性

|属性|类型|说明|默认值|可选值|
|--|--|--|--|:--:|:--:|
| 全部属性 | any | `marked` 实例对象支持的属性和方法，参见[文档](https://marked.js.org/#/README.md#README.md) | - | - |

#### `$status` 属性

|属性|类型|说明|默认值|可选值|
|--|--|--|--|:--:|:--:|
| `isFullscreen` | Boolean | 是否全屏显示, 全屏为 `true` | `false` 或者本地存储设置值| - |
| `isThemeLight` | Boolean | 是否主题为`圣光`, 目前只有 `圣光` 和 `暗黑` 主题 ，根据 `base16` 扩展而来。未来也只考虑两套主题(光/暗) | true 或者本地存储设置值| - |

#### `_options` 属性

|属性|类型|说明|默认值|可选值|
|--|--|--|--|:--:|:--:|
| `el` | HTMLElement | 编辑器 `dom` 元素| - | - |
| `$tools` | Object | 工具条类名(图标)、title、和绑定的事件等| - | - |
| `lang` | Object | 编辑器的语言内容 | 中文语言(zh) | - |
| `editor` | Object | 编辑器实例对象 | - | - |

**TIPS: $tools 结构像下面这样**
```js
{
  name: 'heading',             // 名称
  action: toggleHeading,       // 绑定的回调函数
  className: 'icon-heading',   // 类名
  title: 'Heading',            // 标题(会翻译为当前使用的语言) 
  default: true,               // 是否是默认显示的
  index: 2,                    // 所在组的索引。目前有两大组: `编辑图标` `浏览器设置`。两组使用不同的索引
  isEditTools: true            // 是否为 `编辑图标` 组.
}
```


### 参考资料
+ [webpack4.x](https://github.com/Jesonhu/webpack4.x-demo)
+ [marked.js简单使用](https://github.com/Jesonhu/codemirror-marked-highlight)
+ inspired(Thx)
  + [simplemde-markdown-editor](https://github.com/sparksuite/simplemde-markdown-editor)
  + [surmon-china/angular-admin](https://github.com/surmon-china/angular-admin/blob/89ad805a7932c4e06560127bf8820640fc079584/src/app/components/saMarkdownEditor/markdownEditor.component.ts)
  + [codimd](https://demo.codimd.org/features?both)