import genpass from '../src';

describe('genpass', () => {
  it('should generate password this long', () => {
    expect(genpass().length).toEqual(16);
    expect(genpass({ length: 12 }).length).toEqual(12);
  });

  it('should generate password with no digits', () => {
    expect(/[0-9]/i.test(genpass({ digit: 0 }))).toEqual(false);
  });
});
