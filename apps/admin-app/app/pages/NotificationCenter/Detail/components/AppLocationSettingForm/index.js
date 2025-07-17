import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Row } from 'antd';

import { useDispatch } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@shared/utils/marketing/formUtils';

import { getLangKey } from '@shared/i18n';
import PageOptionSelect from '@shared/containers/Marketing/Select/PageOptionSelect';
import { Creators } from '@app/pages/NotificationCenter/New/redux/actions';
import { ADMIN_PANEL_CONFIGS } from '@shared/shared/constants';

const AppLocationSettingForm = ({ form, isFormEditable }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const handlePageOptions = useCallback(pageOptions => {
    dispatch(Creators.setPageOptions({ pageOptions }));
    form.setFields([{ name: 'activeControls', value: [] }]);
  }, [dispatch, form]);

  return (
    <AntCard footer={false} bordered={false} title={t('APP_LOCATION_SETTING')}>
      <Row gutter={24}>
        <Col lg={12}>
          <Form.Item noStyle dependencies={['domainType']}>
            {({ getFieldValue }) => {
              const targetDomain = getFieldValue('domainType');
              return (
                <PageOptionSelect
                  configKey={ADMIN_PANEL_CONFIGS?.ANNOUNCEMENT_ELIGIBLE_IN_APP_PAGES}
                  onLoad={handlePageOptions}
                  disabled={!isFormEditable}
                  fieldName="pageIds"
                  placeholder={(targetDomain) ? null : t('PAGE_SELECTION_WARNING')}
                  additionalFilter={pageOptions => {
                    return pageOptions.flatMap(pageOption => {
                      if (pageOption?.activeServices?.includes(targetDomain)) {
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
