import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col } from 'antd';
import { get, has } from 'lodash';

import { formatDate } from '@shared/utils/dateHelper';
import Card from '@shared/components/UI/AntCard';
import { availableChangeTypesSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import useStyles from '@app/pages/GetirFood/OrderDetail/components/orderChangeStatusTable/styles';
import AddOrderExchangeStatusModal from '@app/pages/GetirFood/OrderDetail/components/actionsMenu/modals/addOrderExchangeStatusModal/index';

const OrderChangeStatusTable = () => {
  const currentOrderChangeReason = useSelector(availableChangeTypesSelector.getData);
  const classes = useStyles();
  const { t } = useTranslation('foodOrderPage');

  const createdAt = get(currentOrderChangeReason, 'createdAt');
  const createdBy = get(currentOrderChangeReason, 'createdBy.name', '-');
  const changeReason = get(currentOrderChangeReason, 'changeReason', '-');
  const note = get(currentOrderChangeReason, 'note', '-');
  const hasUpdatedAt = has(currentOrderChangeReason, 'updatedAt');
  const updatedAt = get(currentOrderChangeReason, 'updatedAt', '-');
  const hasUpdatedBy = get(currentOrderChangeReason, 'updatedBy.name');
  const updatedBy = get(currentOrderChangeReason, 'updatedBy.name', '-');

  return (
    <Card
      title={t('ORDER_CHANGE_STATUS_TABLE.TITLE')}
      className={classes.customerInfo}
      extra={(
        <div className={classes.detailButton}>
          <AddOrderExchangeStatusModal buttonTitle={t('ORDER_CHANGE_STATUS_TABLE.EDIT')} />
        </div>
      )}
    >
      <Col className={classes.colInfo}>
        <Col className={classes.colMain}>
          <span className={classes.col1}>{t('ORDER_CHANGE_STATUS_TABLE.DATE')}</span>
          <span className={classes.col2}>{formatDate(createdAt)}</span>
        </Col>
        <Col className={classes.colMain}>
          <span className={classes.col1}>{t('ORDER_CHANGE_STATUS_TABLE.OPERATION_USER')}</span>
          <span className={classes.col2}>{createdBy}</span>
        </Col>
        <Col className={classes.colMain}>
          <span className={classes.col1}>{t('ORDER_CHANGE_STATUS_TABLE.REASON')}</span>
          <span className={classes.col2}>{changeReason}</span>
        </Col>
        <Col className={classes.colMain}>
          <span className={classes.col1}>{t('ORDER_CHANGE_STATUS_TABLE.NOTE')}</span>
          <span className={classes.col2}>{note}</span>
        </Col>
        {hasUpdatedAt && (
          <Col className={classes.colMain}>
            <span className={classes.col1}>{t('ORDER_CHANGE_STATUS_TABLE.UPDATE_DATE')}</span>
            <span className={classes.col2}>{formatDate(updatedAt)}</span>
          </Col>
        )}
        {hasUpdatedBy && (
          <Col className={classes.colMain}>
            <span className={classes.col1}>{t('ORDER_CHANGE_STATUS_TABLE.UPDATER_OPERATION_USER')}</span>
            <span className={classes.col2}>{updatedBy}</span>
          </Col>
        )}
      </Col>
    </Card>
  );
};

export default OrderChangeStatusTable;
