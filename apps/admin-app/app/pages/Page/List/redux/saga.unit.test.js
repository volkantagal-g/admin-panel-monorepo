import { call, select } from 'redux-saga-test-plan/matchers';

import { exportPagesExcel } from '@app/pages/Page/List/redux/saga';
import { countriesSelector } from '@shared/redux/selectors/common';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { indexedDb } from '@shared/indexedDb';

describe('Page/List', () => {
  describe('exportPagesExcel saga', () => {
    it('runs without errors', () => {
      const pages = [{
        components: [{
          countries: ['55999ad00000010000000000'],
          createdAt: '2021-05-26T15:23:23.761Z',
          description: { en: 'Online user events' },
          hasGlobalAccess: false,
          name: { en: 'Socket Panel Room' },
          page: '6001924a736d252ae941db9c',
          permKey: 'SOCKET_PANEL_ROOM',
          updatedAt: '2022-04-08T07:21:31.078Z',
          _id: '60ae67ebebec0855f854a49b',
        },
        ],
        countries: ['55999ad00000010000000000'],
        createdAt: '2021-01-15T13:02:02.169Z',
        description: { en: 'PAGE_TRANSFER_GROUP_LIST' },
        hasGlobalAccess: true,
        name: { en: 'Transfer Group List' },
        pageOwners: ['6019515d9eb2438452f467e6', '606c585b8c1c3247441f7f5f'],
        permKey: 'PAGE_TRANSFER_GROUP_LIST',
        updatedAt: '2022-05-21T18:49:43.472Z',
        _id: '6001924a736d252ae941db9c',
      }];
      const language = 'en';
      const countries = [{
        _id: '55999ad00000010000000000',
        name: { en: 'Turkey' },
      }];
      const t = jest.fn().mockReturnValue('');

      const saga = exportPagesExcel({ t });
      let next = saga.next();

      expect(next.value).toMatchObject(call([indexedDb.pages, indexedDb.pages.toArray]));
      next = saga.next(pages);

      expect(next.value).toMatchObject(select(getSelectedLanguage));
      next = saga.next(language);

      expect(next.value).toMatchObject(select(countriesSelector.getData));
      next = saga.next(countries);

      expect(next.done).toBe(true);
    });
  });
});
