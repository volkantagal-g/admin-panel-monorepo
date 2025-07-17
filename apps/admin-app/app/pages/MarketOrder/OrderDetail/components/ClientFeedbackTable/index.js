import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import {
  clientFeedbackSelector,
  orderDetailSelector,
} from '../../redux/selectors';
import { Creators } from '../../redux/actions';

import { getTableColumns } from './config';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { Collapse } from '@shared/components/GUI';

const ClientFeedback = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation('marketOrderPage');
  const columns = getTableColumns(t);
  const { client } = useSelector(orderDetailSelector.getData);

  const { _id: id } = client?.client || {};
  useEffect(() => {
    if (id) {
      dispatch(Creators.getClientFeedbacksRequest({ clientId: id }));
    }
  }, [id, dispatch]);

  const clientFeedbackList = useSelector(clientFeedbackSelector.getData);
  const count = useSelector(clientFeedbackSelector.getCount);

  return (
    <Collapse
      expandIconPosition="right"
      title={`${t('TIMELINE.CLIENT_FEEDBACKS')} - ${t(
        'global:TOTAL',
      )}: ${count}`}
    >
      <AntTableV2
        size="small"
        data={clientFeedbackList}
        columns={columns}
        loading={false}
      />
    </Collapse>
  );
};

export default ClientFeedback;
