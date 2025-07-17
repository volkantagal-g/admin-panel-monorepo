import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Row, Col, Tag, Button, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import Card from '@shared/components/UI/AntCard';
import { InputWrapper } from '@shared/components/UI/Form';
import { Title } from '@app/pages/Person/Request/Detail/components';
import { newCourierTypes, courierServiceDomainTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { COURIER_TYPE } from '@shared/shared/constants';
import { Creators } from '../../redux/actions';

const { useForm } = Form;

function GeneralInfo({ data }) {
  const { t } = useTranslation(['courierPage', 'global']);
  const dispatch = useDispatch();
  const [form] = useForm();
  const { canAccess } = usePermission();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
  });

  const { values } = formik;

  const hasFinanceEmployeeRole = canAccess(permKey.PAGE_COURIER_DETAIL_COMPONENT_GETIR_FINANCE_EMPLOYEE);

  const handleChiefCourier = e => {
    const rank = e?.target?.checked ? 100 : null;
    dispatch(Creators.setChiefCourierRequest({ courierId: data?._id, chiefRank: rank }));
  };

  useEffect(() => {
    if (values.person) {
      form.setFieldsValue({
        ...values,
        ...Object.keys(values.person).reduce((p, c) => {
          // eslint-disable-next-line no-param-reassign
          p[`person.${c}`] = values.person[c];
          return p;
        }, {}),

      });
    }
  }, [values, form]);

  const courierDomainTypes = values.courierType === COURIER_TYPE.GM ? values.domainTypes : values.serviceDomainTypes;
  return (
    <Form form={form} layout="vertical">
      <Card
        title={t('GENERAL_INFORMATION')}
        extra={[
          <Link to={`/person/detail/${values.person?._id}`}>
            <Button key="personDetailButton" size="small">
              {t('PERSON_DETAIL')}
            </Button>
          </Link>,
        ]}
      >
        <Row gutter={[4, 4]} align="bottom">
          <Col span={24}>
            <InputWrapper
              inputKey="name"
              label={t('NAME')}
              value={values.name}
              disabled
            />
          </Col>
          <Col span={24}>
            <InputWrapper
              inputKey="gsm"
              label={t('GSM')}
              value={values.gsm}
              disabled
            />
          </Col>
          {!hasFinanceEmployeeRole && (
            <Col span={24}>
              <InputWrapper
                inputKey="person.username"
                label={t('USERNAME')}
                value={values.person?.username}
                disabled
              />
            </Col>
          )}
          <Col span={24}>
            <Title>{t('TYPE')}:</Title>
            {newCourierTypes[values.courierType]?.[getLangKey()]}
          </Col>
          <Col span={24}>
            <Title>{t('DEVICE_TYPE')}:</Title>
            {values?.deviceType?.replaceAll(';', '/') ?? ''}
          </Col>
          <Col span={24}>
            <Title>{t('BUILD_NUMBER')}:</Title>
            {values?.buildNumber ?? ''}
          </Col>
          <Col span={24}>
            <Title>{t('COURIER_SERVICE_TYPE')}:</Title>
            {courierDomainTypes?.map(domain => (
              <Tag key={`courierServiceType${domain}`} color="success">
                {courierServiceDomainTypes[domain]?.[getLangKey()]}
              </Tag>
            ))}
          </Col>
          <Col span={24}>
            <Title>{t('CREATED_AT')}:</Title>
            {moment(values.createdAt).format(getLocalDateTimeFormat())}
          </Col>
          <Col span={24}>
            <Title>{t('SAFE_RIDING_TRAINING_DATE')}:</Title>
            {values.safeRidingTrainingDate
              ? moment(values.safeRidingTrainingDate).format(getLocalDateTimeFormat())
              : <Tag key="safeRidingTrainingDate" color="red">{t('NOT_DONE')}</Tag>}
          </Col>
          <Col span={24}>
            <Title>{t('SAFE_RIDING_TRAINING_CERTIFICATE')}:</Title>
            {values.safeRidingTrainingCertificate}
          </Col>
          <Col span={24}>
            <Title>{t('CHIEF_COURIER')}:</Title>
            <Checkbox
              checked={!!values.chiefRank}
              onChange={handleChiefCourier}
            />
          </Col>
        </Row>
      </Card>
    </Form>
  );
}

export default GeneralInfo;
