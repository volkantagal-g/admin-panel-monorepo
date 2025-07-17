import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import { isNumber } from 'lodash';

import { Creators } from '@app/pages/MarketProduct/Recipes/Detail/redux/actions';
import { Space } from '@shared/components/GUI';
import { getRecipeByIdSelector, updateRecipeSelector } from '../../../../redux/selectors';
import WeekMinPicker from '@shared/components/UI/WeekMinPicker';
import AntCard from '@shared/components/UI/AntCard';

import { getAvailableTimeBoxesMap, getInitialAvailableTimes, transformFromTimeBoxesToAvailableTimes } from '@shared/utils/availableTime';

export const getSegmentsOptions = (segmentsOptions = []) => {
  if (!segmentsOptions?.length) return [];
  return segmentsOptions?.map(item => ({
    value: item?.segment,
    label: item?.segment,
  }));
};

const TimeTable = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('recipesPage');
  const theme = useTheme();

  const recipe = useSelector(getRecipeByIdSelector.getData);
  const isPending = useSelector(updateRecipeSelector.getIsPending);
  const updateRecipeErrors = useSelector(updateRecipeSelector.getError);

  const activeTimesErrors = updateRecipeErrors?.response?.data?.data?.details?.[0]?.errors?.filter(
    value => value?.field?.startsWith('recipe.activeTimes'),
  ) || [];

  const [captureHours, setCaptureHours] = useState(false);
  const [isWeekMinPickerEditable, setIsWeekMinPickerEditable] = useState(false);
  const [availableTimeBoxesMap, setAvailableTimeBoxesMap] = useState(getAvailableTimeBoxesMap(recipe?.availableTimes));
  const [isSelectAllClickedLast, setIsSelectAllClickedLast] = useState(false);

  const updateTimesState = (timeIndex, doCapture = false) => {
    if (isNumber(timeIndex) && (captureHours || doCapture)) {
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

  const handleSaveClick = () => {
    const availableTimes = transformFromTimeBoxesToAvailableTimes(availableTimeBoxesMap);
    const body = { availableTimes };
    setIsWeekMinPickerEditable(false);
    dispatch(Creators.updateRecipeRequest({ id: recipe?._id, body }));
  };

  const selectAllTimes = () => {
    const availableTimes = getInitialAvailableTimes(true);
    setAvailableTimeBoxesMap(getAvailableTimeBoxesMap(availableTimes));
    setIsSelectAllClickedLast(true);
  };

  const unselectAllTimes = () => {
    const availableTimes = getInitialAvailableTimes(false);
    setAvailableTimeBoxesMap(getAvailableTimeBoxesMap(availableTimes));
    setIsSelectAllClickedLast(false);
  };

  const handleCancel = () => {
    setIsWeekMinPickerEditable(false);
    const timeBoxesMap = getAvailableTimeBoxesMap(recipe?.availableTimes);
    setAvailableTimeBoxesMap(timeBoxesMap);
  };

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isWeekMinPickerEditable ? (
        <>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={handleCancel}>
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
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
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                size="small"
                onClick={handleSaveClick}
                type="primary"
                loading={isPending}
              >
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col key="4">
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={() => setIsWeekMinPickerEditable(true)}>
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  return (
    <Space
      title={t('DETAILS.TIME_TABLE.TITLE')}
      errorBadgeProps={{ title: t('DETAILS.ERRORS'), errors: activeTimesErrors }}
    >
      <AntCard bordered={false} footer={cardFooter}>
        <WeekMinPicker
          availableTimes={availableTimeBoxesMap}
          isDisabled={!isWeekMinPickerEditable}
          handleMouseUp={handleMouseUp}
          handleMouseDown={handleMouseDown}
          handleMouseOver={handleMouseOver}
          shouldRender
        />
      </AntCard>
    </Space>
  );
};

export default TimeTable;
