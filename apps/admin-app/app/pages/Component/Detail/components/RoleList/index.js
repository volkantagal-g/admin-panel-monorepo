import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { operationalCountriesSelector as countriesSelector, getUserOwnedPagesSelector } from '@shared/redux/selectors/common';
import { createMap } from '@shared/utils/common';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import TableEmpty from '@shared/shared/components/TableEmpty';
import { ROLE_MODAL_TYPES } from '@app/pages/Page/Detail/constants';
import { getComponentByIdSelector, getComponentRolesSelector } from '../../redux/selectors';
import { RoleListButton } from '../Helpers';
import AddOrUpdateRoleModal from '../AddOrUpdateRoleModal';
import useHelperStyles from '../Helpers/styles';
import { Creators } from '../../redux/actions';
import { getTableColumns } from './config';
import useStyles from './styles';

const RoleList = () => {
  const { t } = useTranslation('componentPage');
  const dispatch = useDispatch();
  const ownClasses = useStyles();
  const classes = useHelperStyles();
  const { canAccess } = usePermission();
  const { id: componentId } = useParams();

  const component = useSelector(getComponentByIdSelector.getData);
  const componentRoles = useSelector(getComponentRolesSelector.getData);
  const isRolesPending = useSelector(getComponentRolesSelector.getIsPending);
  const isRolesRequested = useSelector(getComponentRolesSelector.getIsRequested);
  const countries = useSelector(countriesSelector.getData);

  const userOwnedPages = useSelector(getUserOwnedPagesSelector.getData);
  const userOwnedPagesPending = useSelector(getUserOwnedPagesSelector.getIsPending);

  const [addRoleModalVisibility, setAddRoleModalVisibility] = useState(false);
  const [selectedRoleFromTable, setSelectedRoleFromTable] = useState();
  const [addUsersModalMode, setAddUsersModalMode] = useState(ROLE_MODAL_TYPES.ADD);
  const hasPermissionToEditRoles = canAccess(permKey.PAGE_COMPONENT_DETAIL_EDIT_ROLES);
  const hasAccessToRoleDetailPage = canAccess(permKey.PAGE_ROLE_DETAIL);

  const memoizedHandleRemoveComponentFromRoleByPageOwner = useCallback(({ roleId }) => {
    dispatch(Creators.removeComponentFromRoleByPageOwnerRequest({
      role: roleId,
      pageId: component?.page?._id,
      componentId: component._id,
      permKey: component.permKey,
    }));
  }, [dispatch, component]);

  const memoizedHandleUpdateRoleBtnClick = useCallback(({ role }) => {
    setAddUsersModalMode(ROLE_MODAL_TYPES.UPDATE);
    setSelectedRoleFromTable(role);
    setAddRoleModalVisibility(true);
  }, []);

  const onModalClose = useCallback(() => {
    setSelectedRoleFromTable(undefined);
    setAddRoleModalVisibility(false);
  }, []);

  const handleConfirmClickOnRoleModal = ({ roles, countries: countriesIn, hasGlobalAccess }) => {
    if (addUsersModalMode === ROLE_MODAL_TYPES.ADD) {
      dispatch(Creators.addComponentToRolesByPageOwnerRequest({
        permKey: component.permKey,
        pageId: component?.page?._id,
        roles,
        countries: countriesIn,
        componentId,
        hasGlobalAccess,
      }));
    }
    else if (addUsersModalMode === ROLE_MODAL_TYPES.UPDATE) {
      dispatch(Creators.updateComponentCountriesOfRoleByPageOwnerRequest({
        role: roles[0],
        pageId: component?.page?._id,
        permKey: component.permKey,
        countries: countriesIn,
        componentId,
        hasGlobalAccess,
      }));
    }
    onModalClose();
  };

  const isActiveUserIsPageOwner = useMemo(() => {
    const isPageOwner = userOwnedPages?.find(page => page === component?.page?._id);
    return isPageOwner;
  }, [component, userOwnedPages]);

  const componentRoleIds = useMemo(() => {
    const tempPageRoleIds = [];
    componentRoles?.forEach(role => {
      tempPageRoleIds.push(role._id);
    });
    return tempPageRoleIds;
  }, [componentRoles]);

  const tableColumns = useMemo(
    () => {
      const countriesMap = createMap(countries);
      const tempTableColumns = getTableColumns({
        countriesMap,
        hasAccessToRoleDetailPage,
        isActiveUserIsPageOwner,
        hasPermissionToEditRoles,
        handleRemoveComponentFromRoleByPageOwner: memoizedHandleRemoveComponentFromRoleByPageOwner,
        handleUpdateRoleBtnClick: memoizedHandleUpdateRoleBtnClick,
        classes,
      });
      return tempTableColumns;
    },
    [
      countries,
      hasAccessToRoleDetailPage,
      memoizedHandleRemoveComponentFromRoleByPageOwner,
      hasPermissionToEditRoles,
      isActiveUserIsPageOwner,
      memoizedHandleUpdateRoleBtnClick,
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
              loading={isRolesPending || userOwnedPagesPending}
              onClick={() => {
                setAddUsersModalMode(ROLE_MODAL_TYPES.ADD);
                setAddRoleModalVisibility(true);
              }}
            >
              {t('componentPage:ADD_ROLE')}
            </Button>
          )
        }
        <RoleListButton />
      </div>
    );
  };

  function getTitle() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }}>
        <div>{t('COMPONENTS.ROLES_INFO')}</div>
        {getTableHeaderActionButtons()}
      </div>
    );
  }

  const locale = {
    emptyText: (
      <TableEmpty caption={t('CLICK_TO_LOAD_ROLES')}>
        <RoleListButton />
      </TableEmpty>
    ),
  };

  return (
    <>
      {
        addRoleModalVisibility ? (
          <AddOrUpdateRoleModal
            mode={addUsersModalMode}
            onConfirm={handleConfirmClickOnRoleModal}
            onCancel={onModalClose}
            excludedRoles={componentRoleIds}
            defaultSelectedRole={selectedRoleFromTable}
            countries={countries}
          />
        ) : null
      }
      <AntCard
        title={getTitle()}
      >
        <AntTableV2
          locale={isRolesRequested ? null : locale}
          data={componentRoles}
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
