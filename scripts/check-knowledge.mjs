import { articles, categories } from '../src/knowledge/content.ts';
import { validateKnowledge } from '../src/knowledge/validate.ts';

const errors = validateKnowledge(articles, categories);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Knowledge content OK: ${articles.length} bilingual articles across ${categories.length} topics.`);
}
