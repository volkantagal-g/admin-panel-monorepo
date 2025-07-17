import { get } from 'lodash';

import { getLangKey, t } from '@shared/i18n';
import { DetailButton } from '@shared/components/UI/List';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

export const _getTableColumns = () => {
  const { Can } = usePermission();
  return [
    {
      title: t('kdsQuestionPage:LIST.TABLE.QUESTION_NAME'),
      key: 'questionName',
      render: row => {
        return get(row, ['questionName', getLangKey()], '-');
      },
    },
    {
      title: t('kdsQuestionPage:LIST.TABLE.QUESTION_GROUP_NAME'),
      key: 'questionGroupName',
      render: row => {
        return get(row, ['questionGroupName', getLangKey()], '-');
      },
    },
    {
      dataIndex: '_id',
      key: '_id',
      align: 'right',
      width: '120px',
      render: (_id, _row) => {
        const urlPath = `/kds/question/detail/`;
        return (
          <Can permKey={permKey.PAGE_KDS_QUESTION_DETAIL}>
            {
              DetailButton({
                _id,
                urlPath,
              })
            }
          </Can>
        );
      },
    },
  ];
};
