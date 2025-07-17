import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import {
  recipesSelector,
  filtersSelector,
  countryCodeSelector,
} from '../../redux/selectors';
import { tableColumns } from '../../config';
import { getLimitAndOffset } from '@shared/utils/common';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import useDebounce from '@shared/shared/hooks/useDebounce';
import { Table } from '@shared/components/GUI';

import useStyles from './styles';

const RecipesTable = () => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const data = useSelector(recipesSelector.getData);
  const totalCount = useSelector(recipesSelector.getTotalCount);
  const selectedStatus = useSelector(filtersSelector.getSelectedStatus);
  const isGetRecipesPending = useSelector(recipesSelector.getIsPending);
  const { t } = useTranslation('recipesPage');
  const currentPage = useSelector(recipesSelector.getCurrentPage);
  const currentPageSize = useSelector(recipesSelector.getCurrentPageSize);

  const country = useSelector(countryCodeSelector);

  const selectedDomains = useSelector(filtersSelector.getSelectedDomains);
  const queryText = useSelector(filtersSelector.getQueryText);

  const debouncedSelectedDomains = useDebounce(selectedDomains, DEFAULT_DEBOUNCE_MS);
  const debouncedSelectedStatus = useDebounce(selectedStatus, DEFAULT_DEBOUNCE_MS);
  const debouncedQueryText = useDebounce(queryText, DEFAULT_DEBOUNCE_MS);

  const fetchPage = useCallback((page, pageSize = currentPageSize) => {
    dispatch(
      Creators.getRecipesRequest({
        ...getLimitAndOffset({ currentPage: page, rowsPerPage: pageSize }),
        domainTypes: debouncedSelectedDomains,
        status: debouncedSelectedStatus,
        queryText: debouncedQueryText,
        countryCode: country,
      }),
    );
  }, [currentPageSize, dispatch, debouncedSelectedDomains, debouncedSelectedStatus, debouncedQueryText, country]);

  const handlePaginationChange = useCallback((newPage, newPageSize) => {
    if (currentPage !== newPage) {
      dispatch(Creators.setCurrentPage({ currentPage: newPage }));
      fetchPage(newPage, newPageSize);
    }

    dispatch(Creators.setCurrentPageSize({ currentPageSize: newPageSize }));
  }, [fetchPage, currentPage, dispatch]);

  useEffect(() => {
    dispatch(Creators.setCurrentPage({ currentPage: 1 }));
    fetchPage(1);
  }, [fetchPage, debouncedSelectedDomains, debouncedSelectedStatus, debouncedQueryText, dispatch]);

  const pagination = useMemo(() => ({
    total: totalCount,
    current: currentPage,
    pageSize: currentPageSize,
    onChange: handlePaginationChange,
  }), [handlePaginationChange, totalCount, currentPage, currentPageSize]);

  const columns = useMemo(() => tableColumns(t, classes), [t, classes]);

  return (
    <Table
      title={t('LIST_TABLE.TITLE')}
      data-testid="RECIPES_LIST"
      data={data}
      columns={columns}
      loading={isGetRecipesPending}
      pagination={pagination}
      currentPage={currentPage}
      currentPageSize={currentPageSize}
      total={totalCount}
    />
  );
};

export default RecipesTable;
