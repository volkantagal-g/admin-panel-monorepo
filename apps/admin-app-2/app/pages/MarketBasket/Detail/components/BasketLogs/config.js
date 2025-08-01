import isEmpty from 'lodash/isEmpty';

import { getLangKey } from '@shared/i18n';
import { getTime } from '@shared/utils/dateHelper';

export const getTableColumns = t => [
  {
    title: t('TIME'),
    dataIndex: 'timestamp',

    render: timestamp => getTime(timestamp),
  },
  {
    title: t('global:ACTION'),
    dataIndex: 'type',
    render: (type, { data }) => {
      const products = data?.products;
      if (!products?.length) return type;
      return (
        <>
          {type}
          <ul>
            {products.map(({ id, names, amount }) => (
              !isEmpty(names) && (
              <li className="ml-1" key={id}>
                {amount}x {names?.[getLangKey()]}
              </li>
              )
            ))}
          </ul>
        </>
      );
    },
  },
];
