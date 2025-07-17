import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Modal, Button, Space, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { useState } from 'react';

import { debounce } from 'lodash';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';

const JsonModal = props => {
  const [isCopied, setIsCopied] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductPage');
  const { title = '', visible, handleCancel, data, ...rest } = props;

  const handleCopyToClipboard = jsonData => {
    navigator.clipboard
      .writeText(jsonData)
      .then(() => {
        setIsCopied(true);
      })
      .catch(error => {
        setIsCopied(false);
        dispatch(ToastCreators.error({ error }));
      })
      .finally(() => {
        debounce(() => {
          setIsCopied(false);
        }, [1000])();
      });
  };
  const jsonData = JSON.stringify(data, null, 2);
  return (
    <Modal
      centered
      title={(
        <Space align="center">
          {title}
          <Tooltip title={t('global:COPY_TO_CLIPBOARD')}>
            <Button
              data-testid="copy button"
              onClick={() => handleCopyToClipboard(jsonData)}
              icon={
                isCopied ? (
                  <CheckOutlined data-testid="check_icon" />
                ) : (
                  <CopyOutlined data-testid="copy_icon" />
                )
              }
            />
          </Tooltip>
        </Space>
      )}
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          {t('button:CANCEL')}
        </Button>,
      ]}
      {...rest}
    >
      <pre>{jsonData}</pre>
    </Modal>
  );
};

export default JsonModal;
