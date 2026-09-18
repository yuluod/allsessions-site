# 官网文案（中英双语）— 事实来源：README

## Hero
- EN: "Every agent. One index." / sub: "{agents}: each agent writes its sessions to a different directory, in a different format. AllSessions reads them all into one desktop app. Browse, search, tag, and export — all on your machine, no port, no cloud."
- ZH: "{n} 个来源，一个索引。"（n 与 {agents} 名单由来源表推导，当前 12 个）/ sub: "{agents}：每个 Agent 都把会话写进自己的目录，格式互不相同。AllSessions 把它们统统读出来，放进同一个桌面应用。翻旧会话、搜全文、打标签、做导出，都在本机完成，不开端口，不上云。"
- 定位词是「索引」不是「工作台」：查询、整理、导出在应用内完成，继续对话要跳回原 Agent——文案不承诺在应用里干活。

## 下载区
- 按 UA 自动识别平台；GitHub Releases latest API 拉真实资产名
- macOS 注明：未公证，首次启动需在系统设置中允许
- 按钮文案：Download for macOS (Apple Silicon / Intel) / Windows x64 / Linux .deb

## 特性（对应 README Features）
1. Unified multi-agent sessions — 统一浏览十个来源，按来源/Provider/日期/项目/目录筛选；规范化对话、thinking、工具调用、原始事件
2. Full-text search — SQLite trigram 索引，多词 AND，命中片段跳转；索引完全在本地
3. Organize & statistics — 收藏/标签/备注/保存筛选/归档/按来源统计对比/批量导出 JSON|Markdown（可选脱敏）
4. Desktop integration — 文件管理器定位、终端打开工作目录、回原 Agent 恢复会话、五套主题、深浅色、快捷键
5. Local-first — 无本地 HTTP 端口、无云端、Rust 端解析+索引；删除前自动本地备份；诊断信息可脱敏复制

## 只读边界（诚实区）
- Cursor / Devin / OpenCode / ZCode / Copilot 为只读来源：AllSessions 绝不修改其原始数据
- 独立社区项目声明（与所支持的 Agent 厂商无隶属关系）

## 页脚
- GitHub 仓库 / Releases / Issues / Apache-2.0 / CHANGELOG
