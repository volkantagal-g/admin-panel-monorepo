import { deepFilterMenus } from './utils';

const menus = [
  {
    key: 'OUTER_GROUP_1',
    children: [
      {
        key: 'INNER_GROUP_1',
        children: [
          { key: 'HOME' },
          { key: 'RANDOM_INNER_1_1' },
        ],
      },
      { key: 'RANDOM_OUTER_1_1' },
    ],
  },
  {
    key: 'OUTER_GROUP_2',
    children: [
      {
        key: 'INNER_GROUP_2',
        children: [
          { key: 'RANDOM_INNER_2_1' },
          { key: 'RANDOM_INNER_2_2' },
        ],
      },
      { key: 'ABOUT' },
    ],
  },
  {
    key: 'OUTER_GROUP_3',
    children: [
      {
        key: 'INNER_GROUP_3',
        children: [
          { key: 'RANDOM_INNER_3_1' },
          { key: 'RANDOM_INNER_3_2' },
        ],
      },
      { key: 'RANDOM_OUTER_3_1' },
    ],
  },
];

const getPagePermKey = pageKey => `PAGE_${pageKey}`;

describe('deepFilterMenus', () => {
  it('should return empty array when there are no permissions', () => {
    const emptyPermKeySet = new Set();
    const canAccess = permKey => emptyPermKeySet.has(permKey);

    const filtered = deepFilterMenus({ initialMenus: menus, canAccess, getPagePermKey });
    expect(filtered).toEqual([]);
  });

  it('should return only accessible menu items and its parents', () => {
    const fullPermKeySet = new Set(['PAGE_HOME', 'PAGE_ABOUT']);
    const canAccess = permKey => fullPermKeySet.has(permKey);

    const filtered = deepFilterMenus({ initialMenus: menus, canAccess, getPagePermKey });
    expect(filtered).toEqual([
      {
        key: 'OUTER_GROUP_1',
        children: [
          {
            key: 'INNER_GROUP_1',
            children: [
              { key: 'HOME' },
            ],
          },
        ],
      },
      {
        key: 'OUTER_GROUP_2',
        children: [
          { key: 'ABOUT' },
        ],
      },
    ]);
  });
});
