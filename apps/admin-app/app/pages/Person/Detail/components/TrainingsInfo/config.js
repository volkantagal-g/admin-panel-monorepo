import moment from 'moment';

import { getLangKey } from '@shared/i18n';
import { getLocalDateFormat } from '@shared/utils/localization';
import { PERSON_TRAINING_TYPES } from '../../constants';

export const getTableColumns = ({ t }) => {
  return [
    {
      title: t('DATE'),
      dataIndex: 'trainingDate',
      key: 'trainingDate',
      width: 150,
      render: trainingDate => moment(trainingDate).format(getLocalDateFormat()),
    },
    {
      title: t('TRAININGS.CERTIFICATE_NO'),
      dataIndex: 'certificateNumber',
      key: 'certificateNumber',
      width: 150,
    },
    {
      title: t('TRAININGS.TRAINER'),
      dataIndex: 'trainer',
      key: 'trainer',
      width: 150,
    },
    {
      title: t('TRAININGS.NAME'),
      dataIndex: 'trainingType',
      key: 'trainingType',
      width: 150,
      render: trainingType => PERSON_TRAINING_TYPES[trainingType][getLangKey()],
    },
  ];
};
