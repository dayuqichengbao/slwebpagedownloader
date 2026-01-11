# QCSiteDownloader

一个基于 Electron 的网页静态资源下载器。在内置浏览器视图中加载目标网页，拦截并保存页面及其子资源（JS/CSS/图片/XHR/HTML），按原始路径结构存储到本地，方便离线查看与分析。

## 简述
- 目的：将目标站点抓取为本地静态资源并保留 URL 路径结构。
- 适用场景：网页备份、离线浏览、前端资源审计与分析。

## 主要功能
- 资源抓取：在内置浏览器视图中加载页面并抓取页面及其子资源（详见 `electron/main.ts`）。
- 保留目录结构：按 URL 路径在本地重建目录并自动补全常见扩展名（html/js/css/json 等）。
- 内置浏览器视图与操作面板：左侧为页面视图，右侧为操作区（URL 输入、下载、保存位置、资源列表），界面实现位于 `src/App.vue`。
- 交互操作：支持选择保存目录、打开已下载文件夹、复制资源链接、查看成功/失败统计。
- IPC 支持：渲染进程与主进程通过 IPC 交互实现路径选择、复制剪贴板、更新子视图 URL 等操作。

## 快速开始
- 安装依赖：
```bash
npm install
```

- 开发模式（热重载）：

```bash
npm run start
```

- 构建与打包（依赖项目 scripts）：
  
```bash
npm run build
npm run dist
```

## 使用说明

在右侧输入框中输入目标网站 URL（例如 https://example.com）。
（可选）点击 Choose Folder 选择保存目录；若不选择则使用默认下载目录（macOS 通常为 ~/Downloads）。
点击 Download，应用将在左侧视图加载页面并开始抓取资源。
抓取结果将在右侧列表显示：状态（success/failed）、资源 URL、文件路径，支持 Open（打开所在目录）与 Copy（复制 URL）。

## 配置与存储

下载目录：由设置项 downloadPath 控制；未设置时使用系统默认下载目录。
存储路径示例：<downloadRoot>/webdownloader/<downloadHostname>/<resourceHostname>/...。
设置存储位于项目的 electron/store 目录（查看对应文件了解实现）。

## 已知限制与注意事项

对大流、WebSocket 或极大响应体可能被忽略。
抓取过程需写入文件系统权限；在 macOS 上请确保 Electron 有相应权限。
当前实现未包含复杂的并发控制、重试逻辑或下载进度指示，遇到高并发或断网可能出现失败条目。


## 贡献

欢迎贡献：fork → 新分支 → 提交 PR → 代码审查合并。
建议改进方向：并发下载队列、失败重试机制、扩展 mime/type 识别、下载进度反馈、robots.txt 策略支持等。