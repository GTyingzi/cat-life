# 自建内容站与 Shopify 商店

接入日期：2026-10-06。采用自建内容站 + Shopify 商店的方式，商品与交易管理统一由 Shopify 承接。

## 分工与入口

| 入口 | 职责 |
| --- | --- |
| `https://cat-life.club/` | 品牌首页、猫咪生活内容、双语问答与店铺入口；沿用 Cloudflare Pages。 |
| `https://shop.cat-life.club/` | Shopify 商店；承接真实商品详情、购物车、结账、订单与售后。 |

Cloudflare 新增 `shop` 的 CNAME，目标 `shops.myshopify.com`，DNS only，TTL Auto。该子域名在 Shopify 设置 → 域名中连接，并设为 Online Store 的 Primary domain。根域名、www 和 preview 继续使用现有内容站配置。

内容站仅跳转到商店，不使用 Storefront API、支付密钥、Shopify Admin API 或独立 Stripe 集成。价格、库存和订单以 Shopify 为准；商品卡片只在有对应的真实上架商品后填写其链接。

## 当前筹备状态

现有 Shopify 店铺为 `mfry03-1v.myshopify.com`，登录后已核对；接入时处于试用期，公开前台为密码保护的 Opening soon 页面。商店名称设为“猫咪日常 · Everyday Cats”。店铺域名绑定不代表正式销售、商户审核或实际结算已经完成。

`src/content.ts` 的 `siteContent.shops` 配置商店地址和状态。目前 `status: 'opening-soon'`，网站显示“查看店铺筹备页 / View our upcoming shop”。未配置地址时，仍显示“即将开放 / Coming soon”。商品方向示意继续显示购买或下载入口待提供。

Shopify 后台已有的经营地区、币种和支付设置不作为资质已核验的证据。正式收款前按实际经营主体核对，不能由后台显示的国家推断主体资格。

## 开店操作

| 这一步做什么 | 需要什么 | 产出什么 | 怎样算完成 |
| --- | --- | --- | --- |
| 确认订阅与经营设置 | 实际经营主体、所在地、计划费用 | 经确认的套餐、主体和市场设置 | 用户完成付费授权，设置与真实主体相符。 |
| 上架首批商品 | 真实样品、图片、规格、售价、库存与配送报价 | 1–2 个可售商品页 | 图片、价格、规格、运费和退货说明与实物及业务一致。 |
| 开通并验证收款 | 可用的支付服务商与结算账户 | 可用的收款、退款和对账流程 | 测试流程通过；后续真实小单分别核对付款、退款和到账。 |
| 配置物流与售后 | 配送范围、时效、运费、退货地址及客服 | 运输和退换货政策 | 结账报价与实际履约能力相符。 |
| 开放店铺 | 以上准备完成及用户发布确认 | 公开 Shopify 商店 | 解除密码保护后，普通访客能够浏览并完成预期购买流程。 |
| 更新内容站入口 | 已公开的商品及店铺链接 | 正式购买入口 | 移除店铺的 `status: 'opening-soon'`；添加对应真实商品链接，检查中英文及手机访问，再部署。 |

## 检查与回退

执行 `npm run lint && npm run build`；浏览器检查中文及英文店铺入口、HTTPS 跳转和落地状态。上线后重新读取正式页面，不能只以本地构建成功认定上线。

需要暂停入口时，移除店铺 `url` 即恢复待开放状态。域名迁移或解绑时先在 Shopify 与 Cloudflare 核对 `shop` 记录；不改变内容站的根域名配置。证书由 Shopify 管理，不在浏览器绕过证书警告。

参考：[Shopify 子域名连接说明](https://help.shopify.com/en/manual/domains/add-a-domain/connecting-domains/connect-subdomain)。
