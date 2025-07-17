import { Row, Col, Input, Typography, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import { map } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import { formatDate } from '@shared/utils/dateHelper';
import { getLocalDateFormat } from '@shared/utils/localization';
import { isStringADate, camelCaseToUpperCase } from '../../utils';
import useStyles from './styles';

const { Text } = Typography;

const CardBillDetails = ({ billData }) => {
  const { t } = useTranslation('franchiseBillManagementPage');
  const classes = useStyles();

  const { billDetails, billFile } = billData;

  const renderFields = () => map(billDetails, (val, key) => (
    <Col md={12} sm={12} xs={24}>
      <Text>{t(camelCaseToUpperCase(key))}</Text>
      <Input
        value={isStringADate(val) ? formatDate(val, getLocalDateFormat()) : val}
        placeholder={t(camelCaseToUpperCase(key))}
        disabled
      />
    </Col>
  ));

  return (
    <AntCard
      bordered={false}
      title={t('BILL_DETAILS')}
    >
      <Row gutter={[8, 8]}>
        {renderFields()}
        <Col md={12} sm={12} xs={24} className={classes.imageContainer}>
          <Text>{t('BILL_FILE')}</Text>
          <Upload
            listType="picture-card"
            width={120}
            fileList={[{ name: t('BILL_FILE'), url: billFile }]}
            onPreview={() => window.open(billFile)}
            maxCount={1}
          />
        </Col>
      </Row>
    </AntCard>
  );
};

export default CardBillDetails;
