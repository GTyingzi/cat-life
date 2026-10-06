# 猫咪日常 / Everyday Cats

中英双语猫咪生活展示与引流单页。React + TypeScript + Vite，静态部署；Node.js 用于开发与构建。

## 本地运行

使用 Node.js 24.13.1（见 `.node-version`），使用 npm：

```sh
npm ci
npm run dev
```

启动后访问终端打印的网址。`npm run typecheck` 检查类型，`npm run lint` 检查代码。

## 构建与部署

```sh
npm run build
npm run preview
```

`dist/` 是完整静态部署文件，包含网页、图片、视频与素材来源页，可交给静态服务器托管。`preview` 仅用于本地验收。相对资源路径支持网站根目录或子目录部署。

### GitHub 与 Cloudflare Pages

公开仓库为 [GTyingzi/cat-life](https://github.com/GTyingzi/cat-life)。CI 在 `main` 推送、拉取请求及手动运行时依次执行 `npm ci`、`npm run lint`、`npm run build`；构建脚本包含 TypeScript 类型检查。

Cloudflare Pages 项目 `cat-life` 已通过原生 Git 集成连接此仓库，生产分支为 `main`，其他分支自动生成预览部署。构建系统为 Version 3，构建设置如下：

| 设置 | 值 |
| --- | --- |
| 构建命令 | `npm ci && npm run lint && npm run build` |
| 输出目录 | `dist` |
| 环境变量 `NODE_VERSION` | `24.13.1` |
| 环境变量 `SKIP_DEPENDENCY_INSTALL` | `1` |

生产和预览环境都使用上述构建设置。Pages 在构建命令中安装依赖；无需在仓库或 CI 中配置部署令牌，也无需自建服务器。`dist/` 只包含公开网页资源，本地 `.openai/`、`.idea/`、`.DS_Store`、`.env*`、`artifacts/` 和依赖目录不提交。

正式站点为 [cat-life.club](https://cat-life.club/)，测试入口为 [preview.cat-life.club](https://preview.cat-life.club/)。三个自定义域名（主域名、`www`、`preview`）均已绑定 Pages 并启用 SSL；`@`、`www`、`preview` 的代理 CNAME 均指向 `cat-life.pages.dev`。测试入口绑定生产版本，用于域名与网络验收；非 `main` 分支另有各自的 Pages 预览地址。

Cloudflare Single Redirect 规则只匹配 `www.cat-life.club`，将 HTTP 和 HTTPS 请求以 308 永久跳转到 `https://cat-life.club`，保留路径和查询参数。独立测试域名已由用户在此前失败的同一国内手机网络中确认页面、图片和视频正常，随后完成正式域名切换；用户随后在同一国内手机网络中确认主域名和 `www` 均正常，且 `www` 跳转正确。国内可访问性仍以实际网络测试为准。

首次切换前的 DNS 备份保存在本地 `artifacts/deployment/cat-life-before-cutover.zone`（不公开提交）。原 Sites 站点 [cats-life.zi498504.chatgpt.site](https://cats-life.zi498504.chatgpt.site/) 及原自定义域名绑定保留，本地 `.openai/hosting.json` 已停止跟踪但仍保存在原工作目录；历史 `project_id` 是非密钥项目标识。

回滚网站版本：在 Cloudflare 控制台 → Workers & Pages → `cat-life` → Deployments，选择上一份已验收的生产部署执行 Rollback；回滚后还需撤销错误源码提交并推送，避免下一次自动部署重新引入问题。

首次域名切换回退：先停用 `www.cat-life.club to cat-life.club` 跳转规则，再移除根域名的 Pages CNAME，恢复备份中两条 DNS only A 记录（`172.66.3.26`、`162.159.143.30`），将 `www` 的代理 CNAME 恢复为 `custom-domains.chatgpt.site`，核对原 Sites 自定义域名状态与访问。保留原验证 TXT 记录和独立测试域名，不直接重复导入整份备份，以免覆盖后续新增记录。

后续发布：修改内容后先运行 `npm run lint && npm run build`，提交并推送 `main` 即自动更新正式站点；分支推送仅更新预览。查看 [GitHub Actions](https://github.com/GTyingzi/cat-life/actions) 的 CI 结果及 Cloudflare Deployments 中相同提交 SHA 的生产部署状态，确认发布成功后检查正式域名。Pages 自身也执行安装、lint 和类型检查/构建，任一步失败都不会发布新版本。

2026-10-04 验证记录：本地 lint、类型检查和构建，以及线上 CI、首次 Pages 生产部署均通过；22 个静态文件在测试域名及主域名上均返回 200，且与本地构建 SHA-256 一致。桌面和 390px 手机布局中英文切换正常，视频播放至结束。一次临时分支故障测试确认 CI 在 lint 失败后跳过构建，Pages 同时拒绝发布，现有生产版本继续可访问；恢复分支后 CI 和预览部署重新成功。本地截图、资源校验和流水线证据位于 `artifacts/deployment/`。

## 修改入口与内容

编辑 `src/content.ts`：

- `siteContent.brand`：中文与英文品牌名。
- `siteContent.shops`：可增加多个平台店铺；每项设置唯一 `id`、中英文 `name` / `description` 和真实 `url`。
- `siteContent.gallery` / `video`：照片、短视频、封面及中英文说明。
- `siteContent.physicalProducts`：六类实体用品卡片，食碗、猫玩具、猫窝、猫抓板／猫爬架、猫砂盆、外出包。
- `siteContent.softwareAndDevices`：猫叫识别 App、项圈等硬件 + App 的方向卡片。
- `copy`：全部界面文案。每次编辑同步维护 `zh-CN` 和 `en`。

链接接受 http/https；未配置或无效时显示“即将开放 / Coming soon”。所有真实入口须在公开部署前检查。内容修改后重新构建部署。

商品和服务的每项配置包含 `id`、中英文 `name`、`image`、中英文 `alt`、`action` 与可选 `url`。`action` 为 `purchase` 或 `download`；`url` 空缺或无效时显示相应待提供状态，有效 http/https 链接才会显示购买／下载入口，在新标签页打开。图片只作方向示意，不代表真实上架产品；更换成实际产品后请同步调整区域说明。

`objectPosition` 可调整裁切焦点，例如 `50% 65%`；`imageFit: 'contain'` 用于完整保留用品主体。六类用品和两类服务各自独立维护，补充一个入口不会影响其他卡片。

访客默认看到中文；语言选择保存在当前浏览器的 `localStorage`（键 `everyday-cats-language`）。浏览器禁止存储时，切换仍可使用，只是不跨刷新保存。页面不采集访客信息。

## 替换素材

素材位于 `public/media/`，压缩照片采用 WebP，视频为 H.264 MP4，配套 WebP 封面。新素材沿用文件名即可替换，或修改配置路径。视频点击播放，无自动播放，当前示例无音轨。

素材来源、作者、许可、尺寸、处理方式及校验值记录在 `public/media/sources.json`；对外来源说明在 `public/credits.html`。替换素材后同步更新这两个文件。网络素材按各自许可使用，来源、作者及必要的修改说明在来源页保留；页面不将示例素材描述为自家猫咪或实际商品。

来源记录修改后，执行 `node scripts/generate-credits.mjs` 重新生成公开来源页。CC BY-SA 图片的处理版本沿用原许可；来源页保留署名、原图链接、许可及修改说明。

## 验收记录

中英桌面与手机截图，以及浏览器验收结果保存在本地 `artifacts/`（不参与公开部署）。社群入口已移除；店铺当前未提供真实入口，因此公开页面保持“即将开放”。

## 猫咪生活问答知识库

`knowledge.html` 是独立静态页面，与首页一起构建到 `dist/`，沿用现有 Cloudflare Pages 自动部署。首页导航和视频后的主题入口可进入知识页；例如 `knowledge.html#topic-sleep` 打开睡眠分类，`knowledge.html#qa-cat-purring` 打开对应问答。

`src/knowledge/content.ts` 统一导出分类、界面文案和问答；完整双语文章维护在同目录的 `articles.ts`，类型见 `types.ts`。修改问答时同时更新 `zh-CN` 和 `en`，两种语言须保留一致的含义、判断强度和行动建议：

- `id` 是稳定链接标识，不随标题或翻译修改；UI 自动加 `qa-` 前缀。
- `category` 使用八个现有主题 ID，每个主题当前五条。
- 每种语言包含问题、简短回答、常见原因、2–4 条行动和搜索关键词；仅必要时加入 `watch` 健康提示。
- `sources` 使用直接支持答案的 HTTPS 来源和标题，`reviewedAt` 填实际核对日期。涉及健康判断须交叉核对权威资料；不提供用药、剂量或远程诊断。`urgent` 标示需要立即就医的情况。
- 搜索只匹配当前语言的正文、问题和关键词，多个空格分隔的词须全部匹配；分类与搜索同时生效。切换语言保留输入、分类及已展开条目，结果根据新语言重新计算。
- 单条分享链接和主题链接在刷新后仍可恢复对应内容。新增内容时保持已有 ID，调整内容校验的总数、每类数量约束；页面数量自动从数据计算。

提交前运行 `npm test`、`npm run lint`、`npm run build`。`npm run check:knowledge` 单独检查数量、双语完整性、ID、来源和日期；自动测试和内容校验都由构建脚本执行，所以现有 GitHub CI 和 Cloudflare 都会运行这些检查，并拒绝不完整的内容。参考资料应在内容修改时重新阅读，不把旧核对日期自动更新为今天。

本地用 `npm run dev` 或构建后 `npm run preview`，访问 `/knowledge.html`。Node 原生测试无需新增测试框架；页面交互、来源内容是否准确、中英一致性仍需人工或浏览器验收。

## 电商迭代

当前站点仍是商品展示与内容站，尚无站内下单、支付、库存或订单后台。面向国内及东南亚的迭代范围、关键注意点和上线条件见 [电商独立站迭代说明](docs/ecommerce-roadmap.zh-CN.md)。
