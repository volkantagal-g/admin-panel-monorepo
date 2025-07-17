import { Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from '@app/pages/Fleet/TmsDriver/Detail/components/Header/styles';
import { getHeaderTitle, getLastStatusChangeText } from './utils';

const Header = ({ name, statusLastChangedAt }) => {
  const { t } = useTranslation(['tmsPage', 'global']);
  const classes = useStyles();

  return (
    <Row justify="space-between">
      <Typography.Title level={3}>
        {getHeaderTitle(t, name)}
      </Typography.Title>
      <Typography.Title level={3} className={classes.lastStatusChangeTitle}>
        {getLastStatusChangeText(t, statusLastChangedAt)}
      </Typography.Title>
    </Row>
  );
};

export default Header;
