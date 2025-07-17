import { Col, Descriptions, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { UserAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import Card from '@shared/components/UI/AntCard';
import useStyles from './styles';
import { PICKER_TYPES } from '@shared/shared/constantValues';
import { formatDate } from '@shared/utils/dateHelper';

import { getLangKey } from '@shared/i18n';

function GeneralInfo({
  name,
  countryGsmCode,
  uniqueIdentifier,
  pickerType,
  createdAt,
  gsm,
  personId,
  isGorillasEmployee,
}) {
  const { t } = useTranslation('pickerDetailPage');
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <Col span={24}>
      <Card title={t('GENERAL_INFO')}>
        <Descriptions column={1} layout="vertical">
          <Descriptions.Item label={t('NAME')}>
            <Input
              className={classes.width}
              value={name}
              disabled
              addonAfter={<UserAddOutlined onClick={() => navigate(`/person/detail/${personId}`)} />}
            />
          </Descriptions.Item>
          <Descriptions.Item label={t('GSM')}>
            <Input
              className={classes.width}
              value={gsm}
              disabled
            />
          </Descriptions.Item>
          <Descriptions.Item label={t('COUNTRY_GSM_CODE')}>
            <Input
              className={classes.width}
              value={countryGsmCode}
              disabled
            />
          </Descriptions.Item>
          <Descriptions.Item label={t('UNIQUE_IDENTIFIER')}>
            <Input
              className={classes.width}
              value={uniqueIdentifier}
              disabled
            />
          </Descriptions.Item>
          <Descriptions.Item label={t('PICKER_TYPE')}>
            <Input
              className={classes.width}
              value={PICKER_TYPES[pickerType]?.[getLangKey()]}
              disabled
            />
          </Descriptions.Item>
          <Descriptions.Item label={t('CREATED_AT')}>
            <Input
              className={classes.width}
              value={formatDate(createdAt)}
              disabled
            />

          </Descriptions.Item>
          <Descriptions.Item label={t('GORILLAS_EMPLOYEE')}>
            { isGorillasEmployee
              ? t('YES')
              : t('NO') }
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Col>
  );
}

export default GeneralInfo;
