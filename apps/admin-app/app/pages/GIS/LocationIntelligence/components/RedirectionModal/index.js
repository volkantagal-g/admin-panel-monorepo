import { Button, Modal, Row } from 'antd';
import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import Confluence from '@shared/assets/images/logo/confluence.svg';

import useStyles from './styles';

import { getLangKey } from '@shared/i18n';
import { modalData, redirectionUrl } from './modalData';

const RedirectionModal = () => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(true);
  const langKey = getLangKey();
  const { t } = useTranslation();

  const hideModal = () => {
    setIsVisible(false);
  };
  const footerContent = (
    <Row justify="space-between">
      <Button
        icon={<img src={Confluence} alt="confluence" className={classes.directionButton} />}
        key="link"
        href={redirectionUrl}
        target="_blank"
        onClick={hideModal}
      />
      <Button onClick={hideModal}>{t('global:OK')}</Button>
    </Row>
  );

  return (
    <Modal
      data-testid="welcome-modal"
      onCancel={hideModal}
      visible={isVisible}
      footer={footerContent}
      title={modalData[langKey].title}
    >
      <p>{modalData[langKey].description}</p>
    </Modal>
  );
};

export default RedirectionModal;
