import moment from 'moment';

import { getLocalDateFormat } from '@shared/utils/localization';
import { GETIR_UP_TRAINING_STATUSES } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';

export const getTableColumns = ({ t }) => {
  return [
    { title: t('GETIRUP_TRAININGS.COLUMNS.NAME'), dataIndex: 'trainingName' },
    { title: t('GETIRUP_TRAININGS.COLUMNS.DATE'), dataIndex: 'trainingDate', render: trainingDate => moment(trainingDate).format(getLocalDateFormat()) },
    {
      title: t('GETIRUP_TRAININGS.COLUMNS.STATUS'),
      dataIndex: 'trainingStatus',
      render: trainingStatus => GETIR_UP_TRAINING_STATUSES[trainingStatus][getLangKey()],
    },
    {
      title: t('GETIRUP_TRAININGS.COLUMNS.EXAM_RESULT'),
      dataIndex: 'trainingScore',
      render: (trainingScore, { trainingScoreDesc }) => {
        if (trainingScore === -1) {
          return trainingScoreDesc;
        }

        return trainingScore;
      },
    },
  ];
};
