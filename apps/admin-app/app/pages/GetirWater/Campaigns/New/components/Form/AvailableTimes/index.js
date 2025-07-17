import { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';

import { availableTimes } from '../../../../utils/createAvailableTimes';
import { tableColumns } from './config';

const AvailableTimes = ({ getAvailableTimes }) => {
  const { t } = useTranslation('getirWaterCampaignsPage');
  const [selectedTimes, setSelectedTimes] = useState([]);

  useEffect(() => {
    getAvailableTimes(selectedTimes);
  }, [selectedTimes, getAvailableTimes]);

  const handleSelectedTimes = timeObject => {
    const findDayIndex = selectedTimes.findIndex(
      day => day.dayOfWeek === timeObject.dayOfWeek && day.startTime === timeObject.startTime && day.endTime === timeObject.endTime,
    );
    if (findDayIndex === -1) {
      setSelectedTimes(prevValues => [...prevValues, timeObject]);
      return;
    }
    setSelectedTimes(times => times.filter((_, i) => i !== findDayIndex));
  };

  return (
    <AntCard bordered={false} title={t('FORM.AVAILABLE_TIMES.TITLE')}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form.Item>
            <AntTableV2
              data={availableTimes}
              columns={tableColumns(selectedTimes)}
              bordered
              onRow={record => {
                return {
                  onClick: event => {
                    const dayIndex = event.target.getAttribute('data-index');
                    const timeObject = {
                      dayOfWeek: Number(dayIndex),
                      startTime: record.startDate,
                      endTime: record.endDate,
                    };
                    handleSelectedTimes(timeObject);
                  },
                };
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </AntCard>
  );
};

export default AvailableTimes;
