import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import { values } from 'lodash';

import { Creators } from '@app/pages/Algorithm/Config/Domain/Base/List/redux/actions';
import { algorithmDomainConfigListSelector } from '@app/pages/Algorithm/Config/Domain/Base/List/redux/selectors';
import { tableColumns } from './config';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { isNullOrEmpty } from '@shared/utils/common';

const AlgorithmConfigList = () => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 25 });

  const algorithmConfigListData = useSelector(algorithmDomainConfigListSelector.getData);
  const algorithmConfigListIsPending = useSelector(algorithmDomainConfigListSelector.getIsPending);
  const filters = useSelector(algorithmDomainConfigListSelector.getFilters);
  const constants = useSelector(algorithmDomainConfigListSelector.getConstants);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    const parsedFilters = values(filters).filter(filter => !isNullOrEmpty(filter.value));
    dispatch(Creators.getAlgorithmDomainConfigListRequest({
      page: pagination.currentPage,
      pageSize: pagination.rowsPerPage,
      filters: values(parsedFilters),
    }));
  }, [dispatch, pagination, filters]);

  return (
    <AntTableV2
      title={t('algorithmConfigPage:CONFIGS')}
      data={algorithmConfigListData}
      columns={tableColumns({ t, constants })}
      loading={algorithmConfigListIsPending}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
    />
  );
};

export default AlgorithmConfigList;
