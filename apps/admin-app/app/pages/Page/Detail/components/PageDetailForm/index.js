import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Row, Col, Button, Select, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useTheme } from 'react-jss';
import _ from 'lodash';

import { LinkOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import AntCard from '@shared/components/UI/AntCard';
import { usePermission } from '@shared/hooks';
import { validate } from '@shared/yup';
import { getCountryOptions } from '@shared/utils/formHelper';
import { getSelectFilterOption } from '@shared/utils/common';
import { countriesSelector, getUserOwnedPagesSelector } from '@shared/redux/selectors/common';
import permKey from '@shared/shared/permKey.json';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';

import { Creators } from '../../redux/actions';
import { getPageByIdSelector, updatePageSelector } from '../../redux/selectors';
import { validationSchema, getInitialValues, manipulateValuesAfterSubmit } from './formHelper';
import { getRouteConfigByPermKey } from '@app/pages/Page/utils';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getUser } from '@shared/redux/selectors/auth';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

const PageDetailForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canAccess } = usePermission();
  const page = useSelector(getPageByIdSelector.getData) || {};
  const isUpdatePending = useSelector(updatePageSelector.getIsPending);
  const countries = useSelector(countriesSelector.getData || []);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation(['pagePage', 'global']);
  const [form] = Form.useForm();
  const theme = useTheme();
  const initialValues = getInitialValues(page, countries);
  const hasPermissionToEditPageInfo = canAccess(permKey.PAGE_PAGE_DETAIL_EDIT_PAGE_INFO);
  const userOwnedPages = useSelector(getUserOwnedPagesSelector.getData);
  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      const body = manipulateValuesAfterSubmit(values);
      dispatch(Creators.updatePageRequest({
        id: page._id,
        permKey: page.permKey,
        updateData: body,
        onSuccess: () => setIsFormEditable(false),
      }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    dispatch(CommonCreators.getAllPagesRequest());
    const userId = getUser()._id;
    dispatch(CommonCreators.getUserOwnedPagesRequest({ userId }));
  }, [dispatch]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
    AnalyticsService.track(PANEL_EVENTS.PAGE_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.PAGE_DETAIL.BUTTON.PAGE_INFO_EDIT });
  };

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
                form="page-detail"
                type="primary"
                htmlType="submit"
                loading={isUpdatePending}
              >
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={handleEditClick}>
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  const getPageNavigationButtonVisibilityAndPath = useCallback(() => {
    const pageId = page?.id;
    const selectedPagePermKey = page?.permKey;

    const isTheUserOwnerOfThePage = userOwnedPages.includes(pageId);
    const hasAccessToPageOrComponent = canAccess(selectedPagePermKey);

    const routeConfig = getRouteConfigByPermKey({ permKey: selectedPagePermKey });

    const hasPermissionToViewPage = isTheUserOwnerOfThePage || hasAccessToPageOrComponent;
    const hasPathParam = routeConfig?.path?.includes(':');

    return {
      path: routeConfig?.path,
      isVisible: !hasPathParam && hasPermissionToViewPage,
    };
  }, [page?.id, page?.permKey, userOwnedPages, canAccess]);

  const handlePageNavigation = () => {
    const { path } = getPageNavigationButtonVisibilityAndPath();

    if (!path) {
      return dispatch(ToastCreators.error({ message: t('pagePage:PAGE_CONFIG_NOT_FOUND') }));
    }

    return navigate(path);
  };

  const pageNavigationButton = (
    <Button
      type="text"
      size="small"
      icon={<LinkOutlined />}
      onClick={handlePageNavigation}
    />
  );

  return (
    <AntCard
      title={t('PAGE_INFO')}
      footer={hasPermissionToEditPageInfo ? cardFooter : null}
      extra={getPageNavigationButtonVisibilityAndPath()?.isVisible && pageNavigationButton}
    >
      <Form
        form={form}
        id="page-detail"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col sm={12} xs={24}>
            <Form.Item
              help={_.get(errors, 'name.tr')}
              validateStatus={_.get(errors, 'name.tr') ? 'error' : 'success'}
              name={['name', 'tr']}
              label={t('NAME_1')}
            >
              <Input
                value={values.name.tr}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue('name.tr', value);
                }}
                addonAfter="TR"
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              help={_.get(errors, 'name.en')}
              validateStatus={_.get(errors, 'name.en') ? 'error' : 'success'}
              name={['name', 'en']}
            >
              <Input
                value={values.name.en}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue('name.en', value);
                }}
                addonAfter="EN"
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col sm={12} xs={24}>
            <Form.Item
              help={_.get(errors, 'description.tr')}
              validateStatus={_.get(errors, 'description.tr') ? 'error' : 'success'}
              name={['description', 'tr']}
              label={t('DESCRIPTION')}
            >
              <Input
                value={values.description.tr}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue('description.tr', value);
                }}
                addonAfter="TR"
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              help={_.get(errors, 'description.en')}
              validateStatus={_.get(errors, 'description.en') ? 'error' : 'success'}
              name={['description', 'en']}
            >
              <Input
                value={values.description.en}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue('description.en', value);
                }}
                addonAfter="EN"
                disabled={isUpdatePending || !isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={_.get(errors, 'permKey')}
              validateStatus={_.get(errors, 'permKey') ? 'error' : 'success'}
              name={['permKey']}
              label={t('PERMISSION_KEY')}
            >
              <Input
                value={values.permKey}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue('permKey', value);
                }}
                disabled
                title={isFormEditable ? t('PERMISSION_KEY_DISABLED_TOOLTIP') : undefined}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col sm={3} xs={6}>
            <Form.Item
              help={_.get(errors, 'hasGlobalAccess')}
              validateStatus={_.get(errors, 'hasGlobalAccess') ? 'error' : 'success'}
              name="hasGlobalAccess"
              label={t('GLOBAL_ACCESS')}
            >
              <Checkbox
                autoComplete="off"
                disabled={!isFormEditable}
                checked={values.hasGlobalAccess}
                onChange={event => {
                  const isChecked = _.get(event, 'target.checked', false);
                  setFieldValue('hasGlobalAccess', isChecked);
                  if (isChecked) {
                    setFieldValue('countries', []);
                  }
                }}
              />
            </Form.Item>
          </Col>
          <Col sm={21} xs={18}>
            <Form.Item
              help={_.get(errors, 'countries')}
              validateStatus={_.get(errors, 'countries') ? 'error' : 'success'}
              name="countries"
              label={t('COUNTRIES')}
            >
              <Select
                labelInValue
                mode="multiple"
                showSearch
                value={values.countries}
                options={getCountryOptions(countries, { showOldCountries: true })}
                onChange={_countries => {
                  setFieldValue('countries', _countries);
                }}
                filterOption={getSelectFilterOption}
                autoComplete="off"
                disabled={isUpdatePending || !isFormEditable || values.hasGlobalAccess}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default PageDetailForm;
