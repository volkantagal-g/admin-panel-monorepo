import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';

import { useSelector } from 'react-redux';

import {
  courierExampleCSV,
  storeAssistantExampleCSV,
  getFormattedCSVTable,
} from './utils';
import { EMPLOYEE_TYPE } from '../../constants';
import { courierPlanTypeSelector } from '../../redux/selectors';

const { Paragraph } = Typography;

const ExampleCSV = ({ employeeType }) => {
  const { t } = useTranslation('courierPlanPublication');
  const courierPlanType = useSelector(courierPlanTypeSelector.getData);
  return (
    <div key="3">
      <Paragraph strong>{t('global:EXAMPLE_CSV')}</Paragraph>
      {getFormattedCSVTable(
        employeeType === EMPLOYEE_TYPE.COURIER
          ? courierExampleCSV[courierPlanType]
          : storeAssistantExampleCSV,
      )}
    </div>
  );
};

export default memo(ExampleCSV);
