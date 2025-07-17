import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'antd';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import WorkingHoursSelect from '@shared/components/UI/WorkingHoursSelect';
import { SelectWrapper } from '@shared/components/UI/Form';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { BASE_WORKING_HOURS, GETIR_WORKING_HOURS_DOMAIN_TYPES, WAREHOUSE_BASE_WORKING_HOURS } from '@shared/shared/constants';
import Footer from '../Footer';
import { WORKING_HOURS_MINS_RANGE } from './constants';

function WorkingHours(props) {
  const {
    workingHours,
    baseWorkingHourType,
    updateBaseWorkingHoursType,
    updateWorkingHours,
    updateWorkingHoursMessage,
    timezone,
  } = props;
  const { t } = useTranslation();
  const { canAccess, Can } = usePermission();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [workingHourType, setWorkingHourType] = useState(baseWorkingHourType);
  const hasAccessToEditWorkingHours = canAccess(permKey.PAGE_WAREHOUSE_DETAIL_WORKING_HOURS_EDIT_HOURS);
  const hasAccessToEditWorkingHoursMessage = canAccess(permKey.PAGE_WAREHOUSE_DETAIL_WORKING_HOURS_EDIT_MESSAGE);

  const [form] = Form.useForm();
  const { setFieldsValue } = form;

  useEffect(() => {
    setFieldsValue({ baseWorkingHourType: workingHourType });
  }, [setFieldsValue, workingHourType]);

  useEffect(() => {
    setWorkingHourType(baseWorkingHourType);
  }, [baseWorkingHourType]);

  const handleResetForm = () => {
    setWorkingHourType(baseWorkingHourType);
  };

  const handleSelectChange = selectedWorkingHourType => {
    setWorkingHourType(selectedWorkingHourType);
  };

  const isInRange = (source, value) => {
    return source.some(timeObject => {
      return value > timeObject.startMin && timeObject.endMin >= value;
    });
  };

  const getAvailableTimes = availableTimes => {
    return Array.from({ length: (24 * 7 * 60) / WORKING_HOURS_MINS_RANGE }).reduce((sumObject, tempValue, tempIndex) => {
      const timeValue = (tempIndex * WORKING_HOURS_MINS_RANGE) + WORKING_HOURS_MINS_RANGE;
      return {
        ...sumObject,
        [tempIndex]: isInRange(availableTimes, timeValue),
      };
    }, {});
  };

  const handleWorkingHoursSubmit = updateData => {
    updateWorkingHours(updateData);
  };

  const handleWorkingHoursMessageSubmit = updateData => {
    updateWorkingHoursMessage(updateData);
  };
  const handleFinish = () => {
    updateBaseWorkingHoursType({ baseWorkingHourType: workingHourType });
    setIsFormEditable(false);
  };
  const renderWorkingHoursSelectByDomainTypes = () => {
    const isEditable = !isFormEditable && baseWorkingHourType === WAREHOUSE_BASE_WORKING_HOURS;
    const getirMarketDomainTypes = new Set(GETIR_WORKING_HOURS_DOMAIN_TYPES);

    return workingHours.map(workingHour => {
      if (getirMarketDomainTypes.has(workingHour.domainType)) {
        const panelHeader = t(`global:GETIR_MARKET_DOMAIN_TYPES:${workingHour.domainType}`);
        const isWorkingHourEditable = workingHour.type === WAREHOUSE_BASE_WORKING_HOURS;
        return (
          <WorkingHoursSelect
            id={workingHour._id}
            key={workingHour._id}
            header={panelHeader}
            subtitle={t('warehousePage:WORKING_HOURS')}
            subtitleMessage={t('warehousePage:WORKING_HOURS_MESSAGES')}
            availableTimes={getAvailableTimes(workingHour.hours.availableTimes)}
            collapsePanelKey={panelHeader}
            submitWorkingHours={handleWorkingHoursSubmit}
            submitWorkingHoursMessage={handleWorkingHoursMessageSubmit}
            messageObject={workingHour.message}
            domainType={workingHour.domainType}
            isEditable={isEditable && isWorkingHourEditable}
            timezone={timezone}
            hasAccessToEditWorkingHours={hasAccessToEditWorkingHours}
            hasAccessToEditWorkingHoursMessage={hasAccessToEditWorkingHoursMessage}
            mins={WORKING_HOURS_MINS_RANGE}
            headerSelectable
          />
        );
      }
      return null;
    });
  };

  const customLabelTranslation = path => {
    return label => {
      return t(`${path}:${label}`);
    };
  };

  return (
    <Card title={t('warehousePage:WORKING_HOURS')}>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Row gutter={[16]} align="bottom">
          <Col span={24}>
            <SelectWrapper
              selectKey="baseWorkingHourType"
              label={t('warehousePage:BASE_WORKING_HOUR_TYPE')}
              value={workingHourType}
              optionsData={BASE_WORKING_HOURS}
              labelTranslationCallback={customLabelTranslation('warehousePage:BASE_WORKING_HOURS')}
              onChangeCallback={handleSelectChange}
              disabled={!isFormEditable}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Can permKey={permKey.PAGE_WAREHOUSE_DETAIL_WORKING_HOURS_EDIT_HOURS}>
              <Footer
                formButtonVisibilty={isFormEditable}
                setFormButtonVisibilty={setIsFormEditable}
                handleReset={handleResetForm}
              />
            </Can>
          </Col>
        </Row>
      </Form>
      {renderWorkingHoursSelectByDomainTypes()}
    </Card>
  );
}

WorkingHours.propTypes = {
  workingHours: PropTypes.array.isRequired,
  baseWorkingHourType: PropTypes.number.isRequired,
  updateWorkingHours: PropTypes.func.isRequired,
  updateWorkingHoursMessage: PropTypes.func.isRequired,
  updateBaseWorkingHoursType: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired,
};

export default WorkingHours;
