#!/usr/bin/env node

import { readFileSync } from 'node:fs';

export const GITMOJI_TYPES = new Map([
  ['🎉', 'init'],
  ['🔧', 'chore'],
  ['🛠️', 'fix'],
  ['✨', 'feat'],
  ['✏️', 'typo'],
  ['🐛', 'bug'],
  ['⬆️', 'dep'],
  ['🔐', 'security'],
  ['🗑️', 'remove'],
  ['♻️', 'refactor'],
  ['📄', 'docs'],
  ['📝', 'article'],
  ['🎨', 'style'],
  ['⚡', 'perf'],
  ['✅', 'test'],
  ['🔨', 'build'],
  ['🚀', 'release'],
  ['🤖', 'ci'],
]);

const subjectPattern = /^([a-z][a-z0-9-]*)\(([a-z0-9]+(?:-[a-z0-9]+)*)\): ([a-z].*)$/;

export function validateCommitMessage(message) {
  const subject = message.split(/\r?\n/, 1)[0];

  // Git generates merge subjects; they do not follow the authored-message policy.
  if (subject.startsWith('Merge ')) {
    return { valid: true };
  }

  const separator = subject.indexOf(' ');
  if (separator < 1) {
    return { valid: false, reason: 'the subject must start with an approved gitmoji and type' };
  }

  const gitmoji = subject.slice(0, separator);
  const type = GITMOJI_TYPES.get(gitmoji);
  if (!type) {
    return { valid: false, reason: `unapproved gitmoji: ${gitmoji || '(missing)'}` };
  }

  const remainder = subject.slice(separator + 1);
  const match = subjectPattern.exec(remainder);
  if (!match) {
    return {
      valid: false,
      reason: 'expected "<gitmoji> <type>(<scope>): <lowercase title>" with a kebab-case scope',
    };
  }

  if (match[1] !== type) {
    return { valid: false, reason: `${gitmoji} must be paired with type "${type}", not "${match[1]}"` };
  }

  return { valid: true };
}

function main() {
  const messagePath = process.argv[2];
  if (!messagePath) {
    process.stderr.write('Usage: validate-commit-message.mjs <commit-message-file>\n');
    process.exitCode = 2;
    return;
  }

  const message = readFileSync(messagePath, 'utf8');
  const result = validateCommitMessage(message);
  if (!result.valid) {
    process.stderr.write(`Invalid commit message: ${result.reason}\n`);
    process.stderr.write('Example: ✨ feat(content-templates): add reusable card layout\n');
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  main();
}
