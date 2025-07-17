import { Col } from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import { financeOrderDetailSelector } from '@app/pages/FinanceOrder/detail/redux/selectors';
import TextWithCopy from '../TextWithCopy';
import useStyles from '../styles';

const ClientCard = () => {
  const classes = useStyles();
  const { t } = useTranslation('financeOrderDetailPage');
  const orderDetail = useSelector(financeOrderDetailSelector.getData);

  const clientId = _.get(orderDetail, 'client.client._id', '');
  const clientName = _.get(orderDetail, 'client.client.name', '') || '-';
  const clientGsm = _.get(orderDetail, 'client.client.gsm', '') || '-';

  return (
    <AntCard
      title={t('CARD_INFO.CLIENT.TITLE')}
      className={classes.customerInfo}
      extra={
        (
          clientId && (
          <RedirectButtonV2
            text={t('global:DETAIL')}
            to={`/client/detail/${clientId}`}
            target="_blank"
            size="small"
          />
          )
        )
      }
    >
      <Col className={classes.colInfo}>
        <Col className={classes.colMain}>
          <span className={classes.col1}>{t('CARD_INFO.CLIENT.NAME')}</span>
          <span className={classes.col2}>{clientName}</span>
        </Col>
        <Col className={classes.colMain}>
          <span className={classes.col1}>{t('CARD_INFO.CLIENT.GSM')}</span>
          <span className={classes.col2}><TextWithCopy text={clientGsm} /></span>
        </Col>
      </Col>
    </AntCard>
  );
};

export default ClientCard;
