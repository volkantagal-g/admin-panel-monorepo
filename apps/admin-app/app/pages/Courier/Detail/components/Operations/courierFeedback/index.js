import { Modal } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux';

import FeedbackTable from '@app/pages/CourierFeedback/List/components/Table';
import { getCourierFeedbackSelector } from '@app/pages/Courier/Detail/redux/selectors';
import { Creators } from '../../../redux/actions';
import { getLangKey } from '@shared/i18n';

function CourierFeedback({ visible, closeModal, courierName }) {
  const language = getLangKey();
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });

  const handleCancel = () => {
    closeModal();
  };

  const handleTablePagination = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
    dispatch(Creators.getCommonFeedbackRequest(
      { filterOptions: { courierName }, language, limit: rowsPerPage, pageNumber: currentPage },
    ));
  };

  const { t } = useTranslation(['courierPage', 'courierFeedbackPage']);

  const courierFeedbackData = useSelector(getCourierFeedbackSelector?.getData);

  return (
    <Modal
      title={t('COURIER_FEEDBACKS')}
      visible={visible}
      cancelButtonProps={{ style: { display: 'none' } }}
      footer={null}
      onCancel={handleCancel}
    >
      <FeedbackTable
        courierDetails
        data={courierFeedbackData || []}
        pagination={pagination}
        onPaginationChange={handleTablePagination}
        isLoading={false}
      />
    </Modal>
  );
}

export default CourierFeedback;
