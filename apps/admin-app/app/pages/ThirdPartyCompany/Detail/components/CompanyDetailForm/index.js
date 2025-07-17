import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Button, Form, Select, Input, Typography, Tooltip, Space, Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useTheme } from 'react-jss';
import { get } from 'lodash';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';

import { validate } from '@shared/yup';
import AntCard from '@shared/components/UI/AntCard';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

import {
  validationSchema,
  getInitialValues,
} from '@app/pages/ThirdPartyCompany/Detail/components/CompanyDetailForm/formHelper';
import {
  getThirdPartyCompanyByIdSelector,
  updateThirdPartyCompanyByIdSelector,
} from '@app/pages/ThirdPartyCompany/Detail/redux/selectors';
import { Creators } from '@app/pages/ThirdPartyCompany/Detail/redux/actions';
import { HTTP_VERBS } from '@app/pages/ThirdPartyCompany/constants';
import useStyles from '@app/pages/ThirdPartyCompany/styles';

// constants
const { Text } = Typography;

const CompanyDetailForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { id } = useParams();
  const { t } = useTranslation(['thirdPartyCompany', 'global']);
  const [form] = Form.useForm();
  const theme = useTheme();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { canAccess } = usePermission();

  const isThirdPartyCompanyUpdatePending = useSelector(updateThirdPartyCompanyByIdSelector.getIsPending);
  const thirdPartyCompany = useSelector(getThirdPartyCompanyByIdSelector.getData);
  const isEligibleToEditCompany = canAccess(permKey.PAGE_THIRD_PARTY_COMPANY_DETAIL_COMPONENT_COMPANY_EDIT);

  const verbOptions = Object.values(HTTP_VERBS).map(v => ({ value: v, label: v }));
  const [selectedVerb, setSelectedVerb] = useState(HTTP_VERBS.GET);
  const [route, setRoute] = useState('');

  const formik = useFormik({
    initialValues: getInitialValues(thirdPartyCompany),
    validate: validate(validationSchema),
    onSubmit: values => {
      setIsFormEditable(false);
      const body = { id, ...values };
      dispatch(Creators.updateThirdPartyCompanyByIdRequest({ body }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const handleCancelClick = () => {
    setValues(getInitialValues(thirdPartyCompany));
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleDescription = useCallback(
    event => {
      const value = get(event, 'target.value', '');
      setFieldValue('description', value);
    },
    [setFieldValue],
  );

  const handleName = useCallback(
    event => {
      const value = get(event, 'target.value', '');
      setFieldValue('name', value);
    },
    [setFieldValue],
  );

  const cardExtra = (
    <Tooltip title={t('PAGE.DETAIL.GENERAL_INFO_LAST_UPDATE')}>
      <Space>
        <EditOutlined />
        <Text>{moment(thirdPartyCompany?.updatedAt).format(getLocalDateTimeFormat())}</Text>
      </Space>
    </Tooltip>
  );

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={handleCancelClick}>
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                size="small"
                form="thirdPartyCompanyDetail-edit"
                type="primary"
                htmlType="submit"
                loading={isThirdPartyCompanyUpdatePending}
              >
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button
              size="small"
              disabled={!isEligibleToEditCompany}
              onClick={handleEditClick}
            >
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  const formattedAllowedRoutes = values.allowedRoutes.map(v => ({ value: v, label: v }));
  return (
    <AntCard
      title={t('PAGE.DETAIL.GENERAL_INFO')}
      extra={cardExtra}
      footer={cardFooter}
    >
      <Form
        form={form}
        id="thirdPartyCompanyDetail-edit"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row align="bottom">
          <Col span={24}>
            <Form.Item
              help={get(errors, 'name')}
              validateStatus={get(errors, 'name') ? 'error' : 'success'}
              name={['name']}
              label={t('global:NAME_1')}
            >
              <Input
                value={values.name}
                onChange={handleName}
                disabled={isThirdPartyCompanyUpdatePending || !isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              help={get(errors, 'description')}
              validateStatus={get(errors, 'description') ? 'error' : 'success'}
              name={['description']}
              label={t('global:DESCRIPTION')}
            >
              <Input
                value={values.description}
                onChange={handleDescription}
                disabled={isThirdPartyCompanyUpdatePending || !isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              help={get(errors, 'allowedRoutes')}
              validateStatus={get(errors, 'allowedRoutes') ? 'error' : 'success'}
              name={['allowedRoutes']}
              label={t('PAGE.NEW.ALLOWED_ROUTES')}
            >
              <Select
                disabled={isThirdPartyCompanyUpdatePending || !isFormEditable}
                mode="multiple"
                value={formattedAllowedRoutes}
                onChange={value => setFieldValue('allowedRoutes', value)}
                open={false}
              />
            </Form.Item>
          </Col>
          {isFormEditable && (
          <Col span={24} className={classes.routeOptionColumn}>
            <Select
              disabled={isThirdPartyCompanyUpdatePending}
              className={classes.httpVerbSelect}
              value={selectedVerb}
              options={verbOptions}
              onChange={setSelectedVerb}
            />
            <Input
              disabled={isThirdPartyCompanyUpdatePending}
              className="mr-2 ml-2"
              value={route}
              onChange={event => setRoute(event.target.value)}
            />
            <Button
              size="middle"
              disabled={isThirdPartyCompanyUpdatePending || route.length === 0}
              onClick={() => {
                const routeToAdd = selectedVerb + route;
                if (values.allowedRoutes.indexOf(routeToAdd) === -1) setFieldValue('allowedRoutes', [...values.allowedRoutes, routeToAdd]);
                setRoute('');
              }}
            >{t('ADD_ROUTE')}
            </Button>
          </Col>
          )}
          {isFormEditable && (
          <Col span={24}>
            <br />
            <Alert
              message={(
                <>
                  <span>{t('ROUTE_GUIDANCE.0')}</span>
                  <br />
                  <span>{t('ROUTE_GUIDANCE.1')}</span>
                  <br />
                  <span>{t('ROUTE_GUIDANCE.2')}</span>
                </>
              )}
              type="warning"
            />
          </Col>
          )}
        </Row>
      </Form>
    </AntCard>
  );
};

export default CompanyDetailForm;
