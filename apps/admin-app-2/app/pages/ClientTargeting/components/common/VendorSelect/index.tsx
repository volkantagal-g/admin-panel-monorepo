import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getGwmpVendorsSelector } from '@app/pages/ClientTargeting/redux/selectors';
import MultipleSelect from '../MultipleSelect';

type VendorSelectTypes = {
  activeKey: string;
  value: string[];
}

const VendorSelect = ({ activeKey, value }: VendorSelectTypes) => {
  const { t } = useTranslation('clientTargetingPage');
  const vendors = useSelector(getGwmpVendorsSelector.getData);
  return (
    <MultipleSelect
      activeKey={activeKey}
      value={value}
      label={t('global:VENDOR')}
      clientListKey="vendors"
      selectable={vendors}
      tagKey="id"
      tagValue="vendorName"
      placeholder={t('global:VENDOR')}
      allowClear
      showCSVImporter
    />
  );
};

export default VendorSelect;
