import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Tabs, Typography, Divider } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { get, isFinite } from 'lodash';

import { DEFAULT_AMOUNT, THREE_D_ACTIVE_PROVIDERS, NON_PROVISION_CARDS_MULTIPLY_AMOUNT } from '@app/pages/Payment/constants';
import { topupBankCards } from '@shared/shared/constantValues';
import RedirectText from '@shared/components/UI/RedirectText';
import { amountCurrencyFormat, calculatePrecisedAmount } from '@app/pages/Payment/utils';
import { EventType } from '@app/pages/Payment/Transactions/Detail/components/RefundModal';
import permKeys from '@shared/shared/permKey.json';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import PaymentProviderIcon from '@shared/components/UI/PaymentProviderIcon';

import useStyles from './styles';

import DetailTab from './DetailTab';

import { IPaymentDetailTabItemElement, IProvisionItems, IProvisionType, ITabItem, ITransaction } from './index';

const { Title, Text } = Typography;

interface ITransactionTabProps {
    transaction: ITransaction,
    provision?: IProvisionType,
    paymentAmount?: number,
    totalChargedAmount?: number,
    alwaysShowAllEvents?: boolean,
}

const TransactionsTab = ({ transaction, provision, paymentAmount, totalChargedAmount, alwaysShowAllEvents = false }: ITransactionTabProps) => {
  const classes = useStyles();
  const transactionEvents = get(transaction.data, 'events', []) as EventType[];
  const selectedLanguage = useSelector(getSelectedLanguage);
  const { t } = useTranslation('global');
  const currency = transaction.data?.financialSummary?.currency;
  const isMixed = get(transaction.data, 'mixed', false);

  const provisionChargeAmountCurrencyFormat = amountCurrencyFormat(provision?.chargeAmount || 0, currency);
  const paymentAmountCurrencyFormat = amountCurrencyFormat(paymentAmount || 0, currency);
  const refundAmount = (provision &&
        !!paymentAmount &&
        isFinite(provision?.chargeAmount) &&
        isFinite(paymentAmount)) &&
        provision.chargeAmount - paymentAmount;
  const refundAmountCurrencyFormat = isFinite(refundAmount) && amountCurrencyFormat(refundAmount, currency);
  const totalChargedAmountCurrencyFormat = (totalChargedAmount &&
        provision?.chargeAmount &&
        isFinite(totalChargedAmount) &&
        isFinite(provision?.chargeAmount)) ?
    amountCurrencyFormat(provision.chargeAmount / NON_PROVISION_CARDS_MULTIPLY_AMOUNT, currency) : undefined;

  function prepareRowsData(eventDetail: EventType) {
    const payment = get(eventDetail, 'payment', '');
    const paymentProvider = get(payment, 'provider', '');
    const paymentMethod = get(payment, 'method', '');

    const cardNo = get(payment, 'data.cardData.cardNo', '');
    const cardBankName: number = get(payment, 'data.cardData.bankIca', 0);
    const posBankName: number = get(payment, 'data.processedPosBank', 0);
    const liabilityShift = get(payment, 'data.liabilityShift', false);
    const threeDAuthenticated = get(payment, 'data.threeDAuthenticated', false);
    const threeDOffered = get(payment, 'data.threeDOffered', false);
    const location = transaction.data?.location;
    const precisedAmount = calculatePrecisedAmount(get(eventDetail, 'amount', DEFAULT_AMOUNT));
    const eventId = get(eventDetail, '_id', '');
    const amount = amountCurrencyFormat(precisedAmount, currency);

    const cardBankTxt = get(topupBankCards[cardBankName as keyof typeof topupBankCards], selectedLanguage, '');
    const posBankTxt = get(topupBankCards[posBankName as keyof typeof topupBankCards], selectedLanguage, '');
    const isTR = location === 'TR';

    const rowsData: IPaymentDetailTabItemElement[] = [
      {
        title: 'ID',
        component: <RedirectText
          text={eventId}
          to={`/payment/event/detail/${eventId}`}
          permKey={permKeys.PAGE_PAYMENT_EVENT_DETAIL}
          target="_blank"
          isIconVisible
        />,
      },
      {
        title: t('global:PAYMENT_DETAIL_CARD.PAYMENT_PROVIDER_AND_METHOD'),
        component: <PaymentProviderIcon
          paymentProvider={paymentProvider}
          paymentMethod={paymentMethod}
          mixed={get(payment, 'mixed', false)}
        />,
      },
      {
        title: t('global:PAYMENT_DETAIL_CARD.AMOUNT'),
        component: <Text> {amount} </Text>,
      },
    ];

    if (isTR) {
      rowsData.push(
        {
          title: t('global:PAYMENT_DETAIL_CARD.CARD_NO'),
          component: <Text> {cardNo} </Text>,
        },
        {
          title: t('global:PAYMENT_DETAIL_CARD.CARD_BANK'),
          component: <Text> {cardBankTxt} </Text>,
        },
        {
          title: t('global:PAYMENT_DETAIL_CARD.POS_CARD_BANK'),
          component: <Text> {posBankTxt} </Text>,
        },
      );
      if (THREE_D_ACTIVE_PROVIDERS.indexOf(paymentProvider) > -1) {
        const is3DS = get(payment, 'data.is3DS', '');
        rowsData.push({
          title: t('global:PAYMENT_DETAIL_CARD.IS_3DS'),
          component: is3DS ? <CheckCircleOutlined className="text-success" /> : <CloseCircleOutlined className="text-danger" />,
        });
      }
    }
    else {
      rowsData.push(
        {
          title: t('global:PAYMENT_DETAIL_CARD.LIABILITY_SHIFT'),
          component:
            liabilityShift ? (
              <CheckCircleOutlined className="text-success" />
            ) : (
              <CloseCircleOutlined className="text-danger" />
            ),
        },
        {
          title: t('global:PAYMENT_DETAIL_CARD.THREED_AUTHENTICATED'),
          component: threeDAuthenticated ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          ),
        },
        {
          title: t('global:PAYMENT_DETAIL_CARD.THREED_OFFERED'),
          component: threeDOffered ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          ),
        },
      );
    }

    return rowsData;
  }

  const eventTabs: ITabItem[] = [];

  transactionEvents.map((transactionEvent, index) => eventTabs.push({
    key: index.toString(),
    label: `${t('global:PAYMENT_DETAIL_CARD.EVENT')} ${index + 1}`,
    children: <DetailTab rowsData={prepareRowsData(transactionEvent)} />,
  }));

  const provisionRowsData: IProvisionItems[] = [];

  if (provision) {
    provisionRowsData.push(
      ...((provision.isProvisionSupportedByBank ? provisionChargeAmountCurrencyFormat : totalChargedAmountCurrencyFormat) ?
        [{
          key: t('global:PAYMENT_DETAIL_CARD.CALCULATED_AMOUNT'),
          label: t('global:PAYMENT_DETAIL_CARD.CALCULATED_AMOUNT'),
          value: provision.isProvisionSupportedByBank ? provisionChargeAmountCurrencyFormat : totalChargedAmountCurrencyFormat,
        }] : []
      ),
      ...(provisionChargeAmountCurrencyFormat ? [{
        key: t('global:PAYMENT_DETAIL_CARD.PREPAYMENT_AMOUNT'),
        label: t('global:PAYMENT_DETAIL_CARD.PREPAYMENT_AMOUNT'),
        value: provisionChargeAmountCurrencyFormat,
      }] : []),
      ...(paymentAmountCurrencyFormat ? [{
        key: t('global:PAYMENT_DETAIL_CARD.AMOUNT_AFTER_PICKING'),
        label: t('global:PAYMENT_DETAIL_CARD.AMOUNT_AFTER_PICKING'),
        value: paymentAmountCurrencyFormat,
      }] : []),
    );

    if (!provision.isProvisionSupportedByBank && !!refundAmountCurrencyFormat) {
      provisionRowsData.push(
        {
          key: t('global:PAYMENT_DETAIL_CARD.REFUND_AMOUNT'),
          label: t('global:PAYMENT_DETAIL_CARD.REFUND_AMOUNT'),
          value: refundAmountCurrencyFormat,
        },
      );
    }
  }

  return (
    <>
      <Tabs defaultActiveKey="0" tabBarStyle={{ display: (alwaysShowAllEvents || isMixed) ? 'block' : 'none' }}>
        {
          eventTabs.map(item => {
            return (
              <Tabs.TabPane tab={item.label} key={item.key}>
                {item.children}
              </Tabs.TabPane>
            );
          })
        }
      </Tabs>
      {provisionRowsData.length > 0 && (
        <>
          <Title level={5} style={{ marginTop: '18px', fontWeight: 500 }}>{t('global:PAYMENT_DETAIL_CARD.PROVISION')}</Title>
          <Divider style={{ marginTop: '12px' }} />
          <div className={classes.provisionInfoWrapper}>
            {
              provisionRowsData.map(item => {
                return (
                  <div key={item.key} className={classes.provisionInfoLabel}>
                    <strong>{item.label}</strong>
                    <p>{item.value}</p>
                  </div>
                );
              })
            }
          </div>
        </>
      )}
    </>
  );
};

export default TransactionsTab;
