import { Card } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const ObjectionReasonInfoCard = ({ data }) => {
  const classes = useStyles();
  const { t } = useTranslation('ddsObjectionDetailPage');
  const { text, isObjection } = data;

  const title = isObjection ? t('REASON.TITLE.OBJECTION') : t('REASON.TITLE.DENIED');
  return (
    <Card title={title} className={classes.root}>
      <div>
        {text}
      </div>
    </Card>
  );
};

export default ObjectionReasonInfoCard;
