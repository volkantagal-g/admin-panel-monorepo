/* eslint-disable camelcase */
import { useState } from 'react';
import { Button, Row, Col, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';

import { useFormik } from 'formik';

import Card from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { WAREHOUSE_LIST_MIN, exampleCsv, exampleCsvPeakHours } from './config';
import { defaultValues, validationSchema } from './formHelper';
import { FEE_LAYER_TYPE } from '@shared/shared/constants';

const { useForm } = Form;
function ImportCsv({ title, mode, exampleCsvUrl }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = useForm();
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);
  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.deliveryFeeBulkUploadRequest({ requestBody: values }));
    },
    enableReinitialize: true,
  });
  const { handleSubmit, setFieldValue, errors, touched } = formik;
  const isPeakHoursMode = mode === FEE_LAYER_TYPE.PEAK_HOURS;

  const parsePeakHoursCSVImport = data => {
    const fees = data.reduce(
      (acc, curr) => {
        const {
          peak_high,
          peak_high_delfee,
          peak_mid,
          peak_mid_delfee,
          peak_yazlik1,
          peak_yazlik1_delfee,
          peak_yazlik2,
          peak_yazlik2_delfee,
          peak_highmid,
          peak_highmid_delfee,
          peak_low,
          peak_low_delfee,
        } = curr;
        if (peak_high !== null && peak_high_delfee !== null) {
          acc.peak_high.push({ min: peak_high, fee: peak_high_delfee });
        }
        if (peak_mid !== null && peak_mid_delfee !== null) {
          acc.peak_mid.push({ min: peak_mid, fee: peak_mid_delfee });
        }
        if (peak_yazlik1 !== null && peak_yazlik1_delfee !== null) {
          acc.peak_yazlik1.push({ min: peak_yazlik1, fee: peak_yazlik1_delfee });
        }
        if (peak_yazlik2 !== null && peak_yazlik2_delfee !== null) {
          acc.peak_yazlik2.push({ min: peak_yazlik2, fee: peak_yazlik2_delfee });
        }
        if (peak_highmid !== null && peak_highmid_delfee !== null) {
          acc.peak_highmid.push({ min: peak_highmid, fee: peak_highmid_delfee });
        }
        if (peak_low !== null && peak_low_delfee !== null) {
          acc.peak_low.push({ min: peak_low, fee: peak_low_delfee });
        }
        return acc;
      },
      {
        peak_high: [],
        peak_mid: [],
        peak_low: [],
        peak_highmid: [],
        peak_yazlik1: [],
        peak_yazlik2: [],
      },
    );
    const minBasket = {
      peak_high: data[0].peak_high_minbasket,
      peak_mid: data[0].peak_mid_minbasket,
      peak_highmid: data[0].peak_highmid_minbasket,
      peak_low: data[0].peak_low_minbasket,
      peak_yazlik1: data[0].peak_yazlik1_minbasket,
      peak_yazlik2: data[0].peak_yazlik2_minbasket,
    };
    return { fees, minBasket };
  };

  const parseRegularHoursCSVImport = data => {
    const fees = data.reduce(
      (acc, curr) => {
        const {
          high,
          high_delfee: highDelfee,
          mid,
          mid_delfee: midDelfee,
          yazlik1,
          yazlik1_delfee: yazlik1Delfee,
          yazlik2,
          yazlik2_delfee: yazlik2Delfee,
          highmid,
          highmid_delfee: highmidDelfee,
          low,
          low_delfee: lowDelFee,
        } = curr;
        if (high !== null && highDelfee !== null) {
          acc.high.push({ min: high, fee: highDelfee });
        }
        if (mid !== null && midDelfee !== null) {
          acc.mid.push({ min: mid, fee: midDelfee });
        }
        if (yazlik1 !== null && yazlik1Delfee !== null) {
          acc.yazlik1.push({ min: yazlik1, fee: yazlik1Delfee });
        }
        if (yazlik2 !== null && yazlik2Delfee !== null) {
          acc.yazlik2.push({ min: yazlik2, fee: yazlik2Delfee });
        }
        if (highmid !== null && highmidDelfee !== null) {
          acc.highmid.push({ min: highmid, fee: highmidDelfee });
        }
        if (low !== null && lowDelFee !== null) {
          acc.low.push({ min: low, fee: lowDelFee });
        }
        return acc;
      },
      {
        high: [],
        mid: [],
        low: [],
        highmid: [],
        yazlik1: [],
        yazlik2: [],
      },
    );

    const minBasket = {
      high: data[0].high_minbasket,
      mid: data[0].mid_minbasket,
      highmid: data[0].highmid_minbasket,
      low: data[0].low_minbasket,
      yazlik1: data[0].yazlik1_minbasket,
      yazlik2: data[0].yazlik2_minbasket,
    };
    return { fees, minBasket };
  };

  const handleCsvImport = ({ data }) => {
    if (!data.length) {
      dispatch(ToastCreators.error({ message: t('error:INVALID_CSV') }));
      return;
    }
    const { fees, minBasket } = isPeakHoursMode
      ? parsePeakHoursCSVImport(data)
      : parseRegularHoursCSVImport(data);
    let parsingError = false;
    let invalidWarehouseList = false;
    const feeSegmentKey = isPeakHoursMode ? 'peak_delfee_segment' : 'delfee_segment';
    const parsedData = data.map((item, index) => {
      if (!item.warehouse_id || !item[feeSegmentKey] || !fees[item[feeSegmentKey]] || !item.service) {
        if (index < WAREHOUSE_LIST_MIN && !item.warehouse_id) {
          invalidWarehouseList = true;
        }
        else {
          parsingError = true;
        }
      }
      return {
        warehouseId: item.warehouse_id,
        layer: fees[item[feeSegmentKey]],
        serviceType: item.service,
        minimumBasketValue: minBasket[item[feeSegmentKey]],
      };
    });
    if (parsingError) {
      dispatch(ToastCreators.error({ message: t('error:INVALID_CSV') }));
      return;
    }
    if (invalidWarehouseList) {
      dispatch(ToastCreators.error({ message: t('error:INVALID_WAREHOUSE_LIST', { amount: WAREHOUSE_LIST_MIN }) }));
      return;
    }
    setFieldValue('warehouseDeliveryFeeLayers', parsedData);
    setFieldValue('type', isPeakHoursMode ? 'peak' : 'regular');
    handleSubmit();
  };

  return (
    <Card
      size="small"
      title={title}
      bordered={false}
    >
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
              help={touched.warehouseDeliveryFeeLayers && errors.warehouseDeliveryFeeLayers}
              name="warehouseDeliveryFeeLayers"
              validateStatus={touched.warehouseDeliveryFeeLayers && errors.warehouseDeliveryFeeLayers ? 'error' : 'success'}
              label={t('global:UPLOAD_CSV_AND_EXECUTE')}
            >
              <Button onClick={() => setIsCSVModalOpen(true)}>
                <CsvImporter
                  modalProps={{ title: t('global:UPLOAD_CSV_AND_EXECUTE'), okText: t('global:UPLOAD_CSV_AND_EXECUTE') }}
                  onOkayClick={handleCsvImport}
                  hasNestedHeaderKeys
                  exampleCsv={isPeakHoursMode ? exampleCsvPeakHours : exampleCsv}
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

ImportCsv.propTypes = {};

export default ImportCsv;
