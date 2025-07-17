import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Card, Col, Form } from 'antd';

import MatrixCellPicker from '@shared/components/UI/MatrixCellPicker';
import { FRIDAY, MONDAY, SATURDAY, SUNDAY, THURSDAY, TUESDAY, WEDNESDAY } from '@shared/shared/constants';
import { get24TimeRangeArray } from '@shared/containers/Marketing/OptionalControls/utils';

const HourScheduler = ({ form, parentFieldName, disabled }) => {
  // TODO: Enable when fix bug on edit phase
  const { t } = useTranslation('marketing');
  const availableDayPeriodName = [...[parentFieldName], 'availableDayPeriods'];
  const hourRanges = get24TimeRangeArray();

  const weekdays = [
    t(`global:DAY_OF_WEEKS:${MONDAY}`),
    t(`global:DAY_OF_WEEKS:${TUESDAY}`),
    t(`global:DAY_OF_WEEKS:${WEDNESDAY}`),
    t(`global:DAY_OF_WEEKS:${THURSDAY}`),
    t(`global:DAY_OF_WEEKS:${FRIDAY}`),
    t(`global:DAY_OF_WEEKS:${SATURDAY}`),
    t(`global:DAY_OF_WEEKS:${SUNDAY}`),
  ];

  const handleMatrixData = matrixData => {
    form.setFields([{ name: ['controls', 'availableDayPeriods'], value: matrixData }]);
  };
  const activeCells = form.getFieldValue(availableDayPeriodName);
  return (
    <Card size="small" title={t('SCHEDULER')}>
      <Row gutter={24}>
        <Col xs={24} sm={12} lg={24}>
          <MatrixCellPicker
            disabled={disabled}
            activeCells={activeCells}
            rowLabels={hourRanges}
            colLabels={weekdays}
            handleMatrixChange={handleMatrixData}
          />
          <Form.Item
            dependencies={['controls']}
            rules={[
              ({ getFieldValue }) => ({
                validator() {
                  const availableDayPeriod = getFieldValue(availableDayPeriodName);
                  if (!availableDayPeriod?.length) {
                    return Promise.reject(t('error:REQUIRED'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            name={availableDayPeriodName}
            className="h-0"
          />
        </Col>
      </Row>
    </Card>
  );
};

export default memo(HourScheduler);
