import { Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import CsvImporter from '@shared/components/UI/CsvImporter';
import useStyles from '@app/pages/CourierCommunication/NotificationList/Detail/components/SegmentInformation/styles';
import { rules } from '@app/pages/CourierCommunication/NotificationList/Detail/components/Form/helpers';

const SegmentInformation = ({ handleOnChange, value, isDisabled }) => {
  const classes = useStyles();
  const { t } = useTranslation('courierCommunication');

  const handleNewCsvImport = csvData => {
    handleOnChange('courierIds', Object.values(csvData?.data[0]));
  };

  return (
    <AntCard title={t('SEGMENT_INFORMATION')}>
      <Form.Item name="courierIds" required rules={rules.requiredArray}>
        <Row>
          <Col flex={4}>
            <Input
              value={value?.length > 0 ? t('SELECTED_COURIERS', { count: value?.length }) : null}
              placeholder={t('UPLOAD_CSV_DESCRIPTION')}
              disabled
            />
          </Col>
          <Col flex={1} className={classes.csvImportColumn}>
            <CsvImporter
              withoutHeader
              hasNestedHeaderKeys
              onOkayClick={handleNewCsvImport}
              modalProps={{ width: 1000 }}
              exampleCsv={{ Ids: '602bbf7f64d8a2e29f4542c8,702bbf7f64d8a2e29f4542c8,802bbf7f64d8a2e29f4542c8' }}
              disabled={isDisabled}
            />
          </Col>
        </Row>
      </Form.Item>
    </AntCard>
  );
};

export default SegmentInformation;
