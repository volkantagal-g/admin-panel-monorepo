import { Col, Form, Input, Row, Select, Switch } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import AntCard from '@shared/components/UI/AntCard';
import { buttonActionTypeList } from '@app/pages/GetirWater/Campaigns/constants';
import { validationSchema } from '../formHelper';
import { brandsSelector } from '@app/pages/GetirWater/Campaigns/New/redux/selectors';

const ButtonAction = () => {
  const { t } = useTranslation('getirWaterCampaignsPage');
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const brandList = useSelector(brandsSelector.getBrands).map(brand => ({
    label: brand.brandName,
    value: brand.id,
  }));

  const typeListOptions = convertConstantValuesToSelectOptions(buttonActionTypeList);

  return (
    <AntCard bordered={false} title={t('FORM.BUTTON_ACTION.TITLE')}>
      <Row gutter={[8, 8]}>
        <Col span={4}>
          <Form.Item name="isButtonEnabled" label={t('FORM.BANNER_DETAILS.STATUS.TITLE')} valuePropName="checked">
            <Switch
              onChange={setButtonEnabled}
              checked={isButtonEnabled}
              checkedChildren={t('global:ACTIVE')}
              unCheckedChildren={t('global:INACTIVE')}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            rules={validationSchema.getDynamicTitleValidator(isButtonEnabled).titleTr}
            name="buttonActionTextTr"
            label={t('FORM.BUTTON_ACTION.TEXT.TITLE_TR')}
          >
            <Input suffix="TR" />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            rules={validationSchema.getDynamicTitleValidator(isButtonEnabled).titleEn}
            name="buttonActionTextEn"
            label={t('FORM.BUTTON_ACTION.TEXT.TITLE_EN')}
          >
            <Input suffix="EN" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]} align="bottom">
        <Col span={12}>
          <Form.Item
            name="buttonActionType"
            label={t('FORM.BUTTON_ACTION.TYPE.TITLE')}
          >
            <Select options={typeListOptions} disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            rules={validationSchema.getDynamicRedirectToValidator(isButtonEnabled)}
            name="buttonActionRedirectTo"
            label={t('FORM.BUTTON_ACTION.REDIRECT_TO.TITLE')}
          >
            <Select filterOption={getSelectFilterOption} showSearch options={brandList} />
          </Form.Item>
        </Col>
      </Row>
    </AntCard>
  );
};

export default ButtonAction;
