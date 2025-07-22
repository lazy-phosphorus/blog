# 惰性磷的博客源代码

## 目录结构

```text
root
 └─ src                 源码目录
     ├─ assets          静态资源
     │   ├─ image       图片
     │   ├─ music       音乐
     │   └─ scss        全局样式
     ├─ components      组件
     ├─ events          事件总线
     ├─ games           游戏组件
     ├─ hooks           自定义 Hooks
     ├─ layouts         布局组件库
     ├─ pages           基于文件系统的路由
     ├─ types           类型定义文件
     └─ utils           通用工具
```

## 环境需求

- Node.js: latest
- pnpm: latest

## 本地部署

```sh
git clone git@github.com:lazy-phosphorus/blog.git
cd blog && pnpm install
pnpm dev        # 开发
pnpm build      # 编译
pnpm preview    # 预览
```
