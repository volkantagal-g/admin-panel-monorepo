import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Collapse, Divider } from 'antd';
import _ from 'lodash';
import { useFormik } from 'formik';

import { t } from '@shared/i18n';
import WeekMinPicker from '@shared/components/UI/WeekMinPicker';
import { validate } from '@shared/yup';
import Footer from '../Form/Footer';
import MultiLanguageInput from '../MultiLanguage/Input';
import { validationSchema, defaultValues } from './formHelper';

const { Panel } = Collapse;

function WorkingHoursSelect(props) {
  const {
    id,
    header,
    availableTimes,
    subtitle,
    subtitleMessage,
    collapsePanelKey,
    submitWorkingHours,
    submitWorkingHoursMessage,
    messageObject,
    domainType,
    isEditable,
    timezone,
    hasAccessToEditWorkingHours,
    hasAccessToEditWorkingHoursMessage,
    mins,
    headerSelectable,
    onParentWorkingHoursEditableChange,
    parentWorkingHoursEditable,
  } = props;
  const [isWorkingHoursEditable, setIsWorkingHoursEditable] = useState(parentWorkingHoursEditable || false);
  const [isWorkingHoursMessageEditable, setIsWorkingHoursMessageEditable] = useState(false);
  const [captureHours, setCaptureHours] = useState(false);
  const [availableTimesState, setAvailableTimesState] = useState(availableTimes);
  const [minPickerRenderStatus, setMinPickerRenderStatus] = useState(true);
  const endOfDays = useMemo(() => {
    return Array.from({ length: 7 }).map((x, index) => {
      return ((index + 1) * 24 * 60) / mins;
    });
  }, [mins]);

  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    enableReinitialize: true,
  });
  const { setFieldValue, values, isValid } = formik;

  const handleResetWorkingHours = () => {
    setAvailableTimesState(availableTimes);
  };

  const handleResetWorkingHoursMessage = () => {
    setFieldValue('message', messageObject);
  };

  useEffect(() => {
    setFieldValue('message', messageObject);
  }, [messageObject, setFieldValue, domainType]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffect(() => {
    setIsWorkingHoursEditable(parentWorkingHoursEditable);
  }, [parentWorkingHoursEditable]);

  const populateAvailableTimes = () => {
    return Object.keys(availableTimesState).reduce((populatedData, timeKey) => {
      const timeStatus = availableTimesState[timeKey];
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
    onParentWorkingHoursEditableChange(false);
  };

  const handleSaveWorkingHoursMessage = () => {
    submitWorkingHoursMessage({
      updateData: { message: values.message || {} },
      id,
    });
    setIsWorkingHoursMessageEditable(false);
  };

  const handleOnFocus = () => {
    setMinPickerRenderStatus(false);
  };

  const handleOnBlur = () => {
    setMinPickerRenderStatus(true);
  };

  const updateTimesState = (timeIndex, doCapture = false) => {
    if (_.isNumber(timeIndex) && timeIndex >= 0 && isWorkingHoursEditable && (captureHours || doCapture)) {
      setAvailableTimesState({
        ...availableTimesState,
        [timeIndex]: !availableTimesState[timeIndex],
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
    const dayStateItems = Object.values(availableTimesState).slice(indices[0], indices[indices.length - 1]);
    const hasAllSelected = dayStateItems.every(value => value);
    const isNoneSelected = dayStateItems.every(value => !value);
    const updatedValue = isNoneSelected || !hasAllSelected;
    const updatedTimeSlots = Object.assign({}, ...indices.map(index => ({ [index]: updatedValue })));

    setAvailableTimesState({
      ...availableTimesState,
      ...updatedTimeSlots,
    });
  };

  useEffect(() => {
    if (availableTimes) {
      setAvailableTimesState(availableTimes);
    }
  }, [availableTimes]);

  return (
    <Collapse>
      <Panel key={collapsePanelKey} header={header}>
        <Divider>{subtitle}</Divider>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <WeekMinPicker
              headerSelectable={headerSelectable}
              availableTimes={availableTimesState}
              isDisabled={!isWorkingHoursEditable}
              handleMouseUp={handleMouseUp}
              handleMouseDown={handleMouseDown}
              handleMouseOver={handleMouseOver}
              shouldRender={minPickerRenderStatus}
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
                    onParentWorkingHoursEditableChange(visibility);
                  }}
                  handleReset={handleResetWorkingHours}
                  handleSave={handleSaveWorkingHours}
                />
              </Col>
            </Row>
          ) : null
        }
        {
          hasAccessToEditWorkingHoursMessage && isEditable ? (
            <>
              <Divider>{subtitleMessage}</Divider>
              <Form form={form}>
                <MultiLanguageInput
                  label={t('MESSAGE')}
                  fieldPath={['message']}
                  formik={formik}
                  disabled={!isWorkingHoursMessageEditable}
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                />
              </Form>

              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Footer
                    formButtonVisibilty={isWorkingHoursMessageEditable}
                    setFormButtonVisibilty={setIsWorkingHoursMessageEditable}
                    handleReset={handleResetWorkingHoursMessage}
                    handleSave={handleSaveWorkingHoursMessage}
                    isValid={isValid}
                  />
                </Col>
              </Row>
            </>
          ) : null
        }
      </Panel>
    </Collapse>
  );
}

WorkingHoursSelect.propTypes = {
  availableTimes: PropTypes.shape().isRequired,
  submitWorkingHours: PropTypes.func.isRequired,
  submitWorkingHoursMessage: PropTypes.func.isRequired,
  collapsePanelKey: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  messageObject: PropTypes.shape().isRequired,
  isEditable: PropTypes.bool.isRequired,
  timezone: PropTypes.string.isRequired,
  hasAccessToEditWorkingHours: PropTypes.bool,
  hasAccessToEditWorkingHoursMessage: PropTypes.bool,
  mins: PropTypes.number.isRequired,
  onParentWorkingHoursEditableChange: PropTypes.func,
  parentWorkingHoursEditable: PropTypes.bool,
};

WorkingHoursSelect.defaultProps = {
  hasAccessToEditWorkingHours: false,
  hasAccessToEditWorkingHoursMessage: false,
  parentWorkingHoursEditable: false,
  onParentWorkingHoursEditableChange: () => {},
};

export default WorkingHoursSelect;
