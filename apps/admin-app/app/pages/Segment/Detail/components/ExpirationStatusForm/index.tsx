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
import { expirationStatusSelector, segmentSelector } from '../../redux/selectors';
import { getInitialValues, validationSchema } from './formHelpers';

const ExpirationStatusForm = () => {
  const { t } = useTranslation(['segment', 'button']);
  const dispatch = useDispatch();
  const { Can } = usePermission();

  const segment = useSelector(segmentSelector.getData) || {};
  const isSegmentPending = useSelector(segmentSelector.getIsPending);
  const isExpirationStatusUpdatePending = useSelector(expirationStatusSelector.getIsPending);

  const [isEditingForm, setIsEditingForm] = useState(false);
  const [form] = Form.useForm();
  const theme = useTheme();

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validate: validate(validationSchema),
    initialValues: getInitialValues(segment),
    onSubmit: values => {
      dispatch(Creators.updateExpirationStatusRequest({
        segment: segment.segment,
        updateData: { expiration: { isExpired: !!values.expiration.isExpired } },
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
      title={t('segment:EXPIRATION_STATUS_FORM')}
    >
      <Form
        form={form}
        id="segment-detail-expiration-status-form"
        data-testid="segment-detail-expiration-status-form"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col xs={24}>
            <Form.Item
              help={_.get(errors, 'expiration.isExpired')}
              validateStatus={_.get(errors, 'expiration.isExpired') ? 'error' : 'success'}
              name={['expiration', 'isExpired']}
              label={t('segment:IS_EXPIRED')}
            >
              <Checkbox
                checked={values.expiration.isExpired}
                onChange={event => {
                  const value = _.get(event, 'target.checked', false);
                  setFieldValue('expiration.isExpired', value);
                }}
                disabled={!!(isSegmentPending || isExpirationStatusUpdatePending || !isEditingForm)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col sm={12} xs={24}>
            <Form.Item
              label={t('segment:EXPIRED_AT')}
            >
              {values.expiration.isExpired && <Input disabled value={moment(values.expiration.expiredAt).format(getLocalDateTimeFormat())} />}
            </Form.Item>
          </Col>
        </Row>
        <Can permKey={permKey.PAGE_SEGMENT_DETAIL_COMPONENT_EDIT_EXPIRATION_STATUS}>
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
                      form="segment-detail-expiration-status-form"
                      type="primary"
                      htmlType="submit"
                      loading={isExpirationStatusUpdatePending}
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

export default ExpirationStatusForm;
