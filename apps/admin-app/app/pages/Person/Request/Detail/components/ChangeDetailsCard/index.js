import { Row, Col, Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { Title } from '@app/pages/Person/Request/Detail/components';
import useStyles from './styles';

const { Text } = Typography;

const ChangeDetailsCard = ({ changeDetails }) => {
  const classes = useStyles();
  const { t } = useTranslation('personRequestPage');

  return (
    <Card>
      {changeDetails.map(changeDetail => (
        <Row key={changeDetail.key} className={classes.row}>
          <Col span={24}>
            <Title>{t('INFORMATION_TO_BE_CHANGED')}:</Title>
            <Text>{t(`CHANGING_FIELD.${changeDetail.key.toUpperCase()}`)}</Text>
          </Col>
          <Col span={24}>
            <Title>{t('OLD_VALUE')}:</Title>
            <Text>{changeDetail.oldValue}</Text>
          </Col>
          <Col span={24}>
            <Title>{t('NEW_VALUE')}:</Title>
            <Text>{changeDetail.newValue}</Text>
          </Col>
        </Row>
      ))}
    </Card>
  );
};

export default ChangeDetailsCard;
