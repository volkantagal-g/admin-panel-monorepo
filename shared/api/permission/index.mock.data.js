import { mockedPage } from '@shared/api/page/index.mock.data';
import { mockedComponent } from '@shared/api/component/index.mock.data';

export const mockedMyPermissions = [];

export const mockedPageAndComponentPermissionsByRole = roleId => [
  {
    _id: '6006beb08787c7646ba2ebf3',
    role: roleId,
    permKey: mockedPage.permKey,
    countries: mockedPage.countries,
    hasGlobalAccess: null,
    name: mockedPage.name,
    description: mockedPage.description,
    pageId: mockedPage._id,
    components: [
      {
        _id: '62261677d83c2b5df378ede2',
        permKey: mockedComponent.permKey,
        role: roleId,
        countries: mockedComponent.countries,
        isComponent: true,
        name: mockedComponent.name,
        description: mockedComponent.description,
        componentId: mockedComponent._id,
      },
    ],
  },
];
