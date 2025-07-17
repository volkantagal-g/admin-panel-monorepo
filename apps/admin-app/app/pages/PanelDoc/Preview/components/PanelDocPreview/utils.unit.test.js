import { getTitleOfDocFile } from './utils';

describe('getTitleOfDocFile', () => {
  it('should return file title from app lang-key when langKeys array contains both language', () => {
    const file = {
      title: {
        en: 'fileTitle_en',
        tr: 'fileTitle_tr',
      },
      langKeys: ['en', 'tr'],
    };
    // default app lang key is "en"
    expect(getTitleOfDocFile(file)).toBe('fileTitle_en');
  });
  it('should return file title from available lang key when langKeys array has 1 item', () => {
    const file = {
      title: {
        en: 'fileTitle_en',
        tr: 'fileTitle_tr',
      },
      langKeys: ['tr'],
    };
    expect(getTitleOfDocFile(file)).toBe('fileTitle_tr');
  });
});
