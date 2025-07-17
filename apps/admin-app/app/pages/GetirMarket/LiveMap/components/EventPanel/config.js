import { Tag } from 'antd';

export const getTableColumns = ({ classes }) => [
  {
    dataIndex: 'name',
    key: 'name',
    width: 68,
    render: name => <b>{name}</b>,
  },
  {
    dataIndex: 'detail',
    key: 'detail',
    render: detail => {
      if (Array.isArray(detail)) {
        return detail.map(tag => (
          <Tag
            color="#5D3EBC"
            key={tag}
            // eslint-disable-next-line no-inline-styles/no-inline-styles
            className={classes.domainTypeTag}
            
          >
            {tag}
          </Tag>
        ));
      }
      return detail;
    },
  },
];
