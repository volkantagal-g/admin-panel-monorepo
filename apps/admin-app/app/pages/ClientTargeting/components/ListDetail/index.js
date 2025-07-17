import { useTranslation } from 'react-i18next';
import { Row, Col, Typography, Space, Button, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { uniq } from 'lodash';

import { getClientListData, clientListSelector } from '../../redux/selectors';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import CollapsePanel from '../common/CollapsePanel';
import TextInput from '../common/TextInput';
import SingleSelect from '../common/SingleSelect';
import CheckboxSelect from '../common/CheckboxSelect';
import SwitchInput from '../common/SwitchInput';
import useStyles from './styles';
import { Creators } from '../../redux/actions';
import { sortOptions, SEGMENT_IDS } from '../../constants';
import InputNumber from '../common/InputNumber';

const { Text } = Typography;

const ListDetail = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('clientTargetingPage');
  const classes = useStyles();

  const { Can } = usePermission();

  const activeKey = 'general';

  const allData = useSelector(getClientListData());
  const isCreatePending = useSelector(clientListSelector.getIsPending);
  const data = allData[activeKey];
  const isGsmCountryCodeDetailActive = allData?.getir?.gsmCountryCodeDetail?.isEnabled;

  const updateGsmCountryCodeData = () => {
    if (isGsmCountryCodeDetailActive) {
      // Because some countries have same gsm country code, we added country code to dialing code.
      // So we need to remove country code from gsm country code.
      const formattedGsmCountryCodeData = allData?.getir.gsmCountryCodeDetail.params
        .map(gsmCodeList => gsmCodeList?.gsmCountryCode?.map(code => Number(code.split('-')[1])));

      // Remove duplicate gsm country codes.
      const formattedData = {
        ...allData,
        getir: {
          ...allData.getir,
          gsmCountryCodeDetail: {
            ...allData.getir.gsmCountryCodeDetail,
            params: [
              ...allData.getir.gsmCountryCodeDetail.params.map((item, index) => ({
                ...item,
                gsmCountryCode: uniq(formattedGsmCountryCodeData[index]),
              })),
            ],
          },
        },
      };

      return formattedData;
    }
    return allData;
  };

  const handleSaveTemplate = () => {
    const updatedAllData = updateGsmCountryCodeData();
    dispatch(Creators.createClientListTemplateRequest({ data: updatedAllData }));
  };

  const handleCreateClientList = () => {
    const updatedAllData = updateGsmCountryCodeData();
    dispatch(Creators.createClientListRequest({ data: updatedAllData }));
  };

  const handleRemoveSentClick = () => {
    dispatch(Creators.setCollapseTriggeredKey({ activeKey: 'getir.notif' }));
    setTimeout(() => {
      const notifElement = document.getElementById('notifRow');
      // a bit delay so nested collapses have time to to trigger
      notifElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }, 500);
  };

  return (
    <CollapsePanel isParent header={t('LIST_DETAIL')} activeKey={activeKey} defaultActiveKey={activeKey}>
      <Row justify="space-between">
        <Col xs={24} md={16}>
          <TextInput activeKey={activeKey} label={t('LIST_NAME')} value={data.listName} clientListKey="listName" />
          <Space direction="vertical" className={classes.textWrapper}>
            <Text>{t('MAX_CLIENT_COUNT')}</Text>
            <InputNumber activeKey={activeKey} label={t('MAX_CLIENT_COUNT')} value={data.maxClientCount} clientListKey="maxClientCount" />
          </Space>
          <SingleSelect activeKey={activeKey} label={t('SORT')} value={data.sortBy} clientListKey="sortBy" selectable={sortOptions(t)} />
          <Row justify="space-between">
            <Col span={12}>
              <CheckboxSelect
                activeKey={activeKey}
                label={t('REMOVE_DUPLICATE_EMAIL_CLIENTS')}
                value={data.removeDuplicateEmailClients}
                clientListKey="removeDuplicateEmailClients"
              />
              <CheckboxSelect
                activeKey={activeKey}
                label={t('ONLY_REGISTERED_CLIENTS')}
                value={data.isOnlyRegisteredClients}
                clientListKey="isOnlyRegisteredClients"
              />
              <CheckboxSelect
                activeKey={activeKey}
                label={t('ONLY_EMAIL_VERIFIED_CLIENTS')}
                value={data.isOnlyEmailVerifiedClients}
                clientListKey="isOnlyEmailVerifiedClients"
              />
            </Col>
            <Col span={12} className={classes.flexColumn}>
              <Space direction="vertical" className={classes.textWrapper}>
                <Tooltip title={t('REMOVE_SENT_TODAY_TOOLTIP')}>
                  <Button type="primary" onClick={handleRemoveSentClick}>
                    {t('REMOVE_SENT_TODAY_BUTTON')}
                  </Button>
                </Tooltip>
              </Space>
            </Col>
          </Row>

          <Space className={classes.textWrapper}>
            <Text>{t('SELECT_COLUMNS')}</Text>
          </Space>
          <Row justify="space-between">
            <Col span={12}>
              <CheckboxSelect
                activeKey={activeKey}
                label={t('CLIENT_ID_NOTIFICATION')}
                value={data.bringClientId}
                clientListKey="bringClientId"
              />
              <Can permKey={permKey.PAGE_CLIENT_TARGETING_COMPONENT_CLIENT_DETAILS_DISPLAY}>
                <CheckboxSelect activeKey={activeKey} label={t('EMAIL')} value={data.bringEmail} clientListKey="bringEmail" disabled />
                <CheckboxSelect activeKey={activeKey} label={t('GSM_INFO')} value={data.bringGSM} clientListKey="bringGSM" disabled />
              </Can>
              <CheckboxSelect activeKey={activeKey} label={t('IDFA')} value={data.bringIDFA} clientListKey="bringIDFA" />
            </Col>
            <Col span={6}>
              <SwitchInput activeKey={activeKey} label={t('NOTIF_ALLOWED')} value={data.isNotifAllowed} clientListKey="isNotifAllowed" />
              <Can permKey={permKey.PAGE_CLIENT_TARGETING_COMPONENT_CLIENT_DETAILS_DISPLAY}>
                <SwitchInput
                  activeKey={activeKey}
                  label={t('EMAIL_ALLOWED')}
                  value={data.isEmailAllowed}
                  clientListKey={['isEmailAllowed', 'bringEmail']}
                />
                <SwitchInput
                  activeKey={activeKey}
                  label={t('SMS_ALLOWED')}
                  value={data.isSMSAllowed}
                  clientListKey="isSMSAllowed"
                  onChange={isSMSAllowed => {
                    dispatch(Creators.setInput({ activeKey, clientListKey: 'bringGSM', value: isSMSAllowed || data.isPhoneCallAllowed }));
                  }}
                />
                <SwitchInput
                  activeKey={activeKey}
                  label={t('PHONE_CALL_ALLOWED')}
                  value={data.isPhoneCallAllowed}
                  clientListKey="isPhoneCallAllowed"
                  onChange={isPhoneCallAllowed => {
                    dispatch(Creators.setInput({ activeKey, clientListKey: 'bringGSM', value: isPhoneCallAllowed || data.isSMSAllowed }));
                  }}
                />
              </Can>
            </Col>
            <Col span={6}>
              <SingleSelect
                activeKey={activeKey}
                label={t('EXCLUDED_SEGMENTS')}
                value={data.abuseSegmentIds}
                clientListKey="abuseSegmentIds"
                selectable={SEGMENT_IDS(t)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <hr />
      <Row justify="end">
        <Button onClick={handleSaveTemplate} className={classes.buttonWrapper} disabled={isCreatePending}>
          {t('SAVE_TEMPLATE')}
        </Button>
        <Button onClick={handleCreateClientList} type="primary" disabled={isCreatePending}>
          {t('CREATE')}
        </Button>
      </Row>
    </CollapsePanel>
  );
};

export default ListDetail;
