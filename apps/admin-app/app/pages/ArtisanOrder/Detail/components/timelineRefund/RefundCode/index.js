import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from 'antd';
import { CopyFilled } from '@ant-design/icons';
import copy from 'copy-to-clipboard';

import useStyles from '@app/pages/ArtisanOrder/Detail/components/timelineRefund/styles';

import Card from '@shared/components/Card';

const { Text } = Typography;

const RefundCode = ({ refundCode }) => {
  const [isCoppied, setIsCoppied] = useState(false);
  const classes = useStyles();
  const { t } = useTranslation('artisanOrderPage');

  useEffect(() => {
    let timeOut;

    if (isCoppied) {
      timeOut = setTimeout(() => setIsCoppied(false), 3000);
    }

    return () => clearTimeout(timeOut);
  }, [isCoppied]);

  const handleCopy = () => {
    copy(refundCode);
    setIsCoppied(true);
  };

  return (
    <Card classNames={classes.refundEventCard}>
      <div>
        <Text type="secondary" className="d-block">
          {t('REFUND_TIMELINE.REFUND_CODE_GENERATED')}
        </Text>
        <Text strong className="d-block">
          {refundCode}
        </Text>
      </div>
      <Button disabled={isCoppied} type="default" size="middle" icon={<CopyFilled />} onClick={handleCopy}>
        {isCoppied ? t('REFUND_TIMELINE.COPPIED') : t('REFUND_TIMELINE.COPY')}
      </Button>
    </Card>
  );
};

export default RefundCode;
