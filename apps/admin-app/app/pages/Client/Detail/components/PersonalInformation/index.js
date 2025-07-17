import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Avatar, Button, Form, Input, Tag, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { usePermission, useToggle } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { DEFAULT_TIME_FORMAT } from '@shared/shared/constants';
import {
  paymentTypesPropMap,
  PROMO_ABUSER_CLIENT_SEGMENT_COLORS,
  PROMO_ABUSER_CLIENT_SEGMENT_SET,
  // PROMO_ABUSER_CLIENT_SEGMENTS_TO_KEYS,
  MARKETING_COMMUNICATIONS_PREFERENCES_SOURCE,
} from '@app/pages/Client/Detail/constants';
import { getMaskedName, getMaskedPhoneNumber } from '@shared/utils/common';
import { Creators } from '../../redux/actions';
import { segmentsOfClientSelector, commPrefSelector } from '../../redux/selectors';
import useStyles from './styles';
import { marketingCommType, marketingCommLoadingType } from './utils';
import { FormItemWithSwitch } from './FormItemWithSwitch';

const formItemLayout = { labelCol: { span: 8 } };

const text = {
  en: `
Dear Customer,
The listed campaigns are organized on the basis of instant, regional, personalized, product or payment option.
Each Getir account, each device, credit card, and payment account can benefit from the single-use campaigns only once.
You can see the promotions by clicking the gift pack icon at the bottom right.
`,
  tr: `
Sayın Müşterimiz,
Listelenen kampanyalar; anlık, bölgesel, kişiye özel, ürün ya da ödeme seçeneği bazlı düzenlenmektedir.
Her Getir hesabı, her cihaz, kredi kartı ve ödeme hesabı, tek kullanımlık kampanyalardan 1 kez yararlanabilir.
Faydalanabileceğiniz promosyonları, sağ alttaki hediye paketi ikonuna tıklayarak görebilirsiniz.
`,
};

const TipIcon = ({ langKey }) => (
  <Tooltip placement="topRight" title={text[langKey]}>
    <InfoCircleOutlined />
  </Tooltip>
);

const PersonalInformation = ({ client }) => {
  const { t } = useTranslation('clientDetail');
  const dispatch = useDispatch();
  const classes = useStyles();
  const langKey = getLangKey();
  const segmentsOfClient = useSelector(segmentsOfClientSelector.segments) || [];
  const commPrefLoading = useSelector(commPrefSelector.comPref) || [];
  const isCommPrefPending = useSelector(commPrefSelector.isPending);
  // const isSegmentsOfClientPending = useSelector(segmentsOfClientSelector.isPending) || false;

  const [marketingCommunicationsLoading, setmarketingCommunicationsLoading] = useState({
    email: false,
    sms: false,
    phone: false,
    ntf: false,
  });

  const { canAccess } = usePermission();
  const {
    _id,
    contactNumber,
    countryCode,
    signedupAt,
    email,
    gsm,
    name,
    payment = {},
    // fraudScore = '-',
  } = client;
  const paymentTypes = Object.keys(payment);
  const [form] = Form.useForm();

  const hasPermission = canAccess(permKey.PAGE_CLIENT_DETAIL_PERSONAL_INFO_DISPLAY);
  const hasCSAgentPermission = canAccess(permKey.PAGE_CLIENT_DETAIL_CUSTOMER_SERVICE_AGENT_ACTIONS);

  const displayName = hasPermission ? name : getMaskedName(name);
  const displayGsm = hasPermission ? gsm : getMaskedPhoneNumber(gsm);

  const [isContactNumberEditable, setIsContactNumberEditable] = useToggle();

  useEffect(() => {
    form.setFieldsValue(client);
  }, [form, client]);
  useEffect(() => {
    if (client && client._id && !client.integrationKey) {
      if (hasCSAgentPermission) {
        dispatch(Creators.getClientMarketingCommunicationPreferencesRequest({ clientId: client._id }));
      }
    }
  }, [hasCSAgentPermission, dispatch, client]);
  const handleMarketingCommunications = (commType, val) => {
    setmarketingCommunicationsLoading({ ...marketingCommunicationsLoading, [commType]: true });

    const type = marketingCommType[commType];
    const loadingType = marketingCommLoadingType[commType];

    dispatch(Creators.updateClientMarketingCommunicationPreferencesRequest(
      {
        data: {
          clientId: _id,
          [type]: val,
          source: MARKETING_COMMUNICATIONS_PREFERENCES_SOURCE,
        },
        loading: loadingType,
      },
    ));
  };

  const handleSubmit = values => {
    const { contactNumber: cn } = values;

    dispatch(Creators.updateContactNumberRequest({
      clientId: _id,
      contactNumber: cn,
    }));
    setIsContactNumberEditable();
  };

  const getUpdateContactNumberAddon = () => {
    if (!hasCSAgentPermission) return null;

    return (
      !isContactNumberEditable ? (
        <Button
          size="small"
          type="text"
          onClick={() => setIsContactNumberEditable()}
        >
          <EditOutlined />
        </Button>
      ) : (
        <>
          <Button
            className="mr-1"
            size="small"
            type="primary"
            danger
            onClick={() => {
              form.setFieldsValue({ contactNumber: client?.contactNumber });
              setIsContactNumberEditable();
            }}
          >
            <CloseOutlined />
          </Button>
          <Button
            size="small"
            type="primary"
            form="validate-other"
            htmlType="submit"
          >
            <CheckOutlined />
          </Button>
        </>
      )
    );
  };

  const getFraudSegmentsRendered = segments => (
    segments
      .filter(clientSegment => PROMO_ABUSER_CLIENT_SEGMENT_SET.has(clientSegment))
      .map(fraudSegment => (
        <Avatar
          size={20}
          style={{ backgroundColor: PROMO_ABUSER_CLIENT_SEGMENT_COLORS[fraudSegment] }}
          key={`key_client_fraud_segment_${fraudSegment}`}
        />
      ))
  );

  return (
    <Form
      data-testid="personal-information-form"
      className={classes.noFieldMargin}
      form={form}
      id="validate-other"
      onFinish={handleSubmit}
      {...formItemLayout}
      initialValues={{}}
    >
      <Form.Item label={t('CLIENT_META.SIGNUP_DATE')}>
        <span className="ant-form-text">{moment(signedupAt).format(DEFAULT_TIME_FORMAT)}</span>
      </Form.Item>
      <Form.Item label={t('global:NAME')}>
        <span className="ant-form-text">{displayName}</span>
      </Form.Item>
      <Form.Item label={t('global:EMAIL')}>
        <span className="ant-form-text">{email}</span>
      </Form.Item>
      <Form.Item label={t('CLIENT_META.GSM')}>
        <span className="ant-form-text">{`+${countryCode} ${displayGsm}`}</span>
      </Form.Item>
      <Form.Item
        label={t('CLIENT_META.CONTACT')}
        name="contactNumber"
      >
        <Input
          placeholder="Contact"
          value={contactNumber}
          addonAfter={getUpdateContactNumberAddon()}
          disabled={!isContactNumberEditable}
          maxLength={100}
        />
      </Form.Item>
      <Form.Item label={t('CLIENT_META.PAYMENT')}>
        <span className="ant-form-text">
          {paymentTypes?.map(type => {
            const propMap = paymentTypesPropMap[type] || paymentTypesPropMap.na;
            return (
              <Tag key={type} color={propMap.color}>
                {propMap.label}
              </Tag>
            );
          })}
        </span>
      </Form.Item>
      {/* <Form.Item
        label={t('CLIENT_META.FRAUD_SCORE')}
      >
        <span className="ant-form-text">&nbsp;{fraudScore}</span>
      </Form.Item> */}
      <Form.Item
        label={(
          <>
            {t('CLIENT_META.FRAUD_SEGMENT')}<TipIcon langKey={langKey} />
          </>
        )}
      >
        {getFraudSegmentsRendered(segmentsOfClient)}
      </Form.Item>
      { hasCSAgentPermission && (
        <>
          <FormItemWithSwitch
            attributeKey="isEmailAllowed"
            isCommPrefPending={isCommPrefPending}
            commPrefData={commPrefLoading.data}
            name="email"
            loading={commPrefLoading.emailLoading}
            handleMarketingCommunications={handleMarketingCommunications}
          />
          <FormItemWithSwitch
            attributeKey="isSMSAllowed"
            isCommPrefPending={isCommPrefPending}
            commPrefData={commPrefLoading.data}
            name="sms"
            loading={commPrefLoading.smsLoading}
            handleMarketingCommunications={handleMarketingCommunications}
          />
          <FormItemWithSwitch
            attributeKey="isPhoneCallAllowed"
            isCommPrefPending={isCommPrefPending}
            commPrefData={commPrefLoading.data}
            name="phone"
            loading={commPrefLoading.phoneLoading}
            handleMarketingCommunications={handleMarketingCommunications}
          />
          <FormItemWithSwitch
            attributeKey="sendNtf"
            isCommPrefPending={isCommPrefPending}
            commPrefData={commPrefLoading.data}
            name="ntf"
            loading={commPrefLoading.ntfLoading}
            handleMarketingCommunications={handleMarketingCommunications}
          />
        </>
      )}

    </Form>
  );
};

export default memo(PersonalInformation);
