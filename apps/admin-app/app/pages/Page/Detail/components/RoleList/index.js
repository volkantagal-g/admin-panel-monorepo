import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { find, isEmpty } from 'lodash';
import { Button } from 'antd';
import { ExportOutlined, UserAddOutlined } from '@ant-design/icons';

import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { countriesSelector } from '@shared/redux/selectors/common';
import { createMap } from '@shared/utils/common';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { getUser } from '@shared/redux/selectors/auth';
import { ROLE_MODAL_TYPES } from '@app/pages/Page/Detail/constants';
import { getPageByIdSelector, getPageRolesSelector } from '../../redux/selectors';
import { RoleListButton } from '../Helpers';
import AddOrUpdateRoleModal from '../AddOrUpdateRoleModal';
import useHelperStyles from '../Helpers/styles';
import useStyles from './styles';
import { Creators } from '../../redux/actions';
import { getTableColumns } from './config';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import TableEmpty from '@shared/shared/components/TableEmpty';

const RoleList = () => {
  const { t } = useTranslation('pagePage');
  const dispatch = useDispatch();
  const classes = useHelperStyles();
  const ownClasses = useStyles();
  const { canAccess } = usePermission();
  const { id: pageId } = useParams();

  const page = useSelector(getPageByIdSelector.getData);
  const pageRoles = useSelector(getPageRolesSelector.getData);
  const isRolesPending = useSelector(getPageRolesSelector.getIsPending);
  const isRolesRequested = useSelector(getPageRolesSelector.getIsRequested);
  const countries = useSelector(countriesSelector.getData);

  const [addRoleModalVisibility, setAddRoleModalVisibility] = useState(false);
  const [selectedRoleFromTable, setSelectedRoleFromTable] = useState();
  const [addUsersModalMode, setAddUsersModalMode] = useState(ROLE_MODAL_TYPES.ADD);
  const hasPermissionToEditRoles = canAccess(permKey.PAGE_PAGE_DETAIL_EDIT_ROLES);
  const hasAccessToRoleDetailPage = canAccess(permKey.PAGE_ROLE_DETAIL);

  const memoizedHandleRemovePageFromRoleByPageOwner = useCallback(({ roleId }) => {
    dispatch(Creators.removePageFromRoleByPageOwnerRequest({ role: roleId, pageId: page._id, permKey: page.permKey }));
  }, [dispatch, page]);

  const memoizedHandleUpdateRoleBtnClick = useCallback(({ role }) => {
    setAddUsersModalMode(ROLE_MODAL_TYPES.UPDATE);
    setSelectedRoleFromTable(role);
    setAddRoleModalVisibility(true);
  }, []);

  const onModalClose = useCallback(() => {
    setSelectedRoleFromTable(undefined);
    setAddRoleModalVisibility(false);
  }, []);

  const exportRoles = () => {
    dispatch(Creators.exportRolesExcel({ page }));
    AnalyticsService.track(PANEL_EVENTS.PAGE_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.PAGE_DETAIL.BUTTON.ROLE_INFO_EXPORT });
  };

  const handleConfirmClickOnRoleModal = ({ roles, countries: countriesIn, hasGlobalAccess, componentAccess }) => {
    if (addUsersModalMode === ROLE_MODAL_TYPES.ADD) {
      dispatch(Creators.addPageToRolesByPageOwnerRequest({
        roles,
        countries: countriesIn,
        pageId,
        permKey: page.permKey,
        hasGlobalAccess,
        componentAccess,
      }));
    }
    else if (addUsersModalMode === ROLE_MODAL_TYPES.UPDATE) {
      dispatch(Creators.updatePageCountriesOfRoleByPageOwnerRequest({
        role: roles[0],
        countries: countriesIn,
        pageId,
        permKey: page.permKey,
        hasGlobalAccess,
        componentAccess,
      }));
    }
    onModalClose();
  };

  const isActiveUserIsPageOwner = useMemo(() => {
    const { _id: userId } = getUser();
    const isPageOwner = !isEmpty(find(page?.pageOwners, { _id: userId }));
    return isPageOwner;
  }, [page]);

  const pageRoleIds = useMemo(() => {
    const tempPageRoleIds = [];
    pageRoles?.forEach(role => {
      tempPageRoleIds.push(role._id);
    });
    return tempPageRoleIds;
  }, [pageRoles]);

  const tableColumns = useMemo(
    () => {
      const countriesMap = createMap(countries);
      const tempTableColumns = getTableColumns({
        countriesMap,
        hasAccessToRoleDetailPage,
        isActiveUserIsPageOwner,
        hasPermissionToEditRoles,
        handleRemovePageFromRoleByPageOwner: memoizedHandleRemovePageFromRoleByPageOwner,
        handleUpdateRoleBtnClick: memoizedHandleUpdateRoleBtnClick,
        classes,
      });
      return tempTableColumns;
    },
    [
      countries,
      hasAccessToRoleDetailPage,
      memoizedHandleRemovePageFromRoleByPageOwner,
      hasPermissionToEditRoles,
      memoizedHandleUpdateRoleBtnClick,
      isActiveUserIsPageOwner,
      classes,
    ],
  );

  const getTableHeaderActionButtons = () => {
    return (
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {
          (hasPermissionToEditRoles || isActiveUserIsPageOwner) && (
            <Button
              icon={<UserAddOutlined />}
              loading={isRolesPending}
              onClick={() => {
                setAddUsersModalMode(ROLE_MODAL_TYPES.ADD);
                setAddRoleModalVisibility(true);
                AnalyticsService.track(PANEL_EVENTS.PAGE_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.PAGE_DETAIL.BUTTON.ROLE_INFO_ADD });
              }}
            >
              {t('pagePage:ADD_ROLE')}
            </Button>
          )
        }
        <RoleListButton />
        <Button
          type="secondary"
          onClick={exportRoles}
          icon={<ExportOutlined />}
        >{t('EXPORT_ROLES')}
        </Button>
      </div>
    );
  };

  function getTitle() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }}>
        <div>{t('COMPONENTS.PAGE_DETAIL.ROLES_INFO')}</div>
        {getTableHeaderActionButtons()}
      </div>
    );
  }

  const locale = {
    emptyText: (
      <TableEmpty caption={t('COMPONENTS.PAGE_DETAIL.CLICK_TO_LOAD_ROLES')}>
        <RoleListButton isInitLoadData />
      </TableEmpty>
    ),
  };

  return (
    <> {
      addRoleModalVisibility ? (
        <AddOrUpdateRoleModal
          mode={addUsersModalMode}
          onConfirm={handleConfirmClickOnRoleModal}
          onCancel={onModalClose}
          excludedRoles={pageRoleIds}
          defaultSelectedRole={selectedRoleFromTable}
          countries={countries}
          pageComponents={page?.components}
        />
      ) : null
    }
      <AntCard
        title={getTitle()}
        className={ownClasses.antCard}
      >
        <AntTableV2
          bordered
          locale={isRolesRequested ? null : locale}
          data={pageRoles}
          columns={tableColumns}
          loading={isRolesPending}
          className={ownClasses.table}
          scroll={{ y: 500 }}
        />
      </AntCard>
    </>
  );
};

export default RoleList;
