import { Tooltip, Typography } from 'antd';

import { getLangKey } from '@shared/i18n';
import { paymentMethods } from '@shared/shared/constantValues';
import { PAYMENT_METHOD_ICON_SOURCES } from './constants';
import useStyles from './styles';

const { Text } = Typography;

const PaymentMethodIcon = ({ paymentMethod, height = 18, isTextVisible = false, isIconSmall = false, showTooltip = false }) => {
  const currentLang = getLangKey();
  const style = useStyles();

  const imageSources = PAYMENT_METHOD_ICON_SOURCES(isIconSmall);
  const selectedImageSource = imageSources[paymentMethod];
  const paymentMethodTitle = paymentMethods[paymentMethod]?.[currentLang];

  const renderPaymentIcon = () => {
    if (selectedImageSource) {
      return (
        <>
          <Tooltip title={showTooltip ? paymentMethodTitle : undefined}>
            <img
              alt={paymentMethodTitle || paymentMethod}
              src={selectedImageSource}
              height={height}
              loading="lazy"
              className={style.imageSize}
            />
          </Tooltip>
          {!showTooltip && <Text> {paymentMethodTitle} </Text>}
        </>
      );
    } if (isTextVisible) {
      return <Text> {paymentMethodTitle} </Text>;
    }
    return null;
  };

  return renderPaymentIcon();
};

export default PaymentMethodIcon;
