import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';
import { ExportOutlined, UserAddOutlined } from '@ant-design/icons';
import _isEmpty from 'lodash/isEmpty';

import { getLangKey } from '@shared/i18n';
import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { createMap } from '@shared/utils/common';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { ADD_PERMISSION_MODAL_TYPES } from '@app/pages/Role/Detail/constants';
import { countriesSelector } from '@shared/redux/selectors/common';
import { getPageAndComponentPermissionsOfRoleSelector, getRoleByIdSelector } from '../../redux/selectors';
import { PageListButton } from '../Helpers';
import AddOrUpdatePageModal from '../AddOrUpdatePageModal';
import useHelperStyles from '../Helpers/styles';
import { Creators } from '../../redux/actions';
import { getTableColumns } from './config';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import useStyles from './styles';
import TableEmpty from '@shared/shared/components/TableEmpty';

const PageList = () => {
  const { t } = useTranslation(['global', 'rolePage', 'adminPlatformGlobal']);
  const dispatch = useDispatch();
  const classes = useHelperStyles();
  const { canAccess } = usePermission();
  const { id: roleId } = useParams();
  const langKey = getLangKey();
  const classes2 = useStyles();

  const role = useSelector(getRoleByIdSelector.getData);
  const isPermissionsOfRolePending = useSelector(getPageAndComponentPermissionsOfRoleSelector.getIsPending);
  const isPermissionsOfRoleRequested = useSelector(getPageAndComponentPermissionsOfRoleSelector.getIsRequested);
  const permissionsOfRole = useSelector(getPageAndComponentPermissionsOfRoleSelector.getData);
  const countries = useSelector(countriesSelector.getData);

  const [modalTitle, setModalTitle] = useState<string>('');
  const [addPermissionModalVisibility, setPermissionPageModalVisibility] = useState(false);
  const [selectedRowFromTable, setSelectedRowFromTable] = useState<PageType>();
  const [addPermissionModalMode, setAddPermissionModalMode] = useState<number>(ADD_PERMISSION_MODAL_TYPES.ADD);
  const hasPermissionToEditRolePermissions = canAccess(permKey.PAGE_ROLE_DETAIL_EDIT_ROLE_PERMISSIONS);
  const hasAccessToPageDetailPage = canAccess(permKey.PAGE_PAGE_DETAIL);
  const hasAccessToComponentDetailPage = canAccess(permKey.PAGE_COMPONENT_DETAIL);

  const memoizedHandleRemovePermissionFromRole = useMemo(() => ({ permKey: permKeyLocal }: { permKey: string }) => {
    dispatch(Creators.removePermissionFromRoleRequest({ permKey: permKeyLocal, roleId }));
    AnalyticsService.track(PANEL_EVENTS.ROLE_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.ROLE_DETAIL.BUTTON.PAGES_REMOVE });
  }, [dispatch, roleId]);

  const onModalClose = () => {
    setSelectedRowFromTable(undefined);
    setPermissionPageModalVisibility(false);
  };

  const memoizedHandleUpdateRoleBtnClick = useMemo(() => ({ selectedRow }: { selectedRow: PageType }) => {
    setAddPermissionModalMode(ADD_PERMISSION_MODAL_TYPES.UPDATE);
    setSelectedRowFromTable(selectedRow);
    setModalTitle(t('rolePage:ADD_PAGE_PERMISSION'));
    setPermissionPageModalVisibility(true);
    AnalyticsService.track(PANEL_EVENTS.ROLE_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.ROLE_DETAIL.BUTTON.PAGES_UPDATE });
  }, [t]);

  const handleConfirmClickOnPageModal = ({
    permKeys,
    countryIds,
    hasGlobalAccess,
  }: {
    permKeys: string[],
    countryIds: string[],
    hasGlobalAccess: boolean
  }) => {
    dispatch(Creators.updatePermissionOfRoleRequest({ permKeys, countryIds, roleId, hasGlobalAccess }));
    onModalClose();
  };

  const excludedPageIds = useMemo(() => {
    const existingPages = permissionsOfRole?.map(perm => perm.pageId) || [];
    return existingPages;
  }, [permissionsOfRole]);

  const countriesMap = useMemo(() => createMap(countries), [countries]) as Record<string, ICountry>;

  const tableColumns = useMemo(
    () => {
      if (_isEmpty(countriesMap)) {
        return [];
      }

      const tempTableColumns = getTableColumns({
        langKey,
        countriesMap,
        hasAccessToPageDetailPage,
        hasAccessToComponentDetailPage,
        hasPermissionToEditRolePermissions,
        handleRemovePermissionFromRole: memoizedHandleRemovePermissionFromRole,
        handleUpdateRoleBtnClick: memoizedHandleUpdateRoleBtnClick,
        classes,
      });
      return tempTableColumns;
    },
    [
      countriesMap,
      hasAccessToPageDetailPage,
      hasAccessToComponentDetailPage,
      memoizedHandleRemovePermissionFromRole,
      hasPermissionToEditRolePermissions,
      memoizedHandleUpdateRoleBtnClick,
      langKey,
      classes,
    ],
  );

  const getTableTitle = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '4px' }}>
        <div>{t('rolePage:ACCESS_GRANTED_PAGES')}</div>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {
            (hasPermissionToEditRolePermissions) && (
              <Button
                icon={<UserAddOutlined />}
                loading={isPermissionsOfRolePending}
                onClick={() => {
                  setAddPermissionModalMode(ADD_PERMISSION_MODAL_TYPES.ADD);
                  setModalTitle(t('rolePage:ADD_PAGE_PERMISSION'));
                  setPermissionPageModalVisibility(true);
                  AnalyticsService.track(PANEL_EVENTS.ROLE_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.ROLE_DETAIL.BUTTON.PAGES_ADD_PERMISSION });
                }}
              >
                {t('rolePage:ADD_PERMISSION')}
              </Button>
            )
          }
          &nbsp;
          <PageListButton />
          &nbsp;
          <Button
            icon={<ExportOutlined />}
            onClick={() => dispatch(Creators.exportAccessGrantedPagesExcel({ t, role }))}
          >
            {t('EXPORT_PAGES')}
          </Button>
        </div>

      </div>
    );
  };

  const locale = {
    emptyText: (
      <TableEmpty caption={t('rolePage:CLICK_TO_LOAD_PAGES')}>
        <PageListButton />
      </TableEmpty>
    ),
  };

  return (
    <>
      {
        addPermissionModalVisibility && (
          <AddOrUpdatePageModal
            modalTitle={modalTitle}
            mode={addPermissionModalMode}
            onConfirm={handleConfirmClickOnPageModal}
            onCancel={onModalClose}
            excludedPageIds={excludedPageIds}
            defaultSelectedPermission={selectedRowFromTable!}
            countries={countries}
          />
        )
      }

      <AntCard
        title={getTableTitle()}
        className={classes2.card}
      >
        <AntTableV2
          bordered
          locale={isPermissionsOfRoleRequested ? null : locale}
          data={permissionsOfRole}
          columns={tableColumns}
          loading={isPermissionsOfRolePending}
          className={classes2.table}
          scroll={{ y: 500 }}
        />
      </AntCard>
    </>
  );
};

export default PageList;
