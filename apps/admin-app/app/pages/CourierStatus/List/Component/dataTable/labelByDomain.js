import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';

const GetLabelByValueDomain = ({ optionsFunc, value }) => {
  const { t } = useTranslation('courierStatusAndBusy', 'global');
  if (value) {
    const label = [];
    [...value].forEach(val => {
      const options = optionsFunc(t);

      const foundOption = options.find(option => option.value === val);
      const labelValue = foundOption ? foundOption.label : null;
      label.push(<Tag>{labelValue}</Tag>);
    });
    return label;
  }
  return null;
};

export default GetLabelByValueDomain;
