import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { DEFAULT_PAGINATION_VALUES } from '@shared/shared/constants';
import { Creators } from '../../redux/actions';
import { orderListSelector } from '../../redux/selectors';
import Filter from './components/Filter';
import List from './components/List';
import { getOrderListRequestParams } from '../../utils';
import useStyles from './styles';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

const activePanel = 'orders';

const Orders = ({ courierId }) => {
  const { t } = useTranslation('courierPage');
  const dispatch = useDispatch();
  const classes = useStyles();

  const { canAccess } = usePermission();
  const hasFinanceEmployeeRole = canAccess(permKey.PAGE_COURIER_DETAIL_COMPONENT_GETIR_FINANCE_EMPLOYEE);

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION_VALUES);
  const [domainType, setDomainType] = useState(hasFinanceEmployeeRole ? 14 : '3');
  const [isBringButtonClicked, setIsBringButtonClicked] = useState(false);

  const isPendingGetOrderList = useSelector(orderListSelector.getIsPending);

  const getOrderList = () => {
    const requestData = getOrderListRequestParams({
      courierId,
      pagination,
      domainType,
    });
    dispatch(Creators.getOrderListRequest(requestData));
  };

  const refresh = e => {
    e.stopPropagation();
    setIsBringButtonClicked(true);
    getOrderList();
  };

  const handleDomainTypeSelectInputOnChange = domainTypeInner => {
    setIsBringButtonClicked(false);
    setDomainType(domainTypeInner);
    setPagination({ ...pagination, currentPage: 1 });
  };

  return courierId ? (
    <Collapse defaultActiveKey={activePanel} className={classes.panelWrapper}>
      <Collapse.Panel
        key={activePanel}
        header={t('ORDER_HISTORY')}
        extra={(
          <Button key="orderRefreshButton" size="small" disabled={isPendingGetOrderList} onClick={e => refresh(e)}>
            {t('LOAD_DATA')}
          </Button>
        )}
      >
        <Filter
          domainType={domainType}
          handleOnChange={handleDomainTypeSelectInputOnChange}
        />
        <List
          pagination={pagination}
          setPagination={setPagination}
          getOrderList={getOrderList}
          isBringButtonClicked={isBringButtonClicked}
        />
      </Collapse.Panel>
    </Collapse>
  ) : null;
};

export default Orders;
