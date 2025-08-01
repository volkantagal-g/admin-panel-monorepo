import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import { REGISTRATION_OWNERS } from '@app/pages/Employee/AssetManagement/constants';
import { ISelectRegistrationOwnerProps } from '@app/pages/Employee/AssetManagement/components/Select/RegistrationOwner/types';

const SelectRegistrationOwner: React.FC<ISelectRegistrationOwnerProps> = (props: ISelectRegistrationOwnerProps) => {
  const { t } = useTranslation(['assetManagement']);
  const { className, onChange, placeholder, value, disabled } = props || {};

  const registrationOwnerSelectOptions = convertConstantValuesToTranslatedSelectOptions(
    REGISTRATION_OWNERS,
    { translationBaseKey: 'assetManagement:REGISTRATION_OWNERS', isConvertToInt: true },
  );

  return (
    <Select
      value={value}
      disabled={disabled}
      className={className}
      options={registrationOwnerSelectOptions}
      onChange={onChange}
      placeholder={placeholder}
      showSearch
      optionFilterProp="label"
    />
  );
};

export default SelectRegistrationOwner;
