import { createUseStyles } from 'react-jss';

export const useAddRemoveRelationalPromosModalStyles = createUseStyles<'wrapper'>({
  wrapper: {
    '& .ant-modal-body': { padding: '4px 16px 16px 16px' },
    '& .ant-modal-header': { display: 'none' },
  },
});
