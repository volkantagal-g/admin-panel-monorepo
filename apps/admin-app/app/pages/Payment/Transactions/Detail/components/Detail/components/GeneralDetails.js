import { Collapse, Typography } from 'antd';

import { formatUTCDate } from '@shared/utils/dateHelper';

import useStyles from './styles';
import { dateStringWithTimeZone, getOrderDetailPagePermissionByMerchant, getOrderDetailUrlByMerchant } from '../../../../../utils';
import { CUSTOM_DATE_FORMAT } from '../../../../../constants';
import RedirectText from '@shared/components/UI/RedirectText';

const { Text } = Typography;
const { Panel } = Collapse;

const GeneralDetails = ({ generalDetails, t }) => {
  const classes = useStyles();
  const orderDetailUrl = getOrderDetailUrlByMerchant(generalDetails?.merchantKey);
  const orderDetailPagePerm = getOrderDetailPagePermissionByMerchant(generalDetails?.merchantKey);
  return (
    <Collapse defaultActiveKey={1}>
      <Panel header="General Detail" key="1">
        <div className={classes.itemRow}>
          <Text type="secondary">
            {t('paymentTransactionPage:FILTER.MERCHANT_REFERENCE.TITLE')}{' '}
          </Text>
          <Text> {generalDetails?.merchantReference} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary">{t('paymentTransactionPage:FILTER.MERCHANT_ORDER_ID.TITLE')} </Text>
          {
            orderDetailUrl && orderDetailPagePerm ? (
              <RedirectText
                text={generalDetails?.merchantOrderId}
                to={`${orderDetailUrl}${generalDetails?.merchantOrderId}`}
                permKey={orderDetailPagePerm}
                target="_blank"
                isIconVisible
              />
            ) : generalDetails?.merchantOrderId
          }

        </div>

        <div className={classes.itemRow}>
          <Text type="secondary"> {t('paymentTransactionPage:MODE')} </Text>
          <Text> {generalDetails?.mode} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary"> {t('paymentTransactionPage:LOCATION')} </Text>
          <Text> {generalDetails?.location} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary"> {t('global:CREATED_AT')} </Text>
          <Text> { dateStringWithTimeZone(formatUTCDate(generalDetails?.createdAt, CUSTOM_DATE_FORMAT), 'UTC')} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary"> {t('global:UPDATED_AT')} </Text>
          <Text> {dateStringWithTimeZone(formatUTCDate(generalDetails?.updatedAt, CUSTOM_DATE_FORMAT), 'UTC')}</Text>
        </div>
      </Panel>
    </Collapse>
  );
};
export default GeneralDetails;
