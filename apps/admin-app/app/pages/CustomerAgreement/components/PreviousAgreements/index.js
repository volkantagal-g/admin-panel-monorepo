import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { usePermission } from '@shared/hooks';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import AddAgreementModal from './AddAgreementModal';
import {
  documentTypeSelector, previousAgreementsSelector,
  uploadAgreementsSelector, agreementForcedSelector,
} from '@app/pages/CustomerAgreement/redux/selectors';
import { tableColumns } from './config';
import { Creators } from '../../redux/actions';
import permKey from '@shared/shared/permKey.json';

const PREVIOUS_AGREEMENTS_LIMIT = 10;
const CUSTOM_LIST_TOTAL = 1000;
const INIT_LAST_SELECTED_PAGE = 1;
const INIT_PAGINATION_CONFIG = { currentPage: 1, rowsPerPage: PREVIOUS_AGREEMENTS_LIMIT };
const CONFIRM_DELAY_MS = 300;

const PreviousAgreements = () => {
  const { t } = useTranslation(['customerAgreementPage', 'global']);
  const dispatch = useDispatch();
  const { canAccess } = usePermission();

  const agreementType = useSelector(documentTypeSelector.getSelected);
  const previousAgreements = useSelector(previousAgreementsSelector.getData);
  const pagination = useSelector(previousAgreementsSelector.getPagination);
  const isPending = useSelector(previousAgreementsSelector.getIsPending);
  const agreementDocsData = useSelector(uploadAgreementsSelector.getData);

  const isAddAgreementAllowed = canAccess(permKey.PAGE_CUSTOMER_AGREEMENT_ADD_AGREEMENT);
  // selectors
  const agreementDocs = useSelector(uploadAgreementsSelector.getFiles);
  const isUploadAgreementPending = useSelector(uploadAgreementsSelector.getIsPending);
  // states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddAgreementInProgress, setIsAgreementInProgress] = useState(false);
  const [isPopconfirmVisible, setIsPopconfirmVisible] = useState(false);
  const isForcedPending = useSelector(agreementForcedSelector.getIsPending);

  const [lastSelectedPage, setLastSelectedPage] = useState(INIT_LAST_SELECTED_PAGE);
  const [tablePagination, setTablePagination] = useState(INIT_PAGINATION_CONFIG);

  const selectedAgreementType = useSelector(documentTypeSelector.getSelected);

  const paginationTotal = pagination.next ? CUSTOM_LIST_TOTAL : lastSelectedPage * PREVIOUS_AGREEMENTS_LIMIT;

  const onPaginationChange = ({ currentPage, rowsPerPage }) => {
    setLastSelectedPage(currentPage);
    setTablePagination({ currentPage, rowsPerPage });

    if (lastSelectedPage < currentPage) {
      if (!pagination.next) {
        return;
      }

      dispatch(Creators.getPreviousAgreementsRequest({ agreementType, page: pagination.next }));
      return;
    }

    if (!pagination.prev) {
      return;
    }

    dispatch(Creators.getPreviousAgreementsRequest({ agreementType, page: pagination.prev }));
  };

  useEffect(() => {
    dispatch(Creators.getPreviousAgreementsRequest({ agreementType, page: pagination.prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, agreementType]);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const getTableHeaderActions = () => {
    return (
      <Space>
        {
          (isAddAgreementAllowed) && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleOpenModal}
            >
              {t('LATEST_AGREEMENT.TABLE_HEADER.ACTIONS.ADD_AGREEMENT')}
            </Button>
          )
        }
      </Space>
    );
  };

  const confirmAddAgreement = useCallback(() => {
    const { nextVersion } = agreementDocsData;
    // save agreements
    dispatch(Creators.saveAgreementRequest({ agreementType: selectedAgreementType, files: agreementDocs, nextVersion }));
    // cleanup add agreement modal
    dispatch(Creators.setUploadUrlsClear());

    setIsAgreementInProgress(false);
    setIsModalVisible(false);
  }, [agreementDocs, agreementDocsData, dispatch, selectedAgreementType]);

  // by design, deliberately display that confirm is in progress when clicked
  const handleAsyncConfirm = () => {
    setIsAgreementInProgress(true);
    setTimeout(() => {
      setIsPopconfirmVisible(false);
      confirmAddAgreement();
    }, CONFIRM_DELAY_MS);
  };
  const { debouncedCallback: handleConfirmAddAgreement } = useDebouncedCallback({ callback: handleAsyncConfirm, delay: DEFAULT_DEBOUNCE_MS });

  const handleCancelAddAgreement = () => {
    dispatch(Creators.setUploadUrlsClear());
    setIsModalVisible(false);
  };

  const showPopconfirm = () => {
    setIsPopconfirmVisible(true);
  };

  const hidePopconfirm = () => {
    setIsPopconfirmVisible(false);
  };

  const handleForceAgreement = useCallback(({ payload }) => {
    const { isForced: forced, agreementId } = payload;
    dispatch(Creators.setAgreementForcedRequest({ agreementId, forced, selectedAgreementType }));
  }, [dispatch, selectedAgreementType]);
  const { debouncedCallback: onForceChange } = useDebouncedCallback({ callback: handleForceAgreement, delay: DEFAULT_DEBOUNCE_MS });

  const tableEvents = { onForceChange };

  return (
    <AntCard
      title={(
        <>
          {t('LATEST_AGREEMENT.TABLE_TITLE')}
        </>
      )}
      extra={getTableHeaderActions()}
    >
      <AddAgreementModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmAddAgreement}
        onCancel={handleCancelAddAgreement}
        isPendingConfirm={isAddAgreementInProgress}
        documents={agreementDocs}
        isUploadPending={isUploadAgreementPending}
        isPopconfirmVisible={isPopconfirmVisible}
        showPopconfirm={showPopconfirm}
        hidePopconfirm={hidePopconfirm}
      />
      <AntTableV2
        data={previousAgreements}
        columns={tableColumns({ t, canAccess, tableEvents, isForcedPending })}
        loading={isPending}
        pagination={tablePagination}
        pageSizeOptions={[PREVIOUS_AGREEMENTS_LIMIT]}
        onPaginationChange={onPaginationChange}
        total={paginationTotal}
      />
    </AntCard>
  );
};

export default PreviousAgreements;
