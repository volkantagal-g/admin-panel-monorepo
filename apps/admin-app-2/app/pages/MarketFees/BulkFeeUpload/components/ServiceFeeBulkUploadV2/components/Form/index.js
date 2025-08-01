/* eslint-disable camelcase */
import { useState } from 'react';
import { Button, Row, Col, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';

import { useFormik } from 'formik';

import { validate } from '@shared/yup';
import { Creators } from '../../../../redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { defaultValues, handleCsvImport, validationSchema } from './formHelper';
import { getExampleCsv } from '@app/pages/MarketFees/BulkFeeUpload/utils';
import { Card } from '@shared/components/GUI';
import { bulkFeeUploadSelector } from '@app/pages/MarketFees/BulkFeeUpload/redux/selectors';

const { useForm } = Form;
function ImportServiceFeeCsv({ title, mode, exampleCsvUrl }) {
  const { t } = useTranslation('bulkFeeUpload');
  const dispatch = useDispatch();
  const isPending = useSelector(bulkFeeUploadSelector.getIsPending);
  const [form] = useForm();
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);
  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.marketFeesBulkUploadRequest({ fees: values }));
    },
    enableReinitialize: true,
  });
  const { handleSubmit, setFieldValue, errors, touched } = formik;

  const exampleCsv = getExampleCsv(mode);

  return (
    <Card size="small" title={title} bordered={false}>
      <Form
        id={`service-fee-bulk-upload-v2-${mode}`}
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
              help={touched.fees && errors.fees}
              name="fees"
              validateStatus={touched.fees && errors.fees ? 'error' : 'success'}
              label={t('global:UPLOAD_CSV_AND_EXECUTE')}
            >
              <Button onClick={() => setIsCSVModalOpen(true)}>
                <CsvImporter
                  modalProps={{
                    title: t('global:UPLOAD_CSV_AND_EXECUTE'),
                    okText: t('global:UPLOAD_CSV_AND_EXECUTE'),
                  }}
                  onOkayClick={({ data }) => handleCsvImport({ data, mode, dispatch, ToastCreators, setFieldValue, handleSubmit })}
                  hasNestedHeaderKeys
                  exampleCsv={exampleCsv}
                  isVisible={isCSVModalOpen}
                  exampleTableProps={{
                    className: null,
                    scroll: { x: '100vw', y: 240 },
                  }}
                  disabled={!!isPending}
                />
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default ImportServiceFeeCsv;
