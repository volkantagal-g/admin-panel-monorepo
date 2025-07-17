import { memo, useEffect, useState } from 'react';
import { PageHeader, Col, Row, Button, Switch, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { usePermission, useToggle } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { clientSelector } from '@app/pages/Client/Detail/redux/selectors';
import JsonModal from '@shared/components/UI/JsonModal';
import { Creators } from '../../redux/actions';
import useStyles from './styles';

const Header = ({ setIsAddFeedbackModalVisible }) => {
  const classes = useStyles();
  const client = useSelector(clientSelector.getClient) || {};
  const { isActivated } = client;
  const { t } = useTranslation('clientDetail');
  const dispatch = useDispatch();
  const { Can } = usePermission();
  const [isClientJsonModalVisible, setIsClientJsonModalVisible] = useToggle();
  const [isClientActive, setIsClientActive] = useState();

  useEffect(() => {
    setIsClientActive(isActivated);
  }, [isActivated]);

  const handleSwitchChange = value => {
    setIsClientActive(value);
    dispatch(Creators.updateClientActivenessRequest({
      clientId: client._id,
      isActivated: value,
    }));
  };
  const integrationClient = (client.integrationKey || '').toUpperCase();
  return (
    <Row data-testid="client-detail-page-header">
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          // title={client?.name}
          tags={[
            (integrationClient && (
              <Tag className={classes.tagStatusPrimary}>{integrationClient} {t('CLIENT')}</Tag>
            )),

            <Can key="CLIENT_DETAIL_HEADER_COMPONENT_BUTTON_JSON" permKey={permKey.PAGE_CLIENT_DETAIL_DEBUG_ACTIONS}>
              <Button
                className="mr-2"
                size="small"
                onClick={setIsClientJsonModalVisible}
                disabled={!client}
              >
                JSON
              </Button>
            </Can>,

            <Can
              key="CLIENT_DETAIL_HEADER_COMPONENT_BUTTON_ADD_FEEDBACK"
              permKey={permKey.PAGE_CLIENT_DETAIL_CUSTOMER_SERVICE_AGENT_ACTIONS}
            >
              <Button
                type="primary"
                size="small"
                danger
                onClick={setIsAddFeedbackModalVisible}
              >
                {t('ADD_CLIENT_FEEDBACK')}
              </Button>
            </Can>,
          ]}
          extra={[
            <Can key="CLIENT_DETAIL_HEADER_COMPONENT_SWITCH_ACTIVENESS" permKey={permKey.PAGE_CLIENT_DETAIL_BACK_OFFICE_ACTIONS}>
              <Switch
                className={isClientActive ? 'bg-success' : 'bg-danger'}
                checked={isClientActive}
                checkedChildren={t('ACTIVE')}
                unCheckedChildren={t('INACTIVE')}
                onChange={handleSwitchChange}
              />
            </Can>,
          ]}
        />
      </Col>
      <Can permKey={permKey.PAGE_CLIENT_DETAIL_DEBUG_ACTIONS}>
        <JsonModal
          title={client?.name}
          data={client}
          visible={isClientJsonModalVisible}
          handleCancel={setIsClientJsonModalVisible}
        />
      </Can>
    </Row>
  );
};

export default memo(Header);
