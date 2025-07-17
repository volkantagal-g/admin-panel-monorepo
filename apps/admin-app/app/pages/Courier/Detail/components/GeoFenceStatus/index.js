import { Collapse, DatePicker } from 'antd';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { toFakeLocalDate } from '@shared/utils/dateHelper';
import { tableColumns } from './config';
import { Creators } from '../../redux/actions';
import { geoFenceLogsSelector } from '../../redux/selectors';

const TODAY_START = moment().startOf('day');
const TODAY_END = moment().endOf('day');

const getIsDateDisabled = date => {
  return date.isAfter(TODAY_END);
};

const { Panel } = Collapse;
const CourierGeoFenceLog = ({ courierId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['courierPage', 'global']);
  const data = useSelector(geoFenceLogsSelector.getData);
  const isPending = useSelector(geoFenceLogsSelector.getIsPending);
  const [selectedDate, setSelectedDate] = useState(TODAY_START);

  const submitGeoFenceLogsRequest = ({ date }) => {
    dispatch(
      Creators.getGeoFenceRequest({
        courierId,
        startDate: toFakeLocalDate(date.clone().startOf('day')),
        endDate: toFakeLocalDate(date.clone().endOf('day')),
      }),
    );
  };

  const handleCourierStatusLogsCollapseChanged = () => {
    if (!data?.length) {
      submitGeoFenceLogsRequest({ date: selectedDate });
    }
  };

  const handleDateChanged = newSelectedDate => {
    const modifiedDate = newSelectedDate.clone().startOf('day');
    setSelectedDate(modifiedDate);
    submitGeoFenceLogsRequest({ date: modifiedDate });
  };

  const arrangedData = useMemo(() => {
    const newData = [];
    data.forEach(dataLog => {
      const { id, groupId, flow, values, isSuccess } = dataLog;
      const group = groupId;
      const courierFlow = flow;
      const config = values;
      const success = isSuccess;
      // eslint-disable-next-line no-param-reassign
      delete dataLog.values;
      newData.push({ dataLog, id, group, courierFlow, config, success });
    });

    return newData;
  }, [data]);

  return (
    <Collapse onChange={handleCourierStatusLogsCollapseChanged}>
      <Panel
        header={t('courierPage:COURIER_GEOFENCE_LOGS_HISTORY')}
        extra={(
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <span onClick={e => e.stopPropagation()}>
            <DatePicker
              disabledDate={getIsDateDisabled}
              onChange={handleDateChanged}
              value={selectedDate}
              allowClear={false}
            />
          </span>
        )}
      >
        <AntTableV2
          data-testid="COURIER_DETAIL_STATUS_LOGS_TABLE"
          data={arrangedData}
          columns={tableColumns({ t })}
          loading={isPending}
          scroll={{ y: 300 }}
        />
      </Panel>
    </Collapse>
  );
};

export default CourierGeoFenceLog;
