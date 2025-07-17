import { mockedPage } from '@shared/api/page/index.mock.data';

export const mockedComponent = {
  name: {
    tr: 'Panel Soket Odası',
    en: 'Socket Panel Room',
  },
  description: {
    tr: "Panele giren çıkanların event'lerinin olduğu oda",
    en: 'Online user events',
  },
  countries: [
    '55999ad00000010000000000',
  ],
  _id: '60ae67ebebec0855f854a49b',
  permKey: 'SOCKET_PANEL_ROOM',
  page: {
    _id: mockedPage._id,
    permKey: mockedPage.permKey,
  },
  createdAt: '2021-05-26T15:23:23.761Z',
  hasGlobalAccess: true,
};
