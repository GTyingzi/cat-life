import type { Category } from './types';
export { articles } from './articles.ts';

export const categories: Category[] = [
  { id: 'sleep', name: { 'zh-CN': '作息与睡眠', en: 'Rest & sleep' }, description: { 'zh-CN': '读懂小睡、跑酷与猫咪的生活节奏。', en: 'Naps, night-time energy and everyday rhythms.' } },
  { id: 'communication', name: { 'zh-CN': '叫声与肢体语言', en: 'Sounds & body language' }, description: { 'zh-CN': '从声音、耳朵和尾巴，观察当下的感受。', en: 'Read sounds, ears and tails in context.' } },
  { id: 'feeding', name: { 'zh-CN': '饮食与饮水', en: 'Food & water' }, description: { 'zh-CN': '安排食水，留意食欲与饮水的变化。', en: 'Make meals comfortable and notice changes.' } },
  { id: 'litter', name: { 'zh-CN': '猫砂与排泄', en: 'Litter & toileting' }, description: { 'zh-CN': '更合适的猫砂盆，也更容易观察日常。', en: 'A comfortable litter setup and habits to watch.' } },
  { id: 'play', name: { 'zh-CN': '玩耍与抓挠', en: 'Play & scratching' }, description: { 'zh-CN': '给捕猎和抓挠本能一个合适的出口。', en: 'Make room for hunting and scratching instincts.' } },
  { id: 'grooming', name: { 'zh-CN': '清洁与梳理', en: 'Grooming & care' }, description: { 'zh-CN': '从梳毛到剪指甲，循着猫咪的步调来。', en: 'Brushes, claws and care at your cat’s pace.' } },
  { id: 'environment', name: { 'zh-CN': '环境与适应', en: 'Home & adjustment' }, description: { 'zh-CN': '安全的角落，和适应变化的时间。', en: 'Safe spaces and time to settle into change.' } },
  { id: 'relationships', name: { 'zh-CN': '人猫与多猫相处', en: 'Living together' }, description: { 'zh-CN': '尊重互动边界，照顾每一只猫的需要。', en: 'Respect boundaries and each cat’s needs.' } },
];

export const knowledgeCopy = {
  'zh-CN': {
    title: '猫咪生活问答 · 猫咪日常', description: '40 条猫咪生活习性与日常照护问答，了解睡眠、叫声、饮食、猫砂、玩耍与相处。中英双语，附参考来源。',
    heading: '多懂一点，\n相处更从容。', intro: '它的小习惯，可能藏着对环境和相处方式的需要。从日常问题出发，慢慢了解你的猫。',
    name: '猫咪生活问答', back: '返回首页', all: '全部主题', topics: '选择主题', search: '搜索猫咪问答', placeholder: '试试「呼噜」「不喝水」「猫砂盆」', clear: '清空搜索', reset: '查看全部问答',
    results: '条问答', emptyTitle: '暂时没有找到相关问答', emptyText: '换个关键词，或查看全部主题。可以试试「睡觉」「玩具」或「躲藏」。',
    reasons: '常见原因', actions: '可以怎么做', watch: '值得留意的变化', sources: '参考来源', reviewed: '资料核对', share: '这条问答的链接', urgent: '需要立即就医',
    note: '这些内容帮助理解日常行为与照护。行为需要结合情境判断；出现突然变化或身体不适时，请咨询兽医。',
    entryTitle: '它为什么这样做？', entryText: '从呼噜声到午夜跑酷，看看常见习性背后的可能原因，找到更合适的照护方式。', entryAction: '阅读猫咪问答',
  },
  en: {
    title: 'Cat Life Q&A · Everyday Cats', description: '40 questions about cat behaviour and everyday care: sleep, sounds, food, litter, play and living together. Bilingual answers with sources.',
    heading: 'A little understanding.\nA gentler everyday.', intro: 'Small habits can tell us about a cat’s needs. Start with an everyday question and get to know your companion a little better.',
    name: 'Cat Life Q&A', back: 'Back to home', all: 'All topics', topics: 'Choose a topic', search: 'Search cat questions', placeholder: 'Try “purring”, “water” or “litter box”', clear: 'Clear search', reset: 'View all questions',
    results: 'questions', emptyTitle: 'No matching questions yet', emptyText: 'Try another keyword or browse all topics. “Sleep”, “toys” and “hiding” are good places to start.',
    reasons: 'Common reasons', actions: 'What you can do', watch: 'Changes to watch for', sources: 'Sources', reviewed: 'Sources checked', share: 'Link to this question', urgent: 'Immediate veterinary care',
    note: 'These answers explain everyday behaviour and care. Interpret behaviour in context, and contact your vet about sudden changes or signs of illness.',
    entryTitle: 'Why does my cat do that?', entryText: 'From purring to night-time zoomies, explore what everyday habits might mean and how to respond.', entryAction: 'Explore cat questions',
  },
};
