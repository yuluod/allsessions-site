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
        ["09:41", "把会话存储迁移到 rusqlite", 47, "~/work/allsessions"],
        ["9月15日", "修复 GNOME 托盘图标回归", 19, "~/work/allsessions"],
        ["9月14日", "给会话目录监听加防抖", 33, "~/work/allsessions"],
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
        ["10:07", "梳理 token 刷新链路", 61, "~/work/api-gateway"],
        ["9月15日", "把会话视图拆成双栏", 28, "~/work/allsessions"],
        ["9月8日", "遇到 429 用指数退避重试", 12, "~/work/api-gateway"],
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
        ["08:12", "起草 0.1.3 的发布说明", 9, "~/work/allsessions"],
        ["8月17日", "对比 trigram 与 fts5 的召回率", 22, "~/research/notes"],
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
        ["11:56", "从 v3 树重建分支顶端", 40, "~/work/pi-sessions"],
        ["8月29日", "总结超长的重构线程", 17, "~/work/pi-sessions"],
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
        ["9月2日", "命名导出格式选项", 15, "~/work/allsessions"],
        ["8月10日", "澄清脱敏开关的语义", 21, "~/work/allsessions"],
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
        ["9月8日", "规范化 opencode 工具行", 26, "~/work/allsessions"],
        ["8月10日", "WAL checkpoint 轮询间隔", 8, "~/work/allsessions"],
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
      zh: [["9月14日", "把子代理行排除出索引", 11, "~/work/allsessions"]],
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
        ["09:02", "调整侧栏密度选项", 14, "~/work/allsessions"],
        ["8月17日", "修复 composer 的 diff 渲染", 30, "~/work/app"],
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
      zh: [["9月15日", "评审仓库初始化 playbook 草稿", 18, "~/work/notes"]],
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
        ["10:33", "解释 workspace.yaml 的结构", 7, "~/work/allsessions"],
        ["8月23日", "从 cli 恢复上一次会话", 13, "~/work/app"],
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
        "多词 AND 匹配；长词走本地三角索引",
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
    "nav.features": "功能抽屉",
    "nav.local": "本地优先",
    "nav.download": "下载",
    "nav.github": "GitHub",
    "hero.title": "{n} 个来源，一张工作台。",
    "hero.sub":
      "{agents}——散落在本机各处的会话，收进同一个桌面应用里浏览、搜索、整理、导出。全程本地，不开端口，不上云。",
    "hero.cta": "取出卡片 · 下载",
    "hero.secondary": "GitHub 仓库",
    "hero.detect": "已识别你的系统：",
    "tray.search": "搜索…",
    "tray.demo": "演示",
    "tray.msgs": "{n} 条消息",
    "stamp.readonly": "只读 READ-ONLY",
    "sources.title": "来源索引",
    "sources.intro": "{n} 个来源，{n} 张索引卡。路径即事实——写在哪就从哪读；只读来源一律盖章。",
    "sources.note":
      "只读来源的原始数据永不被修改；「本地移除」只在 AllSessions 内生效，删除原件请回到对应 Agent。",
    "features.title": "功能抽屉",
    "local.title": "本地优先",
    "local.heading": "卡片不出柜子。",
    "local.stamp": "LOCAL ONLY",
    "local.f1": "解析、搜索、缓存全部由 Rust 在本机完成；不开本地 HTTP 端口，前后端只走 IPC。",
    "local.f2": "全文索引是 SQLite 三角索引，整棵索引树都在你的磁盘上。",
    "local.f3": "永久删除原始记录前先自动本地备份；只读来源的原始数据绝不被修改。",
    "local.f4": "导出可选脱敏；诊断信息可复制且不含会话内容与本地路径。",
    "local.config": "配置",
    "local.workspace": "收藏 · 标签 · 备注",
    "local.index": "全文索引缓存",
    "local.indexPath": "平台缓存目录 / AllSessions",
    "local.net": "网络请求",
    "local.netValue": "0 — 检索与浏览不发出任何请求",
    "desk.title": "流通台 · 取卡处",
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
    "footer.made": "本地手工打造",
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
    "hero.title": "Every agent. One workbench.",
    "hero.sub":
      "{agents}: sessions scattered across your machine, gathered into one desktop app to browse, search, organize, and export. Entirely local: no port, no cloud.",
    "hero.cta": "Pull the card · Download",
    "hero.secondary": "GitHub repository",
    "hero.detect": "Detected for you:",
    "tray.search": "Search…",
    "tray.demo": "DEMO",
    "tray.msgs": "{n} msgs",
    "stamp.readonly": "READ-ONLY",
    "sources.title": "Source index",
    "sources.intro":
      "{n} sources, {n} index cards. Paths are facts: records are read where they are written; read-only sources carry the stamp.",
    "sources.note":
      "Read-only sources are never modified on disk; local removal applies inside AllSessions only — delete originals in the agent itself.",
    "features.title": "Feature drawers",
    "local.title": "Local-first",
    "local.heading": "The cards never leave the cabinet.",
    "local.stamp": "LOCAL ONLY",
    "local.f1": "Parsing, search, and caching all run in Rust on your machine; no local HTTP port, IPC only.",
    "local.f2": "Full-text search is a local SQLite trigram index — the whole index lives on your disk.",
    "local.f3": "A local backup precedes any permanent deletion; read-only sources are never modified.",
    "local.f4": "Optional export redaction; copyable diagnostics contain no session content or paths.",
    "local.config": "Config",
    "local.workspace": "Favorites · tags · notes",
    "local.index": "Full-text index",
    "local.indexPath": "Platform cache dir / AllSessions",
    "local.net": "Network calls",
    "local.netValue": "0 — browsing and search send nothing",
    "desk.title": "Circulation desk",
    "desk.intro": "Current version",
    "desk.recommended": "YOURS",
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
    "footer.made": "Made locally",
    "tray.cards": "{n} cards",
    "platform.mac": "macOS",
    "platform.windows": "Windows",
    "platform.linux": "Linux",
  },
};

const state = {
  lang: "zh",
  agent: "codex",
};

const $ = (sel) => document.querySelector(sel);

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
    .querySelectorAll("[data-lang-opt]")
    .forEach((el) =>
      el.classList.toggle("is-on", el.dataset.langOpt === state.lang)
    );
  document.title =
    state.lang === "zh"
      ? "AllSessions — 本地 AI 会话工作台"
      : "AllSessions — local AI session workbench";
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

// 数量与名单从 AGENTS 推导，新增来源时文案自动跟进，无需改这里；
// Codex 归档也算一个来源，与标题里的 {n} 和索引卡数量保持一致
const agentList = () =>
  AGENTS.map((a) => agentName(a)).join(state.lang === "zh" ? "、" : ", ");

const i18nVars = (key) =>
  key === "hero.sub"
    ? { agents: agentList() }
    : key === "hero.title" || key === "sources.intro"
      ? { n: AGENTS.length }
      : undefined;

function renderDrawers() {
  const grid = $("#drawer-grid");
  grid.innerHTML = AGENTS.map(
    (a) => `
    <button class="drawer${a.id === state.agent ? " is-open" : ""}" type="button" data-agent="${a.id}" aria-pressed="${a.id === state.agent}">
      <span class="drawer__frame">
        <span class="drawer__name">${agentName(a)}</span>
        <span class="drawer__count">${String(a.cards[state.lang].length).padStart(2, "0")}</span>
      </span>
      <span class="drawer__pull" aria-hidden="true"></span>
    </button>`
  ).join("");
  grid.querySelectorAll(".drawer").forEach((btn) =>
    btn.addEventListener("click", () => selectAgent(btn.dataset.agent))
  );
}

function selectAgent(id) {
  if (state.agent === id) return;
  state.agent = id;
  document
    .querySelectorAll(".drawer")
    .forEach((d) => {
      const open = d.dataset.agent === id;
      d.classList.toggle("is-open", open);
      d.setAttribute("aria-pressed", String(open));
    });
  renderTray(id);
}

function renderTray(id) {
  const agent = AGENTS.find((a) => a.id === id);
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
    <div class="source-card" style="--agent:${a.color}">
      <span class="source-card__icon">${agentIcon(a)}</span>
      <div class="source-card__head">
        <span class="source-card__name">${agentName(a)}</span>
        <span class="source-card__path">${a.path}</span>
      </div>
      <p class="source-card__cov">${a.cov[state.lang]}</p>
      ${a.readonly ? `<span class="stamp">${t("stamp.readonly")}</span>` : ""}
    </div>`
  ).join("");
}

/* ———— 功能抽屉 ———— */

function renderFeatures() {
  $("#feature-drawers").innerHTML = FEATURES.map((f, i) => {
    const c = f[state.lang];
    return `
    <div class="fdrawer${i === 0 ? " is-open" : ""}">
      <button class="fdrawer__front" type="button" aria-expanded="${i === 0}">
        <span class="fdrawer__frame">
          <span class="fdrawer__name">${c.name}</span>
          <span class="fdrawer__hint">${c.hint}</span>
        </span>
        <span class="fdrawer__pull" aria-hidden="true"></span>
      </button>
      <div class="fdrawer__tray"><div class="fdrawer__inner">
        <div class="fdrawer__card"><ul>
          ${c.items.map((it) => `<li>${it}</li>`).join("")}
        </ul></div>
      </div></div>
    </div>`;
  }).join("");
  document.querySelectorAll(".fdrawer__front").forEach((btn) =>
    btn.addEventListener("click", () => {
      const d = btn.closest(".fdrawer");
      const open = d.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    })
  );
}

/* ———— 平台检测 + Release ———— */

function detectPlatform() {
  const ua = navigator.userAgent;
  // iPhone UA 含 "like Mac OS X"、iPadOS 桌面模式含 "Macintosh"——先排除触屏移动端，
  // 否则手机访客会被误标 macOS 并推荐 .dmg
  const isMobile =
    /iPhone|iPad|iPod|Android|Mobile/i.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  const p = isMobile
    ? null
    : /Windows/.test(ua)
      ? "windows"
      : /Mac OS X|Macintosh/.test(ua)
        ? "mac"
        : "linux";
  $(".hero__detect").hidden = !p;
  if (!p) return;
  $("#detect-platform").textContent = t(`platform.${p}`);
  const slip = document.querySelector(`.slip[data-platform="${p}"]`);
  slip?.classList.add("is-detected");
  slip?.querySelector(".slip__rec")?.removeAttribute("hidden");
}

async function loadRelease() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
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
        el.querySelector(".slip__file").textContent = asset.name;
        el.querySelector(".slip__size").textContent =
          `${(asset.size / 1048576).toFixed(1)} MB`;
      }
    }
  } catch {
    $("#plate-version").textContent = "";
    $("#desk-version").textContent = "releases";
  }
}

/* ———— init ———— */

function init() {
  const saved = localStorage.getItem("allsessions_site_lang");
  state.lang =
    saved || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en");

  renderDrawers();
  renderSources();
  renderFeatures();
  applyI18n();
  detectPlatform();
  loadRelease();

  $("#lang-toggle").addEventListener("click", () => {
    state.lang = state.lang === "zh" ? "en" : "zh";
    localStorage.setItem("allsessions_site_lang", state.lang);
    renderDrawers();
    renderSources();
    renderFeatures();
    applyI18n();
    detectPlatform();
  });
}

init();
