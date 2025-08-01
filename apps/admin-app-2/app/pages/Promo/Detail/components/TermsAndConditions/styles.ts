import { createUseStyles } from 'react-jss';

type ClassNames = 'wrapper'

export const useTermsAndConditionsStyle = createUseStyles<ClassNames>({
  wrapper: {
    '& .ant-row .ant-form-item, & .ant-typography': { marginBottom: 0 },
    '& .ant-checkbox': { fontSize: 32.4 },
    '& .ant-divider-horizontal': { margin: '8px 0' },
  },
});
