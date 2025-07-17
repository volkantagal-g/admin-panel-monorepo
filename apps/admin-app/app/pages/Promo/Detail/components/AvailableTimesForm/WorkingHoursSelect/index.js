import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Divider, Row } from 'antd';
import _ from 'lodash';

import WeekMinPicker from '@shared/components/UI/WeekMinPicker';
import Footer from '@shared/components/UI/Form/Footer';

function WorkingHoursSelect(props) {
  const {
    id,
    availableTimes,
    setAvailableTimes,
    subtitle,
    submitWorkingHours,
    isEditable,
    timezone,
    hasAccessToEditWorkingHours,
    mins,
  } = props;
  const [isWorkingHoursEditable, setIsWorkingHoursEditable] = useState(false);
  const [captureHours, setCaptureHours] = useState(false);
  const endOfDays = useMemo(() => {
    return Array.from({ length: 7 }).map((x, index) => {
      return ((index + 1) * 24 * 60) / mins;
    });
  }, [mins]);

  const handleResetWorkingHours = () => {
    setAvailableTimes(availableTimes);
  };

  const populateAvailableTimes = () => {
    return Object.keys(availableTimes).reduce((populatedData, timeKey) => {
      const timeStatus = availableTimes[timeKey];
      if (!timeStatus) {
        return populatedData;
      }
      // eslint-disable-next-line radix
      const timeIndex = parseInt(timeKey);
      const startMin = timeIndex * mins;
      const endMin = (timeIndex + 1) * mins;
      const isEndOfDay = endOfDays.includes(startMin);

      if (populatedData.length && !isEndOfDay && populatedData[populatedData.length - 1].endMin === startMin) {
        // eslint-disable-next-line no-param-reassign
        populatedData[populatedData.length - 1].endMin = endMin;
      }
      else {
        populatedData.push({ startMin, endMin });
      }
      return populatedData;
    }, []);
  };

  const handleSaveWorkingHours = () => {
    submitWorkingHours({
      updateData: {
        hours: {
          timezone,
          availableTimes: populateAvailableTimes(),
        },
      },
      id,
    });
    setIsWorkingHoursEditable(false);
  };

  const updateTimesState = (timeIndex, doCapture = false) => {
    if (_.isNumber(timeIndex) && timeIndex >= 0 && isWorkingHoursEditable && (captureHours || doCapture)) {
      setAvailableTimes({
        ...availableTimes,
        [timeIndex]: !availableTimes[timeIndex],
      });
    }
  };

  const handleMouseUp = () => {
    setCaptureHours(false);
  };

  const handleMouseOver = timeIndex => {
    updateTimesState(timeIndex);
  };

  const handleMouseDown = timeIndex => {
    updateTimesState(timeIndex, true);
    setCaptureHours(true);
  };

  const handleSelectDay = indices => {
    const dayStateItems = Object.values(availableTimes).slice(indices[0], indices[indices.length - 1]);
    const hasAllSelected = dayStateItems.every(value => value);
    const isNoneSelected = dayStateItems.every(value => !value);
    const updatedValue = isNoneSelected || !hasAllSelected;
    const updatedTimeSlots = Object.assign({}, ...indices.map(index => ({ [index]: updatedValue })));

    setAvailableTimes({
      ...availableTimes,
      ...updatedTimeSlots,
    });
  };

  return (
    <Row>
      <Col span={24}>
        <Divider>{subtitle}</Divider>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <WeekMinPicker
              availableTimes={availableTimes}
              isDisabled={!isWorkingHoursEditable}
              handleMouseUp={handleMouseUp}
              handleMouseDown={handleMouseDown}
              handleMouseOver={handleMouseOver}
              shouldRender
              mins={mins}
              onSelectDay={handleSelectDay}
            />
          </Col>
        </Row>
        {
          !!hasAccessToEditWorkingHours && !!isEditable ? (
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Footer
                  formButtonVisibilty={isWorkingHoursEditable}
                  setFormButtonVisibilty={visibility => {
                    setIsWorkingHoursEditable(visibility);
                  }}
                  handleReset={handleResetWorkingHours}
                  handleSave={handleSaveWorkingHours}
                />
              </Col>
            </Row>
          ) : null
        }
      </Col>
    </Row>
  );
}

WorkingHoursSelect.propTypes = {
  availableTimes: PropTypes.shape().isRequired,
  setAvailableTimes: PropTypes.func.isRequired,
  submitWorkingHours: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,
  timezone: PropTypes.string.isRequired,
  hasAccessToEditWorkingHours: PropTypes.bool,
  mins: PropTypes.number.isRequired,
};

WorkingHoursSelect.defaultProps = { hasAccessToEditWorkingHours: false };

export default WorkingHoursSelect;
