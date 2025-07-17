import { useCallback, useState, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTable from '@shared/components/UI/AntTableV2';

import { isMobile } from '@shared/utils/common';
import useQuery from '@shared/shared/hooks/useQuery';
import { getCourierPlanAndCountsTableData } from '../../redux/selectors';
import { generateTableColumns } from './config';
import useStyles from './styles';
import { getActiveWarehousesSelector } from '@shared/redux/selectors/common';

const TheTable = () => {
  const { t } = useTranslation('courierLiveMonitoringPage');
  const classes = useStyles();
  const navigate = useNavigate();
  const { pathname: url } = useLocation();
  const query = useQuery();

  const selectedCity = query.get('selectedCity');

  const isDeviceMobile = isMobile();

  const courierStatusData = useSelector(getCourierPlanAndCountsTableData.getData({ selectedCity }));
  const isCourierStatusPending = useSelector(getCourierPlanAndCountsTableData.getIsPending);
  const isWarehousesPending = useSelector(getActiveWarehousesSelector.getIsPending);

  const isPending = isCourierStatusPending || isWarehousesPending;

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const searchInputRef = useRef();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const tableProps = useMemo(() => {
    return {
      searchText,
      searchedColumn,
      handleSearch,
      handleReset,
      searchInputRef,
    };
  }, [searchText, searchedColumn]);

  const handleCityClick = useCallback(
    cityId => {
      navigate(`${url}?selectedCity=${cityId}`);
    },
    [navigate, url],
  );

  const tableColumns = useMemo(() => {
    return generateTableColumns({ ...tableProps, handleCityClick, classes, selectedCity }, t);
  }, [classes, handleCityClick, selectedCity, t, tableProps]);

  const scroll = isDeviceMobile ? { x: 300, y: 480 } : { x: undefined, y: 720 };

  return (
    <AntTable
      data={courierStatusData}
      loading={isPending}
      columns={tableColumns}
      size="small"
      bordered
      scroll={scroll}
      showFooter={false}
      className={classes.table}
      showSorterTooltip={false}
    />
  );
};

export default TheTable;
