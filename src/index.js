'use strict';

/* eslint-disable-next-line */
const { random } = require('./helpers');

class PasswordError extends Error {}

class Config {
  constructor({
    length = 16,
    uppercase = 8,
    lowercase = 8,
    digit = 4,
    symbols = true,
    similar = false,
    ambiguous = false,
  } = {}) {
    const parseNumber = (v, f = 24) => (typeof v === 'boolean' ? (v ? f : 0) : v);
    const parseChar = (v, f) => (typeof v === 'boolean' ? (v ? f : '') : typeof v === 'string' ? v : f);
    Object.assign(this, {
      length,
      lowercase: parseNumber(lowercase),
      uppercase: parseNumber(uppercase),
      digit: parseNumber(digit, 9),
      symbols: parseChar(symbols, '!@#$%^&*-=_+?'),
      similar: parseChar(similar, '[ilLI|oO0]'),
      ambiguous: parseChar(ambiguous, '()[]{}<>;:.,'),
    });
  }
}

function pickFrom(pool, upTo = pool.length) {
  let picked = '';
  for (let i = 0; i < upTo; i++) picked += pool[random(0, pool.length)];
  return picked;
}

function generatePassword(options) {
  const config = new Config(options);
  const { length, lowercase, uppercase, digit, symbols, ambiguous, similar } = config;
  let pool = '';
  if (lowercase) pool += pickFrom('abcdefghijkmnpqrstuvwxyz', lowercase);
  if (uppercase) pool += pickFrom('ABCDEFGHJKLMNPQRSTUVWXYZ', uppercase);
  if (digit) pool += pickFrom('123456789', digit);
  if (symbols) pool += pickFrom(symbols);
  if (similar) pool += pickFrom(similar);
  if (ambiguous) pool += pickFrom(ambiguous);

  if (!pool || pool.length < length) {
    throw new PasswordError(`enable more characters to generate passwords\n${JSON.stringify(config)}`);
  }

  let password = '';
  for (let i = 0; i < length; i++) password += pool[random(0, pool.length)];

  return password;
}

/* eslint-disable-next-line */
module.exports = { PasswordError, generatePassword };
