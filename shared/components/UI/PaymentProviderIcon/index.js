import { Typography } from 'antd';

import PaymentMethodIcon from '../PaymentMethodIcon';

import { PAYMENT_PROVIDER_ICON_SOURCES } from './constants';
import useStyles from './styles';
import { paymentProviders } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';

const { Text } = Typography;

const PaymentProviderIcon = ({
  paymentProvider,
  height = 18,
  paymentMethod = '',
  mixed = false,
  fitSize = false, // its using for table cell
}) => {
  const currentLang = getLangKey();
  const classes = useStyles();
  const imageSource = PAYMENT_PROVIDER_ICON_SOURCES[paymentProvider];
  const paymentProviderTitle = paymentProviders[paymentProvider]?.[currentLang];

  const renderPaymentProviderIcon = () => {
    if (mixed) {
      return <Text className="text-capitalize">Mixed</Text>;
    }
    if (imageSource) {
      return (
        <>
          <img
            alt={paymentProvider}
            src={imageSource}
            height={height}
            loading="lazy"
            className={classes.imageSize}
          />
          <Text> {paymentProviderTitle} </Text>
        </>
      );
    }
    return <Text> {paymentProvider} </Text>;
  };

  return (
    <div className="d-flex">
      <div className={fitSize ? classes.providerFitCellSize : classes.providerAutoCellSize}>
        {renderPaymentProviderIcon()}
      </div>
      {!mixed && (
        <div>
          <span className="mr-2 ml-2"> / </span>
          {/* TODO: isIconSmall props might be moved to parent component */}
          <PaymentMethodIcon paymentMethod={paymentMethod} isTextVisible isIconSmall />
        </div>
      )}
    </div>
  );
};

export default PaymentProviderIcon;
