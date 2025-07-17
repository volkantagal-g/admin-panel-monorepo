/**
 * @typedef {{ date: Date, phoneNumber: Number, dialingStatus: Number, callStatus: Number }[]} IvrActionList
 */
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import AntTable from '@shared/components/UI/AntTable';
import Card from '@shared/components/UI/AntCard';

import { orderDetailSelector } from '../../redux/selectors';

import { tableColumns } from './config';

const IvrActionList = () => {
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const { t } = useTranslation('waterOrderPage');

  /** @type { IvrActionList } */ const ivrActionList = _.get(orderDetail, 'ivrActionList', []);

  return (
    <Card>
      <AntTable title={t('IVR_ACTION.TITLE')} data={ivrActionList} columns={tableColumns(t)} loading={isPending} />
    </Card>
  );
};

export default IvrActionList;
