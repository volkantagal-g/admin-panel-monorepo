import { memo } from 'react';
import { Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { clientSelector } from '../../redux/selectors';
import ClientDetailMeta from '../ClientDetailMeta';
import AddressesMap from '../AddressesMap';
import Notes from '../Notes';
import Feedbacks from '../Feedbacks';
import ForbiddenMatches from '../ForbiddenMatches';
import DiscountsTable from '../DiscountsTable';
import useStyles from './styles';
import GetirJobs from '../GetirJobs';

const LeftGridComponent = ({
  isAddFeedbackModalVisible,
  setIsAddFeedbackModalVisible,
}) => {
  const client = useSelector(clientSelector.getClient) || {};
  const { t } = useTranslation('clientDetail');
  const classes = useStyles();
  const { Can } = usePermission();

  const { addressList } = client;

  return (
    <Col lg={12} xs={24} className={classes.wrapper} data-testid="client-detail-left-grid-component">

      <ClientDetailMeta t={t} client={client} />

      <Can permKey={permKey.PAGE_CLIENT_DETAIL_COMPONENT_GETIR_JOBS_DELETE}>
        <GetirJobs />
      </Can>

      <Can permKey={permKey.PAGE_CLIENT_DETAIL_PERSONAL_INFO_DISPLAY}>
        {!_.isEmpty(addressList) &&
          <AddressesMap t={t} client={client} />}
      </Can>

      <Feedbacks
        client={client}
        isAddFeedbackModalVisible={isAddFeedbackModalVisible}
        setIsAddFeedbackModalVisible={setIsAddFeedbackModalVisible}
      />

      <Notes t={t} client={client} />

      <ForbiddenMatches />

      <DiscountsTable client={client} />

    </Col>
  );
};

export default memo(LeftGridComponent);
