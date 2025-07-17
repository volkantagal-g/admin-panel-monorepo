import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Button } from 'antd';
import moment from 'moment';

import { useDispatch } from 'react-redux';
import { isNil } from 'lodash';

import AntTable from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';
import useStyles from './styles';
import { getLangKey } from '@shared/i18n';
import { Creators } from '../../../redux/actions';
import { TAB_ITEMS } from '../../../constants';

const SummaryTable = ({ tableData = [], loading }) => {
  const { t } = useTranslation('localsERPDataTrackingPage');
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleFailDetailClick = useCallback(
    orderTypes => {
      dispatch(
        Creators.setFailedFilters({
          dateRange: [moment(tableData.startDate), moment(tableData.endDate)],
          orderTypes: isNil(orderTypes) ? [] : [orderTypes],
        }),
      );
      dispatch(Creators.setActiveTab({ activeTab: TAB_ITEMS.FAILED }));
      dispatch(Creators.getLocalsERPDataTrackingFailedRequest());
    },
    [dispatch, tableData.endDate, tableData.startDate],
  );

  const handleSuccessDetailClick = useCallback(
    orderTypes => {
      dispatch(
        Creators.setSuccessFilters({
          dateRange: [moment(tableData.startDate), moment(tableData.endDate)],
          orderTypes: isNil(orderTypes) ? [] : [orderTypes],
        }),
      );
      dispatch(Creators.setActiveTab({ activeTab: TAB_ITEMS.SUCCESS }));
      dispatch(Creators.getLocalsERPDataTrackingSuccessRequest());
    },
    [dispatch, tableData.endDate, tableData.startDate],
  );

  const getTableSummary = useCallback(
    () => (
      <Table.Summary.Row>
        <Table.Summary.Cell className={classes.summaryLabel}>{tableData.total?.description?.[getLangKey()]}</Table.Summary.Cell>
        <Table.Summary.Cell className={classes.summary}>{tableData.total?.received}</Table.Summary.Cell>
        <Table.Summary.Cell className={classes.summary}>{tableData.total?.sent > 0
          ? (
            <Button className={classes.failLink} onClick={() => handleSuccessDetailClick()} type="link">
              {tableData.total?.sent}
            </Button>
          )
          : tableData.total?.sent}
        </Table.Summary.Cell>
        <Table.Summary.Cell className={classes.summary}>
          {tableData.total?.failed > 0 ? (
            <Button className={classes.link} onClick={() => handleFailDetailClick()} type="link">
              {tableData.total?.failed}
            </Button>
          ) : (tableData.total?.failed)}
        </Table.Summary.Cell>
      </Table.Summary.Row>
    ),
    [classes, tableData, handleFailDetailClick, handleSuccessDetailClick],
  );

  return (
    <AntTable
      columns={tableColumns(t, classes.link, handleFailDetailClick, handleSuccessDetailClick)}
      data={tableData.sapDashboardItems}
      loading={loading}
      summary={getTableSummary}
    />
  );
};

export default SummaryTable;
