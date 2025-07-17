import { useTranslation } from 'react-i18next';

import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import { nodeVersionsSelector } from '../../redux/selectors';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';

const INITIAL_PAGINATION = { currentPage: 1, rowsPerPage: 10 };

const Table = () => {
  const { t } = useTranslation('technologyComplianceReport');
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState(INITIAL_PAGINATION);
  const [versions, setVersions] = useState([]);
  const [filters, setFilters] = useState({ repoName: null, type: null, version: null });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    if (currentPage !== pagination.currentPage || rowsPerPage !== pagination.rowsPerPage) {
      setPagination({ currentPage, rowsPerPage });
    }
  };

  const nodeVersions = useSelector(nodeVersionsSelector.getData);

  const handleChanges = (paginationData, tableFilters) => {
    setFilters(filters);
    const filteredVersions = nodeVersions.filter(v => {
      let repoFilter = true; let typeFilter = true; let
        versionFilter = true;

      if (tableFilters.repoName) {
        repoFilter = tableFilters.repoName.includes(v.repoName);
      }
      if (tableFilters.type) {
        typeFilter = tableFilters.type.includes(v.type);
      }
      if (tableFilters.version) {
        versionFilter = tableFilters.version.includes(v.version);
      }

      return repoFilter && typeFilter && versionFilter;
    });
    setVersions(filteredVersions);
  };

  useEffect(() => {
    dispatch(Creators.getNodeVersionsRequest());
  }, [dispatch]);

  const versionsPending = useSelector(nodeVersionsSelector.isPending);

  const getFilterVersions = () => {
    if (filters.repoName || filters.type || filters.version) {
      return versions;
    }
    return nodeVersions;
  };

  useEffect(() => {
    setVersions(nodeVersions);
  }, [nodeVersions]);

  return (
    <AntTableV2
      loading={versionsPending}
      data={versions.slice((pagination.currentPage - 1) * pagination.rowsPerPage, pagination.currentPage * pagination.rowsPerPage)}
      total={versions.length}
      columns={tableColumns({ t, versions: getFilterVersions() })}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      onChange={handleChanges}
    />
  );
};

export default Table;
