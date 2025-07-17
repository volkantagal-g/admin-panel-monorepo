import { Modal as ModalAntd } from 'antd';
import PropTypes from 'prop-types';
import { memo } from 'react';

import useStyles from './styles';
import { Button } from '../Button';
import { t } from '@shared/i18n';

const Modal = memo(function Modal({
  children,
  title,
  visible,
  onOk,
  okText,
  onCancel,
  cancelText,
  centered,
  centerTitle,
  width,
  footer,
  okButtonProps,
  ...otherProps
}) {
  const classes = useStyles({ centerTitle });

  const guiFooter = (
    <div>
      <Button
        color="secondary"
        onClick={onCancel}
      >
        {cancelText}
      </Button>
      <Button
        type="primary"
        onClick={onOk}
        {...okButtonProps}
      >
        {okText}
      </Button>
    </div>
  );

  return (
    <ModalAntd
      className={classes.modal}
      {...otherProps}
      title={title}
      visible={visible}
      centered={centered}
      onOk={onOk}
      onCancel={onCancel}
      width={width}
      footer={footer || guiFooter}
    >
      {children}
    </ModalAntd>
  );
});

Modal.useModal = ModalAntd.useModal;

export { Modal };

Modal.propTypes = {
  title: PropTypes.string,
  centerTitle: PropTypes.bool,
  visible: PropTypes.bool,
  centered: PropTypes.bool,
  closable: PropTypes.bool,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  onCancel: PropTypes.func,
  cancelText: PropTypes.string,
  width: PropTypes.number,
  footer: PropTypes.element,
  okButtonProps: PropTypes.shape({}),
};
Modal.defaultProps = {
  title: '',
  centerTitle: true,
  visible: false,
  centered: true,
  closable: true,
  okText: t('button:OK'),
  onOk: undefined,
  cancelText: t('button:CANCEL'),
  onCancel: undefined,
  width: 520,
  footer: undefined,
  okButtonProps: undefined,
};
export default Modal;
