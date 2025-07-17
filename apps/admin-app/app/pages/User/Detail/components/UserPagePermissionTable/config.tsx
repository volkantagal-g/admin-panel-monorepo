import { Tag, Tooltip } from 'antd';
import { GlobalOutlined, StopOutlined } from '@ant-design/icons';
import { TFunction } from 'react-i18next';

import permKeyMap from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';
import LinkOrText from '@shared/components/UI/LinkOrText';
import { isMobile } from '@shared/utils/common';
import { getColumnInputSearchProps, getCountriesColumnFilterProps } from './utils';

type ColumnParameters = {
  t: TFunction;
  unionPermissionByPermKey: Record<string, PermissionType>;
  countriesMap: Map<MongoIDType, ICountry>,
  classes: Record<string, string>,
  detailUser: UserType,
  userOwnedPages: string[],
  langKey: keyof MinLangObjectType
}

export const getColumns = ({ t, unionPermissionByPermKey, countriesMap, classes, detailUser, userOwnedPages, langKey }: ColumnParameters) => {
  return [
    {
      title: t('NAME_1'),
      dataIndex: 'name',
      key: 'name',
      width: isMobile() ? 200 : undefined,
      sorter: (a: PageType, b: PageType) => a.name?.[langKey]?.trim().localeCompare(b.name?.[langKey]?.trim()),
      defaultSortOrder: 'ascend',
      ...getColumnInputSearchProps('name', { searchPath: `name.${langKey}`, t, classes }),
      render: (nameObj: MinLangObjectType, record: ComponentType) => {
        const nameTranslated = nameObj?.[langKey]?.trim();

        // if it has a page field, it means it's a component
        const isRecordAComponent = !!(record?.page);
        if (isRecordAComponent) {
          return (
            <LinkOrText
              text={nameTranslated}
              to={ROUTE.COMPONENT_DETAIL.path.replace(':id', record._id)}
              permKey={permKeyMap.PAGE_COMPONENT_DETAIL}
            />
          );
        }
        return (
          <LinkOrText
            text={nameTranslated}
            to={ROUTE.PAGE_DETAIL.path.replace(':id', record._id)}
            permKey={permKeyMap.PAGE_PAGE_DETAIL}
          />
        );
      },
    },
    {
      title: t('RESPONSIBILITY'),
      key: 'responsibility',
      width: isMobile() ? 100 : 120,
      sorter: {
        compare: (a: ComponentType, b: ComponentType) => {
          if (userOwnedPages?.includes(a?.page as string || a?._id)) return -1;
          if (userOwnedPages?.includes(b?.page as string || b?._id)) return 1;
          return 0;
        },
        multiple: 3,
      },
      defaultSortOrder: 'ascend',
      align: 'center',
      render: (_: number, record: ComponentType) => {
        if (userOwnedPages?.includes(record?.page as string || record?._id)) {
          return <Tag color="gold">{t('OWNER')}</Tag>;
        }
        return null;
      },
    },
    {
      title: t('COUNTRIES'),
      dataIndex: 'countries',
      key: 'countries',
      width: isMobile() ? 140 : 500,
      ...getCountriesColumnFilterProps({ unionPermissionByPermKey, t, classes }),
      render: (_: ICountry[], record: ComponentType) => {
        const { permKey } = record;
        const detailUserCountries = detailUser?.countries || [];
        const detailUserCountriesSet = new Set(detailUserCountries);
        const detailUserHasGlobalAccess = detailUser?.hasGlobalAccess || false;

        const permission = unionPermissionByPermKey[permKey] || {};
        const { countries: permissionCountries, hasGlobalAccess } = permission;
        if (hasGlobalAccess) {
          const title = detailUserHasGlobalAccess ? t('GLOBAL_ACCESS') : `${t('GLOBAL_ACCESS')}: ${t('USER_COUNTRY_DIFF_GLOBAL')}`;

          return (
            <Tooltip title={title}>
              <Tag style={{ opacity: detailUserHasGlobalAccess ? 1 : 0.5 }}>
                <GlobalOutlined />
              </Tag>
            </Tooltip>
          );
        }

        if (!permissionCountries?.length) {
          return (
            <Tooltip title={t('NO_ACCESS')}>
              <Tag>
                <StopOutlined style={{ color: 'red' }} />
              </Tag>
            </Tooltip>
          );
        }

        return permissionCountries.map(countryId => {
          const country = countriesMap.get(countryId);
          const name = country?.name?.[langKey] ?? `NotFound/${countryId}`;
          const flag = country?.flag ?? '??';

          const countryAlsoExistsInUser = detailUserCountriesSet.has(countryId) || detailUserHasGlobalAccess;

          const title = countryAlsoExistsInUser ? name : `${name}: ${t('USER_COUNTRY_DIFF_SPECIFIC')}`;
          return (
            <Tooltip title={title} key={countryId}>
              <Tag style={{ marginRight: 5, opacity: countryAlsoExistsInUser ? 1 : 0.5 }}>
                {flag}
              </Tag>
            </Tooltip>
          );
        });
      },
    },
  ];
};
