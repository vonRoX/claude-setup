import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkPrinciples } from './check-principles.mjs';

test('counts non-blank lines', () => assert.equal(checkPrinciples('a\n\nb\n').nonBlankLines, 2));
test('counts lines with CRLF', () => assert.equal(checkPrinciples('a\r\n\r\nb\r\n').nonBlankLines, 2));
test('no warning at 35 lines', () => assert.deepEqual(checkPrinciples('x\n'.repeat(35)).warnings, []));
test('warns above 35 lines', () => assert.match(checkPrinciples('x\n'.repeat(36)).warnings[0], /36 non-blank lines \(recommended at most 35\)/));
test('warns on emphatic keyword', () => assert.match(checkPrinciples('You MUST do it\n').warnings[0], /MUST/));
test('lowercase firm words pass', () => assert.deepEqual(checkPrinciples('never invent facts\n').warnings, []));
test('keyword inside a word passes', () => assert.deepEqual(checkPrinciples('IMPORTANTLY\n').warnings, []));
