import assert from 'node:assert/strict';
import test from 'node:test';
import { validateKnowledge } from '../src/knowledge/validate.ts';

const categories = [{ id: 'sleep', name: { 'zh-CN': '睡眠', en: 'Sleep' }, description: { 'zh-CN': '睡眠介绍', en: 'About sleep' } }];
const answer = { question: 'A question?', shortAnswer: 'An answer.', reasons: 'A reason.', actions: ['Action one.', 'Action two.'], keywords: ['keyword'] };
const article = { id: 'cat-sleep', category: 'sleep', answer: { 'zh-CN': { ...answer, question: '一个问题？' }, en: answer }, sources: [{ title: 'Source', url: 'https://www.cats.org.uk/help-and-advice/cat-behaviour/cats-and-sleep' }], reviewedAt: '2026-10-04' };
const options = { total: 1, perCategory: 1 };

test('accepts complete bilingual content', () => assert.deepEqual(validateKnowledge([article], categories, options), []));
test('rejects missing entries', () => assert.ok(validateKnowledge([], categories, options).some(error => error.includes('total'))));
test('rejects duplicate stable IDs', () => assert.ok(validateKnowledge([article, article], categories, { total: 2, perCategory: 2 }).some(error => error.includes('duplicate id'))));
test('rejects missing English and missing sources', () => {
  assert.ok(validateKnowledge([{ ...article, answer: { 'zh-CN': article.answer['zh-CN'] }, sources: [] }], categories, options).length >= 2);
});
test('rejects placeholder text, unsafe links and impossible dates', () => {
  const invalid = { ...article, answer: { ...article.answer, en: { ...answer, reasons: 'TODO' } }, sources: [{ title: 'Source', url: 'javascript:alert(1)' }], reviewedAt: '2026-02-30' };
  assert.ok(validateKnowledge([invalid], categories, options).length >= 3);
});
test('rejects unknown categories and absent actions', () => {
  const invalid = { ...article, category: 'unknown', answer: { ...article.answer, en: { ...answer, actions: [] } } };
  assert.ok(validateKnowledge([invalid], categories, options).length >= 2);
});
