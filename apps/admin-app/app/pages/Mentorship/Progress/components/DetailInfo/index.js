import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';

import { Button, Image } from '@shared/components/GUI';
import useStyles from './styles';

const DetailInfo = ({ course, mentor, mentee }) => {
  const classes = useStyles();
  const { t } = useTranslation(['mentorshipPage', 'global']);

  return (
    <Row gutter={[50, 50]} className={classes.root}>
      <Col className="d-flex flex-column align-items-center">
        <Image preview={false} width={120} className="shadow-lg rounded-circle p-2" src={mentor?.picURL} />
        <p className={classes.name}>{mentor?.employeeId?.fullName}</p>
        <Button size="small">{t('MENTOR')}</Button>
      </Col>
      <Col>
        <p className={classes.title}>{course?.topic?.name}</p>
      </Col>
      <Col className="d-flex flex-column align-items-center">
        <Image width={120} className="shadow-lg rounded-circle p-2" src={mentee?.picURL} />
        <p className={classes.name}>{mentee?.employeeId?.fullName}</p>
        <Button size="small" color="ternary">{t('MENTEE')}</Button>
      </Col>
    </Row>
  );
};

export default DetailInfo;
