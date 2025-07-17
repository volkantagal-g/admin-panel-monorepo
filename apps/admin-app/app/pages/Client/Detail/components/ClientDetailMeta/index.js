import { memo } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { Button, Collapse, Divider, Row, Col, Image, Spin, Popconfirm } from 'antd';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { Creators } from '../../redux/actions';
import PersonalInformation from '../PersonalInformation';
import MarketTypesInfo from '../MarketTypesInfo';
import useStyles from './styles';

const { Panel } = Collapse;
const COLLAPSE_KEY_PREFIX = 'CLIENT_DETAIL_META_COMPONENT_COLLAPSE_';

const ClientDetailMeta = ({ t, client }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { canAccess, Can } = usePermission();

  const clientId = _.get(client, '_id');

  const clientImgUrl = client.fbId
    ? `http://graph.facebook.com/${client.fbId}/picture?type=large`
    : 'https://via.placeholder.com/66';

  const handleCloseAccountClick = () => {
    dispatch(Creators.closeClientAccountRequest({ clientId }));
  };

  const handleDeleteAccountClick = () => {
    dispatch(Creators.anonymiseClientAccountRequest({ clientId }));
  };

  const handleReopenAccountClick = () => {
    dispatch(Creators.reopenClientAccountRequest({ clientId }));
  };

  const handleUnlinkFacebookClick = () => {
    dispatch(Creators.unlinkFacebookRequest({ clientId }));
  };

  const hasCSAgentPermission = canAccess(permKey.PAGE_CLIENT_DETAIL_CUSTOMER_SERVICE_AGENT_ACTIONS);

  return (
    <Collapse activeKey={`${COLLAPSE_KEY_PREFIX}1`}>
      <Panel showArrow={false} header={t('global:GENERAL_INFO')} key={`${COLLAPSE_KEY_PREFIX}1`}>
        <Spin spinning={!client?._id}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={14}>
              <PersonalInformation client={client} />
            </Col>
            <Col span={6}>
              <MarketTypesInfo client={client} />
            </Col>
            <Col span={4}>
              <Image
                width={66}
                className={classes.borderedImage}
                src={clientImgUrl}
                alt="placeholder"
              />
              {
                client.fbId && hasCSAgentPermission && (
                  <Button
                    className="mt-1"
                    type="primary"
                    size="small"
                    danger
                    onClick={handleUnlinkFacebookClick}
                  >
                    {t('button:REMOVE')}
                  </Button>
                )
              }
            </Col>
            <Divider className="mt-0 mb-3" />
            <Col span={24}>
              {
                client.isClosed ? (
                  !client.isAnonymised && (
                    <>
                      <Can permKey={permKey.PAGE_CLIENT_DETAIL_COMPONENT_CUSTOMER_SERVICE_DELETE_ACTION}>
                        <Popconfirm
                          onConfirm={handleDeleteAccountClick}
                          okText={t('button:YES')}
                          cancelText={t('button:CANCEL')}
                          title={t('clientDetail:CONFIRM_TEXT.DELETE_ACCOUNT')}
                        >
                          <Button
                            className="mr-1"
                            type="primary"
                            size="small"
                            danger
                          >
                            {t('button:DELETE_ACCOUNT')}
                          </Button>
                        </Popconfirm>
                      </Can>
                      <Can permKey={permKey.PAGE_CLIENT_DETAIL_COMPONENT_CUSTOMER_SERVICE_ACCOUNT_ACTIONS}>
                        <Popconfirm
                          onConfirm={handleReopenAccountClick}
                          okText={t('button:YES')}
                          cancelText={t('button:CANCEL')}
                          title={t('clientDetail:CONFIRM_TEXT.REOPEN_ACCOUNT')}
                        >
                          <Button
                            type="primary"
                            size="small"
                          >
                            {t('button:OPEN_ACCOUNT')}
                          </Button>
                        </Popconfirm>
                      </Can>
                    </>
                  )
                ) : (
                  <Can permKey={permKey.PAGE_CLIENT_DETAIL_COMPONENT_CUSTOMER_SERVICE_ACCOUNT_ACTIONS}>
                    <Popconfirm
                      onConfirm={handleCloseAccountClick}
                      okText={t('button:YES')}
                      cancelText={t('button:CANCEL')}
                      title={t('clientDetail:CONFIRM_TEXT.CLOSE_ACCOUNT')}
                    >
                      <Button
                        type="primary"
                        size="small"
                        danger
                      >
                        {t('button:CLOSE_ACCOUNT')}
                      </Button>
                    </Popconfirm>
                  </Can>
                )
              }
            </Col>
          </Row>
        </Spin>
      </Panel>
    </Collapse>
  );
};

export default memo(ClientDetailMeta);
