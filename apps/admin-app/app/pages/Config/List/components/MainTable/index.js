import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { usePermission, usePrevious } from '@shared/hooks';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import JSONModal from '@shared/components/UI/JsonModal';
import permKey from '@shared/shared/permKey.json';
import { Creators } from '../../redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { filterSelector, configSelector, updateConfigSelector, deleteConfigSelector } from '../../redux/selectors';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import EditModal from '../EditModal';
import { getTableColumns } from './config';
import { getConfigsAfterFormat } from '../../utils';
import useStyles from './styles';

const TOTAL_RECORDS = 10_000;
const INIT_LAST_SELECTED_PAGE = 1;
const CONFIGS_PER_PAGE_LIMIT = 10;
const INIT_PAGINATION_CONFIG = { currentPage: 1, rowsPerPage: CONFIGS_PER_PAGE_LIMIT };
const SEARCH_PREFIX_MIN_LENGTH = 3;

const ConfigList = () => {
  const { Can, canAccess } = usePermission();
  const [t] = useTranslation(['configPage', 'global']);
  const dispatch = useDispatch();
  const classes = useStyles();

  const hasPermissionToConfigEdit = canAccess(permKey.PAGE_CONFIG_LIST_COMPONENT_UPDATE_CONFIG);

  const filters = useSelector(filterSelector.getFilters);
  const pagination = useSelector(configSelector.getPagination);
  const configs = useSelector(configSelector.getData);
  const countries = useSelector(countriesSelector.getData);
  const formattedConfigs = getConfigsAfterFormat(configs, { countries });
  const configsIsPending = useSelector(configSelector.getIsPending);
  const updateConfigIsPending = useSelector(updateConfigSelector.getIsPending);
  const deleteConfigIsPending = useSelector(deleteConfigSelector.getIsPending);

  const [hasConfigMismatch, setHasConfigMismatch] = useState(false);
  const [isVisibleJSONModal, setIsVisibleJSONModal] = useState(false);
  const [isVisibleEditModal, setIsVisibleEditModal] = useState(false);
  const [jsonModalData, setJSONModalData] = useState({});
  const [selectedConfigToEdit, setSelectedConfigToEdit] = useState({});
  const [lastSelectedPage, setLastSelectedPage] = useState(INIT_LAST_SELECTED_PAGE);
  const [tablePagination, setTablePagination] = useState(INIT_PAGINATION_CONFIG);
  const [lastCursor, setLastCursor] = useState('');
  const [configsTotalCount, setConfigsTotalCount] = useState(TOTAL_RECORDS);
  const prevSearchTerm = usePrevious(filters?.searchTerm);

  useEffect(() => {
    if (!isEmpty(pagination.next)) {
      setConfigsTotalCount(TOTAL_RECORDS);
    }
    else {
      setConfigsTotalCount(lastSelectedPage * tablePagination.rowsPerPage);
    }
  }, [lastSelectedPage, pagination.next, tablePagination.rowsPerPage]);

  useEffect(() => {
    if (prevSearchTerm !== filters?.searchTerm) {
      setTablePagination(INIT_PAGINATION_CONFIG);
    }
  }, [filters?.searchTerm, prevSearchTerm]);

  const memoizedHandleShowJSONModalBtnClicked = useMemo(() => config => {
    const { rawValue, country, isChild } = config;
    let title = config.key;
    if (isChild && country) {
      title = `${config.parentConfig} - ${country.name} (${country.code})`;
    }
    setJSONModalData({ title, data: rawValue });
    setIsVisibleJSONModal(true);
  }, []);

  const memoizedHandleEditConfigBtnClicked = useMemo(() => config => {
    setSelectedConfigToEdit(config);
    setIsVisibleEditModal(true);
  }, []);

  const configRequestMaker = useCallback(({ limit, cursor = null }) => {
    const searchText = filters?.searchTerm;
    const options = {
      searchText,
      limit,
    };

    if (cursor) {
      options.cursor = cursor;
    }
    setLastCursor(cursor);

    const validCall = () => {
      dispatch(Creators.getConfigsRequest({ ...options }));
    };

    const invalidCall = () => {
      dispatch(ToastCreators.error({ message: t('configPage:ERR_SEARCH', { searchPrefixMinLenght: SEARCH_PREFIX_MIN_LENGTH }) }));
    };

    const searchTextLen = searchText?.trim().length;
    const configRequest = (isEmpty(searchText) || (!isEmpty(searchText) && searchTextLen >= SEARCH_PREFIX_MIN_LENGTH)) ?
      validCall : invalidCall;

    return configRequest;
  }, [dispatch, filters?.searchTerm, t]);

  const onPaginationChange = ({ currentPage, rowsPerPage }) => {
    setTablePagination({ currentPage, rowsPerPage });
    setLastSelectedPage(currentPage);

    if (lastSelectedPage < currentPage) {
      if (!pagination.next) {
        return;
      }

      configRequestMaker({
        limit: rowsPerPage,
        cursor: pagination.next,
      })();
      return;
    }

    if (!pagination.prev) {
      return;
    }

    configRequestMaker({
      limit: rowsPerPage,
      cursor: pagination.prev,
    })();
  };

  useEffect(() => {
    configRequestMaker({ limit: tablePagination.rowsPerPage })();
  }, [configRequestMaker, tablePagination.rowsPerPage]);

  const handleJSONModalCancel = () => {
    setIsVisibleJSONModal(false);
    setJSONModalData({});
  };

  const handleEditModalCancel = () => {
    setIsVisibleEditModal(false);
    if (hasConfigMismatch) {
      // refresh configs to remedy the mismatch
      configRequestMaker({
        limit: tablePagination.limit ?? CONFIGS_PER_PAGE_LIMIT,
        cursor: lastCursor,
      })();
      setHasConfigMismatch(false);
    }
    setSelectedConfigToEdit({});
  };

  const handleEditModalConfirm = newValues => {
    if (selectedConfigToEdit.isParent) {
      dispatch(Creators.updateConfigRequest({
        t,
        successCallback: () => {
          setSelectedConfigToEdit({});
          setIsVisibleEditModal(false);

          configRequestMaker({
            limit: tablePagination.limit ?? CONFIGS_PER_PAGE_LIMIT,
            cursor: lastCursor,
          })();
        },
        mismatchCallback: () => {
          setHasConfigMismatch(true);
        },
        // because type is reserved word for reduxsauce
        configType: selectedConfigToEdit.type,
        key: selectedConfigToEdit.key,
        // eslint-disable-next-line no-underscore-dangle
        __v: selectedConfigToEdit.__v,
        ...newValues,
      }));
    }
    if (selectedConfigToEdit.isChild) {
      dispatch(Creators.updateCustomConfigRequest({
        // because type is reserved word for reduxsauce
        configType: selectedConfigToEdit.type,
        key: selectedConfigToEdit.parentConfig,
        countryCode: selectedConfigToEdit?.country?.code,
        // eslint-disable-next-line no-underscore-dangle
        __v: selectedConfigToEdit.parentConfigVersion,
        ...newValues,
      }));
      setSelectedConfigToEdit({});
      setIsVisibleEditModal(false);
    }
  };

  const onClickDelete = config => {
    dispatch(Creators.deleteConfigRequest({
      key: config.key,
      configType: config.type,
    }));
  };

  return (
    <>
      <AntTableV2
        data={formattedConfigs}
        total={configsTotalCount}
        columns={getTableColumns({
          t,
          hasPermissionToConfigEdit,
          onClickShowJSONModalBtn: memoizedHandleShowJSONModalBtnClicked,
          onClickEditConfigBtn: memoizedHandleEditConfigBtnClicked,
          onClickDelete,
          deleteConfigIsPending,
          Can,
        })}
        loading={configsIsPending || updateConfigIsPending}
        pagination={tablePagination}
        onPaginationChange={onPaginationChange}
        className={classes.table}
      />
      {isVisibleEditModal && (
        <EditModal
          saveDisabled={hasConfigMismatch}
          config={selectedConfigToEdit}
          onCancel={handleEditModalCancel}
          onConfirm={handleEditModalConfirm}
        />
      )}
      <JSONModal
        title={jsonModalData.title}
        data={jsonModalData.data}
        visible={isVisibleJSONModal}
        handleCancel={handleJSONModalCancel}
      />
    </>
  );
};

export default ConfigList;
