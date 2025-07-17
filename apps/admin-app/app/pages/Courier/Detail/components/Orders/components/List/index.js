import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Empty } from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getLangKey } from '@shared/i18n';
import { tableColumns } from './config';
import { orderListSelector } from '../../../../redux/selectors';

const OrderList = ({ pagination, setPagination, getOrderList, isBringButtonClicked }) => {
  const { t } = useTranslation('courierPage');
  const langKey = getLangKey();

  const data = useSelector(orderListSelector.getData);
  const totalCardCount = useSelector(orderListSelector.getCount);
  const isPendingGetOrderList = useSelector(orderListSelector.getIsPending);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
    getOrderList();
  };

  const columns = useMemo(() => tableColumns(t, langKey), [
    t,
    langKey,
  ]);

  const tableLocale = useMemo(() => {
    return {
      emptyText: (
        <Empty
          description={isBringButtonClicked ? t('EMPTY_LIST_AFTER_REQUEST') : t('EMPTY_LIST_INITIAL')}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ),
    };
  }, [isBringButtonClicked, t]);

  return (
    <AntTableV2
      locale={tableLocale}
      data={data}
      columns={columns}
      loading={isPendingGetOrderList}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      total={totalCardCount}
      isScrollableToTop={false}
      data-testid="courierOrdersTable"
    />
  );
};

OrderList.propTypes = {
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    rowsPerPage: PropTypes.number,
  }).isRequired,
  setPagination: PropTypes.func.isRequired,
  getOrderList: PropTypes.func.isRequired,
  isBringButtonClicked: PropTypes.bool.isRequired,
};

export default OrderList;
