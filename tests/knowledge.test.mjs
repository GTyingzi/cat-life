import assert from 'node:assert/strict';
import test from 'node:test';
import { filterArticles } from '../src/knowledge/filter.ts';
import { isKnowledgeHash, readKnowledgeHash } from '../src/knowledge/location.ts';

const answer = (question, keywords = []) => ({ question, shortAnswer: 'short answer', reasons: 'context', actions: ['Offer a box', 'Keep resources separate'], keywords });
const samples = [
  { id: 'purring', category: 'communication', answer: { 'zh-CN': answer('猫呼噜就一定开心吗？', ['呼噜', '声音']), en: answer('Does purring always mean happiness?', ['purr']) } },
  { id: 'hiding', category: 'environment', answer: { 'zh-CN': answer('猫为什么躲藏？', ['纸箱']), en: answer('Why do cats hide?', ['hiding']) } },
];

test('empty query includes every article in order', () => assert.deepEqual(filterArticles(samples, 'zh-CN', 'all', ''), samples));
test('search finds keywords beyond the question', () => assert.deepEqual(filterArticles(samples, 'zh-CN', 'all', '纸箱'), [samples[1]]));
test('category and query are combined', () => assert.deepEqual(filterArticles(samples, 'zh-CN', 'environment', '呼噜'), []));
test('only the active locale is searched', () => assert.deepEqual(filterArticles(samples, 'en', 'all', '呼噜'), []));
test('case, full-width characters and surrounding whitespace normalize', () => assert.deepEqual(filterArticles(samples, 'en', 'all', '  ＰＵＲＲ  '), [samples[0]]));
test('multiple terms must all match somewhere in the answer', () => assert.deepEqual(filterArticles(samples, 'en', 'all', 'hide resources'), [samples[1]]));
test('unknown category and unmatched terms give no results', () => {
  assert.deepEqual(filterArticles(samples, 'en', 'unknown', ''), []);
  assert.deepEqual(filterArticles(samples, 'en', 'all', 'unicorn'), []);
});

const categories = [{ id: 'environment' }, { id: 'communication' }];
test('shared article links reveal its category and article', () => assert.deepEqual(readKnowledgeHash('#qa-purring', samples, categories), { category: 'communication', articleId: 'purring' }));
test('topic links select that topic', () => assert.deepEqual(readKnowledgeHash('#topic-environment', samples, categories), { category: 'environment' }));
test('invalid and malformed fragments fall back to all topics', () => {
  for (const hash of ['', '#qa-missing', '#topic-missing', '#%E0%A4%A']) assert.deepEqual(readKnowledgeHash(hash, samples, categories), { category: 'all' });
});

test('only knowledge navigation hashes are intercepted', () => {
  for (const hash of ['', '#qa-purring', '#topic-environment', '#%71a-purring']) assert.equal(isKnowledgeHash(hash), true);
  for (const hash of ['#main', '#other-section', '#%E0%A4%A']) assert.equal(isKnowledgeHash(hash), false);
});
