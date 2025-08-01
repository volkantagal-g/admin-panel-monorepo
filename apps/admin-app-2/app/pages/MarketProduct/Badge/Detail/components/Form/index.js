import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Row, Col, Button, Select, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useTheme } from 'react-jss';
import _ from 'lodash';

import { getBadgeSelector, updateBadgeSelector } from '../../redux/selectors';
import {
  validationSchema,
  getInitialValues,
  getModifiedValues,
} from './formHelper';
import AntCard from '@shared/components/UI/AntCard';
import { usePrevious } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import { validate } from '@shared/yup';
import { getDomainTypeOptions } from '@shared/utils/formHelper';
import { getSelectFilterOption } from '@shared/utils/common';
import { getBadgePositionOptions } from '../../../utils';

const BadgeDetailForm = () => {
  const dispatch = useDispatch();
  const badge = useSelector(getBadgeSelector.getData) || {};
  const isUpdatePending = useSelector(updateBadgeSelector.getIsPending);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('marketProductBadgePage');
  const [form] = Form.useForm();
  const theme = useTheme();
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(badge),
    onSubmit: values => {
      dispatch(Creators.updateBadgeRequest({
        id: _.get(badge, '_id'),
        body: getModifiedValues(values),
      }));
    },
  });

  const { handleSubmit, handleChange, values, errors, setFieldValue, setValues } = formik;
  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      setIsFormEditable(false);
    }
  }, [prevIsUpdatePending, isUpdatePending]);

  const handleCancelClick = () => {
    setValues(getInitialValues(badge));
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                size="small"
                onClick={handleCancelClick}
                data-test="cancel-button"
              >
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                size="small"
                form="badge-detail"
                type="primary"
                htmlType="submit"
                loading={isUpdatePending}
                data-test="save-button"
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
              onClick={handleEditClick}
              data-test="edit-button"
            >
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  return (
    <AntCard footer={cardFooter} bordered={false} title={t('BADGE_INFO')}>
      <Form
        form={form}
        id="badge-detail"
        onFinish={handleSubmit}
        layout="vertical"
        data-test="form"
      >
        <Row>
          <Col span={24}>
            <Form.Item
              help={_.get(errors, 'name')}
              validateStatus={_.get(errors, 'name') ? 'error' : 'success'}
              name="name"
              label={t('global:NAME_1')}
            >
              <Input
                value={values.name}
                onChange={handleChange}
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
                data-test="name-input"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={_.get(errors, 'description')}
              validateStatus={_.get(errors, 'description') ? 'error' : 'success'}
              name="description"
              label={t('global:DESCRIPTION')}
            >
              <Input
                value={values.description}
                onChange={handleChange}
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
                data-test="description-input"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={_.get(errors, 'position')}
              validateStatus={_.get(errors, 'position') ? 'error' : 'success'}
              name="position"
              label={t('POSITION')}
            >
              <Select
                value={values.position}
                onChange={position => setFieldValue('position', position)}
                options={getBadgePositionOptions()}
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
                allowClear
                showSearch
                filterOption={getSelectFilterOption}
                data-test="position-select"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={_.get(errors, 'domainTypes')}
              validateStatus={_.get(errors, 'domainTypes') ? 'error' : 'success'}
              name="domainTypes"
              label={t('global:DOMAIN_TYPES')}
            >
              <Select
                labelInValue
                mode="multiple"
                allowClear
                value={values.domainTypes}
                onChange={domainTypes => {
                  setFieldValue('domainTypes', domainTypes);
                }}
                options={getDomainTypeOptions()}
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
                filterOption={getSelectFilterOption}
                data-test="domainTypes-select"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]}>
          <Col id="badge-status">
            {t('STATUS')}
          </Col>
          <Col flex="0 1 100px" align="right">
            <Switch
              checked={values.isActive}
              onChange={value => setFieldValue('isActive', value)}
              checkedChildren={t('global:ACTIVE')}
              unCheckedChildren={t('global:INACTIVE')}
              className={values.isActive ? 'bg-success' : 'bg-danger'}
              disabled={isUpdatePending || !isFormEditable}
              data-test="isActive-switch"
              aria-labelledby="badge-status"
            />
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default BadgeDetailForm;
