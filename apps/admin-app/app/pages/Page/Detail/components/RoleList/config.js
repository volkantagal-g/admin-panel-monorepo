import { Button, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { UserDeleteOutlined } from '@ant-design/icons';

import moment from 'moment';

import { ROUTE } from '@app/routes';
import { getLangKey, t } from '@shared/i18n';
import { getColumnInputSearchProps, getCountriesColumnFilterProps } from '../Helpers/tableFilters';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import { isMobile } from '@shared/utils/common';

export const getTableColumns = ({
  classes,
  countriesMap,
  hasAccessToRoleDetailPage,
  isActiveUserIsPageOwner,
  hasPermissionToEditRoles,
  handleUpdateRoleBtnClick,
  handleRemovePageFromRoleByPageOwner,
}) => {
  return [
    {
      title: '#',
      key: '_index',
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: t('global:NAME'),
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {
        const nameA = a.name;
        const nameB = b.name;
        return nameA.localeCompare(nameB);
      },
      width: isMobile() ? 150 : 300,
      ...getColumnInputSearchProps('name', { classes }),
      render: name => {
        return name;
      },
    },
    {
      title: t('global:DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => {
        const descriptionA = a?.description?.[getLangKey()];
        const descriptionB = b?.description?.[getLangKey()];
        return descriptionA.localeCompare(descriptionB);
      },
      width: isMobile() ? 150 : 300,
      ...getColumnInputSearchProps('description', { classes, searchPath: `description.${getLangKey()}` }),
      render: description => {
        return description?.[getLangKey()];
      },
    },
    {
      title: t('pagePage:PERMITTED_COUNTRIES'),
      dataIndex: 'permittedCountries',
      width: isMobile() ? 150 : undefined,
      key: 'permittedCountries',
      ...getCountriesColumnFilterProps('permittedCountries', { countriesMap, classes }),
    },
    {
      title: t('CREATED_AT'),
      dataIndex: 'accessGrantedDate',
      key: 'accessGrantedDate',
      width: 150,
      sorter: (a, b) => {
        const createdAtA = a.accessGrantedDate;
        const createdAtB = b.accessGrantedDate;
        return moment(createdAtA).diff(moment(createdAtB));
      },
      render: createdAt => {
        return moment(createdAt).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      title: t('global:ACTION'),
      dataIndex: '_id',
      key: '_id',
      width: 250,
      align: 'center',
      render: (id, row) => {
        const isGloballyPermitted = row.hasGlobalAccess || false;
        return (
          <>
            {
              ((hasPermissionToEditRoles || isActiveUserIsPageOwner) &&
                (!isEmpty(row.permittedCountries) || isGloballyPermitted)) ? (
                  <Popconfirm
                    title={t('pagePage:CONFIRMATION.REMOVE_ROLE')}
                    okText={t('button:YES')}
                    cancelText={t('button:CANCEL')}
                    onConfirm={() => {
                      handleRemovePageFromRoleByPageOwner({ roleId: id });
                    }}
                  >
                    <Button
                      size="small"
                      type="danger"
                      className={classes.actionButton}
                      icon={<UserDeleteOutlined />}
                      onClick={() => AnalyticsService.track(PANEL_EVENTS.PAGE_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.PAGE_DETAIL.BUTTON.ROLE_INFO_REMOVE })}
                    >
                      {t('button:REMOVE')}
                    </Button>
                  </Popconfirm>
                ) : undefined
            }
            {
              (hasPermissionToEditRoles || isActiveUserIsPageOwner) ? (
                <Button
                  size="small"
                  className={classes.actionButton}
                  onClick={() => {
                    handleUpdateRoleBtnClick({ role: row });
                    AnalyticsService.track(PANEL_EVENTS.PAGE_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.PAGE_DETAIL.BUTTON.ROLE_INFO_UPDATE });
                  }}
                >
                  {t('button:UPDATE')}
                </Button>
              ) : undefined
            }
            {
              hasAccessToRoleDetailPage ? (
                <Link to={ROUTE.ROLE_DETAIL.path.replace(':id', id)} className={classes.actionButton}>
                  <Button size="small" type="ghost">
                    {t('global:DETAIL')}
                  </Button>
                </Link>
              ) : undefined
            }
          </>
        );
      },
    },
  ];
};
