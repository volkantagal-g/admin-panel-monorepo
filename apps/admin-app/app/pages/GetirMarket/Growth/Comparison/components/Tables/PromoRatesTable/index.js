import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography, Table, Empty, Col, Tooltip, Switch } from 'antd';

import { InfoCircleOutlined } from '@ant-design/icons';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { filtersSelector, promoRatesSelector } from '../../../redux/selectors';
import { getRowClassName } from '../../../utils';
import { getNestedTableColumns, getTableColumns } from './config';
import useParentStyles from '../styles';
import useStyles from './styles';
import { INTEGRATION_TYPES } from '@shared/shared/constants';

const { Title } = Typography;

function PromoRatesTable() {
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const { t } = useTranslation('getirMarketGrowthComparisonPage');
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [isShowNestedTable, setIsShowNestedTable] = useState(true);
  const dataWithoutObjectives = useSelector(promoRatesSelector.getDataWithoutObjectives);
  const dataWithObjectives = useSelector(promoRatesSelector.getDataWithObjectives);
  const data = isShowNestedTable ? dataWithObjectives : dataWithoutObjectives;
  const isPending = useSelector(promoRatesSelector.getIsPending);
  const filters = useSelector(filtersSelector.getFilters);
  const isShowPromoTable = !filters?.integrationType || filters?.integrationType === INTEGRATION_TYPES.GETIR;
  const columns = getTableColumns(t, filters?.startDateRange, filters?.endDateRange, classes, selectedRows, isShowNestedTable);

  const expandedRowRender = record => {
    const getNestedColumns = getNestedTableColumns(t, filters?.startDateRange, filters.endDateRange, classes);
    return (
      <Table
        columns={getNestedColumns}
        dataSource={record.promos}
        pagination={false}
        bordered
      />
    );
  };

  const onExpand = (_expanded, record) => {
    if (selectedRows.has(record.index)) {
      const copiedSelectedRows = new Set(selectedRows);
      copiedSelectedRows.delete(record.index);
      return setSelectedRows(copiedSelectedRows);
    }
    return setSelectedRows(prev => new Set(prev.add(record.index)));
  };

  const expandedRowClassName = () => classes.expandedRowContainer;

  const isDataVisible = [INTEGRATION_TYPES.GETIR, null].includes(filters?.integrationType);

  const rightElement = (
    <Col className={classes.headerSwitchButton}>
      <Tooltip
        title={t('GROUPING_WITH_OBJECTIVES')}
      >
        <InfoCircleOutlined className="icon-type2" />
      </Tooltip>
      <Switch
        checkedChildren={t('global:SWITCH.ON')}
        unCheckedChildren={t('global:SWITCH.OFF')}
        defaultChecked
        onChange={value => setIsShowNestedTable(value)}
      />
    </Col>
  );

  return (
    isShowPromoTable ? (
      <AntTableV2
        title={<Title level={5}>{t('PROMO_RATES')}</Title>}
        data={isDataVisible ? data : []}
        columns={columns}
        pagination={false}
        loading={isDataVisible ? isPending : false}
        rowClassName={(record, index) => getRowClassName(classes, index, record)}
        bordered
        showExpandColumn={false}
        rightElement={rightElement}
        expandable={{
          expandedRowRender,
          rowExpandable: record => record.rowExpandable,
          onExpand,
          showExpandColumn: false,
          expandRowByClick: true,
          indentSize: 0,
          expandedRowClassName,
        }}
      />
    ) : (
      <Empty
        imageStyle={{ height: '80px' }}
        description={(
          <span className={parentClasses.emptyDivDescription}>
            {t('getirMarketGrowthComparisonPage:TABLE_WORK_ONLY_GETIR_INTEGRATION_TYPE_DESCRIPTION', { tableName: t('global:PROMO') })}
          </span>
        )}
        className={parentClasses.emptyDiv}
      />
    )
  );
}

export default PromoRatesTable;
