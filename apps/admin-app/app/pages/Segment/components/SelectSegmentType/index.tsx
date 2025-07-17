import { useTranslation } from 'react-i18next';

import { getSelectFilterOption } from '@shared/utils/common';
import AntSelect from '@shared/components/UI/AntSelect';

const SEGMENT_TYPES = {
  1: 'PROMO',
  2: 'CLIENT',
  3: 'POPUP',
};

const SelectSegmentType = ({ value, mode, onChange, ...otherProps }) => {
  const { t } = useTranslation('segment');

  const domainTypesSelectOptions = Object.entries(SEGMENT_TYPES).map(([key, mapped]) => ({
    value: parseInt(key, 10),
    label: t(`SEGMENT_TYPES.${mapped}`),
  }));

  return (
    <AntSelect
      value={value}
      options={domainTypesSelectOptions}
      mode={mode}
      onChange={onChange}
      className="w-100"
      filterOption={getSelectFilterOption}
      showSearch
      {...otherProps}
    />
  );
};

export default SelectSegmentType;
