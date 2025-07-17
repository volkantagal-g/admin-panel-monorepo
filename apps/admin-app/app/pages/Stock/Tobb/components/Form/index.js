import { useTranslation } from 'react-i18next';
import { Card, Typography, Form, Input, Button, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { get, uniq } from 'lodash';

import CsvImporter from '@shared/components/UI/CsvImporter';
import { Creators } from '../../redux/actions';
import { getTobbGibRequestSelector } from '../../redux/selectors';

const TobbForm = () => {
  const isPending = useSelector(getTobbGibRequestSelector.getIsPending);
  const [form] = Form.useForm();
  const { t } = useTranslation(['tobb', 'global']);
  const dispatch = useDispatch();

  const handleCsvImportForBulkUpdate = ({ data: csvData }) => {
    const ids = [];
    for (let i = 0; i < csvData.length; i += 1) {
      const row = csvData[i];
      const value = get(row, 'VKN', '');
      if (value) {
        ids.push(value);
      }
    }
    dispatch(Creators.getTobbGibRequestRequest({ ids: uniq(ids) }));
  };

  return (
    <Card title={t('PAGE_TITLE.TOBB_GIB_REQUEST')} className="mt-1 mb-1">
      <Form
        form={form}
        initialValues={{ vkn: '' }}
        layout="horizontal"
        autoComplete="off"
        name="requestVKNInfoForm"
        onFinish={values => {
          dispatch(Creators.getTobbGibRequestRequest({ ids: [values?.vkn] }));
        }}
      >
        <Row gutter={8}>
          <Col>
            <Form.Item name="vkn" rules={[{ required: true, message: t('error:REQUIRED') }]}>
              <Input disabled={isPending} placeholder={t('VKN')} />
            </Form.Item>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" disabled={isPending}>{t('SUBMIT')}</Button>
          </Col>
        </Row>
      </Form>

      <Typography.Text className="d-block mb-3 ml-5 font-weight-bold text-uppercase">{t('OR')}</Typography.Text>

      <CsvImporter
        modalProps={{ width: 800 }}
        onOkayClick={handleCsvImportForBulkUpdate}
        hasNestedHeaderKeys
        importButtonText={t('UPLOAD_CSV')}
        isButton
        disabled={isPending}
        modalTitleForCSV={t('UPLOAD_CSV')}
        exampleCsv={{ VKN: t('VKN_ID') }}
      />
    </Card>
  );
};

export default TobbForm;
