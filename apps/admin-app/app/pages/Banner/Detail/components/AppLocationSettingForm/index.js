import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Row, Select } from 'antd';

import { useDispatch } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@shared/utils/marketing/formUtils';
import { componentTypes } from '@app/pages/Banner/constantValues';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';

import { getLangKey } from '@shared/i18n';
import PageOptionSelect from '@shared/containers/Marketing/Select/PageOptionSelect';
import { Creators } from '@app/pages/Banner/Detail/redux/actions';
import { ADMIN_PANEL_CONFIGS, GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE } from '@shared/shared/constants';
import { COMPONENT_TYPE } from '@app/pages/Banner/constants';

const AppLocationSettingForm = ({ form, isFormEditable }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const handlePageOptions = useCallback(pageOptions => {
    dispatch(Creators.setPageOptions({ pageOptions }));
    form.setFields([{ name: 'activeControls', value: [] }]);
  }, [dispatch, form]);

  return (
    <AntCard footer={false} bordered={false} title={t('APP_LOCATION_SETTING')}>
      <Form.Item dependencies={['domainType']} className="w-full" noStyle>
        {({ getFieldValue }) => {
          const selectedDomainType = getFieldValue('domainType');
          let filteredComponentTypes = componentTypes;

          // Dynamic card component can selectable only on g10 and getirMarket
          if (selectedDomainType !== GETIR_MARKET_DOMAIN_TYPE && selectedDomainType !== GETIR_10_DOMAIN_TYPE) {
            const { [COMPONENT_TYPE.DYNAMIC_CARD]: _, ...remainingComponentTypes } = filteredComponentTypes;
            filteredComponentTypes = remainingComponentTypes;
          }

          return (
            <Row gutter={24} className="mt-4">
              <Col lg={12}>
                <Form.Item name="componentType" rules={rules.onlyRequired} label={t('COMPONENT_TYPE')}>
                  <Select
                    onChange={() => form.setFields([{ name: 'pageIds', value: [] }])}
                    disabled={!selectedDomainType || !isFormEditable}
                    className="w-100"
                    direction={!isFormEditable}
                    placeholder={t('COMPONENT_TYPE')}
                    options={convertConstantValuesToSelectOptions(filteredComponentTypes)}
                  />
                </Form.Item>
              </Col>
            </Row>
          );
        }}

      </Form.Item>

      <Row gutter={24}>
        <Col lg={12}>
          {/* TODO: Change config service key for banner activated page listing */}
          <Form.Item noStyle dependencies={['domainType', 'componentType']}>
            {({ getFieldValue }) => {
              const targetDomain = getFieldValue('domainType');
              const componentType = getFieldValue('componentType');
              return (
                <PageOptionSelect
                  configKey={ADMIN_PANEL_CONFIGS?.BANNER_ELIGIBLE_IN_APP_PAGES}
                  onLoad={handlePageOptions}
                  disabled={!isFormEditable}
                  fieldName="pageIds"
                  placeholder={(targetDomain && componentType) ? null : t('PAGE_SELECTION_WARNING')}
                  additionalFilter={pageOptions => {
                    return pageOptions.flatMap(pageOption => {
                      if (pageOption?.activeComponentTypes?.includes(componentType) && pageOption?.activeServices?.includes(targetDomain)) {
                        return [{
                          value: pageOption?.pageId,
                          label: pageOption?.name[getLangKey()],
                        }];
                      }
                      return [];
                    });
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
