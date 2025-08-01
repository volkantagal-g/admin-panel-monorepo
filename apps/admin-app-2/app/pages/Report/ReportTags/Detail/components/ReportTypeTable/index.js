import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import AntCard from '@shared/components/UI/AntCard';
import { getLimitAndOffset } from '@shared/utils/common';

import { getReportTypes } from '../../redux/selectors';
import { getColumns } from './config';
import { Creators } from '../../redux/actions';
import { DEFAULT_PAGE_SIZE } from '../../constants';
import useStyles from './styles';

export default function ReportTypeTable({ canAccessDetail }) {
  const { id } = useParams();
  const { t } = useTranslation('reportsPage');
  const classes = useStyles();
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: DEFAULT_PAGE_SIZE });

  const { reportTypes, totalCount } = useSelector(getReportTypes.getData);
  const reportTypesPending = useSelector(getReportTypes.getIsPending);

  const columns = useMemo(() => getColumns(t, canAccessDetail, pagination), [t, canAccessDetail, pagination]);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
    const limitAndOffset = getLimitAndOffset({ currentPage, rowsPerPage });
    dispatch(Creators.getReportTypesRequest({ data: { ...limitAndOffset, filter: { reportTag: id } } }));
  };

  useEffect(() => {
    const limitAndOffset = getLimitAndOffset(pagination);
    dispatch(Creators.getReportTypesRequest({ data: { ...limitAndOffset, filter: { reportTag: id } } }));
  }, [dispatch, id, pagination]);

  return (
    <AntCard title={t('REPORT_TYPES_PAGE_TITLE')}>
      <AntTableV2
        data={reportTypes}
        columns={columns}
        loading={reportTypesPending}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        className={classes.antTable}
        total={totalCount}
      />
    </AntCard>
  );
}
