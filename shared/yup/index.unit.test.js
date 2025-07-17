import { getYupErrorPath } from './index';

describe('getYupErrorPath', () => {
  it('should return empty string for default input', () => {
    expect(getYupErrorPath()).toBe('');
  });

  it('should return empty string for default input', () => {
    expect(getYupErrorPath(['test1', 1, 'test2'])).toBe('test1[1].test2');
  });
});
