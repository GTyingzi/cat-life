import { readFileSync, writeFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync(new URL('../public/media/sources.json', import.meta.url), 'utf8'));
const escape = (value = '') => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const entries = manifest.assets.filter(asset => asset.type !== 'poster').map(asset => {
  const license = asset.license ?? (asset.license_url.includes('pexels.com') ? 'Pexels License' : 'See source license');
  const notes = asset.processing ?? 'WebP conversion and resizing; display framing may crop the image.';
  return `<li><a href="${escape(asset.source_page)}">${escape(asset.file)}</a><p>${escape(asset.author)} · <a href="${escape(asset.license_url)}">${escape(license)}</a></p><small>${escape(notes)}</small>${license.includes('CC BY-SA') ? `<p>此图片的处理版本沿用原许可。 / This processed image remains under the original license. <a href="media/${escape(asset.file)}">本地图片 / Local image</a></p>` : ''}</li>`;
}).join('\n');

writeFileSync(new URL('../public/credits.html', import.meta.url), `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>素材来源 / Photo & video credits</title><style>body{font-family:system-ui,sans-serif;max-width:820px;margin:50px auto;padding:0 24px;background:#f8f6ef;color:#3d362c;line-height:1.8}h1{font-size:28px}a{color:#425747;text-underline-offset:3px;overflow-wrap:anywhere}ul{padding-left:22px}li{padding:18px 0;border-bottom:1px solid #dfddd1}p{margin:5px 0}small{display:block;font-size:14px;color:#716b60}</style></head>
<body><h1>素材来源 / Photo & video credits</h1><p>猫咪日常、商品及服务图片均为示例或方向示意素材。<br>All lifestyle, product and service imagery is illustrative.</p><ul>${entries}</ul><p>各图片按链接所示许可使用；压缩、缩放与展示裁切不表示图片中的用品是已上架商品。<br>Each asset uses the license linked above. Compression, resizing and display crops do not make depicted items available products.</p><p>视频无音轨，封面取自视频。 / The video has no audio; its poster is a video frame.</p><p><a href="./">返回网站 / Back to the site</a></p></body></html>`);
console.log('Generated bilingual credits for', manifest.assets.filter(asset => asset.type !== 'poster').length, 'assets.');
