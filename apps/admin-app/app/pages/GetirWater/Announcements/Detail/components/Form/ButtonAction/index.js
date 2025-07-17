import { Form, Input, Row, Col, Select, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import getSelectList from '@app/pages/GetirWater/Announcements/utils/getSelectList';
import { buttonActionTypeList, productActionType, brandActionType } from '@app/pages/GetirWater/Announcements/constants';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { validationSchema } from '../formHelper';
import { Creators } from '@app/pages/GetirWater/Announcements/Detail/redux/actions';
import AntCard from '@shared/components/UI/AntCard';
import {
  brandsSelector,
  vendorsProductsSelector,
} from '@app/pages/GetirWater/Announcements/Detail/redux/selectors';
import { CreateCardActionButtons } from '@app/pages/GetirWater/Announcements/utils/createCardButtonActions';

const ButtonAction = ({ filterForm, form, isUpdated }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('getirWaterAnnouncementsPage');

  const [isButtonActionEnabled, setIsButtonActionEnabled] = useState();
  const [buttonActionType, setButtonActionType] = useState();
  const [buttonRedirectType, setButtonRedirectType] = useState();
  const brands = useSelector(brandsSelector.getBrands);

  const { cardFooter, cardTitle, isEditable } = CreateCardActionButtons(
    'FORM.BANNER_DETAILS.BUTTON_ACTION',
    'buttonAction',
  );

  useEffect(() => {
    setIsButtonActionEnabled(form.getFieldValue('isButtonEnabled'));
  }, [form]);

  const vendorsProducts = useSelector(
    vendorsProductsSelector.getVendorsProducts,
  );
  const isVendorsProductsLoading = useSelector(
    vendorsProductsSelector.getVendorsProductsIsPending,
  );

  const productsOptions = useMemo(() => {
    const mappedArray = getSelectList(
      vendorsProducts,
      'productShortName',
      'productId',
    );

    return mappedArray;
  }, [vendorsProducts]);

  useEffect(() => {
    const selectedFilterVendors = filterForm.getFieldValue('vendorIds');
    setIsButtonActionEnabled(form.getFieldValue('isButtonEnabled'));
    setButtonActionType(form.getFieldValue('buttonActionType'));
    if (!selectedFilterVendors) return;
    if (selectedFilterVendors.length === 0) return;
    dispatch(
      Creators.vendorsProductsRequest({ data: { vendorIds: selectedFilterVendors } }),
    );
  }, [dispatch, filterForm, form, isUpdated]);

  const typeListOptions =
    convertConstantValuesToSelectOptions(buttonActionTypeList);

  const isButtonActionHandler = value => {
    setIsButtonActionEnabled(value);
  };

  const selectedBrands = useMemo(() => {
    const selectedFilterBrands = filterForm.getFieldValue('brandIdList');
    if (!selectedFilterBrands) return [];
    const filteredArray = brands.filter(value => selectedFilterBrands.includes(value.id));

    const mappedArray = getSelectList(filteredArray, 'brandName', 'id');
    return mappedArray;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterForm, brands, isUpdated]);

  const typeChangeHandler = value => {
    if (value !== buttonActionType) {
      setButtonActionType(value);
      form.setFields([
        {
          name: 'buttonRedirectTo',
          errors: [],
          value: undefined,
        }]);
      setButtonRedirectType(null);
    }
    if (value === productActionType && vendorsProducts.length === 0) {
      const selectedFilterVendors = filterForm.getFieldValue('vendorIds');
      dispatch(
        Creators.vendorsProductsRequest({ data: { vendorIds: selectedFilterVendors } }),
      );
    }
  };

  const redirectChangeHandler = value => {
    setButtonRedirectType(value);
  };

  return (
    <AntCard footer={cardFooter} bordered={false} title={cardTitle}>
      <Row gutter={[8, 8]}>
        <Col span={2}>
          <Form.Item
            name="isButtonEnabled"
            label={t('FORM.BANNER_DETAILS.BUTTON_ACTION')}
            valuePropName="checked"
          >
            <Switch
              onChange={isButtonActionHandler}
              defaultChecked={isButtonActionEnabled}
              checkedChildren={t('global:ACTIVE')}
              unCheckedChildren={t('global:INACTIVE')}
              disabled={!isEditable}
            />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            name="buttonTextTr"
            label={t('FORM.BANNER_DETAILS.BUTTON.BUTTON_TEXT_TR')}
            rules={isButtonActionEnabled && validationSchema.buttonTextTr}
          >
            <Input
              disabled={!isButtonActionEnabled || !isEditable}
              suffix="TR"
            />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            name="buttonTextEn"
            label={t('FORM.BANNER_DETAILS.BUTTON.BUTTON_TEXT_EN')}
            rules={isButtonActionEnabled && validationSchema.buttonTextEn}
          >
            <Input
              disabled={!isButtonActionEnabled || !isEditable}
              suffix="EN"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            name="buttonActionType"
            label={t('FORM.BANNER_DETAILS.TYPE.TITLE')}
            rules={isButtonActionEnabled && validationSchema.buttonActionType}
          >
            <Select
              options={typeListOptions}
              onChange={typeChangeHandler}
              disabled={!isButtonActionEnabled || !isEditable}

            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="buttonRedirectTo"
            label={t('FORM.BANNER_DETAILS.REDIRECT.TITLE')}
            rules={isButtonActionEnabled && validationSchema.buttonRedirectTo}
          >
            <Select
              options={
                buttonActionType === brandActionType ? selectedBrands : productsOptions
              }
              loading={
                buttonActionType === brandActionType ? false : isVendorsProductsLoading
              }
              disabled={!isButtonActionEnabled || !isEditable}
              onChange={redirectChangeHandler}
              value={buttonRedirectType}

            />
          </Form.Item>
        </Col>
      </Row>
    </AntCard>
  );
};

export default ButtonAction;
