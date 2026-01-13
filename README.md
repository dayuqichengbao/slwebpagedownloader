# QCSiteDownloader

## 中文说明

一个基于 Electron 的网页静态资源下载器。在内置浏览器视图中加载目标网页，支持在动态交互中拦截url，并保存页面及其子资源（JS/CSS/图片/XHR/HTML），按原始路径结构存储到本地，方便离线查看与分析。

![demo](./public/screen-shot.gif)  

## 简述
- 目的：将目标站点抓取为本地静态资源并保留 URL 路径结构。
- 适用场景：网页备份、离线浏览、前端资源审计与分析。

## 主要功能
- 资源抓取：在内置浏览器视图中加载页面并抓取页面及其子资源（详见 `electron/main.ts`）。
- 保留目录结构：按 URL 路径在本地重建目录并自动补全常见扩展名（html/js/css/json 等）。
- 内置浏览器视图与操作面板：左侧为页面视图，右侧为操作区（URL 输入、下载、保存位置、资源列表），界面实现位于 `src/App.vue`。
- 交互操作：支持选择保存目录、打开已下载文件夹、复制资源链接、查看成功/失败统计。

## 快速开始
- 安装依赖：
```bash
npm install
```

- 开发模式（热重载）：

```bash
npm run dev
```

- 构建与打包（依赖项目 scripts）：
  
```bash
npm run build
npm run package-xxx
```

## 使用说明


在右侧输入框中输入目标网站 URL（例如 https://example.com）。
（可选）点击 Choose Folder 选择保存目录；若不选择则使用默认下载目录（macOS 通常为 ~/Downloads）。
点击 Download，应用将在左侧视图加载页面并开始抓取资源。
抓取结果将在右侧列表显示：状态（success/failed）、资源 URL、文件路径，支持 Open（打开所在目录）与 Copy（复制 URL）。

## 配置与存储

下载目录：由设置项 downloadPath 控制；未设置时使用系统默认下载目录。
存储路径示例：~/Download/webdownloader/

## 已知限制与注意事项

对大流、WebSocket 或极大响应体可能被忽略。
抓取过程需写入文件系统权限；在 macOS 上请确保 Electron 有相应权限。
当前实现未包含复杂的并发控制、重试逻辑或下载进度指示，遇到高并发或断网可能出现失败条目。


## 贡献

欢迎贡献：fork → 新分支 → 提交 PR → 代码审查合并。
建议改进方向：并发下载队列、失败重试机制、扩展 mime/type 识别、下载进度反馈、robots.txt 策略支持等。

## English Description

# QCSiteDownloader

An Electron-based static web resource downloader. It loads the target web page in an embedded browser view, intercepts and saves the page and its sub-resources (JS/CSS/images/XHR/HTML), and stores them locally preserving the original URL path structure for convenient offline viewing and analysis.

![demo](./public/screen-shot.gif) 

## Overview
- Purpose: Capture a target site as local static resources while preserving URL path structure.
- Use cases: web archiving, offline browsing, front-end resource auditing and analysis.

## Main Features
- Resource capture: Loads pages in an embedded browser view and captures the page and its sub-resources (see `electron/main.ts` for details).
- Preserve directory structure: Reconstructs directories locally according to URL paths and automatically completes common file extensions (html/js/css/json, etc.).
- Embedded browser view and control panel: Left side shows the page view; right side contains controls (URL input, download, save location, resource list). UI implementation is in `src/App.vue`.
- Interactions: Supports selecting a save folder, opening the downloaded folder, copying resource URLs, and viewing success/failure statistics.

## Quick Start
- Install dependencies:

```bash
npm install
```

- Development (hot reload):

```bash
npm run dev
```

- Build and package (uses project scripts):

```bash
npm run build
npm run package-xxx
```

## Usage


Enter the target website URL in the input field on the right (for example, https://example.com).
(Optional) Click Choose Folder to select a save directory; if not selected, the default download directory is used (on macOS usually `~/Downloads`).
Click Download; the app will load the page in the left view and start capturing resources.
The capture results appear in the right-hand list: status (success/failed), resource URL, file path, with options to Open (reveal in folder) and Copy (copy URL).

## Configuration and Storage

Download directory: controlled by the `downloadPath` setting; if unset, the system default download directory is used.
Storage path example: `<downloadRoot>/webdownloader/<downloadHostname>/<resourceHostname>/...`.

## Known Limitations & Notes

Large streams, WebSocket traffic, or very large response bodies may be ignored.
File system write permissions are required for the capture process; on macOS ensure Electron has the necessary permissions.
The current implementation lacks advanced concurrency control, retry logic, and download progress indicators; high concurrency or network interruptions may result in failed entries.

## Contributing

Contributions welcome: fork → new branch → submit PR → code review & merge.
Suggested improvements: add concurrent download queues, retry mechanisms, extend mime/type recognition, provide download progress, and support robots.txt policies.
