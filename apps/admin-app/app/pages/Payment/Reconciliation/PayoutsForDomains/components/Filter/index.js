import { Button, Col, Collapse, Row, Typography, DatePicker } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { Creators } from '../../redux/actions';
import { INIT_FILTERS } from '../../constants';
import { payoutReportsSelector } from '../../redux/selectors';

const { Text } = Typography;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

export default function Filter() {
  const { t } = useTranslation(['global']);
  const [date, setDate] = useState(INIT_FILTERS.date);
  const dispatch = useDispatch();
  const payoutReportsIsPending = useSelector(payoutReportsSelector.getIsPending);

  const handleSubmit = () => {
    const filters = {
      startTime: date
        ? date[0].utc().startOf('day').toDate()
        : null,
      endTime: date
        ? date[1].utc().endOf('day').toDate()
        : null,
    };
    dispatch(Creators.getPayoutReportsRequest({ filters }));
  };

  return (
    <Row className="mt-4">
      <Col span={24}>
        <Collapse defaultActiveKey={1}>
          <Panel header={t('global:FILTER')} key={1}>
            <Row gutter={[8, 8]}>

              <Col md={6} xs={24}>
                <Text>{t('DATE')}</Text>
                <RangePicker
                  className="w-100"
                  value={date}
                  onChange={val => setDate(val)}
                  format={DEFAULT_DATE_FORMAT}
                  allowClear={false}
                  disabled={payoutReportsIsPending}
                  data-testid="payouts-date-filter"
                />
              </Col>
            </Row>
            <Row justify="end" className="mt-2">
              <Button
                onClick={() => handleSubmit()}
                type="primary"
                disabled={payoutReportsIsPending}
                loading={payoutReportsIsPending}
              >
                {t('BRING')}
              </Button>
            </Row>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
}
