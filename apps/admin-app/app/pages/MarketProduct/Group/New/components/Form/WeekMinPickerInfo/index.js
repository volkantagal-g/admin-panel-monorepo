import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Form, Button, Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { isFinite } from 'lodash';

import WeekMinPicker from '@shared/components/UI/WeekMinPicker';
import { getAvailableTimeBoxesMap, getInitialAvailableTimes } from '@shared/utils/availableTime';
import { getMarketProductGroupSelector } from '@app/pages/MarketProduct/Group/Detail/redux/selectors';
import { MINUTES_IN_A_HOUR } from '@shared/shared/constants';

const { Panel } = Collapse;

const WeekMinPickerInfo = ({ availableTimeBoxesMap, setAvailableTimeBoxesMap }) => {
  const { t } = useTranslation('marketProductGroupPage');
  const [captureHours, setCaptureHours] = useState(false);
  const marketProductGroup = useSelector(getMarketProductGroupSelector.getData);
  const areAllCellsSelected = Object.values(availableTimeBoxesMap)?.every(cellValue => cellValue);
  const [isSelectAllClickedLast, setIsSelectAllClickedLast] = useState(areAllCellsSelected);

  const theme = useTheme();

  useEffect(() => {
    if (marketProductGroup._id) {
      const timeBoxesMap = getAvailableTimeBoxesMap(marketProductGroup.activeTimes, MINUTES_IN_A_HOUR);
      setAvailableTimeBoxesMap(timeBoxesMap);
    }
  }, [marketProductGroup, setAvailableTimeBoxesMap]);

  const updateTimesState = (timeIndex, doCapture = false) => {
    if (isFinite(timeIndex) && (captureHours || doCapture)) {
      setAvailableTimeBoxesMap({
        ...availableTimeBoxesMap,
        [timeIndex]: !availableTimeBoxesMap[timeIndex],
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

  const selectAllTimes = () => {
    const availableTimes = getInitialAvailableTimes(true);
    setAvailableTimeBoxesMap(getAvailableTimeBoxesMap(availableTimes, MINUTES_IN_A_HOUR));
    setIsSelectAllClickedLast(true);
  };

  const unselectAllTimes = () => {
    const availableTimes = getInitialAvailableTimes(false);
    setAvailableTimeBoxesMap(getAvailableTimeBoxesMap(availableTimes, MINUTES_IN_A_HOUR));
    setIsSelectAllClickedLast(false);
  };

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isSelectAllClickedLast ? (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={unselectAllTimes}>
              {t('button:UNSELECT_ALL')}
            </Button>
          </Form.Item>
        </Col>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={selectAllTimes}>
              {t('button:SELECT_ALL')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  return (
    <Collapse defaultActiveKey={['1']} className="mb-2">
      <Panel header={t('ACTIVE_TIME_SLOTS')}>
        <WeekMinPicker
          availableTimes={availableTimeBoxesMap}
          handleMouseUp={handleMouseUp}
          handleMouseDown={handleMouseDown}
          handleMouseOver={handleMouseOver}
          mins={MINUTES_IN_A_HOUR}
          shouldRender
        />
        {cardFooter}
      </Panel>
    </Collapse>
  );
};

export default WeekMinPickerInfo;
