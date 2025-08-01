import { createUseStyles } from 'react-jss';

import useAntdCardStyles from '@shared/components/UI/AntCard/styles';
import useImageUploaderStyles from '@shared/components/UI/MultiLanguage/ImageUploader/styles';

const usePromoDetailStyleInternal = createUseStyles<string, { footer: string, wrapper: string }>({
  picture: props => ({
    '& .ant-card-head': { display: 'none' },
    '& .ant-card-body': { padding: 0 },
    [`& .${props.footer}`]: {
      borderTop: 'none',
      backgroundColor: 'unset',
      padding: 0,
      minHeight: 'unset',
      maxWidth: 200,
      marginTop: 8,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [`& .${props.wrapper}`]: {
      height: 'auto',
      maxHeight: 200,
      aspectRatio: 1,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginBottom: 'auto',
  }),
  pictureWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptions: {
    '& .ant-descriptions-row': { display: 'flex' },
    '& .ant-descriptions-row > * ': {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      padding: '6px 12px',
    },
    '& .ant-descriptions-header': { marginBottom: 8 },
  },
});

export function usePromoDetailsStyles() {
  const antdCardStyles = useAntdCardStyles();
  const uploaderStyles = useImageUploaderStyles();
  return usePromoDetailStyleInternal({ footer: antdCardStyles.cardFooter, wrapper: uploaderStyles.wrapper });
}
