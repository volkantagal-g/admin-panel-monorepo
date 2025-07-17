/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { get } from 'lodash';

import { Creators } from '@app/pages/GetirFood/OrderDetail/redux/actions';
import { orderDetailSelector, agreementDataSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import useStyles from './styles';

const SalesAgreement = () => {
  const classes = useStyles();
  const { t } = useTranslation('foodOrderPage');
  const dispatch = useDispatch();

  const orderDetail = useSelector(orderDetailSelector.getData);
  const isOrderDetailPending = useSelector(orderDetailSelector.getIsPending);
  const isPending = useSelector(agreementDataSelector.getIsPending);
  const foodOrderId = get(orderDetail, '_id');
  const clientId = get(orderDetail, 'client._id');
  const isButtonDisabled = !!((isOrderDetailPending || isPending));

  const handleSalesAgreementPrint = () => {
    dispatch(Creators.getAgreementDataRequest({ foodOrderId, clientId }));
  };

  return (
    <Button
      key="8"
      onClick={handleSalesAgreementPrint}
      className={classes.buttonStyle}
      disabled={isButtonDisabled}
    >
      {t('ACTION.PRINT_AGREEMENT')}
    </Button>
  );
};

export default SalesAgreement;
