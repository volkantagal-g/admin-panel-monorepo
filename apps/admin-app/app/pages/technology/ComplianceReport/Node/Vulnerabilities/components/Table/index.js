import { useTranslation } from 'react-i18next';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from 'antd';

import { Creators } from '../../redux/actions';
import { repositoriesSelector } from '../../redux/selectors';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';
import useStyles from './styles';

const INITIAL_PAGINATION = { currentPage: 1, rowsPerPage: 10 };

const Table = () => {
  const { t } = useTranslation('technologyComplianceReport');
  const dispatch = useDispatch();
  const classes = useStyles();

  const [pagination, setPagination] = useState(INITIAL_PAGINATION);
  const [searchText, setSearchText] = useState('');

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    if (currentPage !== pagination.currentPage || rowsPerPage !== pagination.rowsPerPage) {
      setPagination({ currentPage, rowsPerPage });
    }
  };

  useEffect(() => {
    dispatch(Creators.getRepositoriesRequest());
  }, [dispatch]);

  const repositories = useSelector(repositoriesSelector.getData).filter(r => r.name.toLowerCase().includes(searchText));
  const repositoriesPending = useSelector(repositoriesSelector.isPending);

  return (
    <>
      <Input
        size="large"
        className="mb-2"
        placeholder={t('SEARCH_BY_REPOSITORY')}
        onChange={event => {
          let normalisedSearchText = event.target.value.toLowerCase();
          // replace any amount of whitespace with a single hyphen
          normalisedSearchText = normalisedSearchText.replace(/\s+/g, '-');
          setSearchText(normalisedSearchText);
          setPagination(INITIAL_PAGINATION);
        }}
      />
      <AntTableV2
        loading={repositoriesPending}
        data={repositories.slice((pagination.currentPage - 1) * pagination.rowsPerPage, pagination.currentPage * pagination.rowsPerPage)}
        total={repositories.length}
        columns={tableColumns({ t })}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        rowClassName={record => (record.isRepoVulnerable ? classes.vulnerableRow : classes.nonVulnerableRow)}
      />
    </>
  );
};

export default Table;
