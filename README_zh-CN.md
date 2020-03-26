# 使用 codemirror marked hightlight.js webpack 构建的编辑器

[live-demo](https://editor.easysolves.com/)


### 常用命令
```bash
# 安装依赖
npm install

# development: 开启带有热更新的开发环境
npm run dev

# product: 输出内容(生成 dist目录)
npm run build
```

### 使用方式

Tips: 导出为 `umd` 类型的文件。支持以下几种使用方式.

#### 方式1 script 标签使用

CDN:
+ CSS: https://unpkg.com/cool-md-editor@版本号/dist/coolMdEditor.css
+ JS: https://unpkg.com/cool-md-editor@版本号/dist/coolMdEditor.js

```html
<head>
  ...
  <link href="coolMdEditor.css" rel="stylesheet">
</head>
<body>
  <div class="cool-md-editor-wrap editor-theme-light" id="editor-wrap1"></div>
  <div class="cool-md-editor-wrap editor-theme-dark" id="editor-wrap2"></div>

  <script src="coolMdEditor.js"></script>
  <script>
    const mdEditor1 = new CoolMDEditor.default({
      el: document.getElementById('editor-wrap1'),
      defaultCon: '# 这是默认内容(可以不要)'
    });

    const mdEditor2 = new CoolMDEditor.default({
      el: document.getElementById('editor-wrap2'),
      defaultCon: '# 这是默认内容(可以不要)'
    });
  </script>
</body>
```


#### 方式2 npm
```cmd
npm i cool-md-editor --save
```

```js
const MdEditor = require('cool-md-editor');
require('cool-md-editor/dist/coolMdEditor.css');

new MdEditor({
  el: document.getElementById('editor-wrap'),
  defaultCon: '# 这是默认内容,任意填写'
});
```


<!-- ### [结构梳理](https://www.processon.com/view/link/5b88dc49e4b0534c9bc51b33) -->

### 说明

#### 初始化参数说明
```html
<div class="cool-md-editor-wrap editor-theme-light" id="editor-wrap"></div>
```

Tips: 类名 `.cool-md-editor-wrap` 必须有, 主题: `.editor-theme-light` 和 `.editor-theme-dark` 选择一个.

```js
const coolMDEditor = new CoolMDEditor({
  el: '编辑器容器',
  defaultCon: '# 这是默认内容'
});
```

|属性|类型|说明|默认值|可选值|
|--|--|--|:--:|:--:|
|`el`| htmlElement | 必需,编辑器dom元素| - | - |
|`defaultCon`|String|非必需, 默认显示的内容| - | - |


#### 编辑器实例对象属性

|属性|类型|说明|默认值|可选值|
|--|--|--|:--:|:--:|
|[`$codemirror`](https://github.com/Jesonhu/cool-md-editor#codemirror-属性)| `CodeMirror` 实例对象 | `CodeMirror` 实例对象 | - | - |
| [`$marked`](https://github.com/Jesonhu/cool-md-editor#marked-属性)| `marked` 实例对象 | `marked` 实例对象 | - | - |
| [`$status`](https://github.com/Jesonhu/cool-md-editor#status-属性) | Object | 编辑器当前的状态 | - | - |
| [`_options`](https://github.com/Jesonhu/cool-md-editor#_options-属性) | Object | Cool-MD-Editor 编辑器配置 | - | - |


#### `$codemirror` 属性

|属性|类型|说明|默认值|可选值|
|--|--|--|:--:|:--:|
| `$editor` | Object | 编辑器实例对象 | - | - |
| 其他属性 | any | `CodeMirror` 实例对象支持的属性和方法，参见[文档](https://codemirror.net/doc/manual.html) | - | - |

#### `$marked` 属性

|属性|类型|说明|默认值|可选值|
|--|--|--|:--:|:--:|
| 全部属性 | any | `marked` 实例对象支持的属性和方法，参见[文档](https://marked.js.org/#/README.md#README.md) | - | - |

#### `$status` 属性

|属性|类型|说明|默认值|可选值|
|--|--|--|:--:|:--:|
| `isFullscreen` | Boolean | 是否全屏显示, 全屏为 `true` | `false` 或者本地存储设置值| - |
| `isThemeLight` | Boolean | 是否主题为`圣光`, 目前只有 `圣光` 和 `暗黑` 主题 ，根据 `base16` 扩展而来。未来也只考虑两套主题(光/暗) | true 或者本地存储设置值| - |
| `isShowAll` | Boolean |编辑和预览都显示, 与 `isOnlyEdit` `isOnlyPreview`为正反关系 |true | - |
| `isOnlyPreview` | Boolean |只显示预览 |false | - |
| `isOnlyEdit` | Boolean | 只显示编辑|true | - |

#### `_options` 属性

|属性|类型|说明|默认值|可选值|
|--|--|--|:--:|:--:|
| `el` | HTMLElement | 编辑器 `dom` 元素| - | - |
| `$tools` | Object | 工具条类名(图标)、title、和绑定的事件等| - | - |
| `lang` | Object/String | 编辑器的语言内容 | - | - |
| `editor` | Object | 编辑器实例对象 | - | - |
|`shortcuts`| Object | 快捷键配置 | - | -|
|`qiniu`| Object | 七牛云配置，图片复制粘贴后上传到七牛云 | - | -|



+ $tools 结构

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

+ lang

类型-字符串: 使用内置的语言，目前内置了 `en: englisth` `zh: 简体中文`, 具体配置可查看 `lang/*` 目录中的配置。

类型-对象: 可以扩展第三方语言，具体配置格式可查看 `lang/*` 目录文件。

+ qiniu

需要使用粘贴图片功能，要先引用 `https://unpkg.com/qiniu-js@<版本号>/dist/qiniu.min.js`。粘贴的图片转换为了 base64 格式，为了避免图片路径显示 base64 格式的字符串，造成内容过多问题。编辑器内置了将 base64 格式的图片上传至七牛云存储的功能。

默认配置为
```js
qiniu: {
    tokenApiUrl: 'http://127.0.0.1:3001/api/qiniu/blog/get_token',
    region: 'z1',
    config: {},
    putExtra: {}
}
```

关于内置的七牛上传需要注意以下几点:

+ token 的获取编辑器内置了接口处理，可以不用设置，如果需要使用自己的接口服务器需要配置 
`qiniu.tokenApiUrl`, 并且返回如下数据格式 

```json
{
  data: {
   token: 'your token',
   domain: 'your 七牛云后台设置的自己的域名'
  }
}
```
+ 上传的空间为测试空间，内容会不定时删除，所以请配置自己的七牛云上传空间

#### 编辑器实例对象方法

|方法名|说明|参数|返回值|
|--|--|--|:--:|
|getMDValue|获取当前Markdown的内容|-|当前Markdown的内容|


### 参考资料
+ [webpack4.x](https://github.com/Jesonhu/webpack4.x-demo)
+ [marked.js简单使用](https://github.com/Jesonhu/codemirror-marked-highlight)
+ inspired(Thx)
  + [simplemde-markdown-editor](https://github.com/sparksuite/simplemde-markdown-editor)
  + [surmon-china/angular-admin](https://github.com/surmon-china/angular-admin/blob/89ad805a7932c4e06560127bf8820640fc079584/src/app/components/saMarkdownEditor/markdownEditor.component.ts)
  + [codimd](https://demo.codimd.org/features?both)
  + [md.editor](https://github.com/TeoChoi/md.editor)
 