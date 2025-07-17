import { useTranslation } from 'react-i18next';

const GetLabelByValue = ({ optionsFunc, value }) => {
  const { t } = useTranslation('courierStatusAndBusy', 'global');
  if (value) {
    const options = optionsFunc(t);

    const foundOption = options.find(option => option.value === value);
    return foundOption ? foundOption.label : null;
  }
  return null;
};

export default GetLabelByValue;
