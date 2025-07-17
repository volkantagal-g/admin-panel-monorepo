import { useCallback, useEffect, useState } from 'react';
import { Row, Col, Form } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import AntTable from '@shared/components/UI/AntTable';
import { CreateCardActionButtons } from '@app/pages/GetirWater/Campaigns/utils/createCardActionButtons';

import { availableTimes } from '../../../../utils/createAvailableTimes';
import { tableColumns } from './config';
import { Creators } from '../../../redux/actions';

const AvailableTimes = ({ values, setAvailableTimes }) => {
  const [timesForm] = Form.useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTimes, setSelectedTimes] = useState([]);

  const { cardFooter, cardTitle, isEditable } = CreateCardActionButtons('FORM.AVAILABLE_TIMES.TITLE', 'edit-time-list');

  const handleAvailableTimes = useCallback(times => {
    setAvailableTimes(times);
  }, [setAvailableTimes]);

  useEffect(() => {
    handleAvailableTimes(selectedTimes);
  }, [selectedTimes, handleAvailableTimes]);

  useEffect(() => {
    if (Object.keys(values).length && values.availableTimes) {
      const mappedTimes = values.availableTimes.map(time => ({
        dayOfWeek: time.dayOfWeek,
        startTime: time.startTime.split(':').slice(0, 2).join(':'),
        endTime: time.endTime.split(':').slice(0, 2).join(':'),
      }));
      setSelectedTimes(mappedTimes);
    }
  }, [values]);

  const onFinishTimeList = () => {
    const resultData = { availableTimes: selectedTimes };
    dispatch(
      Creators.updateCampaignRequest({
        data: { availableTimeSection: resultData },
        campaignId: id,
      }),
    );
  };

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
    <Form id="edit-time-list" onFinish={onFinishTimeList} layout="vertical" form={timesForm}>
      <AntCard footer={cardFooter} bordered={false} title={cardTitle}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <AntTable
              data={availableTimes}
              columns={tableColumns(selectedTimes)}
              bordered
              onRow={record => {
                return {
                  onClick: event => {
                    if (!isEditable) {
                      event.preventDefault();
                      return;
                    }
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
          </Col>
        </Row>
      </AntCard>
    </Form>
  );
};

export default AvailableTimes;
