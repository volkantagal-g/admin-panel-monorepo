import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';

import { usePermission } from '@shared/hooks';
import { getUser } from '@shared/redux/selectors/auth';
import permKey from '@shared/shared/permKey.json';
import { addPageOwnersSelector, getPageByIdSelector, removePageOwnersSelector } from '../../redux/selectors';
import useHelperStyles from '../Helpers/styles';
import useStyles from './styles';
import { Creators } from '../../redux/actions';
import { getTableColumns } from './config';
import AddPageOwnerModal from '../AddPageOwnerModal';

const RoleList = () => {
  const { t } = useTranslation('pagePage');
  const dispatch = useDispatch();
  const classes = useHelperStyles();
  const ownClasses = useStyles();
  const { canAccess } = usePermission();
  const { id: pageId } = useParams();

  const page = useSelector(getPageByIdSelector.getData);
  const pageLoading = useSelector(getPageByIdSelector.getIsPending);

  const addOwnerLoading = useSelector(addPageOwnersSelector.getIsPending);
  const removeOwnersLoading = useSelector(removePageOwnersSelector.getIsPending);

  const pageOwners = useMemo(() => {
    return page?.pageOwners || [];
  }, [page]);

  const pageOwnerIds = useMemo(() => {
    return pageOwners.map(owner => owner._id);
  }, [pageOwners]);

  const userId = getUser()?._id;
  const hasPermissionToEditPageOwners = canAccess(permKey.PAGE_PAGE_DETAIL_COMPONENT_EDIT_PAGE_OWNERS) || pageOwnerIds.includes(userId);
  const hasAccessToUserDetailPage = canAccess(permKey.PAGE_USER_DETAIL);

  const onRemovePageOwner = useCallback(({ ownerIds, afterSuccess }) => {
    dispatch(Creators.removePageOwnersRequest({ pageId, ownerIds, afterSuccess }));
  }, [dispatch, pageId]);

  const tableColumns = useMemo(() => {
    return getTableColumns({
      classes,
      hasAccessToUserDetailPage,
      hasPermissionToEditPageOwners,
      t,
      actionLoading: removeOwnersLoading,
      onRemove: onRemovePageOwner,
    });
  }, [classes, hasAccessToUserDetailPage,
    hasPermissionToEditPageOwners,
    onRemovePageOwner,
    t, removeOwnersLoading]);

  return (
    <AntCard
      title={getTitle()}
      className={ownClasses.antCard}
    >
      <AntTableV2
        bordered
        data={pageOwners}
        columns={tableColumns}
        loading={pageLoading}
        className={ownClasses.table}
        scroll={{ y: 500 }}
      />
    </AntCard>
  );

  function handleAddPageOwner({ ownerIds, afterSuccess }) {
    dispatch(Creators.addPageOwnersRequest({ pageId, ownerIds, afterSuccess }));
  }

  function getTableHeaderActionButtons() {
    return (
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {
          (hasPermissionToEditPageOwners) && (
            <AddPageOwnerModal
              onConfirm={handleAddPageOwner}
              excludedUsers={pageOwnerIds}
              loading={pageLoading || addOwnerLoading}
            />
          )
        }
      </div>
    );
  }

  function getTitle() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }}>
        <div>{t('COMPONENTS.PAGE_DETAIL.PAGE_OWNERS_INFO')}</div>
        {getTableHeaderActionButtons()}
      </div>
    );
  }
};

export default RoleList;
