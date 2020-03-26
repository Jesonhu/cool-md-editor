# A Markdown Editor build with codemirror & marked & hightlight.js & webpack 

[live-demo](http://demo.easysolves.com/sites/editor/test.html)
[中文文档](./README_zh-CN.md)

[![Preview](//qiniu.easysolves.com/Fmd-5pRwmrfyQuYDZXIMM5tAZE4R)](http://demo.easysolves.com/sites/editor/test.html)

### command

```bash
# install dependency
npm install

# development: open devServer with HMR
npm run dev

# product: build project
npm run build
```

### Use Method

Tips: the code ouput type is `umd`. so you can use some way. in the below

#### Method 1:  `<script>` Element 

CDN:

+ CSS: https://unpkg.com/cool-md-editor@version/dist/cMdEditor.css
+ JS: https://unpkg.com/cool-md-editor@version/dist/cMdEditor.js

example

```html
<head>
  ...
  <link href="cMdEditor.css" rel="stylesheet">
</head>
<body>
  <div class="cool-md-editor-wrap editor-theme-light" id="editor-wrap1"></div>
  <div class="cool-md-editor-wrap editor-theme-dark" id="editor-wrap2"></div>

  <script src="cMdEditor.js"></script>
  <script>
    const mdEditor1 = new CMdEditor.default({
      el: document.getElementById('editor-wrap1'),
      defaultCon: '# default content (selectable)'
    });

    const mdEditor2 = new CMdEditor.default({
      el: document.getElementById('editor-wrap2'),
      defaultCon: '# default content (selectable)'
    });
  </script>
</body>
```


#### Method 2: NPM

```cmd
npm i cool-md-editor --save
```

```js
const MdEditor = require('cool-md-editor');
require('cool-md-editor/dist/cMdEditor.css');

new MdEditor({
  el: document.getElementById('editor-wrap'),
  defaultCon: '# default content (selectable)'
});
```


<!-- ### [结构梳理](https://www.processon.com/view/link/5b88dc49e4b0534c9bc51b33) -->

### Notice

#### init config
```html
<div class="cool-md-editor-wrap editor-theme-light" id="editor-wrap"></div>
```

Tips: className `.cool-md-editor-wrap` required, Theme: `.editor-theme-light` & `.editor-theme-dark` .

```js
const coolMDEditor = new CMdEditor({
  el: editor Element,
  defaultCon: '# default content (selectable)'
});
```

|prop|type|desc|default|select|
|--|--|--|:--:|:--:|
|`el`| htmlElement | required, Editor Element| - | - |
|`defaultCon`|String|selectable, default content. markdown string| - | - |


#### CoolMDEditor instance property

|prop|type|desc|default|select|
|--|--|--|:--:|:--:|
|[`$codemirror`](https://github.com/Jesonhu/cool-md-editor#codemirror-property)| `CodeMirror` instance | `CodeMirror` instance | - | - |
| [`$marked`](https://github.com/Jesonhu/cool-md-editor#marked-属性)| `marked` instance | `marked` instance | - | - |
| [`$status`](https://github.com/Jesonhu/cool-md-editor#status-属性) | Object | editor status | - | - |
| [`_options`](https://github.com/Jesonhu/cool-md-editor#_options-属性) | Object | Cool-MD-Editor config | - | - |


#### `$codemirror` property

|prop|type|desc|default|select|
|--|--|--|:--:|:--:|
| `$editor` | Object | CoolMDEditor instance | - | - |
| otherProperty | any | same with new `CodeMirror`，[codemirror](https://codemirror.net/doc/manual.html) | - | - |

#### `$marked` property

|prop|type|desc|default|select|
|--|--|--|:--:|:--:|
| all prop | any | same with new `marked` ，[marked](https://marked.js.org/#/README.md#README.md) | - | - |

#### `$status` property

|prop|type|desc|default|select|
|--|--|--|:--:|:--:|
| `isFullscreen` | Boolean | is fullScreen, fullScreen: `true` | `false`| - |
| `isThemeLight` | Boolean | Theme `light`, only support `light` and `dark` theme ，base `base16` | true| - |

#### `_options` property

|prop|type|desc|default|select|
|--|--|--|:--:|:--:|
| `el` | HTMLElement | editor `dom` element| - | - |
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
