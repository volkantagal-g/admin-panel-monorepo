import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import { useSearchParams } from 'react-router-dom';

import { useMemo } from 'react';

import AntTable from '@shared/components/UI/AntTableV2';
import { paymentDetailsSelector } from '../redux/selectors';

import { tableColumns } from './config';
import { TAB_ITEMS } from '../constants';
import { decodeQueryParams } from '../../FinancialDashboardV2/utils';

const Table = ({ onPaginationChange }) => {
  const { t } = useTranslation('foodFinancialDashboardV2DetailPage');
  const paymentDetails = useSelector(paymentDetailsSelector.getData);
  const isPending = useSelector(paymentDetailsSelector.getIsPending);
  const [searchParams] = useSearchParams();
  const params = useMemo(() => decodeQueryParams(searchParams), [searchParams]);

  const isCurrentTabSingle = params?.activeTab === TAB_ITEMS.SINGLE;
  const dataSource = isCurrentTabSingle ? paymentDetails?.singleRestaurantPaymentInfo : paymentDetails?.chainRestaurantPaymentInfo;
  const hasUnpaymentReason = dataSource?.some(item => item.unpaymentReason);
  const columns = tableColumns(t, isCurrentTabSingle, hasUnpaymentReason);
  const total = isCurrentTabSingle ? paymentDetails?.singleRestaurantTotalCount : paymentDetails?.chainRestaurantTotalCount;

  return (
    <AntTable
      columns={columns}
      data={dataSource}
      loading={isPending}
      total={total}
      pagination={
        {
          currentPage: params?.currentPage,
          rowsPerPage: params?.rowsPerPage,
        }
      }
      onPaginationChange={onPaginationChange}
    />
  );
};

export default Table;
