import test from 'node:test';
import assert from 'node:assert/strict';
import { GITMOJI_TYPES, validateCommitMessage } from './validate-commit-message.mjs';

test('accepts every approved gitmoji and its matching type', () => {
  for (const [gitmoji, type] of GITMOJI_TYPES) {
    assert.deepEqual(
      validateCommitMessage(`${gitmoji} ${type}(my-domain): add useful behavior`),
      { valid: true },
      `${gitmoji} should pair with ${type}`,
    );
  }
});

test('accepts an optional body after a valid subject', () => {
  assert.deepEqual(
    validateCommitMessage('📄 docs(git-commit-helper): explain hook integration\n\nAdd setup guidance.'),
    { valid: true },
  );
});

test('accepts generated merge commit subjects', () => {
  assert.deepEqual(validateCommitMessage('Merge pull request #42 from jyje/feat/example'), { valid: true });
});

test('rejects unknown gitmoji and mismatched type', () => {
  assert.equal(validateCommitMessage('💡 feat(site): add a feature').valid, false);
  assert.match(validateCommitMessage('✨ fix(site): add a feature').reason, /must be paired/);
});

test('requires a kebab-case scope and lowercase title', () => {
  assert.equal(validateCommitMessage('✨ feat: add a feature').valid, false);
  assert.equal(validateCommitMessage('✨ feat(MyDomain): add a feature').valid, false);
  assert.equal(validateCommitMessage('✨ feat(my-domain): Add a feature').valid, false);
});
