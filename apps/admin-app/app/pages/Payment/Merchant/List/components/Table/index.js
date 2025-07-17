import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { columns } from './config';
import { filtersSelector, getPagination, merchantListSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { getPaginatedData } from '@shared/utils/table';

const Table = () => {
  const { t } = useTranslation(['paymentMerchantPage', 'global']);
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);
  const pagination = useSelector(getPagination);
  const merchantListSelectorData = useSelector(merchantListSelector.getData);
  const merchantListSelectorIsPending = useSelector(
    merchantListSelector.getIsPending,
  );
  const filters = useSelector(filtersSelector.getFilters);

  useEffect(() => {
    dispatch(Creators.getMerchantListRequest());
  }, [dispatch]);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    dispatch(Creators.setPagination({ currentPage, rowsPerPage }));
  };

  useEffect(() => {
    const { id, key, merchantName, createdAt, updatedAt } = filters;

    const filterArr = merchantListSelectorData?.filter(merchant => {
      const createdFrom =
        createdAt && moment(createdAt[0]).format(DEFAULT_DATE_FORMAT);
      const createdTo = createdAt && moment(createdAt[1]).format(DEFAULT_DATE_FORMAT);
      const merchantCreatedDate = moment(merchant?.createdAt).format(
        DEFAULT_DATE_FORMAT,
      );

      const updatedFrom =
      updatedAt && moment(updatedAt[0]).format(DEFAULT_DATE_FORMAT);
      const updatedAtTo = updatedAt && moment(updatedAt[1]).format(DEFAULT_DATE_FORMAT);
      const merchantUpdatedDate = moment(merchant?.updatedAt).format(
        DEFAULT_DATE_FORMAT,
      );

      return (
        merchant?.id?.toLowerCase().includes(id.toLowerCase()) &&
        merchant?.key?.toLowerCase().includes(key.toLowerCase()) &&
        merchant?.settings.displayName?.toLowerCase().includes(merchantName.toLowerCase()) &&
        // date-range filter
        (createdAt ? createdFrom < merchantCreatedDate &&
          merchantCreatedDate < createdTo : true) &&
        (updatedAt ? updatedFrom < merchantUpdatedDate &&
          merchantUpdatedDate < updatedAtTo : true)
      );
    });

    setFilteredData(filterArr);
  }, [filters, merchantListSelectorData]);

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          title={t('paymentMerchantPage:MERCHANT_LIST')}
          total={filteredData?.length}
          dataSource={getPaginatedData(
            filteredData,
            pagination.currentPage,
            pagination.rowsPerPage,
          )}
          columns={columns(t)}
          loading={merchantListSelectorIsPending}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
        />
      </Col>
    </Row>
  );
};

export default Table;
