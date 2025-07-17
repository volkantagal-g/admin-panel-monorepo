import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'antd';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import WorkingHoursSelect from '@shared/components/UI/WorkingHoursSelect';
import { SelectWrapper } from '@shared/components/UI/Form';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { BASE_PEAK_HOURS, GETIR_MARKET_DOMAIN_TYPES, WAREHOUSE_BASE_PEAK_HOURS } from '@shared/shared/constants';
import Footer from '../Footer';
import { PEAK_HOURS_MINS_RANGE } from './constants';

function PeakHours(props) {
  const {
    peakHours,
    basePeakHourType,
    updateBasePeakHoursType,
    updatePeakHours,
    updatePeakHoursMessage,
    timezone,
  } = props;
  const { t } = useTranslation();
  const { canAccess, Can } = usePermission();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [peakHourType, setPeakHourType] = useState(basePeakHourType);
  const hasAccessToEditPeakHours = canAccess(permKey.PAGE_WAREHOUSE_DETAIL_PEAK_HOURS_EDIT_HOURS);
  const hasAccessToEditPeakHoursMessage = canAccess(permKey.PAGE_WAREHOUSE_DETAIL_PEAK_HOURS_EDIT_MESSAGE);
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  useEffect(() => {
    setFieldsValue({ basePeakHourType: peakHourType });
  }, [setFieldsValue, peakHourType]);

  useEffect(() => {
    setPeakHourType(basePeakHourType);
  }, [basePeakHourType]);

  const handleResetForm = () => {
    setPeakHourType(basePeakHourType);
  };

  const handleSelectChange = selectedPeakHourType => {
    setPeakHourType(selectedPeakHourType);
  };

  const isInRange = (source, value) => {
    return source.some(timeObject => {
      return value > timeObject.startMin && timeObject.endMin >= value;
    });
  };

  const getAvailableTimes = availableTimes => {
    return Array.from({ length: (24 * 7 * 60) / PEAK_HOURS_MINS_RANGE }).reduce((sumObject, tempValue, tempIndex) => {
      const timeValue = (tempIndex * PEAK_HOURS_MINS_RANGE) + PEAK_HOURS_MINS_RANGE;
      return {
        ...sumObject,
        [tempIndex]: isInRange(availableTimes, timeValue),
      };
    }, {});
  };

  const handlePeakHoursSubmit = updateData => {
    updatePeakHours(updateData);
  };

  const handlePeakHoursMessageSubmit = updateData => {
    updatePeakHoursMessage(updateData);
  };
  const handleFinish = () => {
    updateBasePeakHoursType({ basePeakHourType: peakHourType });
    setIsFormEditable(false);
  };
  const renderPeakHoursSelectByDomainTypes = () => {
    const isEditable = !isFormEditable && basePeakHourType === WAREHOUSE_BASE_PEAK_HOURS;
    const getirMarketDomainTypes = new Set(GETIR_MARKET_DOMAIN_TYPES);
    return peakHours.map(peakHour => {
      if (getirMarketDomainTypes.has(peakHour.domainType)) {
        const panelHeader = t(`global:GETIR_MARKET_DOMAIN_TYPES:${peakHour.domainType}`);
        const isPeakHourEditable = peakHour.type === WAREHOUSE_BASE_PEAK_HOURS;
        return (
          <WorkingHoursSelect
            id={peakHour._id}
            key={peakHour._id}
            header={panelHeader}
            subtitle={t('warehousePage:PEAK_HOURS')}
            subtitleMessage={t('warehousePage:PEAK_HOURS_MESSAGES')}
            availableTimes={getAvailableTimes(peakHour.hours.availableTimes)}
            collapsePanelKey={panelHeader}
            submitWorkingHours={handlePeakHoursSubmit}
            submitWorkingHoursMessage={handlePeakHoursMessageSubmit}
            messageObject={peakHour.message}
            domainType={peakHour.domainType}
            isEditable={isEditable && isPeakHourEditable}
            timezone={timezone}
            hasAccessToEditWorkingHours={hasAccessToEditPeakHours}
            hasAccessToEditWorkingHoursMessage={hasAccessToEditPeakHoursMessage}
            mins={PEAK_HOURS_MINS_RANGE}
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
    <Card title={t('warehousePage:PEAK_HOURS')}>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Row gutter={[16]} align="bottom">
          <Col span={24}>
            <SelectWrapper
              selectKey="basePeakHourType"
              label={t('warehousePage:BASE_PEAK_HOUR_TYPE')}
              value={peakHourType}
              optionsData={BASE_PEAK_HOURS}
              labelTranslationCallback={customLabelTranslation('warehousePage:BASE_PEAK_HOURS')}
              onChangeCallback={handleSelectChange}
              disabled={!isFormEditable}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Can permKey={permKey.PAGE_WAREHOUSE_DETAIL_PEAK_HOURS_EDIT_HOURS}>
              <Footer
                formButtonVisibilty={isFormEditable}
                setFormButtonVisibilty={setIsFormEditable}
                handleReset={handleResetForm}
              />
            </Can>
          </Col>
        </Row>
      </Form>
      {renderPeakHoursSelectByDomainTypes()}
    </Card>
  );
}

PeakHours.propTypes = {
  peakHours: PropTypes.array.isRequired,
  basePeakHourType: PropTypes.number,
  updatePeakHours: PropTypes.func.isRequired,
  updatePeakHoursMessage: PropTypes.func.isRequired,
  updateBasePeakHoursType: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired,
};

// TODO: correct these default props
PeakHours.defaultProps = { basePeakHourType: undefined };

export default PeakHours;
