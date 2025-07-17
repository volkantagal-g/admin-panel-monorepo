import { Row, Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const Footer = ({ acceptButtonHandler, rejectButtonHandler }) => {
  const { t } = useTranslation('ddsObjectionDetailPage');
  const classes = useStyles();

  return (
    <Row className={classes.buttonContainer}>
      <Popconfirm
        placement="topRight"
        title={t('ACCEPT.CONFIRM.UPDATE')}
        okText={t('OK')}
        cancelText={t('CANCEL')}
        onConfirm={acceptButtonHandler}
        key="submit"
      >
        <Button className={classes.button} size="small" type="success">{t('global:ACCEPT')}</Button>
      </Popconfirm>
      <Button className={classes.button} size="small" type="danger" onClick={rejectButtonHandler}>{t('global:REJECT')}</Button>
    </Row>
  );
};

export default Footer;
