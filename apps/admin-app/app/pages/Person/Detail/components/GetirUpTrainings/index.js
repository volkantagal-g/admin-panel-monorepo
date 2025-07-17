import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import AntCard from '@shared/components/UI/AntCard';
import { DEFAULT_ROW_SPACING, ANT_SPACING_24 } from '../../constants';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getTableColumns } from './config';
import { Creators } from '../../redux/actions';
import { getirUpTrainingsSelector } from '../../redux/selector';

const GetirUpTrainings = ({ personId, isPending }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('personPage');

  const isGetirUpTrainingsPending = useSelector(getirUpTrainingsSelector.getIsPending);
  const getirUpTrainings = useSelector(getirUpTrainingsSelector.getData);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 25 });
  const [paginatedTrainings, setPaginatedTrainings] = useState([]);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    const start = (pagination.currentPage - 1) * pagination.rowsPerPage;
    const end = start + pagination.rowsPerPage;
    setPaginatedTrainings(getirUpTrainings.slice(start, end));
  }, [pagination, getirUpTrainings]);

  useEffect(() => {
    dispatch(Creators.getGetirUpTrainingsRequest({ personId }));
  }, [dispatch, personId]);

  const isLoading = isPending || isGetirUpTrainingsPending;

  return (
    <AntCard
      bordered={false}
      title={t('GETIRUP_TRAININGS.TITLE')}
    >
      <Row gutter={DEFAULT_ROW_SPACING}>
        <Col span={ANT_SPACING_24}>
          <AntTableV2
            data={paginatedTrainings}
            columns={getTableColumns({ t })}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            scroll={{ x: 600 }}
            loading={isLoading}
            data-testid="getir-up-trainings-table"
          />
        </Col>
      </Row>
    </AntCard>
  );
};

export default GetirUpTrainings;
