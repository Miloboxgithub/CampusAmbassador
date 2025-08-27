# 校园大使汇小程序

基于 uni-app + Vue 3 + Pinia 开发的校园大使招聘平台小程序，提供校园大使职位浏览、简历管理、职位投递等功能。

## 🚀 项目概述

校园大使汇是一个面向大学生的校园大使招聘平台，帮助学生找到合适的校园大使职位，企业招聘优秀的校园人才。

### 主要功能

- **职位浏览**: 查看各类校园大使职位信息
- **智能筛选**: 按行业、规模、类型等条件筛选职位
- **简历管理**: 在线创建和管理个人简历
- **职位收藏**: 收藏感兴趣的职位方便后续查看
- **一键投递**: 快速投递简历到心仪职位
- **简历模板**: 提供多种简历模板选择
- **个人中心**: 管理投递记录和收藏内容

## 📦 技术栈

- **前端框架**: Vue 3 + Composition API
- **开发工具**: uni-app (多端开发框架)
- **状态管理**: Pinia
- **UI组件**: uni-ui 组件库
- **构建工具**: HBuilderX
- **样式预处理器**: SCSS

## 🏗️ 项目结构

```
CampusAmbassador/
├── api/                 # API接口管理
│   └── index.js        # 所有网络请求接口
├── components/         # 公共组件
│   ├── Loading.vue     # 加载组件
│   ├── Login.vue       # 登录组件
│   └── resumeModal.vue # 简历弹窗组件
├── pages/              # 主包页面
│   ├── index/          # 首页
│   ├── template/       # 简历模板页
│   └── personage/      # 个人中心页
├── pkgA/              # 分包A
│   ├── search/         # 搜索页面
│   ├── screen/         # 筛选页面
│   ├── detail/         # 职位详情页
│   ├── resume/         # 简历管理页
│   ├── mysubmit/       # 我的投递页
│   ├── collection/     # 我的收藏页
│   └── ...            # 其他功能页面
├── static/            # 静态资源
├── store/             # 状态管理
│   └── index.js       # Pinia store配置
├── until/             # 工具函数
│   └── request.js     # 请求封装
└── uni_modules/       # uni-app插件
```

## 🛠️ 安装与运行

### 环境要求

- Node.js 14+
- HBuilderX 最新版本
- 微信开发者工具（用于调试）

### 开发环境搭建

1. **安装 HBuilderX**
   - 下载并安装 [HBuilderX](https://www.dcloud.io/hbuilderx.html)

2. **导入项目**
   - 打开 HBuilderX
   - 选择"文件" → "导入" → "从本地目录导入"
   - 选择本项目目录

3. **安装依赖**
   ```bash
   npm install
   ```

4. **运行项目**
   - 在 HBuilderX 中选择"运行" → "运行到小程序模拟器" → "微信开发者工具"
   - 或直接使用 HBuilderX 的内置浏览器运行

### 生产环境构建

```bash
# 构建微信小程序
npm run build:mp-weixin

# 构建其他平台
npm run build:mp-alipay
npm run build:mp-baidu
```

## 🔧 配置说明

###  manifest.json 配置

项目支持多端发布，已配置微信小程序、支付宝小程序、百度小程序等平台。

### pages.json 路由配置

- 主包包含三个tabbar页面：首页、简历模板、个人中心
- 分包A包含其他功能页面，实现按需加载

### API 配置

所有API接口统一在 `api/index.js` 中管理

## 📱 页面功能说明

### 首页 (pages/index/index)
- 校园大使职位列表展示
- 顶部搜索和筛选功能
- 下拉刷新和上拉加载更多
- 滚动时顶部导航栏变化效果

### 简历模板页 (pages/template/template)  
- 简历模板浏览和选择
- 模板收藏功能
- 模板使用统计

### 个人中心页 (pages/personage/personage)
- 用户信息管理
- 投递记录查看
- 收藏内容管理
- 设置相关功能

### 简历管理页 (pkgA/resume/resume)
- 个人信息填写
- 教育经历管理
- 技能特长填写
- 简历附件上传
- 表单验证功能

## 🎨 UI/UX 设计特点

- 采用渐变背景设计，视觉层次丰富
- 响应式布局，适配不同屏幕尺寸
- 统一的色彩规范 (#4F78FF 为主色调)
- 流畅的交互动画和过渡效果
- 符合微信小程序设计规范

## 🔄 数据流管理

使用 Pinia 进行状态管理，主要store包括：

- `pageInfo`: 页面分页和信息管理
- `indexInfo`: 首页相关状态
- `templateInfo`: 模板页面状态
- 用户登录状态和简历数据

## 🚨 已知问题与优化建议

### 当前问题

1. **代码组织结构**
   - API文件过于庞大，建议按功能模块拆分
   - 样式代码重复较多，可提取公共样式类

### 优化建议

1. **性能优化**
   - 实现图片懒加载
   - 优化列表渲染性能
   - 减少不必要的重渲染

2. **代码质量**
   - 添加TypeScript支持
   - 统一错误处理机制
   - 完善代码注释

3. **用户体验**
   - 优化表单验证体验
   - 增加操作反馈动画

## 📄 相关文档

- [uni-app 官方文档](https://uniapp.dcloud.io/)
- [Vue 3 文档](https://v3.vuejs.org/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

## 🤝 参与贡献

欢迎提交 Issue 和 Pull Request 来改进项目。

## 📝 更新日志

### v1.0.0
- 项目初始版本发布
- 实现基本校园大使招聘功能
- 支持微信小程序平台

## 📧 联系我们

如有问题或建议，请通过以下方式联系：
- 邮箱: [填写项目邮箱]
- GitHub: [提交Issue](https://github.com/Miloboxgithub/CampusAmbassador/issues)


