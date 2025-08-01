import { Collapse, Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import useStyles from '../styles';
import {
  amountCurrencyFormat, calculatePrecisedAmount, dateStringWithTimeZone,
  getOrderDetailPagePermissionByMerchant, getOrderDetailUrlByMerchant,
} from '@app/pages/Payment/utils';
import { STATUS_TAG_COLOR_MAP, CUSTOM_DATE_FORMAT } from '@app/pages/Payment/constants';
import { formatUTCDate } from '@shared/utils/dateHelper';
import RedirectText from '@shared/components/UI/RedirectText';

const { Text } = Typography;
const { Panel } = Collapse;

const EventDetail = ({ eventDetail, currency }) => {
  const classes = useStyles();
  const { t } = useTranslation(['global', 'paymentEventPage']);
  const precisedAmount = calculatePrecisedAmount(get(eventDetail, 'amount', 100));
  const precisedBalance = calculatePrecisedAmount(get(eventDetail, 'balance', 100));
  const orderDetailUrl = getOrderDetailUrlByMerchant(eventDetail?.merchantKey);
  const orderDetailPagePerm = getOrderDetailPagePermissionByMerchant(eventDetail?.merchantKey);
  const is3DS = eventDetail?.is3DS;
  const is3DSActive = eventDetail?.is3DSActive;
  const liabilityShift = eventDetail?.adyenData?.liabilityShift;
  const threeDAuthenticated = eventDetail?.adyenData?.threeDAuthenticated;
  const threeDOffered = eventDetail?.adyenData?.threeDOffered;
  const cardBankTxt = eventDetail?.cardBankTxt;
  const posBankTxt = eventDetail?.posBankTxt;

  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel header={t('paymentEventPage:EVENT_DETAIL')} key="1">
        <div className={classes.itemRow}>
          <Text type="secondary">{t('paymentEventPage:EVENT_ID')} </Text>
          <Text data-testid="event-id"> {eventDetail?._id} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary">{t('paymentEventPage:MERCHANT_ORDER_ID')} </Text>
          {
            orderDetailUrl && orderDetailPagePerm ? (
              <RedirectText
                text={eventDetail?.merchantOrderId}
                to={`${orderDetailUrl}${eventDetail?.merchantOrderId}`}
                permKey={orderDetailPagePerm}
                target="_blank"
                isIconVisible
              />
            ) : eventDetail?.merchantOrderId
          }

        </div>
        <div className={classes.itemRow}>
          <Text type="secondary">{t('global:CREATED_AT')} </Text>
          <Text> {dateStringWithTimeZone(formatUTCDate(eventDetail?.createdAt, CUSTOM_DATE_FORMAT), 'UTC')}</Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary">{t('global:UPDATED_AT')} </Text>
          <Text> {dateStringWithTimeZone(formatUTCDate(eventDetail?.updatedAt, CUSTOM_DATE_FORMAT), 'UTC')}</Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary">{t('global:AMOUNT')} </Text>
          <Text> {amountCurrencyFormat(precisedAmount, currency)} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary">{t('paymentEventPage:BALANCE')} </Text>
          <Text> {amountCurrencyFormat(precisedBalance, currency)} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary">{t('global:STATUS')} </Text>
          <Tag
            className={classes.statusTag}
            color={
              STATUS_TAG_COLOR_MAP[eventDetail?.status]
            }
          > {eventDetail?.status}
          </Tag>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary">{t('global:DESCRIPTION')} </Text>
          <Text> {eventDetail?.description} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary">{t('paymentEventPage:ACCOUNT_ID')} </Text>
          <Text> {eventDetail?.accountId} </Text>
        </div>
        {
          cardBankTxt && (
          <div className={classes.itemRow}>
            <Text type="secondary">{t('paymentEventPage:CARD_BANK')} </Text>
            <Text> {cardBankTxt} </Text>
          </div>
          )
        }
        {
          posBankTxt && (
          <div className={classes.itemRow}>
            <Text type="secondary">{t('paymentEventPage:POS_CARD_BANK')} </Text>
            <Text> {posBankTxt} </Text>
          </div>
          )
        }

        {
          is3DSActive && (
          <div className={classes.itemRow}>
            <Text type="secondary"> 3D Secure </Text>
            { is3DS ? <CheckCircleOutlined className="text-success" /> : <CloseCircleOutlined className="text-danger" />}
          </div>
          )
        }
        {
          threeDAuthenticated && (
          <div className={classes.itemRow}>
            <Text type="secondary"> {t('global:PAYMENT_DETAIL_CARD.THREED_AUTHENTICATED')} </Text>
            { threeDAuthenticated ? <CheckCircleOutlined className="text-success" /> : <CloseCircleOutlined className="text-danger" />}
          </div>
          )
        }
        {
          threeDOffered && (
          <div className={classes.itemRow}>
            <Text type="secondary"> {t('global:PAYMENT_DETAIL_CARD.THREED_OFFERED')} </Text>
            { threeDOffered ? <CheckCircleOutlined className="text-success" /> : <CloseCircleOutlined className="text-danger" />}
          </div>
          )
        }
        {
          liabilityShift && (
          <div className={classes.itemRow}>
            <Text type="secondary"> {t('global:PAYMENT_DETAIL_CARD.LIABILITY_SHIFT')} </Text>
            { liabilityShift ? <CheckCircleOutlined className="text-success" /> : <CloseCircleOutlined className="text-danger" />}
          </div>
          )
        }

      </Panel>
    </Collapse>
  );
};

export default EventDetail;

EventDetail.prototype = {
  eventDetail: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    amountOriginal: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    accountId: PropTypes.string.isRequired,
    merchantOrderId: PropTypes.string,
    is3DS: PropTypes.bool,
    is3DSActive: PropTypes.bool,
    adyenData: PropTypes.shape({
      threeDAuthenticated: PropTypes.bool,
      threeDOffered: PropTypes.bool,
      liabilityShift: PropTypes.bool,
    }),
    cardBankTxt: PropTypes.string.isRequired,
    posBankTxt: PropTypes.string.isRequired,
  }),
};

PropTypes.defaultProps = {
  eventDetail: {
    _id: '',
    createdAt: '',
    updatedAt: '',
    amount: '',
    amountOriginal: '',
    balance: '',
    status: '',
    description: '',
    accountId: '',
    merchantOrderId: '',
    is3DS: false,
    adyenData: {
      threeDAuthenticated: false,
      threeDOffered: false,
      liabilityShift: false,
    },
  },

};
