import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { Button, Col, Form, Modal, Row, Space, Spin } from 'antd';

import React, { useEffect, useMemo, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';

import { ValidatedCsvImporter } from '@app/pages/Promo/components/ValidatedCsvImporter/ValidatedCsvImporter';
import { ExampleCSV } from '@app/pages/Promo/Detail/components/ExampleCSVModal';
import { DiscountCodeBulkEditUpdateSlice } from '@app/pages/DiscountCode/BulkEdit/slice';
import { discountCodeBulkEditUpdateSaga } from '@app/pages/DiscountCode/BulkEdit/saga';
import {
  AlertBoxes,
  ButtonIcons,
  ButtonKeys,
  CSV_VALIDATION_SCHEMA,
  EXAMPLE_CSV,
} from '@app/pages/DiscountCode/BulkEdit/constants';
import { DISCOUNT_CODE_MODAL_TYPES, DiscountCodeModalType, UpdateDiscountCodesFormType } from './types';
import { injected } from '@shared/utils/injected';
import { DiscountCodesBulkEditUpdateForm } from '@app/pages/DiscountCode/BulkEdit/form';
import { GeneralPopConfirm } from '@shared/components/UI/GeneralPopConfirm/GeneralPopConfirm';
import { useInitAndDestroyPage } from '@shared/hooks';

export const DiscountCodesBulkEditUpdateModal = injected(function DiscountCodesBulkEditUpdateModal() {
  const { t } = useTranslation('editDiscountCodeComponent');
  const dispatch = useDispatch();
  const [form] = Form.useForm<UpdateDiscountCodesFormType>();
  const [mode, setMode] = useState<DiscountCodeModalType>(DISCOUNT_CODE_MODAL_TYPES.UPDATE);
  const isVisible = useSelector(DiscountCodeBulkEditUpdateSlice.selectors.isModalOpen);
  const loading = useSelector(DiscountCodeBulkEditUpdateSlice.selectors.isLoading);
  const actionTypesOverlap = useSelector(DiscountCodeBulkEditUpdateSlice.selectors.actionTypesOverlap);
  const actionType = useSelector(DiscountCodeBulkEditUpdateSlice.selectors.actionType);
  const codes = useSelector(DiscountCodeBulkEditUpdateSlice.selectors.codes);

  useEffect(() => {
    form.setFieldsValue({ actionType: { actionType: actionType || undefined } });
  }, [form, actionType]);

  useInitAndDestroyPage({ dispatch, Creators: DiscountCodeBulkEditUpdateSlice.actions });

  const handleImport = (data: Record<string, string> []): unknown => {
    if (data.length) {
      const newCodes = data.map(item => item.code);
      return dispatch(
        DiscountCodeBulkEditUpdateSlice.actions.upsertCodes({
          codes: newCodes,
          shouldFetchActionTypes: mode === DISCOUNT_CODE_MODAL_TYPES.UPDATE,
        }),
      );
    }
    return dispatch(DiscountCodeBulkEditUpdateSlice.actions.clearCodes());
  };

  const handleClearImport = () => {
    dispatch(DiscountCodeBulkEditUpdateSlice.actions.clearCodes());
  };

  const handleVisibleChange = () => dispatch(DiscountCodeBulkEditUpdateSlice.actions.toggleModal());

  const handleOpen = (newMode: DiscountCodeModalType) => {
    setMode(newMode);
    handleVisibleChange();
  };

  const onFinish = (values: UpdateDiscountCodesFormType) => {
    dispatch(DiscountCodeBulkEditUpdateSlice.actions.updateRequest({ ...values, resetUsage: mode === DISCOUNT_CODE_MODAL_TYPES.REUSE }));
  };

  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const formReady = useMemo<boolean>(() => {
    if (mode === DISCOUNT_CODE_MODAL_TYPES.UPDATE) {
      return actionTypesOverlap !== null;
    }

    return codes !== null;
  }, [actionTypesOverlap, codes, mode]);

  return (
    <>
      <Space>
        <Button onClick={() => handleOpen(DISCOUNT_CODE_MODAL_TYPES.UPDATE)} icon={ButtonIcons.update}>
          {t(ButtonKeys.update)}
        </Button>
        <Button onClick={() => handleOpen(DISCOUNT_CODE_MODAL_TYPES.REUSE)} icon={ButtonIcons.reuse}>
          {t(ButtonKeys.reuse)}
        </Button>
      </Space>
      <Modal
        visible={isVisible}
        onCancel={handleVisibleChange}
        title={(
          <Space>
            <EditOutlined />
            <span>
              {t(ButtonKeys[mode])}
            </span>
          </Space>
        )}
        centered
        onOk={handleVisibleChange}
        destroyOnClose
        footer={[
          <Button key="back" disabled={loading} onClick={handleVisibleChange}>
            {t('global:CANCEL')}
          </Button>,
          <GeneralPopConfirm
            title={t('REUSE_CONFIRMATION')}
            omit={mode === DISCOUNT_CODE_MODAL_TYPES.UPDATE}
            onConfirm={form.submit}
            className="ml-2"
          >
            <Button
              key="submit"
              type="primary"
              disabled={loading}
              onClick={mode === DISCOUNT_CODE_MODAL_TYPES.UPDATE ? form.submit : undefined}
            >
              {t('global:SAVE')}
            </Button>
          </GeneralPopConfirm>,
        ]}
      >
        <Spin spinning={loading && formReady} size="large">
          <Row gutter={[8, 8]}>
            <Spin spinning={loading && !formReady} size="large">
              {!formReady && (
                <Col span={24}>
                  {AlertBoxes[mode]}
                </Col>
              )}
              <Col span={24} className={!formReady ? 'mt-4' : undefined}>
                <ValidatedCsvImporter
                  buttonType="primary"
                  validationSchema={CSV_VALIDATION_SCHEMA}
                  onChange={handleImport}
                  loading={loading}
                  disabled={loading}
                  exampleCsv={<ExampleCSV exampleCsv={EXAMPLE_CSV} disabled={loading} />}
                  onClear={handleClearImport}
                  hideAlert
                />
              </Col>
            </Spin>
            {
              formReady && (
                <Col span={24}>
                  <DiscountCodesBulkEditUpdateForm form={form} onFinish={onFinish} mode={mode} />
                </Col>
              )
            }
          </Row>
        </Spin>
      </Modal>
    </>
  );
}, {
  key: DiscountCodeBulkEditUpdateSlice.reducerPath,
  reducer:
  DiscountCodeBulkEditUpdateSlice.reducer,
  saga:
  discountCodeBulkEditUpdateSaga,
});
