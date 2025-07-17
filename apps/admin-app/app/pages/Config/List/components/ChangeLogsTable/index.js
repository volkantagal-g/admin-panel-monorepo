import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Button, Modal, DatePicker } from 'antd';
import moment from 'moment';

import AntCard from '@shared/components/UI/AntCard';
import { usePrevious, useInitAndDestroyPage } from '@shared/hooks';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from '@app/pages/Config/Log/redux/saga';
import { getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';

import reducer from '@app/pages/Config/Log/redux/reducer';
import { Creators } from '@app/pages/Config/Log/redux/actions';
import { getConfigLogSelector } from '@app/pages/Config/Log/redux/selectors';
import { REDUX_KEY } from '@shared/shared/constants';
import { filterSelector, configSelector, updateConfigSelector } from '../../redux/selectors';
import { getTableColumns } from './config';
import useStyles from './styles';

const { RangePicker } = DatePicker;

const reduxKey = REDUX_KEY.CONFIG.LOG;

const TOTAL_RECORDS = 10_000;
const INIT_LAST_SELECTED_PAGE = 1;
const CONFIGS_PER_PAGE_LIMIT = 10;
const INIT_PAGINATION_CONFIG = { currentPage: 1, rowsPerPage: CONFIGS_PER_PAGE_LIMIT };
// const SEARCH_PREFIX_MIN_LENGTH = 3;

const TableHeader = ({ classes, dateRange, onChange, t }) => {
  const selectedCountryTimezones = getSelectedCountryTimeZones();
  return (
    <div className={classes.tableHeader}>
      <h5>{t('CHANGE_LOGS')}</h5>
      <div>
        <span className={classes.filterWrapper}>{t('FILTER_BY')}</span>
        <span>{selectedCountryTimezones?.[0]?.timezone} </span><RangePicker showTime value={dateRange} onChange={onChange} />
      </div>
    </div>
  );
};

const ChangeLogsTable = () => {
  const [t] = useTranslation(['configPage', 'global']);
  const dispatch = useDispatch();
  const classes = useStyles();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const filters = useSelector(filterSelector.getFilters);
  const pagination = useSelector(configSelector.getPagination);
  const updateConfigIsPending = useSelector(updateConfigSelector.getIsPending);

  const configLog = useSelector(getConfigLogSelector.getData);
  const configLogIsPending = useSelector(getConfigLogSelector.getIsPending);

  const [isVisibleJSONModal, setIsVisibleJSONModal] = useState(false);
  const [jsonModalData, setJSONModalData] = useState({});
  const [lastSelectedPage, setLastSelectedPage] = useState(INIT_LAST_SELECTED_PAGE);
  const [tablePagination, setTablePagination] = useState(INIT_PAGINATION_CONFIG);
  const [configsTotalCount, setConfigsTotalCount] = useState(TOTAL_RECORDS);
  const [dateRange, setDateRange] = useState([moment().startOf('day'), moment()]);
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
    setJSONModalData({
      title: `${config.actionType} - ${config.createdAt} - ${config.createdBy}`,
      oldData: config?.oldValue || null,
      newData: config?.currentValue || null,
    });
    setIsVisibleJSONModal(true);
  }, []);

  const onPaginationChange = ({ currentPage, rowsPerPage }) => {
    setTablePagination({ currentPage, rowsPerPage });
    setLastSelectedPage(currentPage);
  };

  useEffect(() => {
    const [startDate, endDate] = dateRange || [];
    dispatch(Creators.getConfigLogRequest({
      limit: tablePagination.rowsPerPage,
      offset: ((tablePagination.currentPage - 1) * tablePagination.rowsPerPage) || 0,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    }));
  }, [tablePagination, dispatch, dateRange]);

  const handleJSONModalCancel = () => {
    setIsVisibleJSONModal(false);
    setJSONModalData({});
  };

  return (
    <AntCard
      title={(
        <TableHeader
          classes={classes}
          dateRange={dateRange}
          onChange={setDateRange}
          t={t}
        />
      )}
    >
      <AntTableV2
        data={configLog?.changeLogs}
        total={configsTotalCount}
        columns={getTableColumns({
          t,
          onClickShowJSONModalBtn: memoizedHandleShowJSONModalBtnClicked,
        })}
        loading={configLogIsPending || updateConfigIsPending}
        pagination={tablePagination}
        onPaginationChange={onPaginationChange}
        className={classes.table}
      />
      <Modal
        centered
        title={jsonModalData.title}
        wrapClassName={classes.modalWrapper}
        visible={isVisibleJSONModal}
        onCancel={handleJSONModalCancel}
        footer={[
          <Button key="back" onClick={handleJSONModalCancel}>
            {t('button:CANCEL')}
          </Button>,
        ]}
      >
        <table className={classes.diffTable}>
          <thead>
            <tr>
              <th>{t('OLD_VALUE')}</th>
              <th>{t('NEW_VALUE')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <pre>{JSON.stringify(jsonModalData.oldData, null, 2)}</pre>
              </td>
              <td>
                <pre>{JSON.stringify(jsonModalData.newData, null, 2)}</pre>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </AntCard>
  );
};

export default ChangeLogsTable;
