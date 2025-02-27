import { random } from './helpers';

class PasswordError extends Error {
  name = 'PasswordError';
}

interface PasswordOptions {
  /** Password length. */
  length: number;

  /** Number of uppercase characters to include. */
  uppercase: boolean | number;

  /** Number of lowercase characters to include. */
  lowercase: boolean | number;

  /** Number of digits to include. */
  digit: boolean | number;

  /** Special characters to include. */
  symbols: boolean | string;

  /** Similar characters (e.g., `il1`) to include. */
  similar: boolean | string;

  /** Rare characters (e.g., `()[]`) to include. */
  ambiguous: boolean | string;
}

/**
 * Curated options to build passwords off of.
 * @see {@link PasswordOptions}.
 */
class Config {
  length!: number;
  lowercase!: number;
  uppercase!: number;
  digit!: number;
  symbols!: string;
  similar!: string;
  ambiguous!: string;

  constructor({
    length = 16,
    uppercase = 8,
    lowercase = 8,
    digit = 4,
    symbols = true,
    similar = false,
    ambiguous = false,
  }: Partial<PasswordOptions> = {}) {
    const parseNumber = (v: any, f = 24) => (typeof v === 'boolean' ? (v ? f : 0) : v);
    const parseChar = (v: any, f: string) => (typeof v === 'boolean' ? (v ? f : '') : typeof v === 'string' ? v : f);

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

function pickFrom(pool: string, upTo: number = pool.length): string {
  let picked = '';
  for (let i = 0; i < upTo; i++) picked += pool[random(0, pool.length)];
  return picked;
}

/**
 * Generates passwords.
 *
 * @param {PasswordOptions} options - criteria to consider when generating a password.
 * @returns {string} a password matching the specified criteria.
 * @throws {PasswordError} when unable to generate passwords that match the criteria/options.
 *
 * @see {@link DEFAULT_CONFIG} for more details about the default values.
 */
function generatePassword(options?: Partial<PasswordOptions>): string {
  const config = options ? new Config(options) : DEFAULT_CONFIG;
  const { length, lowercase, uppercase, digit, symbols, ambiguous, similar } = config;

  let pool: string = '';
  if (lowercase) pool += pickFrom('abcdefghijkmnpqrstuvwxyz', lowercase);
  if (uppercase) pool += pickFrom('ABCDEFGHJKLMNPQRSTUVWXYZ', uppercase);
  if (digit) pool += pickFrom('123456789', digit);
  if (symbols) pool += pickFrom(symbols);
  if (similar) pool += pickFrom(similar);
  if (ambiguous) pool += pickFrom(ambiguous);

  if (!pool || pool.length < length) {
    throw new PasswordError(`enable more characters to generate passwords\n${JSON.stringify(config)}`);
  }

  let password: string = '';
  for (let i = 0; i < length; i++) password += pool[random(0, pool.length)];
  return password;
}

/**
 * Default configuration.
 */
const DEFAULT_CONFIG = new Config();

export { generatePassword, PasswordOptions, PasswordError, DEFAULT_CONFIG };
export default generatePassword;
