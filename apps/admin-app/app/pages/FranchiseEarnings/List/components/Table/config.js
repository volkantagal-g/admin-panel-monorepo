import moment from 'moment';
import { orderBy } from 'lodash';

/**
 * Returns the created columns.
 * @param {string[]} terms - Array of term names
 * ['2021-04', '2021-03', '2021-02', ...]
 */
export const getTableColumns = terms => {
  if (!terms) {
    return [];
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
      width: '300px',
      render: (title, record) => {
        if (record.children) {
          return <b style={record.textColor ? { color: record.textColor } : {}}>{title}</b>;
        }

        return title;
      },
    },
  ];

  const sortedTerms = orderBy(terms, term => moment(term).valueOf(), ['desc']);

  sortedTerms.forEach(term => {
    columns.push({
      title: moment(term).format('YYYY MMMM'),
      dataIndex: term,
      key: term,
      align: 'right',
      width: '160px',
    });
  });

  return columns;
};
