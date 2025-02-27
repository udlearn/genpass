import genpass, { PasswordError } from '../src';

describe('genpass', () => {
  it('should generate password this long', () => {
    expect(genpass().length).toEqual(16);
    expect(genpass({ length: 12, similar: true, ambiguous: true }).length).toEqual(12);
  });

  it('should generate password based on specified options', () => {
    expect(/[0-9]/.test(genpass({ digit: 0 }))).toEqual(false);
    expect(/[a-z]/.test(genpass({ lowercase: false }))).toEqual(false);
    expect(/[A-Z]/.test(genpass({ uppercase: false }))).toEqual(false);
  });

  it('should throw an error when unable to generate password', () => {
    const limitedOptions = { length: 4, digit: 0, lowercase: 0, uppercase: 0, symbols: false };
    expect(() => genpass(limitedOptions)).toThrow(PasswordError);
  });
});
