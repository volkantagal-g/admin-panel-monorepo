import { Button, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { UserDeleteOutlined } from '@ant-design/icons';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { ROUTE } from '@app/routes';
import { t } from '@shared/i18n';
import { getColumnInputSearchProps, getCountriesColumnFilterProps } from '../Helpers/tableFilters';
import { isMobile } from '@shared/utils/common';

const actionButtonsRenderer = ({
  hasPermissionToEditRolePermissions,
  hasAccessToComponentDetailPage,
  hasAccessToPageDetailPage,
  onRemove,
  onUpdate,
  classes,
}: {
  hasPermissionToEditRolePermissions: boolean,
  hasAccessToComponentDetailPage: boolean,
  hasAccessToPageDetailPage?: boolean,
  onRemove: ({ permKey }: { permKey: string }) => void,
  onUpdate: ({ selectedRow }: { selectedRow: ComponentType }) => void,
  classes: Record<string, string>,
}) => (id: MongoIDType, row: ComponentType & { componentId: MongoIDType, pageId: MongoIDType, isComponent: boolean }) => {
  const { isComponent, hasGlobalAccess, countries, permKey, componentId, pageId } = row;

  const removePopoverTitle = (
    isComponent ?
      t('rolePage:CONFIRMATION.REMOVE_COMPONENT') :
      t('rolePage:CONFIRMATION.REMOVE_PAGE')
  );

  return (
    <>
      {
        (hasPermissionToEditRolePermissions && (hasGlobalAccess || !_isEmpty(countries))) ? (
          <Popconfirm
            title={removePopoverTitle}
            okText={t('button:YES')}
            cancelText={t('button:CANCEL')}
            onConfirm={() => {
              onRemove({ permKey });
            }}
          >
            <Button
              size="small"
              danger
              className={classes.actionButton}
              icon={<UserDeleteOutlined />}
            >
              {t('button:REMOVE')}
            </Button>
          </Popconfirm>
        ) : undefined
      }
      {
        (hasPermissionToEditRolePermissions) ? (
          <Button
            size="small"
            className={classes.actionButton}
            onClick={() => {
              onUpdate({ selectedRow: row });
            }}
          >
            {t('button:UPDATE')}
          </Button>
        ) : undefined
      }
      {
        isComponent && hasAccessToComponentDetailPage ? (
          <Link to={ROUTE.COMPONENT_DETAIL.path.replace(':id', componentId)} className={classes.actionButton}>
            <Button size="small" type="ghost">
              {t('global:DETAIL')}
            </Button>
          </Link>
        ) : undefined
      }
      {
        !isComponent && hasAccessToPageDetailPage ? (
          <Link to={ROUTE.PAGE_DETAIL.path.replace(':id', pageId)} className={classes.actionButton}>
            <Button size="small" type="ghost">
              {t('global:DETAIL')}
            </Button>
          </Link>
        ) : undefined
      }
    </>
  );
};

export const expandedRowRender = ({
  pagesMap,
  countriesMap,
  classes,
  langKey,
  hasAccessToComponentDetailPage,
  hasPermissionToEditRolePermissions,
  handleUpdateComponentPermission,
  handleRemoveComponentPermission,
}: {
  pagesMap: Record<string, PageTypePopulated>,
  countriesMap: Record<string, ICountry>,
  classes: Record<string, string>,
  langKey: string,
  hasAccessToComponentDetailPage: boolean,
  hasPermissionToEditRolePermissions: boolean,
  handleUpdateComponentPermission: ({ selectedRow }: { selectedRow: ComponentType }) => void,
  handleRemoveComponentPermission: ({ permKey }: { permKey: string }) => void,
}) => (permission: PermissionType) => {
  const { permKey } = permission;
  const page = pagesMap[permKey];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: MinLangObjectType) => _get(name, langKey),
    },
    {
      title: t('rolePage:PERMITTED_COUNTRIES'),
      dataIndex: 'countries',
      key: 'countries',
      width: 500,
      ...getCountriesColumnFilterProps({ dataIndex: 'countries', countriesMap, classes }),
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: actionButtonsRenderer({
        hasPermissionToEditRolePermissions,
        hasAccessToComponentDetailPage,
        onRemove: handleRemoveComponentPermission,
        onUpdate: handleUpdateComponentPermission,
        classes,
      }),
    },
  ];

  return <AntTableV2 bordered columns={columns} dataSource={page?.components ?? []} pagination={false} />;
};

export const getTableColumns = ({
  langKey,
  classes,
  countriesMap,
  hasAccessToPageDetailPage,
  hasAccessToComponentDetailPage,
  hasPermissionToEditRolePermissions,
  handleUpdateRoleBtnClick,
  handleRemovePermissionFromRole,
}: {
  langKey: string,
  classes: Record<string, string>,
  countriesMap: Record<string, ICountry>,
  hasAccessToPageDetailPage: boolean,
  hasAccessToComponentDetailPage: boolean,
  hasPermissionToEditRolePermissions: boolean,
  handleRemovePermissionFromRole: ({ permKey }: { permKey: string }) => void,
  handleUpdateRoleBtnClick: ({ selectedRow }: { selectedRow: ComponentType }) => void,
}) => {
  return [
    {
      title: t('global:NAME'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a: PageTypePopulated, b: PageTypePopulated) => _get(a, ['name', langKey]).localeCompare(_get(b, ['name', langKey])),
      defaultSortOrder: 'ascend',
      width: isMobile() ? 200 : 270,
      ...getColumnInputSearchProps({ dataIndex: 'name', searchPath: `name.${langKey}`, classes }),
      render: (name: MinLangObjectType) => {
        return _get(name, langKey);
      },
    },
    {
      title: t('global:DESCRIPTION'),
      dataIndex: 'description',
      width: isMobile() ? 200 : undefined,
      key: 'description',
      ...getColumnInputSearchProps({ dataIndex: 'description', searchPath: `description.${langKey}`, classes }),
      render: (description: MinLangObjectType) => _get(description, langKey),
    },
    {
      title: t('rolePage:PERMITTED_COUNTRIES'),
      dataIndex: 'countries',
      key: 'countries',
      width: 200,
      ...getCountriesColumnFilterProps({ dataIndex: 'countries', countriesMap, classes }),
    },
    ...(hasAccessToPageDetailPage || hasAccessToComponentDetailPage || hasPermissionToEditRolePermissions ? [
      {
        title: t('global:ACTION'),
        dataIndex: '_id',
        key: '_id',
        align: 'center',
        width: 220,
        render: actionButtonsRenderer({
          hasPermissionToEditRolePermissions,
          hasAccessToPageDetailPage,
          hasAccessToComponentDetailPage,
          classes,
          onRemove: handleRemovePermissionFromRole,
          onUpdate: handleUpdateRoleBtnClick,
        }),
      },
    ] : []),
  ];
};
