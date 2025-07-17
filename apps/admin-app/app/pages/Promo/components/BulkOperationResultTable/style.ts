import { createUseStyles } from 'react-jss';

export const useResultTableStyles = createUseStyles<'wrapper'>({
  wrapper: {
    '& th, & td': { padding: '8px 8px !important' },
    '& .ant-table-measure-row th, & .ant-table-measure-row td': { padding: '0px !important' },
    '& .ant-modal-body': { padding: '16px 16px 0 16px' },
    '& .ant-statistic-content': { fontSize: '16px' },
    '& .ant-tag-error': { width: 'max-content' },
  },
});
