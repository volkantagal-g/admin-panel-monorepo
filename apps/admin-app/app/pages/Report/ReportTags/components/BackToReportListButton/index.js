import { Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { ROUTE } from '@app/routes';

import useStyles from './styles';

export default function BackToReportListButton() {
  const { t } = useTranslation('reportsPage');
  const classes = useStyles();

  return (
    <Tooltip title={t('GO_BACK_TO_LIST')}>
      <Link to={ROUTE.REPORT_TAGS.path}>
        <ArrowLeftOutlined className={classes.backIcon} />
      </Link>
    </Tooltip>
  );
}
