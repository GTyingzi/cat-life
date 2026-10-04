# 猫咪日常 / Everyday Cats

中英双语猫咪生活展示与引流单页。React + TypeScript + Vite，静态部署；Node.js 用于开发与构建。

## 本地运行

推荐 Node.js 24（当前开发环境），使用 npm：

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

Sites 身份保存于 `.openai/hosting.json`；后续更新复用同一个 `project_id`，不要重复注册。按 Sites 插件流程构建、推送当前源码、保存版本并部署。首次访问范围已按用户要求设为公开。

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
