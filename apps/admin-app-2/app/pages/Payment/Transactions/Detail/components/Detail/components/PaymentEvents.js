import { Collapse, Tag, Typography } from 'antd';
import get from 'lodash/get';

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { amountCurrencyFormat, calculatePrecisedAmount, dateStringWithTimeZone } from '@app/pages/Payment/utils';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import permKey from '@shared/shared/permKey.json';
import { STATUS_TAG_COLOR_MAP, CUSTOM_DATE_FORMAT, THREE_D_ACTIVE_PROVIDERS } from '@app/pages/Payment/constants';
import useStyles from './styles';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { formatUTCDate } from '@shared/utils/dateHelper';
import PaymentProviderIcon from '@shared/components/UI/PaymentProviderIcon';
import RedirectText from '@shared/components/UI/RedirectText';

const { Text } = Typography;
const { Panel } = Collapse;

const PaymentEvents = ({ paymentEvents, t }) => {
  const classes = useStyles();
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      width: 250,
      render: _id => {
        return (
          <RedirectText
            text={_id}
            to={`/payment/event/detail/${_id}`}
            permKey={permKey.PAGE_PAYMENT_EVENT_DETAIL}
            target="_blank"
            isIconVisible
          />
        );
      },
    },
    {
      title: t('paymentTransactionPage:FILTER.PSP_REFERENCE.TITLE'),
      dataIndex: 'payment',
      key: 'payment',
      width: 250,
      render: event => {
        return <CopyToClipboard message={event?.data?.pspReference} />;
      },
    },
    {
      title: t('paymentTransactionPage:PSP_MERCHANT_ID'),
      dataIndex: 'accountId',
      key: 'accountId',
      width: 250,
    },
    {
      title: t('global:STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 250,
      align: 'center',
      render: status => {
        return (
          <Tag
            className={classes.statusTag}
            color={
              STATUS_TAG_COLOR_MAP[status]
            }
          > {status}
          </Tag>
        );
      },
    },
    {
      title: t('global:AMOUNT'),
      width: 250,
      align: 'center',
      key: 'amount',
      render: event => {
        const precisedAmount = calculatePrecisedAmount(get(event, 'amount', 0));
        return (
          <Text>
            {amountCurrencyFormat(precisedAmount, event.payment.currency)}
          </Text>
        );
      },
    },
    {
      title: t('paymentTransactionPage:BALANCE'),
      width: 250,
      align: 'center',
      key: 'amount',
      render: event => {
        const precisedBalance = calculatePrecisedAmount(get(event, 'balance', 0));
        return (
          <Text>
            {amountCurrencyFormat(precisedBalance, event.payment.currency)}
          </Text>
        );
      },
    },
    {
      title: t('global:CREATED_AT'),
      width: 250,
      align: 'center',
      key: 'creationDate',
      render: event => dateStringWithTimeZone(formatUTCDate(event?.createdAt, CUSTOM_DATE_FORMAT), 'UTC'),

    },
    {
      title: t('global:UPDATED_AT'),
      width: 250,
      key: 'updatedAt',
      align: 'center',
      render: event => dateStringWithTimeZone(formatUTCDate(event?.updatedAt, CUSTOM_DATE_FORMAT), 'UTC'),
    },
    {
      title: t('paymentTransactionPage:TABLE.COLUMNS.PROVIDER_AND_METHOD'),
      key: 'payment',
      width: 250,
      isActive: true,
      align: 'center',
      render: ({ payment }) => {
        return (
          <PaymentProviderIcon
            paymentProvider={payment.provider}
            paymentMethod={payment.method}
            fitSize
          />
        );
      },
      value: t('paymentTransactionPage:TABLE.COLUMNS.PROVIDER_AND_METHOD'),
      label: t('paymentTransactionPage:TABLE.COLUMNS.PROVIDER_AND_METHOD'),
    },
    {
      title: '3D Secure',
      width: 250,
      key: 'is3DS',
      align: 'center',
      render: ({ payment }) => {
        const { provider } = payment;
        if (THREE_D_ACTIVE_PROVIDERS.indexOf(provider) > -1) {
          const { is3DS } = payment.data;
          return is3DS ? <CheckCircleOutlined className="text-success" /> : <CloseCircleOutlined className="text-danger" />;
        }
        return '-';
      },
    },
  ];

  return (
    <Collapse defaultActiveKey={3}>
      <Panel header={t('paymentTransactionPage:PAYMENT_EVENTS')} key="3">
        <div>
          <AntTableV2 data={paymentEvents} columns={columns} />
        </div>
      </Panel>
    </Collapse>
  );
};

export default PaymentEvents;
