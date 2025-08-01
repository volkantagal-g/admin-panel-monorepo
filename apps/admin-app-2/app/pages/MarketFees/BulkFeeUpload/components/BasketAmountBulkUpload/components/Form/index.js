/* eslint-disable camelcase */
import { useState } from 'react';
import { Button, Row, Col, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';

import { useFormik } from 'formik';

import { validate } from '@shared/yup';
import { Creators } from '../../../../redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { initialValues, validationSchema } from './formHelper';
import { WAREHOUSE_LIST_MIN } from '@app/pages/MarketFees/BulkFeeUpload/feeSourceConfig';
import {
  getExampleCsv,
  getParsedData,
} from '@app/pages/MarketFees/BulkFeeUpload/utils';
import { Card } from '@shared/components/GUI';
import { getirMarketBulkUploadDomainTypes } from '@app/pages/MarketFees/BulkFeeUpload/constants';

const { useForm } = Form;
function ImportBasketAmountCsv({ title, mode, exampleCsvUrl }) {
  const { t } = useTranslation('feeDetailsPage');
  const dispatch = useDispatch();
  const [form] = useForm();
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);
  const formik = useFormik({
    initialValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(
        Creators.basketAmountBulkUploadRequest({ basketAmounts: values }),
      );
    },
    enableReinitialize: true,
  });
  const { handleSubmit, setFieldValue, errors, touched } = formik;

  const handleCsvImport = ({ data }) => {
    try {
      if (data.length < WAREHOUSE_LIST_MIN) {
        dispatch(ToastCreators.error({ message: t('error:INVALID_WAREHOUSE_LIST', { amount: WAREHOUSE_LIST_MIN }) }));
        return;
      }
      let parsingError = false;
      let invalidWarehouseList = false;
      let hasServiceError = false;
      let hasMissingMinBasketAmountError = false;

      data.forEach((item, index) => {
        const { min_basket, service, warehouse_id } = item;
        if (!warehouse_id || !service) {
          if (index < WAREHOUSE_LIST_MIN && !warehouse_id) {
            invalidWarehouseList = true;
          }
          else {
            parsingError = true;
          }
        }
        if (mode.toLowerCase() === 'basket_amount' && min_basket < 0) {
          hasMissingMinBasketAmountError = true;
        }
        if (!Object.keys(getirMarketBulkUploadDomainTypes).includes(service)) {
          hasServiceError = true;
        }
      });
      if (parsingError) {
        dispatch(ToastCreators.error({ message: t('error:INVALID_CSV') }));
        return;
      }
      if (hasMissingMinBasketAmountError) {
        dispatch(ToastCreators.error({ message: t('error:ERR_MIN_BASKET_AMOUNT_REQUIRED') }));
        return;
      }
      if (hasServiceError) {
        dispatch(ToastCreators.error({ message: t('error:WRONG_SERVICE_ERROR') }));
        return;
      }
      if (invalidWarehouseList) {
        dispatch(
          ToastCreators.error({ message: t('error:INVALID_WAREHOUSE_LIST', { amount: WAREHOUSE_LIST_MIN }) }),
        );
        return;
      }
      const parsedData = getParsedData(data, mode, t);
      setFieldValue('basketAmounts', parsedData);
      handleSubmit();
    }
    catch (error) {
      dispatch(ToastCreators.error({ message: error?.message }));
    }
  };

  const exampleCsv = getExampleCsv(mode);
  return (
    <Card size="small" title={title} bordered={false}>
      <Form
        id={`delivery-fee-bulk-upload-${mode}`}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[8, 16]} align="top">
          <Col span={12}>
            <Button
              href={exampleCsvUrl}
              target="_blank"
              icon={<DownloadOutlined />}
            >
              {t('global:EXAMPLE_CSV')}
            </Button>
          </Col>
        </Row>
        <Row gutter={[8, 16]} align="top">
          <Col span={12}>
            <Form.Item
              help={touched.basketAmounts && errors.basketAmounts}
              name="basketAmounts"
              validateStatus={
                touched.basketAmounts && errors.basketAmounts
                  ? 'error'
                  : 'success'
              }
              label={t('global:UPLOAD_CSV_AND_EXECUTE')}
            >
              <Button onClick={() => setIsCSVModalOpen(true)}>
                <CsvImporter
                  modalProps={{
                    title: t('global:UPLOAD_CSV_AND_EXECUTE'),
                    okText: t('global:UPLOAD_CSV_AND_EXECUTE'),
                  }}
                  onOkayClick={handleCsvImport}
                  hasNestedHeaderKeys
                  exampleCsv={exampleCsv}
                  isVisible={isCSVModalOpen}
                  exampleTableProps={{
                    className: null,
                    scroll: { x: '100vw', y: 240 },
                  }}
                />
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default ImportBasketAmountCsv;
