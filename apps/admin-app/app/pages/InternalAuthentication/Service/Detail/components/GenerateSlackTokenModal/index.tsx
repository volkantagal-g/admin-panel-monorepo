import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, Modal, Skeleton } from 'antd';
import { useEffect, useState } from 'react';

import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';

import { generateSlackTokenSelector, slackConfigurationSelector } from '../../redux/selectors';

type AddChannelModalProps = {
  slackToken: string | null;
  onClose: () => void;
};

const GenerateSlackTokenModal = ({ slackToken, onClose }: AddChannelModalProps) => {
  const { t } = useTranslation(['internalAuthentication', 'global']);

  const tokenIsPending = useSelector(generateSlackTokenSelector.getIsPending);
  const configIsPending = useSelector(slackConfigurationSelector.getIsPending);
  const isPending = tokenIsPending || configIsPending;

  const [countdown, setCountdown] = useState(10);
  useEffect(() => {
    if (isPending) return () => {};

    const handle = setTimeout(() => {
      if (!countdown) onClose();
      else setCountdown(countdown - 1);
    }, 1000);
    return () => {
      clearTimeout(handle);
    };
  }, [isPending, countdown, onClose]);

  return (
    <Modal
      title={t('TOKEN_DETAILS')}
      visible
      onCancel={onClose}
      closeIcon={<span>{countdown}</span>}
      footer={<Button onClick={onClose}>{t('CLOSE')}</Button>}
    >
      {slackToken ?
        <CopyToClipboard message={slackToken} className="w-100" /> : (
          <Skeleton
            loading={isPending}
            paragraph={{ rows: 1 }}
          />
        )}
    </Modal>
  );
};

export default GenerateSlackTokenModal;
