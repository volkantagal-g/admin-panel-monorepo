import moment from 'moment';

import { ROUTE } from '@app/routes';
import { createMap } from '@shared/utils/common';

export const MOMENT_DAY_FORMAT = 'YYYY.MM.DD';

export const PAGES_EXPORT_COLUMNS = t => [
  {
    title: t('adminPlatformGlobal:PAGE_EXPORT.PAGE_ID'),
    key: 'pageId',
    default: '',
  },
  {
    title: t('adminPlatformGlobal:PAGE_EXPORT.COMPONENT_ID'),
    key: 'componentId',
    default: '',
  },
  {
    title: t('adminPlatformGlobal:PAGE_EXPORT.PAGE_OR_COMPONENT_NAME'),
    key: 'name',
    default: '',
  },
  {
    title: t('adminPlatformGlobal:PAGE_EXPORT.DESCRIPTION'),
    key: 'description',
    default: '',
  },
  {
    title: t('adminPlatformGlobal:PAGE_EXPORT.PERMISSION_KEY'),
    key: 'permKey',
    default: '',
  },
  {
    title: t('adminPlatformGlobal:PAGE_EXPORT.COUNTRY'),
    key: 'countryList',
    default: '',
  },
  {
    title: t('adminPlatformGlobal:PAGE_EXPORT.RESPONSIBLE_SQUAD'),
    key: 'responsibleSquad',
    default: '',
  },
  {
    title: t('adminPlatformGlobal:PAGE_EXPORT.CREATION_DATE'),
    key: 'createdAt',
    default: '',
  },
  {
    title: t('adminPlatformGlobal:PAGE_EXPORT.PAGE_OWNERS'),
    key: 'pageOwners',
    default: '',
  },
  {
    title: t('adminPlatformGlobal:PAGE_EXPORT.PAGE_URL'),
    key: 'pageUrl',
    default: '',
  },
];

export const formatPagesForExcelExport = ({ t, pages, countries, language }) => {
  const countryMap = createMap(countries);
  const dataToExport = [];

  pages.forEach(page => {
    // PAGE ITSELF
    const pageId = page._id;

    const pageCountryNames = page.countries.map(countryId => countryMap[countryId]?.name[language]);
    const countryList = page.hasGlobalAccess ? t('adminPlatformGlobal:PAGE_EXPORT.GLOBAL') : pageCountryNames.join(',');

    const pageKey = page.permKey.startsWith('PAGE_') ? page.permKey.slice('PAGE_'.length) : page.permKey;
    const responsibleSquad = ROUTE[pageKey]?.squad || '';
    const pageUrl = ROUTE[pageKey]?.path || '';
    const pageName = page.name[language];

    dataToExport.push({
      pageId,
      componentId: '',
      name: pageName,
      description: page.description[language],
      permKey: page.permKey,
      countryList,
      responsibleSquad,
      createdAt: moment(page.createdAt).format(MOMENT_DAY_FORMAT),
      pageOwners: page?.pageOwners?.map(owner => owner.name).join(',') || '',
      pageUrl: pageUrl ? `https://admin.getir.com${pageUrl}` : '',
    });

    // COMPONENTS OF THE PAGE
    page.components.forEach(component => {
      const componentId = component._id || '';

      const componentCountryNames = component.countries.map(countryId => countryMap[countryId]?.name[language]);
      const componentCountryList = component.hasGlobalAccess ? t('adminPlatformGlobal:PAGE_EXPORT.GLOBAL') : componentCountryNames.join(',');
      const componentName = component.name[language];
      dataToExport.push({
        pageId,
        componentId,
        name: `${pageName} / ${componentName}`,
        description: component.description[language],
        permKey: component.permKey,
        countryList: componentCountryList,
        responsibleSquad,
        createdAt: moment(component.createdAt).format(MOMENT_DAY_FORMAT),
      });
    });
  });

  return dataToExport;
};
