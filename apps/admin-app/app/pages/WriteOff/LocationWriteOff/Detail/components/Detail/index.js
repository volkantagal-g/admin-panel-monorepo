import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import { Descriptions, Row, Col } from 'antd';

import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { formatDate } from '@shared/utils/dateHelper';
import { getLangKey } from '@shared/i18n';
import { locationWriteOffStatuses, locationWriteOffReasons, locationWriteOffComments } from '@shared/shared/constantValues';
import useStyles from './style';

const Detail = ({ locationWriteOff }) => {
  const { t } = useTranslation('writeOffPage');
  const classes = useStyles();

  return (
    <Row gutter={[16, 32]} className={classes.detailRow}>
      <Col span={12}>
        <Descriptions
          size="small"
          bordered
          column={1}
        >
          <Descriptions.Item label={t('WAREHOUSE')}>
            {locationWriteOff?.warehouseName}
          </Descriptions.Item>
          <Descriptions.Item label={t('LOCATION')}>
            {locationWriteOff?.locationBarcode}
          </Descriptions.Item>
          <Descriptions.Item label={t('REASON')}>
            {get(locationWriteOffReasons, [locationWriteOff?.reason, getLangKey()], '')}
          </Descriptions.Item>
          <Descriptions.Item label={t('COMMENT')}>
            {get(locationWriteOffComments, [locationWriteOff?.comment, getLangKey()], '')}
          </Descriptions.Item>
        </Descriptions>
      </Col>
      <Col span={12}>
        <Descriptions
          size="small"
          bordered
          column={1}
        >
          <Descriptions.Item label={t('CREATED_BY')}>
            {locationWriteOff?.createdByName}
          </Descriptions.Item>
          <Descriptions.Item label={t('STATUS')}>
            {get(locationWriteOffStatuses, [locationWriteOff?.status, getLangKey()], '')}
          </Descriptions.Item>
          <Descriptions.Item label={t('CREATION_DATE')}>
            {locationWriteOff?.createdAt && formatDate(locationWriteOff?.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item label={t('REQUEST_ID')}>
            <CopyToClipboard message={locationWriteOff?._id} />
          </Descriptions.Item>
          <Descriptions.Item label={t('DOCUMENTED_DATE')}>
            {locationWriteOff?.documentedDate && formatDate(locationWriteOff?.documentedDate)}
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
};

export default Detail;
