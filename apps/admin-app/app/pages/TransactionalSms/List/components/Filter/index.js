import { memo, useEffect, useMemo } from 'react';
import { Form, Row, Col, Button, Input, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

import { FILTER_FORM } from '@app/pages/TransactionalSms/List/components/Filter/config';
import { Creators } from '@app/pages/TransactionalSms/List/redux/actions';
import { manipulateValuesAfterSubmit, manipulateValuesBeforeExport } from '@app/pages/TransactionalSms/List/components/Filter/utils';
import { getLangKey } from '@shared/i18n';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { isObjectIdValid } from '@shared/utils/common';
import { getConfigWithKeySelector } from '@shared/redux/selectors/common';

const TransactionalSmsFilter = ({ config }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation('transactionalSmsPage');
  const langKey = getLangKey();

  const activeDomainsFromConfig = useSelector(getConfigWithKeySelector.getData);

  const fields = useMemo(() => FILTER_FORM({ t, langKey, activeDomainsFromConfig, config }), [t, langKey, activeDomainsFromConfig, config]);

  useEffect(() => {
    dispatch(Creators.setTableFilters({ filters: manipulateValuesAfterSubmit(form.getFieldsValue()) }));
  }, [dispatch, form]);

  const setFilters = useMemo(
    () => debounce(values => {
      if (!(values?.id && !isObjectIdValid(values?.id))) {
        dispatch(Creators.setTableFilters({ filters: manipulateValuesAfterSubmit(values) }));
      }
    }, DEFAULT_DEBOUNCE_MS),
    [dispatch],
  );
  const exportSmsList = () => {
    dispatch(Creators.getExportSmsListRequest({ filters: { ...manipulateValuesBeforeExport(form.getFieldsValue()) } }));
  };

  return (
    <Form
      form={form}
      className="mt-3 mb-2"
      layout="inline"
      onValuesChange={(changedVal, values) => {
        setFilters(values);
      }}
    >
      <Row gutter={[16, 8]} className="w-100">
        {/* Map fields from filter form obj */}
        {Object.keys(fields).map(k => <FieldWrapper key={k} field={fields[k]} />)}
        <Col lg={4} xs={12}>
          <Tooltip
            trigger={['focus']}
            title={t('global:TYPE_MIN_THREE')}
            placement="top"
          >
            <Form.Item name="text" className="w-100">
              <Input
                name="text"
                allowClear
                placeholder={t('TEXT_SEARCH')}
                className="w-100"
              />
            </Form.Item>
          </Tooltip>
        </Col>

        <Button
          className="ml-2"
          size="medium"
          variant="contained"
          type="secondary"
          onClick={exportSmsList}
        > {t('EXPORT')}
        </Button>
      </Row>
    </Form>
  );
};

const FieldWrapper = ({ field }) => {
  const { component: Component, props, wrapperProps } = field;
  return (
    <Col {...wrapperProps}>
      <Form.Item name={props.name} className="w-100">
        <Component {...props} />
      </Form.Item>
    </Col>
  );
};

export default memo(TransactionalSmsFilter);
