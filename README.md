# Vue3 H5 Design

<br>

## 使用
### 开发

推荐使用pnpm

```bash
pnpm install
```

本地服务 http://localhost:3333

```bash
pnpm dev
```

### 构建

构建该应用只需要执行以下命令

```bash
pnpm build
```

然后你会看到用于发布的 `dist` 文件夹被生成。

### 路径别名

`@/`被别名为`./src/`文件夹。

### 自动import

自动导入无需手工引入以下模块
库

- vue
- vue-router
- vueuse
- vue-i18n
- icon-park

自动导入无需手工引入以下项目目录下文件

- composables
- stores
- utils
- components

自动导入无需引入及注册以下目录下组件,根据文件目录生成组件名，如components/common/HelloWord.vue可直接在
template中使用<CommonHelloWord /> 或 <common-hello-word />
- components

具体可参见自动生成的src/auto-imports.d.ts

### 路由

src/pages目录下的vue文件将自动生成路由。
该目录下的各页面目录内children、components下的文件将不会生成路由。

### 权限控制

#### 1、页面级权限控制

在页面组件中配置role、permission

```vue
<route lang="yaml">
meta:
  role: [admin]
</route>
```

#### 2、菜单权限控制

同页面级权限控制，根据路由path自动生成。可通过变量generateMenuByAuth控制是否开启

#### 3、按钮级权限控制

```vue
<el-button v-if="$hasAuth('demoList:del')">
Button
</el-button>
```

or

```js
const hasAuth = useAuth()
hasAuth('demoList:del')
```

### 图标
使用 [@iconify/vue](https://iconify.design/docs/icon-components/vue/)
```vue
<icon icon="icon-park-outline:back" />
```

如使用自定义图标，可在src/assets/iconify.json中配置。
如上传至iconfont，并配合(tampermonkey-iconfont-iconify油猴插件)[https://github.com/yee94/tampermonkey-iconfont-iconify]插件直接下载iconify.json文件覆盖即可。

```vue
### mock

mock目录下的文件将自动生成mock，当本地开发且未转发时可自动使用mock

### 组件预览

内置Storybook，
