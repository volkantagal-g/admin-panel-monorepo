import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { Button, Col, Collapse, Dropdown, Form, Row, Tooltip } from 'antd';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { updatePromoHTMLSelector } from '@app/pages/Promo/Detail/redux/selectors';
import {
  fetchPromoUrlsHTML,
  getInitialValues,
  getPromoURLsMenu,
  validateEmptyPromoHTML,
  validatePromoHTMLHasChanged,
} from './formHelper';
import { Creators } from '../../redux/actions';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import MultiLanguageTextEditor from '@shared/components/UI/MultiLanguage/TextEditor';
import { ERROR_TIMEOUT_MS, UPDATE_SIGNED_URL_PARAMS } from '@app/pages/Promo/constantValues';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';

const { Panel } = Collapse;

const PromoUrlForm = () => {
  const dispatch = useDispatch();
  const promo = useSelector(PromoDetailSlice.selectors.promo);
  const isUpdatePromoHTMLPending = useSelector(updatePromoHTMLSelector.getIsPending);

  const [promoHTMLEditable, setPromoHTMLEditable] = useState({ promoHTML: false, promoContentHTML: false });
  const { t } = useTranslation('promoPage');
  const [form] = Form.useForm();
  const theme = useTheme();

  const initialValues = useMemo(() => getInitialValues(promo), [promo]);

  const promoId = get(promo, '_id');

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
  });

  const { handleSubmit, values, setFieldValue } = formik;

  const savePromoHTML = () => {
    try {
      validateEmptyPromoHTML({ values, field: 'promoHTML' });
      validatePromoHTMLHasChanged({ initialValues, values, field: 'promoHTML' });
      return dispatch(Creators.updatePromoHTMLRequest({
        id: promoId,
        body: {
          values,
          promo,
          field: 'promoHTML',
          folderPath: UPDATE_SIGNED_URL_PARAMS.promoFolder,
          bucketName: UPDATE_SIGNED_URL_PARAMS.bucket,
          contentType: 'text/html',
        },
      }));
    }
    catch (error) {
      return dispatch(ToastCreators.error({ message: error, toastOptions: { autoClose: ERROR_TIMEOUT_MS } }));
    }
  };

  const handleGenerateUrl = () => {
    try {
      return dispatch(Creators.updatePromoHTMLRequest({
        id: promoId,
        body: {
          values: {
            ...values,
            applyToV2: false,
          },
          promo,
          field: 'promoContentHTML',
          isBodyContentURL: true,
          folderPath: UPDATE_SIGNED_URL_PARAMS.promoFolder,
          bucketName: UPDATE_SIGNED_URL_PARAMS.bucket,
          contentType: 'text/html',
        },
      }));
    }
    catch (error) {
      return dispatch(ToastCreators.error({ message: error, toastOptions: { autoClose: ERROR_TIMEOUT_MS } }));
    }
  };

  const savePromoContentHTML = () => {
    try {
      validateEmptyPromoHTML({ values, field: 'promoContentHTML' });
      validatePromoHTMLHasChanged({ initialValues, values, field: 'promoContentHTML' });
      return dispatch(Creators.updatePromoHTMLRequest({
        id: promoId,
        body: {
          values: {
            ...values,
            applyToV2: false,
          },
          promo,
          field: 'promoContentHTML',
          folderPath: UPDATE_SIGNED_URL_PARAMS.promoFolder,
          bucketName: UPDATE_SIGNED_URL_PARAMS.bucket,
          contentType: 'text/html',
        },
      }));
    }
    catch (error) {
      return dispatch(ToastCreators.error({ message: error, toastOptions: { autoClose: ERROR_TIMEOUT_MS } }));
    }
  };

  useEffect(() => {
    if (promo?.promoURL && Object.keys(promo?.promoURL).length) {
      const getPromoUrlsHTML = async urls => {
        const res = await fetchPromoUrlsHTML(urls);
        setFieldValue('promoHTML', res);
      };
      getPromoUrlsHTML(promo?.promoURL);
    }

    if (promo?.promoContentURL && Object.keys(promo?.promoContentURL).length) {
      const getPromoUrlsHTML = async urls => {
        const res = await fetchPromoUrlsHTML(urls);
        setFieldValue('promoContentHTML', res);
      };
      getPromoUrlsHTML(promo?.promoContentURL);
    }
  }, [promo, setFieldValue]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, promo, form]);

  const handleEditPromoHTML = HTMLKey => {
    setPromoHTMLEditable({
      ...promoHTMLEditable,
      [HTMLKey]: !promoHTMLEditable[HTMLKey],
    });
  };

  return (
    <Form form={form} id="promo-url" onFinish={handleSubmit} layout="vertical">
      <Row gutter={[theme.spacing(3)]}>
        <Col span={24}>
          <label htmlFor="promoUrl">
            {t('PROMO_URL.PROMO_URL')}
            <Tooltip title={t('TERMS_AND_CONDITIONS.PLEASE_USE_CAMPAIGN_DETAILS')}>
              <Button disabled size="small" onClick={() => handleEditPromoHTML('promoHTML')} style={{ margin: '0 5px 0 10px' }}>
                {t('button:EDIT')}
              </Button>
            </Tooltip>
            {promo?.promoURL && (
              <Dropdown overlay={getPromoURLsMenu(promo?.promoURL)} placement="bottomCenter">
                <Button size="small">{t('button:OPEN')}</Button>
              </Dropdown>
            )}
          </label>
        </Col>
        <Col span={24}>
          <MultiLanguageInput
            fieldPath={['promoURL']}
            formik={formik}
            disabled
          />
        </Col>
      </Row>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={24}>
          <label htmlFor="promoContentURL">
            {t('PROMO_URL.PROMO_URL_V2')}
            <Tooltip title={t('TERMS_AND_CONDITIONS.PLEASE_USE_CAMPAIGN_DETAILS')}>
              <Button
                disabled
                size="small"
                onClick={() => handleEditPromoHTML('promoContentHTML')}
                style={{ margin: '0 5px 0 10px' }}
              >
                {t('button:EDIT')}
              </Button>
            </Tooltip>
            {promo?.promoContentURL && (
              <Dropdown overlay={getPromoURLsMenu(promo?.promoContentURL)} placement="bottomCenter">
                <Button size="small">{t('button:OPEN')}</Button>
              </Dropdown>
            )}
          </label>
        </Col>
        <Col span={24}>
          <MultiLanguageInput
            fieldPath={['promoContentURL']}
            formik={formik}
            disabled
          />
        </Col>
      </Row>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={24}>
          <label htmlFor="promoBodyContentURL">
            {t('PROMO_URL.PROMO_URL_FOR_WEB')}
            <Tooltip title={t('TERMS_AND_CONDITIONS.PLEASE_USE_CAMPAIGN_DETAILS')}>
              { promo?.promoContentURL && (
              <Button
                loading={isUpdatePromoHTMLPending}
                size="small"
                onClick={handleGenerateUrl}
                style={{ margin: '0 5px 0 10px' }}
                disabled
              >
                {t('button:GENERATE')}
              </Button>
              )}
            </Tooltip>
            {promo?.promoBodyContentURL && (
              <Dropdown overlay={getPromoURLsMenu(promo?.promoBodyContentURL)} placement="bottomCenter">
                <Button size="small" style={{ margin: '0 5px 0 0px' }}>{t('button:OPEN')}</Button>
              </Dropdown>
            )}
          </label>
        </Col>
        <Col span={24}>
          <MultiLanguageInput
            fieldPath={['promoBodyContentURL']}
            formik={formik}
            disabled
          />
        </Col>
      </Row>
      {promoHTMLEditable.promoHTML && (
        <>
          <MultiLanguageTextEditor
            originalValue={values.promoHTML}
            label={t('PROMO_URL.PROMO_HTML')}
            fieldPath={['promoHTML']}
            formik={formik}
            disabled={false}
          />
          <Row justify="end" gutter={[theme.spacing(2)]}>
            <Col>
              <Form.Item className="mb-0 mt-0">
                <span className="mr-2">{t('PROMO_URL.APPLY_TO_V2')}</span>
                <input
                  type="checkbox"
                  checked={values.applyToV2}
                  onChange={e => setFieldValue('applyToV2', e.target.checked)}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item className="mb-0 mt-0">
                <Button
                  size="small"
                  form="promo-url"
                  type="primary"
                  onClick={savePromoHTML}
                  loading={isUpdatePromoHTMLPending}
                >
                  {t('button:SAVE')}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
      {promoHTMLEditable.promoContentHTML && (
        <>
          <MultiLanguageTextEditor
            originalValue={values.promoContentHTML}
            label={t('PROMO_URL.PROMO_HTML_V2')}
            fieldPath={['promoContentHTML']}
            formik={formik}
            disabled={false}
          />
          <Row justify="end" gutter={[theme.spacing(2)]}>
            <Col>
              <Form.Item className="mb-0 mt-0">
                <Button
                  size="small"
                  form="promo-url"
                  type="primary"
                  onClick={savePromoContentHTML}
                  loading={isUpdatePromoHTMLPending}
                >
                  {t('button:SAVE')}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
    </Form>
  );
};

const PromoUrlSection = memo(function PromoUrlSection() {
  const { t } = useTranslation('promoPage');

  const isLegacyTerms = useSelector(PromoDetailSlice.selectors.isLegacyTerms);

  if (!isLegacyTerms) {
    return null;
  }

  return (
    <Collapse className="mb-2">
      <Panel header={t('PROMO_URL.HEADER_TITLE')} key={1}>
        <PromoUrlForm />
      </Panel>
    </Collapse>
  );
});

export default PromoUrlSection;
