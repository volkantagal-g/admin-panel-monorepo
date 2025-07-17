import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Row, Select } from 'antd';

import { useDispatch } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@shared/utils/marketing/formUtils';
import { componentTypes } from '@app/pages/Popup/constantValues';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import PageOptionSelect from '@shared/containers/Marketing/Select/PageOptionSelect';
import { Creators } from '@app/pages/Popup/New/redux/actions';
import { ADMIN_PANEL_CONFIGS } from '@shared/shared/constants';
import { convertPageOptionsToSelectOptions } from '@app/pages/Popup/utils';

const AppLocationSettingForm = ({ form }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const handlePageOptions = useCallback(pageOptions => {
    dispatch(Creators.setPageOptions({ pageOptions }));
    form.setFields([{ name: 'activeControls', value: [] }]);
  }, [dispatch, form]);

  return (
    <AntCard footer={false} bordered={false} title={t('APP_LOCATION_SETTING')}>
      <Row gutter={24} className="mt-4">
        <Col lg={12}>
          <Form.Item name="componentType" rules={rules.onlyRequired} label={t('COMPONENT_TYPE')}>
            <Select
              onChange={() => form.setFields([{ name: 'pageIds', value: [] }])}
              className="w-100"
              placeholder={t('COMPONENT_TYPE')}
              options={convertConstantValuesToSelectOptions(componentTypes)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col lg={12}>
          <Form.Item noStyle dependencies={['activeDomains', 'componentType']}>
            {({ getFieldValue }) => {
              const targetDomain = getFieldValue('activeDomains');
              const componentType = getFieldValue('componentType');

              return (
                <PageOptionSelect
                  configKey={ADMIN_PANEL_CONFIGS?.POPUP_ELIGIBLE_IN_APP_PAGES}
                  fieldName="pageIds"
                  placeholder={(targetDomain && componentType) ? null : t('PAGE_SELECTION_WARNING')}
                  onLoad={handlePageOptions}
                  additionalFilter={pageOptions => {
                    return convertPageOptionsToSelectOptions(pageOptions, componentType, targetDomain);
                  }}
                  mode="multiple"
                  rules={rules.requiredArray}
                  inline={false}
                />
              );
            }}
          </Form.Item>
        </Col>
      </Row>
    </AntCard>
  );
};

export default memo(AppLocationSettingForm);
