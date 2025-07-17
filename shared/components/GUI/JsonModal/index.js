import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { useDispatch } from 'react-redux';

import { Space, Tooltip } from 'antd';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';

import { Modal } from '@shared/components/GUI/Modal';
import { Button } from '@shared/components/GUI/Button';
import { t } from '@shared/i18n';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export const JsonModal = memo(function JsonModal({ title = '', visible, handleCancel, data, allowCopyToClipboard = false }) {
  const [isCopied, setIsCopied] = useState(false);
  const dispatch = useDispatch();
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
          {allowCopyToClipboard && (
          <Tooltip title={t('global:COPY_TO_CLIPBOARD')}>
            {
              isCopied ? (
                <CheckOutlined data-testid="check_icon" />
              ) : (
                <CopyOutlined onClick={() => handleCopyToClipboard(jsonData)} />
              )
            }
          </Tooltip>
          )}
        </Space>
      )}
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button
          color="secondary"
          key="back"
          onClick={handleCancel}
        >
          {t('button:CANCEL')}
        </Button>,
      ]}
    >
      <pre>{jsonData}</pre>
    </Modal>
  );
});

JsonModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  allowCopyToClipboard: PropTypes.bool,
  handleCancel: PropTypes.func,
  data: PropTypes.shape({}),
};

JsonModal.defaultProps = {
  title: undefined,
  visible: false,
  allowCopyToClipboard: false,
  handleCancel: () => {},
  data: {},
};
