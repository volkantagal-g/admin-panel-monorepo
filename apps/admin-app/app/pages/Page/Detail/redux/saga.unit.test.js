import { call, select } from 'redux-saga-test-plan/matchers';

import { exportRolesExcel } from './saga';
import { countriesSelector } from '@shared/redux/selectors/common';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import { getPageRoles } from '@shared/api/page';

describe('Page/Detail', () => {
  describe('exportRolesExcel saga', () => {
    it('runs without errors', () => {
      global.URL.createObjectURL = jest.fn(); // needed for exportExcel()

      const page = {
        components: [{ _id: '60ae67ebebec0855f854a49b', name: { en: 'Socket Panel Room' } }],
        name: { en: 'Transfer Group List' },
        _id: '6001924a736d252ae941db9c',
        permKey: 'PAGE_TRANSFER_GROUP_LIST',
      };
      const componentsRoles = [[
        {
          hasGlobalAccess: true,
          description: { en: 'DEV_ADMIN' },
          roleOwners: ['6019515d9eb2438452f467e6'],
          _id: '600ea224df492f955fb6fb16',
          name: 'Dev Admin',
          permittedCountries: ['55999ad00000020000000000'],
          isActive: true,
        },
      ]];
      const roles = [
        {
          hasGlobalAccess: true,
          description: { en: 'DEV_ADMIN' },
          roleOwners: ['6019515d9eb2438452f467e6'],
          _id: '600ea224df492f955fb6fb16',
          name: 'Dev Admin',
          permittedCountries: ['55999ad00000020000000000'],
          isActive: true,
        },
      ];
      const language = 'en';
      const countries = [{
        _id: '55999ad00000010000000000',
        name: { en: 'Turkey' },
      }];
      const saga = exportRolesExcel({ page });
      let next = saga.next();

      expect(next.value).toMatchObject(call(getPageRoles, { permKey: page.permKey }));
      next = saga.next(roles);

      expect(next.value).toMatchObject(select(getSelectedLanguage));
      next = saga.next(language);

      expect(next.value).toMatchObject(select(countriesSelector.getData));
      next = saga.next(countries);

      expect(next.value).toMatchObject(call([Promise, Promise.all], expect.any(Array)));
      next = saga.next(componentsRoles);

      expect(next.done).toBe(true);
    });
  });
});
