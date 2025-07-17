import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, Select, Space } from 'antd';
import Text from 'antd/lib/typography/Text';

import ShiftPlanReportFilter from '../ShiftPlanReport';
import LeaveManagementReportFilter from '../LeaveManagementReport';
import SlotPerformanceFilter from '../SlotPerformanceReport';
import SlotChangeLogFilter from '../SlotChangeLogReport';
import SlotSelectionFilter from '../SlotSelectionReport';
import { REPORT_TYPES } from '../../constants';
import useStyles from '../../styles';

const Filter = () => {
  const { t } = useTranslation(['workforceReports']);
  const classes = useStyles();

  const [reportType, setReportType] = useState();

  const reportTypeOptions = Object.entries((REPORT_TYPES)).map(([key, value]) => ({
    value,
    label: t(`REPORT_TYPES.${key}`),
  }));

  const REPORT_TYPES_FILTERS = {
    [REPORT_TYPES.SHIFT_PLAN]: <ShiftPlanReportFilter />,
    [REPORT_TYPES.LEAVE_MANAGEMENT]: <LeaveManagementReportFilter />,
    [REPORT_TYPES.SLOT_PERFORMANCE]: <SlotPerformanceFilter />,
    [REPORT_TYPES.SLOT_CHANGE_LOG]: <SlotChangeLogFilter />,
    [REPORT_TYPES.SLOT_SELECTION]: <SlotSelectionFilter />,
  };

  return (
    <Card>
      <Space direction="vertical" className={classes.fullWidth}>
        <Row>
          <Col span={12}>
            <Text>{t('REPORT_TYPE')}</Text>
            <Select
              className={classes.fullWidth}
              options={reportTypeOptions}
              onChange={setReportType}
              placeholder={t('SELECT_REPORT_TYPE')}
            />
          </Col>
        </Row>
        {REPORT_TYPES_FILTERS[reportType]}
      </Space>
    </Card>
  );
};

export default Filter;
