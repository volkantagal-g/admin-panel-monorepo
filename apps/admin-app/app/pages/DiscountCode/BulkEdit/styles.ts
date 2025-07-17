import { createUseStyles } from 'react-jss';

type UpdateFormClassNames = 'formWrapper'
export const useUpdateFormStyles = createUseStyles<UpdateFormClassNames>({
  formWrapper: {
    '& .ant-row .ant-form-item': { marginBottom: 0 },
    '& .ant-picker, & .ant-input-number': { width: '100%' },
  },
});

type SelectClassNames = 'wrapper'
export const useActionTypeSelectStyles = createUseStyles<SelectClassNames>({ wrapper: { '& .ant-input-number-affix-wrapper': { width: '100%' } } });
