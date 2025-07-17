import { removeHiddenCancelReasons } from './formHelper';

const CANCEL_REASONS_MOCK_DATA = [
  {
    title: { tr: 'Test 1', en: 'Test 1' },
    _id: '1',
  },
  {
    title: { tr: 'Test 2', en: 'Test 2' },
    isHiddenInAdminPanel: true,
    _id: '2',
  },
  {
    title: { tr: 'Test 3', en: 'Test 3' },
    isHiddenInAdminPanel: false,
    _id: '3',
  },
  {
    title: { tr: 'Test 4', en: 'Test 4' },
    isHiddenInAdminPanel: true,
    _id: '4',
  },
];

describe('removeHiddenCancelReasons', () => {
  it('should remove cancel reasons that are hidden', () => {
    const result = removeHiddenCancelReasons(CANCEL_REASONS_MOCK_DATA);
    expect(result).toEqual([
      {
        title: { tr: 'Test 1', en: 'Test 1' },
        _id: '1',
      },
      {
        title: { tr: 'Test 3', en: 'Test 3' },
        isHiddenInAdminPanel: false,
        _id: '3',
      },
    ]);
  });
});
