import { getTime } from '@shared/utils/dateHelper';

export const getTableColumns = t => [
  {
    title: t('ORDER_ACTIONS.TIME'),
    dataIndex: 'timestamp',

    render: timestamp => getTime(timestamp),
  },
  {
    title: t('ORDER_ACTIONS:ACTION'),
    dataIndex: 'typeText',
    render: (typeText, { data }) => {
      const codeText = data?.codeText;

      if (!codeText) return typeText;

      return (
        <>
          {typeText}
          <ul>
            <li>
              {codeText}
            </li>
          </ul>
        </>
      );
    },
  },
];
