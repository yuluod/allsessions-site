/* AllSessions 官网 · 目录柜交互 + i18n + Release 拉取 */

const REPO = "yuluod/AllSessions";
const API_URL = `https://api.github.com/repos/${REPO}/releases/latest`;

const AGENTS = [
  {
    id: "codex",
    name: "Codex",
    icon: "assets/agents/openai.svg",
    color: "#2f6b4f",
    path: "~/.codex/sessions",
    readonly: false,
    cov: {
      zh: "元数据、消息、工具调用、原始事件、检索与实时刷新",
      en: "Metadata, messages, tools, raw events, search, live refresh",
    },
    cards: {
      zh: [
        ["09:41", "把 session store 迁到 rusqlite", 47, "~/work/allsessions"],
        ["9月15日", "GNOME 上托盘图标不见了", 19, "~/work/allsessions"],
        ["9月14日", "目录监听要不要加防抖", 33, "~/work/allsessions"],
      ],
      en: [
        ["09:41", "migrate session store to rusqlite", 47, "~/work/allsessions"],
        ["Sep 15", "fix tray icon regression on GNOME", 19, "~/work/allsessions"],
        ["Sep 14", "debounce watcher on session dirs", 33, "~/work/allsessions"],
      ],
    },
  },
  {
    id: "codex-archived",
    name: { zh: "Codex 归档", en: "Codex Archived" },
    icon: "assets/agents/openai.svg",
    color: "#4d6b58",
    path: "~/.codex/archived_sessions",
    readonly: false,
    // 附属来源：同一 Agent 的另一个目录，不计入 Agent 枚举
    variant: true,
    cov: {
      zh: "归档会话的浏览、检索与永久删除；文件不搬家",
      en: "Browse, search, and permanently delete archived sessions; files never moved",
    },
    cards: {
      zh: [
        ["6月30日", "老项目的迁移沙盒", 24, "~/work/legacy-api"],
        ["5月12日", "试用新的提示词模板", 8, "~/sandbox/prompts"],
      ],
      en: [
        ["Jun 30", "migration sandbox for the old project", 24, "~/work/legacy-api"],
        ["May 12", "try out the new prompt template", 8, "~/sandbox/prompts"],
      ],
    },
  },
  {
    id: "claude",
    name: "Claude Code",
    icon: "assets/agents/claude.svg",
    color: "#9a5314",
    path: "~/.claude/{projects,sessions}",
    readonly: false,
    cov: {
      zh: "对话、思考、工具结果、检索、实时刷新；history.jsonl 命令历史补全",
      en: "Conversations, thinking, tool results, search, live refresh; history.jsonl enrichment",
    },
    cards: {
      zh: [
        ["10:07", "token 刷新的链路帮我理一下", 61, "~/work/api-gateway"],
        ["9月15日", "conversation view 拆成两栏", 28, "~/work/allsessions"],
        ["9月8日", "429 的时候做退避重试", 12, "~/work/api-gateway"],
      ],
      en: [
        ["10:07", "audit token refresh path", 61, "~/work/api-gateway"],
        ["Sep 15", "split conversation-view into panes", 28, "~/work/allsessions"],
        ["Sep 08", "retry with backoff on 429", 12, "~/work/api-gateway"],
      ],
    },
  },
  {
    id: "gemini",
    name: "Gemini CLI",
    icon: "assets/agents/gemini.svg",
    color: "#4c55a5",
    path: "~/.gemini/tmp/*/logs.json",
    readonly: false,
    cov: {
      zh: "流式扫描、按 sessionId 聚合、增量缓存；详情按需加载",
      en: "Streaming scan, per-sessionId aggregation, incremental cache; on-demand details",
    },
    cards: {
      zh: [
        ["08:12", "0.1.3 的 release notes 起个草", 9, "~/work/allsessions"],
        ["8月17日", "trigram 和 fts5 哪个召回好", 22, "~/research/notes"],
      ],
      en: [
        ["08:12", "draft release notes for 0.1.3", 9, "~/work/allsessions"],
        ["Aug 17", "compare trigram vs fts5 recall", 22, "~/research/notes"],
      ],
    },
  },
  {
    id: "pi",
    name: "Pi",
    icon: "assets/agents/pi.svg",
    color: "#7a4b85",
    path: "~/.pi/agent/sessions",
    readonly: false,
    cov: {
      zh: "从 v1–v3 JSONL 树重建分支；消息、思考、工具、摘要、原始事件、检索、实时刷新",
      en: "Branch rebuilt from v1–v3 JSONL trees; messages, thinking, tools, summaries, raw events, search, live refresh",
    },
    cards: {
      zh: [
        ["11:56", "从 v3 树把分支顶端重建出来", 40, "~/work/pi-sessions"],
        ["8月29日", "这条超长重构线帮我总结下", 17, "~/work/pi-sessions"],
      ],
      en: [
        ["11:56", "rebuild branch tip from v3 tree", 40, "~/work/pi-sessions"],
        ["Aug 29", "summarize long refactor thread", 17, "~/work/pi-sessions"],
      ],
    },
  },
  {
    id: "kimi",
    name: "Kimi Code CLI",
    icon: "assets/agents/kimi.svg",
    color: "#176b72",
    path: "~/.kimi/sessions",
    readonly: false,
    cov: {
      zh: "wire.jsonl、工作目录、自定义标题、流式内容、子代理、工具、原始事件、检索与实时刷新",
      en: "wire.jsonl, working dirs, custom titles, streamed content, subagents, tools, raw events, search, live refresh",
    },
    cards: {
      zh: [
        ["9月2日", "导出格式想加个选项", 15, "~/work/allsessions"],
        ["8月10日", "redact 开关的语义定一下", 21, "~/work/allsessions"],
      ],
      en: [
        ["Sep 02", "name the export format options", 15, "~/work/allsessions"],
        ["Aug 10", "clarify redact flag semantics", 21, "~/work/allsessions"],
      ],
    },
  },
  {
    id: "opencode",
    name: "OpenCode",
    icon: "assets/agents/opencode.svg",
    color: "#8a3d38",
    path: "~/.local/share/opencode/opencode.db",
    readonly: true,
    cov: {
      zh: "SQLite 直读；消息、思考、工具、子代理、原始事件、检索与 WAL 实时刷新",
      en: "Reads SQLite directly; messages, thinking, tools, subagents, raw events, search, WAL live refresh",
    },
    cards: {
      zh: [
        ["9月8日", "opencode 的 tool 行归一化", 26, "~/work/allsessions"],
        ["8月10日", "WAL checkpoint 多久轮询一次", 8, "~/work/allsessions"],
      ],
      en: [
        ["Sep 08", "normalize opencode tool rows", 26, "~/work/allsessions"],
        ["Aug 10", "WAL checkpoint polling interval", 8, "~/work/allsessions"],
      ],
    },
  },
  {
    id: "zcode",
    name: "ZCode",
    icon: "assets/agents/zcode.png",
    color: "#3a5a78",
    path: "~/.zcode/cli/db/db.sqlite",
    readonly: true,
    cov: {
      zh: "SQLite；消息、思考、工具、压缩标记、原始事件、检索与 WAL 实时刷新；子代理除外",
      en: "SQLite; messages, thinking, tools, compaction markers, raw events, search, WAL live refresh; subagents excluded",
    },
    cards: {
      zh: [["9月14日", "索引里排除子代理的行", 11, "~/work/allsessions"]],
      en: [["Sep 14", "exclude subagent rows from index", 11, "~/work/allsessions"]],
    },
  },
  {
    id: "cursor",
    name: "Cursor",
    icon: "assets/agents/cursor.svg",
    color: "#4a4f57",
    path: "…/Cursor/User",
    readonly: true,
    cov: {
      zh: "IDE 会话记录与转录；浏览、检索、统计、导出与本地移除",
      en: "IDE conversations and transcripts; browse, search, stats, export, local removal",
    },
    cards: {
      zh: [
        ["09:02", "侧栏密度想调密一点", 14, "~/work/allsessions"],
        ["8月17日", "composer 的 diff 渲染坏了", 30, "~/work/app"],
      ],
      en: [
        ["09:02", "tune sidebar density options", 14, "~/work/allsessions"],
        ["Aug 17", "fix composer diff rendering", 30, "~/work/app"],
      ],
    },
  },
  {
    id: "devin",
    name: "Devin",
    icon: "assets/agents/devin.svg",
    color: "#4a4f57",
    path: "…/Devin/User + cli",
    readonly: true,
    cov: {
      zh: "桌面 acp-messages 与 CLI sessions.db；浏览、检索、统计、导出与本地移除",
      en: "Desktop acp-messages & CLI sessions.db; browse, search, stats, export, local removal",
    },
    cards: {
      zh: [["9月15日", "仓库初始化的 playbook 看一版", 18, "~/work/notes"]],
      en: [["Sep 15", "review playbook draft for repo setup", 18, "~/work/notes"]],
    },
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    icon: null,
    color: "#4a4f57",
    path: "~/.copilot/session-state",
    readonly: true,
    cov: {
      zh: "events.jsonl + workspace.yaml；消息、思考、工具、原始事件、检索、实时刷新与恢复",
      en: "events.jsonl + workspace.yaml; messages, thinking, tools, raw events, search, live refresh, resume",
    },
    cards: {
      zh: [
        ["10:33", "workspace.yaml 的结构讲一下", 7, "~/work/allsessions"],
        ["8月23日", "从 cli 接着上次的会话", 13, "~/work/app"],
      ],
      en: [
        ["10:33", "explain workspace.yaml schema", 7, "~/work/allsessions"],
        ["Aug 23", "resume prior session from cli", 13, "~/work/app"],
      ],
    },
  },
  {
    id: "hermes",
    name: "Hermes Agent",
    icon: null,
    color: "#6b5a2e",
    path: "~/.hermes · %LOCALAPPDATA%\\hermes",
    readonly: true,
    cov: {
      zh: "SQLite state.db 与各 profile 库；消息、思考、工具、原始事件、检索、WAL 刷新与恢复；子代理除外",
      en: "SQLite state.db and per-profile DBs; messages, thinking, tools, raw events, search, WAL refresh, resume; subagents excluded",
    },
    cards: {
      zh: [
        ["13:24", "排查 WAL checkpoint 卡顿", 36, "~/work/allsessions"],
        ["9月10日", "把简历解析拆成独立 skill", 25, "~/work/resume-tools"],
      ],
      en: [
        ["13:24", "profile WAL checkpoint stutters", 36, "~/work/allsessions"],
        ["Sep 10", "split resume parsing into a skill", 25, "~/work/resume-tools"],
      ],
    },
  },
];

const FEATURES = [
  {
    key: "unified",
    zh: {
      name: "统一会话浏览",
      hint: "UNIFIED VIEW",
      items: [
        "所有 Agent 的本地会话收进同一界面",
        "按来源、Provider、日期、项目、工作目录筛选",
        "规范化的对话、思考、工具调用与原始事件",
        "默认折叠子代理、侧链、注入上下文，界面干净",
        "监听源文件变更，自动刷新",
      ],
    },
    en: {
      name: "Unified sessions",
      hint: "UNIFIED VIEW",
      items: [
        "Local sessions from every agent in one interface",
        "Filter by source, provider, date, project, working directory",
        "Normalized conversations, thinking, tool calls, raw events",
        "Subagents, sidechains and injected context hidden by default",
        "Watches source files and refreshes automatically",
      ],
    },
  },
  {
    key: "search",
    zh: {
      name: "全文检索",
      hint: "FULL-TEXT INDEX",
      items: [
        "标题、路径、标签、备注、消息正文一起搜",
        "多词 AND 匹配；长词走本地 trigram 索引",
        "按相关度或最近活跃排序，命中片段直达上下文",
        "会话内高亮，支持上一个 / 下一个跳转",
      ],
    },
    en: {
      name: "Full-text search",
      hint: "FULL-TEXT INDEX",
      items: [
        "Titles, paths, tags, notes and message text searched together",
        "Multi-term AND matching; long terms use a local trigram index",
        "Rank by relevance or recency; snippets jump to context",
        "In-session highlighting with previous/next navigation",
      ],
    },
  },
  {
    key: "organize",
    zh: {
      name: "整理与统计",
      hint: "ORGANIZE",
      items: [
        "收藏、标签、备注与可复用的保存筛选",
        "本地归档与移除状态管理",
        "按 Agent 对比会话 / 消息 / 工具 / 活跃度统计",
        "批量导出 JSON 或 Markdown，可选脱敏",
      ],
    },
    en: {
      name: "Organize & stats",
      hint: "ORGANIZE",
      items: [
        "Favorites, tags, notes and reusable saved filters",
        "Local archive and removal state management",
        "Compare session, message, tool and activity stats per agent",
        "Batch export to JSON or Markdown, optional redaction",
      ],
    },
  },
  {
    key: "desktop",
    zh: {
      name: "桌面集成",
      hint: "DESKTOP",
      items: [
        "在文件管理器中定位会话源文件或项目目录",
        "在会话工作目录里直接打开系统终端",
        "回到对应 Agent 恢复会话继续对话",
        "五套主题、明暗配色、全键盘快捷键",
      ],
    },
    en: {
      name: "Desktop integration",
      hint: "DESKTOP",
      items: [
        "Reveal a session file or project directory in the file manager",
        "Open a system terminal in the session's working directory",
        "Resume the session in its original agent",
        "Five themes, light/dark schemes, full keyboard shortcuts",
      ],
    },
  },
  {
    key: "local",
    zh: {
      name: "本地优先",
      hint: "LOCAL-FIRST",
      items: [
        "不开本地 HTTP 端口，不内置 Node 运行时",
        "SQLite 增量索引缓存，首次扫描后秒开",
        "配置损坏时以安全默认值启动并引导修复",
        "各来源扫描健康状态可查，诊断信息可脱敏复制",
      ],
    },
    en: {
      name: "Local-first",
      hint: "LOCAL-FIRST",
      items: [
        "No local HTTP port, no bundled Node runtime",
        "Incremental SQLite index; instant after first scan",
        "Safe defaults plus guided repair on damaged config",
        "Per-source scan health and sanitized diagnostics",
      ],
    },
  },
];

const I18N = {
  zh: {
    "nav.sources": "来源索引",
    "nav.features": "功能",
    "nav.local": "本地优先",
    "nav.download": "下载",
    "nav.github": "GitHub",
    "hero.title": "{n} 个来源，一个索引。",
    "hero.sub":
      "把散落在各个 AI Agent 里的本地会话收进同一个索引。翻旧会话、搜全文、打标签、做导出，全都在本机完成，不开端口，不上云。",
    "hero.cta": "下载 AllSessions",
    "hero.cta.windows": "下载 Windows x64",
    "hero.cta.linux": "下载 Linux .deb",
    "hero.cta.mac": "选择 macOS 版本",
    "hero.cta.fallback": "前往 GitHub Releases",
    "hero.secondary": "GitHub 仓库",
    "hero.detect": "已识别你的系统：",
    "release.loading": "正在读取最新版本…",
    "release.ready": "已读取最新版本，可直接下载安装包。",
    "release.error": "暂时无法读取最新版本，请前往 GitHub Releases 下载。",
    "release.retry": "重试",
    "aria.sections": "页面分区",
    "aria.cabinet": "会话目录柜演示",
    "aria.projectLinks": "项目链接",
    "aria.sources": "会话来源",
    "tray.search": "搜索…",
    "tray.demo": "演示",
    "tray.msgs": "{n} 条消息",
    "stamp.readonly": "只读 READ-ONLY",
    "sources.title": "来源索引",
    "sources.intro":
      "下面 {n} 张卡，一张对一个来源：读哪个目录、能解析出什么，照实写。盖了只读章的，原始数据一个字节都不会动。",
    "sources.note":
      "只读来源的原始数据永不被修改；「本地移除」只在 AllSessions 内生效，删除原件请回到对应 Agent。",
    "features.title": "功能",
    "local.title": "本地优先",
    "local.heading": "数据不出这台机器。",
    "local.stamp": "LOCAL ONLY",
    "local.f1": "解析、搜索、缓存全部由本机的 Rust 完成，不开放本地端口；界面与核心之间的通信也不经过网络。",
    "local.f2": "全文检索用本地 SQLite 的 trigram 索引，整个索引都在你自己的磁盘上。",
    "local.f3": "永久删除原始记录前先自动本地备份；只读来源的原始数据绝不被修改。",
    "local.f4": "导出可选脱敏；诊断信息可复制且不含会话内容与本地路径。",
    "local.config": "配置",
    "local.workspace": "收藏 · 标签 · 备注",
    "local.index": "全文索引缓存",
    "local.indexPath": "平台缓存目录 / AllSessions",
    "local.net": "网络请求",
    "local.netValue": "0 — 检索与浏览不发出任何请求",
    "desk.title": "下载",
    "desk.intro": "当前版本",
    "desk.recommended": "你的平台",
    "desk.macNote": "尚未公证：首次启动请在「系统设置 → 隐私与安全性」中允许。",
    "desk.winNote": "x64 · NSIS 当前用户安装 · 签名自动更新",
    "desk.linuxNote": "Debian / Ubuntu x64 · GNOME 桌面可能需要 AppIndicator 扩展",
    "desk.all": "查看全部发布 →",
    "footer.disclaimer":
      "AllSessions 是独立社区项目，与所支持 Agent 的厂商无任何隶属、赞助或背书关系；产品与公司名称仅用于标识兼容的本地数据来源。",
    "footer.releases": "Releases",
    "footer.repository": "仓库",
    "footer.issues": "议题",
    "footer.changelog": "更新日志",
    "tray.cards": "{n} 张卡",
    "platform.mac": "macOS",
    "platform.windows": "Windows",
    "platform.linux": "Linux",
  },
  en: {
    "nav.sources": "Sources",
    "nav.features": "Features",
    "nav.local": "Local-first",
    "nav.download": "Download",
    "nav.github": "GitHub",
    "hero.title": "Every agent. One index.",
    "hero.sub":
      "Bring local sessions scattered across AI agents into one index. Browse, search, tag, and export entirely on your machine, with no local port and no cloud.",
    "hero.cta": "Download AllSessions",
    "hero.cta.windows": "Download for Windows x64",
    "hero.cta.linux": "Download Linux .deb",
    "hero.cta.mac": "Choose a macOS build",
    "hero.cta.fallback": "Open GitHub Releases",
    "hero.secondary": "GitHub repository",
    "hero.detect": "Detected for you:",
    "release.loading": "Reading the latest release…",
    "release.ready": "Latest release loaded. Installers are ready to download.",
    "release.error": "The latest release is unavailable right now. Download from GitHub Releases instead.",
    "release.retry": "Retry",
    "aria.sections": "Page sections",
    "aria.cabinet": "Session catalog cabinet demo",
    "aria.projectLinks": "Project links",
    "aria.sources": "Session sources",
    "tray.search": "Search…",
    "tray.demo": "DEMO",
    "tray.msgs": "{n} msgs",
    "stamp.readonly": "READ-ONLY",
    "sources.title": "Source index",
    "sources.intro":
      "The {n} cards below cover every source: the directory read and what gets parsed, exactly as shipped. Sources stamped read-only are never modified.",
    "sources.note":
      "Read-only sources are never modified on disk; local removal applies inside AllSessions only — delete originals in the agent itself.",
    "features.title": "Features",
    "local.title": "Local-first",
    "local.heading": "Your data never leaves this machine.",
    "local.stamp": "LOCAL ONLY",
    "local.f1": "Parsing, search, and caching all run in Rust on your machine. No local port is opened, and the UI talks to the core over IPC, not the network.",
    "local.f2": "Full-text search is a local SQLite trigram index — the whole index lives on your disk.",
    "local.f3": "A local backup precedes any permanent deletion; read-only sources are never modified.",
    "local.f4": "Optional export redaction; copyable diagnostics contain no session content or paths.",
    "local.config": "Config",
    "local.workspace": "Favorites · tags · notes",
    "local.index": "Full-text index",
    "local.indexPath": "Platform cache dir / AllSessions",
    "local.net": "Network calls",
    "local.netValue": "0 — browsing and search send nothing",
    "desk.title": "Download",
    "desk.intro": "Current version",
    "desk.recommended": "Your platform",
    "desk.macNote":
      "Not notarized yet: allow the app in System Settings → Privacy & Security on first launch.",
    "desk.winNote": "x64 · NSIS per-user install · signed auto-update",
    "desk.linuxNote":
      "Debian / Ubuntu x64 · GNOME may need an AppIndicator extension",
    "desk.all": "Browse all releases →",
    "footer.disclaimer":
      "AllSessions is an independent community project, not affiliated with or endorsed by the vendors of the supported agents. Product names identify compatible local data sources only.",
    "footer.releases": "Releases",
    "footer.repository": "Repository",
    "footer.issues": "Issues",
    "footer.changelog": "Changelog",
    "tray.cards": "{n} cards",
    "platform.mac": "macOS",
    "platform.windows": "Windows",
    "platform.linux": "Linux",
  },
};

const state = {
  lang: "zh",
  agent: "codex",
  feature: FEATURES[0].key,
  platform: null,
  releaseStatus: "loading",
  assets: {},
};

const $ = (sel) => document.querySelector(sel);

// 隐私模式下 localStorage/sessionStorage 可能抛异常，统一兜底
const storage = {
  get(k, session) {
    try {
      return (session ? sessionStorage : localStorage).getItem(k);
    } catch {
      return null;
    }
  },
  set(k, v, session) {
    try {
      (session ? sessionStorage : localStorage).setItem(k, v);
    } catch {
      /* 写入失败不影响功能 */
    }
  },
};

function t(key, vars) {
  let s = I18N[state.lang][key] ?? I18N.en[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
  return s;
}

function applyI18n() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document
    .querySelectorAll("[data-i18n]")
    .forEach((el) => (el.textContent = t(el.dataset.i18n, i18nVars(el.dataset.i18n))));
  document
    .querySelectorAll("[data-i18n-aria]")
    .forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
  document
    .querySelectorAll("[data-lang-opt]")
    .forEach((el) =>
      el.classList.toggle("is-on", el.dataset.langOpt === state.lang)
    );
  document.title =
    state.lang === "zh"
      ? "AllSessions — 本地 AI 会话索引"
      : "AllSessions — local AI session index";
  updateDownloadUI();
  renderTray(state.agent);
}

/* ———— 柜体：抽屉 + 卡片屉 ———— */

function agentIcon(agent) {
  if (agent.icon)
    return `<img src="${agent.icon}" alt="" loading="lazy" />`;
  // Copilot 与 Hermes 没有 lobe 图标，画一枚最小几何徽记
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="5.5"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" stroke-linecap="round"/></svg>`;
}

// “Codex 归档”这类来源的名字分语言，其余 Agent 名字中英通用
const agentName = (a) => (typeof a.name === "string" ? a.name : a.name[state.lang]);

// 数量从 AGENTS 推导，新增来源时标题与索引说明自动跟进；
// Codex 归档也算一个来源，与标题里的 {n} 和索引卡数量保持一致
const i18nVars = (key) =>
  key === "hero.title" || key === "sources.intro"
      ? { n: AGENTS.length }
      : undefined;

function renderDrawers() {
  const grid = $("#drawer-grid");
  grid.innerHTML = AGENTS.map(
    (a) => `
    <button class="drawer${a.id === state.agent ? " is-open" : ""}" type="button" role="tab" id="drawer-tab-${a.id}" data-agent="${a.id}" aria-controls="card-tray" aria-selected="${a.id === state.agent}" tabindex="${a.id === state.agent ? 0 : -1}">
      <span class="drawer__frame">
        <span class="drawer__name">${agentName(a)}</span>
        <span class="drawer__count">${String(a.cards[state.lang].length).padStart(2, "0")}</span>
      </span>
      <span class="drawer__pull" aria-hidden="true"></span>
    </button>`
  ).join("");
  grid.querySelectorAll(".drawer").forEach((btn) => {
    btn.addEventListener("click", () => selectAgent(btn.dataset.agent));
    btn.addEventListener("keydown", onDrawerKeydown);
  });
}

// APG tab 模式：方向键循环切换并自动激活，Home/End 跳首尾
function onDrawerKeydown(e) {
  const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -1, ArrowDown: 1 }[e.key];
  let idx = AGENTS.findIndex((a) => a.id === state.agent);
  if (step) idx = (idx + step + AGENTS.length) % AGENTS.length;
  else if (e.key === "Home") idx = 0;
  else if (e.key === "End") idx = AGENTS.length - 1;
  else return;
  e.preventDefault();
  selectAgent(AGENTS[idx].id);
  $(`#drawer-tab-${AGENTS[idx].id}`)?.focus();
}

function selectAgent(id) {
  if (state.agent === id) return;
  state.agent = id;
  document
    .querySelectorAll(".drawer")
    .forEach((d) => {
      const open = d.dataset.agent === id;
      d.classList.toggle("is-open", open);
      d.setAttribute("aria-selected", String(open));
      d.tabIndex = open ? 0 : -1;
    });
  renderTray(id);
}

function renderTray(id) {
  const agent = AGENTS.find((a) => a.id === id);
  $("#card-tray").setAttribute("aria-labelledby", `drawer-tab-${id}`);
  $("#tray-agent").textContent = agentName(agent);
  $("#tray-path").textContent = agent.path;
  $("#tray-count").textContent = t("tray.cards", {
    n: agent.cards[state.lang].length,
  });
  const stamp = $("#tray-stamp");
  stamp.hidden = !agent.readonly;
  stamp.textContent = t("stamp.readonly");
  $("#tray-cards").innerHTML = agent.cards[state.lang]
    .map(
      ([time, title, msgs, cwd], i) => `
    <div class="index-card" style="--i:${i}">
      <div class="index-card__meta"><span>${time}</span><span>${t("tray.msgs", { n: msgs })}</span></div>
      <strong class="index-card__title">${title}</strong>
      <span class="index-card__path">${cwd}</span>
    </div>`
    )
    .join("");
}

/* ———— 来源索引 ———— */

function renderSources() {
  $("#source-index").innerHTML = AGENTS.map(
    (a) => `
    <a class="source-card" href="#top" data-agent="${a.id}" style="--agent:${a.color}">
      <div class="source-card__head">
        <span class="source-card__icon">${agentIcon(a)}</span>
        <div class="source-card__id">
          <span class="source-card__name">${agentName(a)}</span>
          <span class="source-card__path">${a.path}</span>
        </div>
      </div>
      <p class="source-card__cov">${a.cov[state.lang]}</p>
      ${a.readonly ? `<span class="stamp">${t("stamp.readonly")}</span>` : ""}
    </a>`
  ).join("");
  // 点卡片即拉开柜体对应抽屉，锚点 #top 负责平滑滚回柜体
  document.querySelectorAll(".source-card").forEach((card) =>
    card.addEventListener("click", () => selectAgent(card.dataset.agent))
  );
}

/* ———— 功能 ———— */

function renderFeatures() {
  $("#feature-drawers").innerHTML = FEATURES.map((f, i) => {
    const c = f[state.lang];
    return `
    <div class="fdrawer${f.key === state.feature ? " is-open" : ""}" style="--i:${i}">
      <button class="fdrawer__front" type="button" data-feature="${f.key}" aria-expanded="${f.key === state.feature}" aria-controls="ftray-${f.key}">
        <span class="fdrawer__frame">
          <span class="fdrawer__name">${c.name}</span>
          <span class="fdrawer__meta">
            <span class="fdrawer__hint">${c.hint}</span>
            <span class="fdrawer__count">${String(c.items.length).padStart(2, "0")}</span>
          </span>
        </span>
        <span class="fdrawer__pull" aria-hidden="true"></span>
      </button>
      <div class="fdrawer__tray" id="ftray-${f.key}"><div class="fdrawer__inner">
        <div class="fdrawer__card"><ul>
          ${c.items.map((it) => `<li>${it}</li>`).join("")}
        </ul></div>
      </div></div>
    </div>`;
  }).join("");
  const fronts = [...document.querySelectorAll(".fdrawer__front")];
  fronts.forEach((btn) => {
    // 互斥展开：一次只拉一个抽屉
    btn.addEventListener("click", () => {
      const d = btn.closest(".fdrawer");
      const open = !d.classList.contains("is-open");
      state.feature = open ? btn.dataset.feature : null;
      fronts.forEach((b) => {
        b.closest(".fdrawer").classList.remove("is-open");
        b.setAttribute("aria-expanded", "false");
      });
      d.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
    btn.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      e.preventDefault();
      const i = fronts.indexOf(btn) + (e.key === "ArrowDown" ? 1 : -1);
      fronts[(i + fronts.length) % fronts.length].focus();
    });
  });
}

/* ———— 平台检测 + Release ———— */

function detectPlatform() {
  const ua = navigator.userAgent;
  // iPhone UA 含 "like Mac OS X"、iPadOS 桌面模式含 "Macintosh"——先排除触屏移动端，
  // 否则手机访客会被误标 macOS 并推荐 .dmg
  const isMobile =
    /iPhone|iPad|iPod|Android|Mobile/i.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  state.platform = isMobile
    ? null
    : /Windows/.test(ua)
      ? "windows"
      : /Mac OS X|Macintosh/.test(ua)
        ? "mac"
        : "linux";
  $(".hero__detect").hidden = !state.platform;
  document.querySelectorAll(".slip").forEach((slip) => {
    slip.classList.remove("is-detected");
    slip.querySelector(".slip__rec")?.setAttribute("hidden", "");
  });
  if (!state.platform) {
    updateDownloadUI();
    return;
  }
  $("#detect-platform").textContent = t(`platform.${state.platform}`);
  const slip = document.querySelector(`.slip[data-platform="${state.platform}"]`);
  slip?.classList.add("is-detected");
  slip?.querySelector(".slip__rec")?.removeAttribute("hidden");
  updateDownloadUI();
}

function updateDownloadUI() {
  const heroDownload = $("#hero-download");
  const heroLabel = heroDownload.querySelector("span");
  const releaseStatus = $("#release-status");
  const retry = $("#release-retry");

  releaseStatus.dataset.state = state.releaseStatus;
  releaseStatus.textContent = t(`release.${state.releaseStatus}`);
  retry.hidden = state.releaseStatus !== "error";

  if (state.releaseStatus === "error") {
    heroDownload.href = `https://github.com/${REPO}/releases/latest`;
    heroLabel.textContent = t("hero.cta.fallback");
    return;
  }

  if (state.platform === "windows" && state.assets.windows) {
    heroDownload.href = state.assets.windows;
    heroLabel.textContent = t("hero.cta.windows");
    return;
  }
  if (state.platform === "linux" && state.assets.linux) {
    heroDownload.href = state.assets.linux;
    heroLabel.textContent = t("hero.cta.linux");
    return;
  }
  if (state.platform === "mac") {
    heroDownload.href = "#download";
    heroLabel.textContent = t("hero.cta.mac");
    return;
  }

  heroDownload.href = "#download";
  heroLabel.textContent = t("hero.cta");
}

const RELEASE_CACHE_KEY = "allsessions_site_release";
const RELEASE_CACHE_TTL = 10 * 60 * 1000;

async function fetchRelease() {
  const cached = storage.get(RELEASE_CACHE_KEY, true);
  if (cached) {
    try {
      const { ts, data } = JSON.parse(cached);
      if (Date.now() - ts < RELEASE_CACHE_TTL) return data;
    } catch {
      /* 坏缓存按未命中处理 */
    }
  }
  const res = await fetch(API_URL, { signal: AbortSignal.timeout?.(8000) });
  if (!res.ok) throw new Error(String(res.status));
  const data = await res.json();
  storage.set(RELEASE_CACHE_KEY, JSON.stringify({ ts: Date.now(), data }), true);
  return data;
}

async function loadRelease() {
  state.releaseStatus = "loading";
  state.assets = {};
  updateDownloadUI();
  try {
    const data = await fetchRelease();
    $("#plate-version").textContent = data.tag_name;
    $("#desk-version").textContent = data.tag_name;
    const match = {
      "mac-arm64": /mac-arm64\.dmg$/,
      "mac-x64": /mac-x64\.dmg$/,
      windows: /windows-x64-setup\.exe$/,
      linux: /linux-x64\.deb$/,
    };
    for (const asset of data.assets) {
      for (const [key, re] of Object.entries(match)) {
        if (!re.test(asset.name)) continue;
        const el = document.querySelector(`[data-asset="${key}"]`);
        if (!el) continue;
        el.href = asset.browser_download_url;
        state.assets[key] = asset.browser_download_url;
        el.querySelector(".slip__file").textContent = asset.name;
        el.querySelector(".slip__size").textContent =
          `${(asset.size / 1048576).toFixed(1)} MB`;
      }
    }
    if (!Object.keys(state.assets).length) throw new Error("Release 中没有匹配的安装包");
    state.releaseStatus = "ready";
  } catch (error) {
    $("#plate-version").textContent = "";
    $("#desk-version").textContent = "—";
    state.releaseStatus = "error";
    state.assets = {};
    console.warn("无法读取 GitHub Release", error);
  } finally {
    updateDownloadUI();
  }
}

/* ———— init ———— */

function init() {
  const saved = storage.get("allsessions_site_lang");
  state.lang =
    saved === "zh" || saved === "en"
      ? saved
      : navigator.language.toLowerCase().startsWith("zh")
        ? "zh"
        : "en";

  renderDrawers();
  renderSources();
  renderFeatures();
  applyI18n();
  detectPlatform();
  // 状态区默认 hidden——无 JS 的访客不该看到一句永远不会更新的「正在读取最新版本…」
  $(".release-state").hidden = false;
  loadRelease();

  // 功能屉滚入视口才发牌；容器是静态节点，语言切换重渲染不影响 is-dealt
  const featureTray = $("#feature-drawers");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries, obs) => {
        if (entries.some((e) => e.isIntersecting)) {
          featureTray.classList.add("is-dealt");
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    ).observe(featureTray);
  } else {
    featureTray.classList.add("is-dealt");
  }

  $("#lang-toggle").addEventListener("click", () => {
    state.lang = state.lang === "zh" ? "en" : "zh";
    storage.set("allsessions_site_lang", state.lang);
    renderDrawers();
    renderSources();
    renderFeatures();
    applyI18n();
    detectPlatform();
  });
  $("#release-retry").addEventListener("click", loadRelease);
}

init();
