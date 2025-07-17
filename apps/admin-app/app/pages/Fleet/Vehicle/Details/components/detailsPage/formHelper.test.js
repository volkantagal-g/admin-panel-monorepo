import { findCity, findFranchise } from './formHelper';
import { mockedWarehouses } from '@shared/api/warehouse/index.mock.data';

test('Find Franchise Function', () => {
  const value = '5dc32e61734a192200caddfe';
  const franchises = [
    {
      _id: '5dee5217744b2e30d47cb701',
      isActivated: true,
      franchiseUser: '589228622fbe51b3669a11c8',
      name: 'bahadir test 4',
      taxOffice: 'İSTANBUL VERGİ DAİRESİ',
      taxNumber: '2350113916',
      updatedAt: '2022-08-23T12:05:43.801Z',
      createdAt: '2019-12-09T13:54:31.646Z',
      __v: 0,
      franchiseType: 2,
      countryCode: 'TR',
      countryId: '55999ad00000010000000000',
      warehouses: [
        {
          _id: '5dc32e61734a192200caddfe',
          name: 'Karabağlar',
          country: {
            _id: '55999ad00000010000000000',
            name: {
              de: 'Türkei',
              en: 'Turkey',
              fr: 'Turquie',
              nl: 'Turkije',
              tr: 'Türkiye',
              es: 'Turquía',
              it: 'Turchia',
              pt: 'Turquia',
              'en-US': 'Turkey',
            },
          },
          region: {
            _id: '5dcf11d00000010002000001',
            name: {
              tr: 'İzmir',
              en: 'Izmir',
            },
          },
          city: {
            _id: '5dcf11d00000010002000000',
            name: {
              tr: 'İzmir',
              en: 'Izmir',
            },
          },
          domainTypes: [
            1,
          ],
          franchise: '5dee5217744b2e30d47cb701',
        },
      ],
    }];

  const result = {
    _id: '5dc32e61734a192200caddfe',
    name: 'Karabağlar',
    country: {
      _id: '55999ad00000010000000000',
      name: {
        de: 'Türkei',
        en: 'Turkey',
        fr: 'Turquie',
        nl: 'Turkije',
        tr: 'Türkiye',
        es: 'Turquía',
        it: 'Turchia',
        pt: 'Turquia',
        'en-US': 'Turkey',
      },
    },
    region: {
      _id: '5dcf11d00000010002000001',
      name: {
        tr: 'İzmir',
        en: 'Izmir',
      },
    },
    city: {
      _id: '5dcf11d00000010002000000',
      name: {
        tr: 'İzmir',
        en: 'Izmir',
      },
    },
    domainTypes: [
      1,
    ],
    franchise: '5dee5217744b2e30d47cb701',
  };
  expect(findFranchise(value, franchises)).toMatchObject(result);
});

test('Find City', () => {
  const value = '5db9759777a0c71180d7694c';
  const result = '55999ad00000010001000000';
  expect(findCity(value, mockedWarehouses)).toBe(result);
});
