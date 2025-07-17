import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { Collapse } from 'antd';

import AntTable from '@shared/components/UI/AntTableV2';
import { Creators } from '../../redux/actions';
import { getirTableOrdersSelector, clientSelector } from '../../redux/selectors';
import { tableColumns } from './config';
import useStyles from './styles';

const { Panel } = Collapse;
const COLLAPSE_KEY_PREFIX = 'CLIENT_DETAIL_GETIR_TABLE_ORDERS_COMPONENT_COLLAPSE_';

const GetirFoodTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('clientDetail');

  const client = useSelector(clientSelector.getClient);
  const getirTableOrders = useSelector(getirTableOrdersSelector.getData);
  const isPending = useSelector(getirTableOrdersSelector.getIsPending);

  const clientId = _.get(client, '_id');
  const columns = tableColumns(t);

  useEffect(() => {
    if (clientId) {
      dispatch(Creators.getClientGetirTableOrdersRequest({ clientId }));
    }
  }, [clientId, dispatch]);

  return (
    <Collapse activeKey={`${COLLAPSE_KEY_PREFIX}`}>
      <Panel
        showArrow={false}
        className={classes.noPanelPadding}
        header={t('GETIR_FOOD_TABLE.TITLE')}
        key={`${COLLAPSE_KEY_PREFIX}`}
      >
        <AntTable
          data={getirTableOrders}
          columns={columns}
          loading={isPending}
        />
      </Panel>
    </Collapse>
  );
};

export default GetirFoodTable;
