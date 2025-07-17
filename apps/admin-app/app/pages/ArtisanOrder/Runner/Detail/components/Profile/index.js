import { Col, Row, Select, Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import moment from 'moment';

import useStyles from './styles';
import useStylesShared from '../../styles';
import { getLangKey } from '@shared/i18n';

const Avatar = ({ nameSurname, status }) => {
  const { t } = useTranslation('runnerDetailPage');
  const { Text } = Typography;
  const classes = useStyles({ });
  const theme = useTheme();

  return (
    <Row className={classes.imgContainer} justify="space-between">
      <Col>
        <Text className={classes.title}>{nameSurname}</Text>
      </Col>
      <Col>
        <Tag
          className={classes.statusBadge}
          color={
            status !== 'INACTIVE' ? theme.color.success : theme.color.error
          }
        >
          {status ? t(`STATUS_${status}`) : ''}
        </Tag>
      </Col>
    </Row>
  );
};

const Controls = ({ status, updatedAt, onStatusChange }) => {
  const { t } = useTranslation('runnerDetailPage');
  const { Text } = Typography;
  const classes = useStyles({ });
  const sharedClasses = useStylesShared();

  return (
    <div className={classes.sectionContainer}>
      <Text className={sharedClasses.sectionTitle} level={3}>
        {t('RECENT_STATUS')}
      </Text>
      <Select
        value={status}
        onChange={onStatusChange}
        className={classes.statusSelectBox}
      >
        <Select.Option value="BUSY">{t('STATUS_BUSY')}</Select.Option>
        <Select.Option value="ON_DELIVERY">
          {t('STATUS_ON_DELIVERY')}
        </Select.Option>
        <Select.Option value="AVAILABLE">{t('STATUS_AVAILABLE')}</Select.Option>
        <Select.Option value="INACTIVE">{t('STATUS_INACTIVE')}</Select.Option>
      </Select>
      <div>
        <Text className={classes.smallText} level={4}>
          {t('RECENT_STATUS_CHANGE')}
        </Text>
        <p className={classes.smallText}>
          {moment(updatedAt).format('DD MM YYYY HH:MM')} -{' '}
          {moment(updatedAt).locale(getLangKey()).fromNow(false)}
        </p>
      </div>
    </div>
  );
};

function Profile(props) {
  const { nameSurname, status, updatedAt, onStatusChange } = props;
  const classes = useStyles({ });

  return (
    <div className={classes.profileContainer}>
      <Avatar nameSurname={nameSurname} status={status} updatedAt={updatedAt} />
      <Controls status={status} onStatusChange={onStatusChange} />
    </div>
  );
}

export default Profile;
