import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Collapse } from 'antd';

import AntTable from '@shared/components/UI/AntTable';
import { usePermission, useToggle } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

import { Creators } from '../../redux/actions';
import { feedbacksSelector } from '../../redux/selectors';
import { tableColumns } from './config';
import { getRowClassName } from './utils';
import useStyles from './styles';
import AddFeedbackModal from '../AddFeedbackModal';
import UpdateFeedbackModal from '../UpdateFeedbackModal';

const { Panel } = Collapse;

const Feedbacks = ({
  client,
  isAddFeedbackModalVisible,
  setIsAddFeedbackModalVisible,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('clientDetail');
  const { Can, canAccess } = usePermission();

  const [isUpdateFeedbackModalVisible, setIsUpdateFeedbackModalVisible] = useToggle();
  const [selectedFeedback, setSelectedFeedback] = useState({});

  const feedbacks = useSelector(feedbacksSelector.getFeedbacks);
  const isPending = useSelector(feedbacksSelector.isPending);

  const hasCSAgentPermission = canAccess(permKey.PAGE_CLIENT_DETAIL_CUSTOMER_SERVICE_AGENT_ACTIONS);

  useEffect(() => {
    if (client._id) {
      dispatch(Creators.getClientFeedbacksRequest({ clientId: client._id }));
    }
  }, [client, dispatch]);

  const toggleUpdateModal = feedback => {
    setSelectedFeedback(feedback);
    setIsUpdateFeedbackModalVisible();
  };

  return (
    <>
      <Collapse expandIconPosition="right">
        <Panel
          className={classes.noPanelPadding}
          header={t('global:FEEDBACKS')}
          extra={(
            <Can permKey={permKey.PAGE_CLIENT_DETAIL_CUSTOMER_SERVICE_AGENT_ACTIONS}>
              <Button
                type="primary"
                size="small"
                danger
                onClick={event => {
                  setIsAddFeedbackModalVisible();
                  event.stopPropagation();
                }}
              >
                {t('ADD_CLIENT_FEEDBACK')}
              </Button>
            </Can>
          )}
        >
          <AntTable
            rowClassName={record => getRowClassName(classes, record)}
            data={feedbacks}
            columns={tableColumns(toggleUpdateModal, hasCSAgentPermission, t)}
            loading={isPending}
          />
        </Panel>
      </Collapse>

      <>
        <AddFeedbackModal
          isModalVisible={isAddFeedbackModalVisible}
          setIsModalVisible={setIsAddFeedbackModalVisible}
          clientId={client._id}
        />
        <UpdateFeedbackModal
          isModalVisible={isUpdateFeedbackModalVisible}
          setIsModalVisible={setIsUpdateFeedbackModalVisible}
          feedback={selectedFeedback}
          clientId={client._id}
        />
      </>
    </>
  );
};

export default Feedbacks;
