import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { getLimitAndOffset } from '@shared/utils/common';

import { Creators } from '../../redux/actions';
import { usersSelector, updateUsersWebhelpIdSelector, removeWebhelpIdFromUserSelector } from '../../redux/selectors';
import SetWebhelpIdModal from '../SetWebhelpIdModal';
import { getTableColumns, exampleCsv, maxUpdateLimit } from './config';
import { getFormattedCsvData } from './utils';

const UserWebhelpIdTable = ({ filters }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('userPage');
  const { canAccess } = usePermission();
  const users = useSelector(usersSelector.getData);
  const getUsersIsPending = useSelector(usersSelector.getIsPending);
  const updateUsersWebhelpIdIsPending = useSelector(updateUsersWebhelpIdSelector.getIsPending);
  const removeWebhelpIdFromUserIsPending = useSelector(removeWebhelpIdFromUserSelector.getIsPending);
  const hasPermissionToEditWebhelpId = canAccess(permKey.PAGE_USER_WEBHELP_MATCHING_EDIT_WEBHELP_ID);
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });
  const [isSetWebhelpIdModalVisible, setIsSetWebhelpIdModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const getUsersCallback = useCallback(() => {
    if (filters.searchTerm || filters.webhelpId) {
      const limitOffset = getLimitAndOffset(pagination);
      dispatch(Creators.getUsersRequest({ ...limitOffset, ...filters }));
    }
  }, [dispatch, filters, pagination]);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const resetPaginationCurrentPageCallback = useCallback(() => {
    setPagination(oldState => {
      return { ...oldState, currentPage: 1 };
    });
  }, []);

  const handleRemoveWebhelpIdFromUserCallback = useCallback(({ user }) => {
    dispatch(Creators.removeWebhelpIdFromUserRequest({ id: user._id }));
  }, [dispatch]);

  const handleShowSetWebhelpIdModalCallback = useCallback(({ user }) => {
    setIsSetWebhelpIdModalVisible(true);
    setSelectedUser(user);
  }, []);

  const handleSetWebhelpIdModalConfirmCallback = ({ webhelpId }) => {
    const updateData = [{ getirEmail: selectedUser.email, webhelpId }];
    dispatch(Creators.updateUsersWebhelpIdRequest({ updateData }));
    setIsSetWebhelpIdModalVisible(false);
  };

  const handleSetWebhelpIdModalCloseCallback = () => {
    setIsSetWebhelpIdModalVisible(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    resetPaginationCurrentPageCallback();
  }, [resetPaginationCurrentPageCallback]);

  useEffect(() => {
    getUsersCallback();
  }, [getUsersCallback]);

  const tableColumns = useMemo(() => getTableColumns({
    handleShowSetWebhelpIdModal: handleShowSetWebhelpIdModalCallback,
    handleRemoveWebhelpIdFromUser: handleRemoveWebhelpIdFromUserCallback,
    hasPermissionToEditWebhelpId,
  }), [handleShowSetWebhelpIdModalCallback, handleRemoveWebhelpIdFromUserCallback, hasPermissionToEditWebhelpId]);

  const handleCsvImport = ({ data: csvData = {} }) => {
    if (csvData.length > maxUpdateLimit) {
      dispatch(ToastCreators.error({ message: t('userPage:BATCH_WEBHELP_ID_UPDATE_LIMIT', { max: maxUpdateLimit }) }));
    }
    else {
      const formatted = getFormattedCsvData(csvData);
      dispatch(Creators.updateUsersWebhelpIdRequest({ updateData: formatted }));
    }
  };

  return (
    <>
      <AntTableV2
        title={t('userPage:USERS')}
        data={users}
        columns={tableColumns}
        loading={getUsersIsPending || updateUsersWebhelpIdIsPending || removeWebhelpIdFromUserIsPending}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        {...(hasPermissionToEditWebhelpId ? {
          importerProps: {
            exampleCsv,
            onOkayClick: handleCsvImport,
            warningText: t('userPage:WEBHELP_ID_CSV_IMPORT_WARNING'),
          },
        } : undefined)}
      />
      {
        hasPermissionToEditWebhelpId && (
          <SetWebhelpIdModal
            isVisible={isSetWebhelpIdModalVisible}
            user={selectedUser}
            onConfirm={handleSetWebhelpIdModalConfirmCallback}
            onClose={handleSetWebhelpIdModalCloseCallback}
          />
        )
      }
    </>
  );
};

export default UserWebhelpIdTable;
