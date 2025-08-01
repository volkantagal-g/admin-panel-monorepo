import { useCallback, useMemo, useState } from 'react';
import { noop } from 'lodash';

import { Modal } from '@shared/components/GUI';

function useConfirmationModal() {
  const [_message, setMessage] = useState();
  const [_okText, setOkText] = useState();
  const [_cancelText, setCancelText] = useState();
  const [okCallback, setOkCallback] = useState();
  const [cancelCallback, setCancelCallback] = useState();
  const [visible, setVisible] = useState();

  const modal = useMemo(() => {
    return (
      <Modal
        title="Confirm"
        okText={_okText}
        cancelText={_cancelText}
        onOk={okCallback}
        onCancel={cancelCallback}
        visible={visible}
        bodyStyle={{
          textAlign: 'center',
          marginTop: '0.5em',
          fontSize: '14px',
        }}
        centered
      >
        {_message}
      </Modal>
    );
  }, [_message, _okText, _cancelText, okCallback, cancelCallback, visible]);

  const showModal = useCallback(({
    message = 'Are you sure?',
    onOk = noop,
    onCancel = noop,
    okText = 'Yes',
    cancelText = 'Cancel',
  }) => {
    setMessage(message);
    setOkText(okText);
    setCancelText(cancelText);
    setVisible(true);

    setOkCallback(() => () => {
      setVisible(false);
      onOk();
    });

    setCancelCallback(() => () => {
      setVisible(false);
      onCancel();
    });
  }, []);

  return [showModal, modal];
}

export default useConfirmationModal;
