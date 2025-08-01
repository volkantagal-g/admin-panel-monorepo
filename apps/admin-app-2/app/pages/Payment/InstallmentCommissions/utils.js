import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

export const getCardTranslatedTypeOptions = t => {
  return (
    [
      {
        label: t('installmentCommissionPage:PERSONAL'),
        value: 'PERSONAL',
      },
      {
        label: t('installmentCommissionPage:BUSINESS'),
        value: 'BUSINESS',
      },
    ]
  );
};

// format for Select component
export const getPosBankOptions = (data, valueLabel = '') => {
  const posBankOptions = data?.map(item => {
    return {
      label: item.posBank,
      value: valueLabel ? item[valueLabel] : JSON.stringify(item),
    };
  });
  return posBankOptions;
};

export const modifiedDataExistModal = ({ t, onOk }) => {
  Modal.confirm({
    title: t('installmentCommissionPage:EXIST_CHANGES_TITLE'),
    icon: <ExclamationCircleOutlined />,
    content: (
      <div>
        <p> {t('installmentCommissionPage:EXIST_CHANGES_DESCRIPTION')} </p>
      </div>
    ),
    onOk() {
      onOk();
    },
    okText: t('global:OK'),
    cancelText: t('global:CANCEL'),
  });
};
