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

目标公开仓库为 [GTyingzi/cat-life](https://github.com/GTyingzi/cat-life)。CI 在 `main` 推送、拉取请求及手动运行时依次执行 `npm ci`、`npm run lint`、`npm run build`；构建脚本包含 TypeScript 类型检查。

通过 Cloudflare Pages 原生 Git 集成连接此仓库，生产分支设为 `main`，其他分支用于预览部署。项目名使用 `cat-life`；若已被占用，使用 `cat-life-zi498504`。构建设置如下：

| 设置 | 值 |
| --- | --- |
| 构建命令 | `npm ci && npm run lint && npm run build` |
| 输出目录 | `dist` |
| 环境变量 `NODE_VERSION` | `24.13.1` |
| 环境变量 `SKIP_DEPENDENCY_INSTALL` | `1` |

生产和预览环境都使用上述构建设置。Pages 在构建命令中安装依赖；无需在仓库或 CI 中配置部署令牌，也无需自建服务器。`dist/` 只包含公开网页资源，本地 `.openai/`、`.idea/`、`.DS_Store`、`.env*`、`artifacts/` 和依赖目录不提交。

先连接 `preview.cat-life.club`，验证页面、素材、HTTPS、双语与移动端显示，并从中国大陆网络实测访问速度及稳定性。预览域名验收后再迁移主域名；主站统一使用 `https://cat-life.club`，将 `www.cat-life.club` 重定向到主站并保留原路径和查询参数。

修改主域名解析前，先备份当前 DNS 记录及原站点设置。部署内容异常时，在 Pages 中回滚到上一份已验收部署；域名迁移异常时按备份恢复原解析。原 Sites 站点保留以便核对和回退。本地 Sites 身份配置 `.openai/hosting.json` 保留在原工作目录，已从 Git 跟踪中移除；历史中的 `project_id` 是非密钥项目标识，可保留历史。

当前这些内容是部署配置说明。GitHub 仓库、Pages Git 集成、预览域名与主域名的设置仍待实际配置及在线验证；本地构建成功不代表网站已部署或域名迁移完成。

## 修改入口与内容

编辑 `src/content.ts`：

- `siteContent.brand`：中文与英文品牌名。
- `siteContent.community.url`：真实社群网页链接，替换 `undefined`。
- `siteContent.community.qr`：社群二维码的本地路径，例如 `media/community-qr.png`。先将图片放入 `public/media/`。
- `siteContent.shops`：可增加多个平台店铺；每项设置唯一 `id`、中英文 `name` / `description` 和真实 `url`。
- `siteContent.gallery` / `video`：照片、短视频、封面及中英文说明。
- `siteContent.physicalProducts`：六类实体用品卡片，食碗、猫玩具、猫窝、猫抓板／猫爬架、猫砂盆、外出包。
- `siteContent.softwareAndDevices`：猫叫识别 App、项圈等硬件 + App 的方向卡片。
- `copy`：全部界面文案。每次编辑同步维护 `zh-CN` 和 `en`。

链接接受 http/https；未配置或无效时显示“即将开放 / Coming soon”。社群只有二维码时提供二维码查看按钮；链接与二维码可并存。所有真实入口须在公开部署前检查。内容修改后重新构建部署。

商品和服务的每项配置包含 `id`、中英文 `name`、`image`、中英文 `alt`、`action` 与可选 `url`。`action` 为 `purchase` 或 `download`；`url` 空缺或无效时显示相应待提供状态，有效 http/https 链接才会显示购买／下载入口，在新标签页打开。图片只作方向示意，不代表真实上架产品；更换成实际产品后请同步调整区域说明。

`objectPosition` 可调整裁切焦点，例如 `50% 65%`；`imageFit: 'contain'` 用于完整保留用品主体。六类用品和两类服务各自独立维护，补充一个入口不会影响其他卡片。

访客默认看到中文；语言选择保存在当前浏览器的 `localStorage`（键 `everyday-cats-language`）。浏览器禁止存储时，切换仍可使用，只是不跨刷新保存。页面不采集访客信息。

## 替换素材

素材位于 `public/media/`，压缩照片采用 WebP，视频为 H.264 MP4，配套 WebP 封面。新素材沿用文件名即可替换，或修改配置路径。视频点击播放，无自动播放，当前示例无音轨。

素材来源、作者、许可、尺寸、处理方式及校验值记录在 `public/media/sources.json`；对外来源说明在 `public/credits.html`。替换素材后同步更新这两个文件。网络素材按各自许可使用，来源、作者及必要的修改说明在来源页保留；页面不将示例素材描述为自家猫咪或实际商品。

来源记录修改后，执行 `node scripts/generate-credits.mjs` 重新生成公开来源页。CC BY-SA 图片的处理版本沿用原许可；来源页保留署名、原图链接、许可及修改说明。

## 验收记录

中英桌面与手机截图，以及浏览器验收结果保存在本地 `artifacts/`（不参与公开部署）。社群和店铺当前未提供真实入口，因此公开页面保持“即将开放”。
