export type Locale = 'zh-CN' | 'en';
export type Localized = Record<Locale, string>;
export interface GalleryItem { src: string; caption: Localized; alt: Localized }
export interface Entrance { id: string; name: Localized; description: Localized; url?: string; qr?: string }
const bi = (zh: string, en: string): Localized => ({ 'zh-CN': zh, en });

// 修改这里的链接、二维码和文案，再构建即可更新网站。链接与素材由两种语言共用。
export const siteContent = {
  brand: bi('猫咪日常', 'Everyday Cats'),
  heroImage: 'media/cat-01.webp',
  heroAlt: bi('窗边熟睡的暖棕色虎斑猫', 'A warm brown tabby cat sleeping by a window'),
  gallery: [
    { src: 'media/cat-01.webp', caption: bi('阳光正好，什么都不做也很好。', 'A little sunshine. Nothing else on the agenda.'), alt: bi('窗边熟睡的虎斑猫', 'A tabby cat sleeping by a window') },
    { src: 'media/cat-02.webp', caption: bi('把午后的时间，留给一个长长的懒觉。', 'An afternoon made for a very long nap.'), alt: bi('阳光下打盹的黑猫', 'A black cat napping in the sunlight') },
    { src: 'media/cat-03.webp', caption: bi('世界很大，好奇心也是。', 'A big world. An even bigger curiosity.'), alt: bi('绿植窗台上的橘猫', 'A ginger cat on a windowsill beside green plants') },
    { src: 'media/cat-04.webp', caption: bi('今天的小事：好好待在一起。', 'Today’s little plan: just being together.'), alt: bi('暖色居家空间里的灰猫', 'A gray cat in a warm home interior') },
    { src: 'media/cat-05.webp', caption: bi('一个小玩具，就能快乐很久。', 'One little toy. A whole lot of happiness.'), alt: bi('和玩具互动的三花猫', 'A fluffy calico cat playing with a toy') },
    { src: 'media/cat-06.webp', caption: bi('有猫的地方，就有一点柔软。', 'Life feels a little softer with a cat around.'), alt: bi('望着羽毛逗猫棒的虎斑猫', 'A tabby cat watching a feather toy') },
  ] satisfies GalleryItem[],
  video: { src: 'media/cat-moment.mp4', poster: 'media/cat-moment-poster.webp', title: bi('一个猫咪的小片刻', 'A little moment, in motion') },
  community: { id: 'community', name: bi('一起聊聊猫', 'A place for cat people'), description: bi('分享小日常，交流养猫心得。', 'Everyday moments and notes on life with cats.'), url: undefined, qr: undefined } as Entrance,
  shops: [{ id: 'shop', name: bi('猫咪日常店铺', 'Everyday Cats shop'), description: bi('猫咪日常用品，店铺入口即将开放。', 'Everyday essentials for cats. Shop links are on their way.'), url: undefined }] as Entrance[],
};

export const copy = {
  'zh-CN': {
    title: '猫咪日常 · 和猫一起，把日子过慢一点', description: '记录猫咪的小日常，分享有猫相伴的生活。社群与店铺即将开放。',
    skip: '跳转到正文', navDaily: '小日常', navMoment: '猫咪时刻', navConnect: '社群与店铺', language: '选择语言',
    heroTitle: '和猫一起，\n把日子过慢一点。', heroDescription: '晒晒太阳，伸个懒腰。\n记录那些有猫相伴的，平凡又可爱的瞬间。', join: '加入社群', shop: '逛逛店铺',
    heroNote: '日子很普通，有猫就很可爱。', dailyTitle: '猫咪的小日常', dailyDescription: '不用特别安排，每一天都有值得留下的小片刻。',
    momentTitle: '这一刻，刚刚好。', momentDescription: '让世界安静一会儿，看看猫咪在忙什么。', videoFallback: '你的浏览器无法播放此视频。',
    connectTitle: '把喜欢，留在一起。', connectDescription: '一起分享有猫的生活，也为猫咪找些日常好物。', communityLabel: '猫友社群', shopLabel: '店铺入口', soon: '即将开放', enterCommunity: '前往社群', enterShop: '进入店铺', viewQr: '查看社群二维码', close: '关闭', qrAlt: '社群加入二维码',
    footerLine: '有猫相伴，日常也值得珍藏。', credits: '素材来源', sampleNote: '页面图片与视频为示例素材。', copyright: '猫咪日常', playLabel: '猫咪日常视频',
  },
  en: {
    title: 'Everyday Cats · A slower life, with cats', description: 'Little moments and a life shared with cats. Community and shop links coming soon.',
    skip: 'Skip to content', navDaily: 'Little moments', navMoment: 'In motion', navConnect: 'Community & shops', language: 'Choose language',
    heroTitle: 'A slower life,\nwith cats.', heroDescription: 'A patch of sunshine. A sleepy stretch.\nThe little things that make life with cats so lovely.', join: 'Join the community', shop: 'Explore the shops',
    heroNote: 'Ordinary days. Extraordinary little companions.', dailyTitle: 'The everyday, with cats', dailyDescription: 'No grand plans. Just little moments worth keeping.',
    momentTitle: 'Right here. Right meow.', momentDescription: 'Let the world slow down. See what the cat is up to.', videoFallback: 'Your browser cannot play this video.',
    connectTitle: 'Good things, shared.', connectDescription: 'A little company for cat people. A few everyday things for cats.', communityLabel: 'Our community', shopLabel: 'Our shops', soon: 'Coming soon', enterCommunity: 'Visit the community', enterShop: 'Visit the shop', viewQr: 'View community QR code', close: 'Close', qrAlt: 'Community invitation QR code',
    footerLine: 'Little moments. A life shared with cats.', credits: 'Photo & video credits', sampleNote: 'Photos and video are sample imagery.', copyright: 'Everyday Cats', playLabel: 'An everyday cat video',
  },
} satisfies Record<Locale, Record<string, string>>;
