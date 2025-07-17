import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Checkbox, Row, Col, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useTheme } from 'react-jss';
import _ from 'lodash';
import moment from 'moment';

import AntCard from '@shared/components/UI/AntCard';
import { usePermission } from '@shared/hooks';
import { validate } from '@shared/yup';
import permKey from '@shared/shared/permKey.json';
import { getLocalDateTimeFormat } from '@shared/utils/localization';

import { Creators } from '../../redux/actions';
import { indefiniteExpirationSelector, segmentSelector } from '../../redux/selectors';
import { getInitialValues, validationSchema } from './formHelpers';

const { TextArea } = Input;

const IndefiniteExpirationForm = () => {
  const { t } = useTranslation(['segment', 'button']);
  const dispatch = useDispatch();
  const { Can } = usePermission();

  const segment = useSelector(segmentSelector.getData) || {};
  const isSegmentPending = useSelector(segmentSelector.getIsPending);
  const isIndefiniteExpirationPending = useSelector(indefiniteExpirationSelector.getIsPending);

  const [isEditingForm, setIsEditingForm] = useState(false);
  const [form] = Form.useForm();
  const theme = useTheme();

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validate: validate(validationSchema),
    initialValues: getInitialValues(segment),
    onSubmit: values => {
      dispatch(Creators.updateIndefiniteExpirationRequest({
        segment: segment.segment,
        updateData: {
          lifetimeConditions: {
            isEnabled: !!values.lifetimeConditions.isEnabled,
            reasonText: values.lifetimeConditions.reasonText,
          },
        },
      }));

      setIsEditingForm(false);
    },
  });

  const { handleSubmit, values, errors, setFieldValue, resetForm } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const handleCancelClick = () => {
    resetForm();
    setIsEditingForm(false);
  };

  const handleEditClick = () => {
    setIsEditingForm(true);
  };

  return (
    <AntCard
      title={t('segment:INDEFINITE_EXPIRATION_FORM')}
    >
      <Form
        form={form}
        id="segment-detail-indefinite-expiration-form"
        data-testid="segment-detail-indefinite-expiration-form"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col xs={24}>
            <Form.Item
              help={_.get(errors, 'lifetimeConditions.isEnabled')}
              validateStatus={_.get(errors, 'lifetimeConditions.isEnabled') ? 'error' : 'success'}
              name={['lifetimeConditions', 'isEnabled']}
              label={t('segment:IS_INDEFINITE_EXPIRATION_ENABLED')}
            >
              <Checkbox
                checked={values.lifetimeConditions.isEnabled}
                onChange={event => {
                  const value = _.get(event, 'target.checked', false);
                  setFieldValue('lifetimeConditions.isEnabled', value);
                }}
                disabled={isSegmentPending || isIndefiniteExpirationPending || !isEditingForm}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col xs={24}>
            <Form.Item
              help={_.get(errors, 'lifetimeConditions.reasonText')}
              validateStatus={_.get(errors, 'lifetimeConditions.reasonText') ? 'error' : 'success'}
              name={['lifetimeConditions', 'reasonText']}
              label={t('global:REASON')}
            >
              <TextArea
                value={values.lifetimeConditions.reasonText}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue('lifetimeConditions.reasonText', value);
                }}
                disabled={isSegmentPending || isIndefiniteExpirationPending || !isEditingForm}
                autoComplete="off"
                autoSize
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col sm={12} xs={24}>
            <Form.Item
              label={t('global:CREATED_AT')}
            >
              {values.lifetimeConditions.createdAt && <Input disabled value={moment(values.lifetimeConditions.createdAt).format(getLocalDateTimeFormat())} />}
            </Form.Item>
          </Col>
        </Row>
        <Can permKey={permKey.PAGE_SEGMENT_DETAIL_COMPONENT_EDIT_INDEFINITE_EXPIRATION}>
          <Row justify="end" gutter={[theme.spacing(2)]}>
            {isEditingForm ? (
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
                      form="segment-detail-indefinite-expiration-form"
                      type="primary"
                      htmlType="submit"
                      loading={isIndefiniteExpirationPending}
                    >
                      {t('button:SAVE')}
                    </Button>
                  </Form.Item>
                </Col>
              </>
            ) : (
              <Col>
                <Form.Item className="mb-0 mt-0">
                  <Button size="small" onClick={handleEditClick} disabled={isSegmentPending}>
                    {t('button:EDIT')}
                  </Button>
                </Form.Item>
              </Col>
            )}
          </Row>
        </Can>
      </Form>
    </AntCard>
  );
};

export default IndefiniteExpirationForm;
