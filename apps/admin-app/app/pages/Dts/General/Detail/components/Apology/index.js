import { Input } from 'antd';
import moment from 'moment';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';

const { TextArea } = Input;

const Apology = ({ apology }) => {
  const { t } = useTranslation('dts');

  return (
    <Card title={t('ANSWER')}>
      <TextArea
        value={apology?.description}
        rows={4}
        disabled
      />
      <p> {apology && `${get(apology, ['franchiseUser', 'name'], '-')} - ${moment(get(apology, 'createdAt')).format('YYYY-MM-DD HH:mm')}`}</p>
    </Card>
  );
};

export default Apology;
